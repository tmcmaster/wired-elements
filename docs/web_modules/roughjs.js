const hasSelf = typeof self !== 'undefined';
class RoughGeneratorBase {
    constructor(config, surface) {
        this.defaultOptions = {
            maxRandomnessOffset: 2,
            roughness: 1,
            bowing: 1,
            stroke: '#000',
            strokeWidth: 1,
            curveTightness: 0,
            curveStepCount: 9,
            fillStyle: 'hachure',
            fillWeight: -1,
            hachureAngle: -41,
            hachureGap: -1,
            dashOffset: -1,
            dashGap: -1,
            zigzagOffset: -1
        };
        this.config = config || {};
        this.surface = surface;
        if (this.config.options) {
            this.defaultOptions = this._options(this.config.options);
        }
    }
    _options(options) {
        return options ? Object.assign({}, this.defaultOptions, options) : this.defaultOptions;
    }
    _drawable(shape, sets, options) {
        return { shape, sets: sets || [], options: options || this.defaultOptions };
    }
    getCanvasSize() {
        const val = (w) => {
            if (w && typeof w === 'object') {
                if (w.baseVal && w.baseVal.value) {
                    return w.baseVal.value;
                }
            }
            return w || 100;
        };
        if (this.surface) {
            return [val(this.surface.width), val(this.surface.height)];
        }
        return [100, 100];
    }
    computePolygonSize(points) {
        if (points.length) {
            let left = points[0][0];
            let right = points[0][0];
            let top = points[0][1];
            let bottom = points[0][1];
            for (let i = 1; i < points.length; i++) {
                left = Math.min(left, points[i][0]);
                right = Math.max(right, points[i][0]);
                top = Math.min(top, points[i][1]);
                bottom = Math.max(bottom, points[i][1]);
            }
            return [(right - left), (bottom - top)];
        }
        return [0, 0];
    }
    polygonPath(points) {
        let d = '';
        if (points.length) {
            d = `M${points[0][0]},${points[0][1]}`;
            for (let i = 1; i < points.length; i++) {
                d = `${d} L${points[i][0]},${points[i][1]}`;
            }
        }
        return d;
    }
    computePathSize(d) {
        let size = [0, 0];
        if (hasSelf && self.document) {
            try {
                const ns = 'http://www.w3.org/2000/svg';
                const svg = self.document.createElementNS(ns, 'svg');
                svg.setAttribute('width', '0');
                svg.setAttribute('height', '0');
                const pathNode = self.document.createElementNS(ns, 'path');
                pathNode.setAttribute('d', d);
                svg.appendChild(pathNode);
                self.document.body.appendChild(svg);
                const bb = pathNode.getBBox();
                if (bb) {
                    size[0] = bb.width || 0;
                    size[1] = bb.height || 0;
                }
                self.document.body.removeChild(svg);
            }
            catch (err) { }
        }
        const canvasSize = this.getCanvasSize();
        if (!(size[0] * size[1])) {
            size = canvasSize;
        }
        return size;
    }
    toPaths(drawable) {
        const sets = drawable.sets || [];
        const o = drawable.options || this.defaultOptions;
        const paths = [];
        for (const drawing of sets) {
            let path = null;
            switch (drawing.type) {
                case 'path':
                    path = {
                        d: this.opsToPath(drawing),
                        stroke: o.stroke,
                        strokeWidth: o.strokeWidth,
                        fill: 'none'
                    };
                    break;
                case 'fillPath':
                    path = {
                        d: this.opsToPath(drawing),
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: o.fill || 'none'
                    };
                    break;
                case 'fillSketch':
                    path = this.fillSketch(drawing, o);
                    break;
                case 'path2Dfill':
                    path = {
                        d: drawing.path || '',
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: o.fill || 'none'
                    };
                    break;
                case 'path2Dpattern': {
                    const size = drawing.size;
                    const pattern = {
                        x: 0, y: 0, width: 1, height: 1,
                        viewBox: `0 0 ${Math.round(size[0])} ${Math.round(size[1])}`,
                        patternUnits: 'objectBoundingBox',
                        path: this.fillSketch(drawing, o)
                    };
                    path = {
                        d: drawing.path,
                        stroke: 'none',
                        strokeWidth: 0,
                        pattern: pattern
                    };
                    break;
                }
            }
            if (path) {
                paths.push(path);
            }
        }
        return paths;
    }
    fillSketch(drawing, o) {
        let fweight = o.fillWeight;
        if (fweight < 0) {
            fweight = o.strokeWidth / 2;
        }
        return {
            d: this.opsToPath(drawing),
            stroke: o.fill || 'none',
            strokeWidth: fweight,
            fill: 'none'
        };
    }
    opsToPath(drawing) {
        let path = '';
        for (const item of drawing.ops) {
            const data = item.data;
            switch (item.op) {
                case 'move':
                    path += `M${data[0]} ${data[1]} `;
                    break;
                case 'bcurveTo':
                    path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
                    break;
                case 'qcurveTo':
                    path += `Q${data[0]} ${data[1]}, ${data[2]} ${data[3]} `;
                    break;
                case 'lineTo':
                    path += `L${data[0]} ${data[1]} `;
                    break;
            }
        }
        return path.trim();
    }
}

function isType(token, type) {
    return token.type === type;
}
const PARAMS = {
    A: 7,
    a: 7,
    C: 6,
    c: 6,
    H: 1,
    h: 1,
    L: 2,
    l: 2,
    M: 2,
    m: 2,
    Q: 4,
    q: 4,
    S: 4,
    s: 4,
    T: 4,
    t: 2,
    V: 1,
    v: 1,
    Z: 0,
    z: 0
};
class ParsedPath {
    constructor(d) {
        this.COMMAND = 0;
        this.NUMBER = 1;
        this.EOD = 2;
        this.segments = [];
        this.parseData(d);
        this.processPoints();
    }
    tokenize(d) {
        const tokens = new Array();
        while (d !== '') {
            if (d.match(/^([ \t\r\n,]+)/)) {
                d = d.substr(RegExp.$1.length);
            }
            else if (d.match(/^([aAcChHlLmMqQsStTvVzZ])/)) {
                tokens[tokens.length] = { type: this.COMMAND, text: RegExp.$1 };
                d = d.substr(RegExp.$1.length);
            }
            else if (d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
                tokens[tokens.length] = { type: this.NUMBER, text: `${parseFloat(RegExp.$1)}` };
                d = d.substr(RegExp.$1.length);
            }
            else {
                console.error('Unrecognized segment command: ' + d);
                return [];
            }
        }
        tokens[tokens.length] = { type: this.EOD, text: '' };
        return tokens;
    }
    parseData(d) {
        const tokens = this.tokenize(d);
        let index = 0;
        let token = tokens[index];
        let mode = 'BOD';
        this.segments = new Array();
        while (!isType(token, this.EOD)) {
            let param_length;
            const params = new Array();
            if (mode === 'BOD') {
                if (token.text === 'M' || token.text === 'm') {
                    index++;
                    param_length = PARAMS[token.text];
                    mode = token.text;
                }
                else {
                    this.parseData('M0,0' + d);
                    return;
                }
            }
            else {
                if (isType(token, this.NUMBER)) {
                    param_length = PARAMS[mode];
                }
                else {
                    index++;
                    param_length = PARAMS[token.text];
                    mode = token.text;
                }
            }
            if ((index + param_length) < tokens.length) {
                for (let i = index; i < index + param_length; i++) {
                    const numbeToken = tokens[i];
                    if (isType(numbeToken, this.NUMBER)) {
                        params[params.length] = +numbeToken.text;
                    }
                    else {
                        console.error('Parameter type is not a number: ' + mode + ',' + numbeToken.text);
                        return;
                    }
                }
                if (typeof PARAMS[mode] === 'number') {
                    const segment = { key: mode, data: params };
                    this.segments.push(segment);
                    index += param_length;
                    token = tokens[index];
                    if (mode === 'M')
                        mode = 'L';
                    if (mode === 'm')
                        mode = 'l';
                }
                else {
                    console.error('Unsupported segment type: ' + mode);
                    return;
                }
            }
            else {
                console.error('Path data ended before all parameters were found');
            }
        }
    }
    get closed() {
        if (typeof this._closed === 'undefined') {
            this._closed = false;
            for (const s of this.segments) {
                if (s.key.toLowerCase() === 'z') {
                    this._closed = true;
                }
            }
        }
        return this._closed;
    }
    processPoints() {
        let first = null;
        let currentPoint = [0, 0];
        for (let i = 0; i < this.segments.length; i++) {
            const s = this.segments[i];
            switch (s.key) {
                case 'M':
                case 'L':
                case 'T':
                    s.point = [s.data[0], s.data[1]];
                    break;
                case 'm':
                case 'l':
                case 't':
                    s.point = [s.data[0] + currentPoint[0], s.data[1] + currentPoint[1]];
                    break;
                case 'H':
                    s.point = [s.data[0], currentPoint[1]];
                    break;
                case 'h':
                    s.point = [s.data[0] + currentPoint[0], currentPoint[1]];
                    break;
                case 'V':
                    s.point = [currentPoint[0], s.data[0]];
                    break;
                case 'v':
                    s.point = [currentPoint[0], s.data[0] + currentPoint[1]];
                    break;
                case 'z':
                case 'Z':
                    if (first) {
                        s.point = [first[0], first[1]];
                    }
                    break;
                case 'C':
                    s.point = [s.data[4], s.data[5]];
                    break;
                case 'c':
                    s.point = [s.data[4] + currentPoint[0], s.data[5] + currentPoint[1]];
                    break;
                case 'S':
                    s.point = [s.data[2], s.data[3]];
                    break;
                case 's':
                    s.point = [s.data[2] + currentPoint[0], s.data[3] + currentPoint[1]];
                    break;
                case 'Q':
                    s.point = [s.data[2], s.data[3]];
                    break;
                case 'q':
                    s.point = [s.data[2] + currentPoint[0], s.data[3] + currentPoint[1]];
                    break;
                case 'A':
                    s.point = [s.data[5], s.data[6]];
                    break;
                case 'a':
                    s.point = [s.data[5] + currentPoint[0], s.data[6] + currentPoint[1]];
                    break;
            }
            if (s.key === 'm' || s.key === 'M') {
                first = null;
            }
            if (s.point) {
                currentPoint = s.point;
                if (!first) {
                    first = s.point;
                }
            }
            if (s.key === 'z' || s.key === 'Z') {
                first = null;
            }
        }
    }
}
class RoughPath {
    constructor(d) {
        this._position = [0, 0];
        this._first = null;
        this.bezierReflectionPoint = null;
        this.quadReflectionPoint = null;
        this.parsed = new ParsedPath(d);
    }
    get segments() {
        return this.parsed.segments;
    }
    get closed() {
        return this.parsed.closed;
    }
    get linearPoints() {
        if (!this._linearPoints) {
            const lp = [];
            let points = [];
            for (const s of this.parsed.segments) {
                const key = s.key.toLowerCase();
                if (key === 'm' || key === 'z') {
                    if (points.length) {
                        lp.push(points);
                        points = [];
                    }
                    if (key === 'z') {
                        continue;
                    }
                }
                if (s.point) {
                    points.push(s.point);
                }
            }
            if (points.length) {
                lp.push(points);
                points = [];
            }
            this._linearPoints = lp;
        }
        return this._linearPoints;
    }
    get first() {
        return this._first;
    }
    set first(v) {
        this._first = v;
    }
    setPosition(x, y) {
        this._position = [x, y];
        if (!this._first) {
            this._first = [x, y];
        }
    }
    get position() {
        return this._position;
    }
    get x() {
        return this._position[0];
    }
    get y() {
        return this._position[1];
    }
}
// Algorithm as described in https://www.w3.org/TR/SVG/implnote.html
// Code adapted from nsSVGPathDataParser.cpp in Mozilla 
// https://hg.mozilla.org/mozilla-central/file/17156fbebbc8/content/svg/content/src/nsSVGPathDataParser.cpp#l887
class RoughArcConverter {
    constructor(from, to, radii, angle, largeArcFlag, sweepFlag) {
        this._segIndex = 0;
        this._numSegs = 0;
        this._rx = 0;
        this._ry = 0;
        this._sinPhi = 0;
        this._cosPhi = 0;
        this._C = [0, 0];
        this._theta = 0;
        this._delta = 0;
        this._T = 0;
        this._from = from;
        if (from[0] === to[0] && from[1] === to[1]) {
            return;
        }
        const radPerDeg = Math.PI / 180;
        this._rx = Math.abs(radii[0]);
        this._ry = Math.abs(radii[1]);
        this._sinPhi = Math.sin(angle * radPerDeg);
        this._cosPhi = Math.cos(angle * radPerDeg);
        const x1dash = this._cosPhi * (from[0] - to[0]) / 2.0 + this._sinPhi * (from[1] - to[1]) / 2.0;
        const y1dash = -this._sinPhi * (from[0] - to[0]) / 2.0 + this._cosPhi * (from[1] - to[1]) / 2.0;
        let root = 0;
        const numerator = this._rx * this._rx * this._ry * this._ry - this._rx * this._rx * y1dash * y1dash - this._ry * this._ry * x1dash * x1dash;
        if (numerator < 0) {
            const s = Math.sqrt(1 - (numerator / (this._rx * this._rx * this._ry * this._ry)));
            this._rx = this._rx * s;
            this._ry = this._ry * s;
            root = 0;
        }
        else {
            root = (largeArcFlag === sweepFlag ? -1.0 : 1.0) *
                Math.sqrt(numerator / (this._rx * this._rx * y1dash * y1dash + this._ry * this._ry * x1dash * x1dash));
        }
        const cxdash = root * this._rx * y1dash / this._ry;
        const cydash = -root * this._ry * x1dash / this._rx;
        this._C = [0, 0];
        this._C[0] = this._cosPhi * cxdash - this._sinPhi * cydash + (from[0] + to[0]) / 2.0;
        this._C[1] = this._sinPhi * cxdash + this._cosPhi * cydash + (from[1] + to[1]) / 2.0;
        this._theta = this.calculateVectorAngle(1.0, 0.0, (x1dash - cxdash) / this._rx, (y1dash - cydash) / this._ry);
        let dtheta = this.calculateVectorAngle((x1dash - cxdash) / this._rx, (y1dash - cydash) / this._ry, (-x1dash - cxdash) / this._rx, (-y1dash - cydash) / this._ry);
        if ((!sweepFlag) && (dtheta > 0)) {
            dtheta -= 2 * Math.PI;
        }
        else if (sweepFlag && (dtheta < 0)) {
            dtheta += 2 * Math.PI;
        }
        this._numSegs = Math.ceil(Math.abs(dtheta / (Math.PI / 2)));
        this._delta = dtheta / this._numSegs;
        this._T = (8 / 3) * Math.sin(this._delta / 4) * Math.sin(this._delta / 4) / Math.sin(this._delta / 2);
    }
    getNextSegment() {
        if (this._segIndex === this._numSegs) {
            return null;
        }
        const cosTheta1 = Math.cos(this._theta);
        const sinTheta1 = Math.sin(this._theta);
        const theta2 = this._theta + this._delta;
        const cosTheta2 = Math.cos(theta2);
        const sinTheta2 = Math.sin(theta2);
        const to = [
            this._cosPhi * this._rx * cosTheta2 - this._sinPhi * this._ry * sinTheta2 + this._C[0],
            this._sinPhi * this._rx * cosTheta2 + this._cosPhi * this._ry * sinTheta2 + this._C[1]
        ];
        const cp1 = [
            this._from[0] + this._T * (-this._cosPhi * this._rx * sinTheta1 - this._sinPhi * this._ry * cosTheta1),
            this._from[1] + this._T * (-this._sinPhi * this._rx * sinTheta1 + this._cosPhi * this._ry * cosTheta1)
        ];
        const cp2 = [
            to[0] + this._T * (this._cosPhi * this._rx * sinTheta2 + this._sinPhi * this._ry * cosTheta2),
            to[1] + this._T * (this._sinPhi * this._rx * sinTheta2 - this._cosPhi * this._ry * cosTheta2)
        ];
        this._theta = theta2;
        this._from = [to[0], to[1]];
        this._segIndex++;
        return {
            cp1: cp1,
            cp2: cp2,
            to: to
        };
    }
    calculateVectorAngle(ux, uy, vx, vy) {
        const ta = Math.atan2(uy, ux);
        const tb = Math.atan2(vy, vx);
        if (tb >= ta)
            return tb - ta;
        return 2 * Math.PI - (ta - tb);
    }
}
class PathFitter {
    constructor(sets, closed) {
        this.sets = sets;
        this.closed = closed;
    }
    fit(simplification) {
        const outSets = [];
        for (const set of this.sets) {
            const length = set.length;
            let estLength = Math.floor(simplification * length);
            if (estLength < 5) {
                if (length <= 5) {
                    continue;
                }
                estLength = 5;
            }
            outSets.push(this.reduce(set, estLength));
        }
        let d = '';
        for (const set of outSets) {
            for (let i = 0; i < set.length; i++) {
                const point = set[i];
                if (i === 0) {
                    d += 'M' + point[0] + ',' + point[1];
                }
                else {
                    d += 'L' + point[0] + ',' + point[1];
                }
            }
            if (this.closed) {
                d += 'z ';
            }
        }
        return d;
    }
    distance(p1, p2) {
        return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    }
    reduce(set, count) {
        if (set.length <= count) {
            return set;
        }
        const points = set.slice(0);
        while (points.length > count) {
            let minArea = -1;
            let minIndex = -1;
            for (let i = 1; i < (points.length - 1); i++) {
                const a = this.distance(points[i - 1], points[i]);
                const b = this.distance(points[i], points[i + 1]);
                const c = this.distance(points[i - 1], points[i + 1]);
                const s = (a + b + c) / 2.0;
                const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
                if ((minArea < 0) || (area < minArea)) {
                    minArea = area;
                    minIndex = i;
                }
            }
            if (minIndex > 0) {
                points.splice(minIndex, 1);
            }
            else {
                break;
            }
        }
        return points;
    }
}

class Segment {
    constructor(p1, p2) {
        this.xi = Number.MAX_VALUE;
        this.yi = Number.MAX_VALUE;
        this.px1 = p1[0];
        this.py1 = p1[1];
        this.px2 = p2[0];
        this.py2 = p2[1];
        this.a = this.py2 - this.py1;
        this.b = this.px1 - this.px2;
        this.c = this.px2 * this.py1 - this.px1 * this.py2;
        this._undefined = ((this.a === 0) && (this.b === 0) && (this.c === 0));
    }
    isUndefined() {
        return this._undefined;
    }
    intersects(otherSegment) {
        if (this.isUndefined() || otherSegment.isUndefined()) {
            return false;
        }
        let grad1 = Number.MAX_VALUE;
        let grad2 = Number.MAX_VALUE;
        let int1 = 0, int2 = 0;
        const a = this.a, b = this.b, c = this.c;
        if (Math.abs(b) > 0.00001) {
            grad1 = -a / b;
            int1 = -c / b;
        }
        if (Math.abs(otherSegment.b) > 0.00001) {
            grad2 = -otherSegment.a / otherSegment.b;
            int2 = -otherSegment.c / otherSegment.b;
        }
        if (grad1 === Number.MAX_VALUE) {
            if (grad2 === Number.MAX_VALUE) {
                if ((-c / a) !== (-otherSegment.c / otherSegment.a)) {
                    return false;
                }
                if ((this.py1 >= Math.min(otherSegment.py1, otherSegment.py2)) && (this.py1 <= Math.max(otherSegment.py1, otherSegment.py2))) {
                    this.xi = this.px1;
                    this.yi = this.py1;
                    return true;
                }
                if ((this.py2 >= Math.min(otherSegment.py1, otherSegment.py2)) && (this.py2 <= Math.max(otherSegment.py1, otherSegment.py2))) {
                    this.xi = this.px2;
                    this.yi = this.py2;
                    return true;
                }
                return false;
            }
            this.xi = this.px1;
            this.yi = (grad2 * this.xi + int2);
            if (((this.py1 - this.yi) * (this.yi - this.py2) < -0.00001) || ((otherSegment.py1 - this.yi) * (this.yi - otherSegment.py2) < -0.00001)) {
                return false;
            }
            if (Math.abs(otherSegment.a) < 0.00001) {
                if ((otherSegment.px1 - this.xi) * (this.xi - otherSegment.px2) < -0.00001) {
                    return false;
                }
                return true;
            }
            return true;
        }
        if (grad2 === Number.MAX_VALUE) {
            this.xi = otherSegment.px1;
            this.yi = grad1 * this.xi + int1;
            if (((otherSegment.py1 - this.yi) * (this.yi - otherSegment.py2) < -0.00001) || ((this.py1 - this.yi) * (this.yi - this.py2) < -0.00001)) {
                return false;
            }
            if (Math.abs(a) < 0.00001) {
                if ((this.px1 - this.xi) * (this.xi - this.px2) < -0.00001) {
                    return false;
                }
                return true;
            }
            return true;
        }
        if (grad1 === grad2) {
            if (int1 !== int2) {
                return false;
            }
            if ((this.px1 >= Math.min(otherSegment.px1, otherSegment.px2)) && (this.px1 <= Math.max(otherSegment.py1, otherSegment.py2))) {
                this.xi = this.px1;
                this.yi = this.py1;
                return true;
            }
            if ((this.px2 >= Math.min(otherSegment.px1, otherSegment.px2)) && (this.px2 <= Math.max(otherSegment.px1, otherSegment.px2))) {
                this.xi = this.px2;
                this.yi = this.py2;
                return true;
            }
            return false;
        }
        this.xi = ((int2 - int1) / (grad1 - grad2));
        this.yi = (grad1 * this.xi + int1);
        if (((this.px1 - this.xi) * (this.xi - this.px2) < -0.00001) || ((otherSegment.px1 - this.xi) * (this.xi - otherSegment.px2) < -0.00001)) {
            return false;
        }
        return true;
    }
}
function linerIntersection(l1, l2) {
    const a1 = l1[1][1] - l1[0][1];
    const b1 = l1[0][0] - l1[1][0];
    const c1 = a1 * l1[0][0] + b1 * l1[0][1];
    const a2 = l2[1][1] - l2[0][1];
    const b2 = l2[0][0] - l2[1][0];
    const c2 = a2 * l2[0][0] + b2 * l2[0][1];
    const determinant = a1 * b2 - a2 * b1;
    if (determinant) {
        return [
            Math.round((b2 * c1 - b1 * c2) / determinant),
            Math.round((a1 * c2 - a2 * c1) / determinant)
        ];
    }
    return null;
}
function centroid(points) {
    let area = 0, cx = 0, cy = 0;
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const next = i === (points.length - 1) ? points[0] : points[i + 1];
        area += p[0] * next[1] - next[0] * p[1];
    }
    area = area / 2;
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const next = i === (points.length - 1) ? points[0] : points[i + 1];
        cx += (p[0] + next[0]) * (p[0] * next[1] - next[0] * p[1]);
        cy += (p[1] + next[1]) * (p[0] * next[1] - next[0] * p[1]);
    }
    return [cx / (6 * area), cy / (6 * area)];
}

class HachureIterator {
    constructor(top, bottom, left, right, gap, sinAngle, cosAngle, tanAngle) {
        this.deltaX = 0;
        this.hGap = 0;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.gap = gap;
        this.sinAngle = sinAngle;
        this.tanAngle = tanAngle;
        if (Math.abs(sinAngle) < 0.0001) {
            this.pos = left + gap;
        }
        else if (Math.abs(sinAngle) > 0.9999) {
            this.pos = top + gap;
        }
        else {
            this.deltaX = (bottom - top) * Math.abs(tanAngle);
            this.pos = left - Math.abs(this.deltaX);
            this.hGap = Math.abs(gap / cosAngle);
            this.sLeft = new Segment([left, bottom], [left, top]);
            this.sRight = new Segment([right, bottom], [right, top]);
        }
    }
    nextLine() {
        if (Math.abs(this.sinAngle) < 0.0001) {
            if (this.pos < this.right) {
                const line = [this.pos, this.top, this.pos, this.bottom];
                this.pos += this.gap;
                return line;
            }
        }
        else if (Math.abs(this.sinAngle) > 0.9999) {
            if (this.pos < this.bottom) {
                const line = [this.left, this.pos, this.right, this.pos];
                this.pos += this.gap;
                return line;
            }
        }
        else {
            let xLower = this.pos - this.deltaX / 2;
            let xUpper = this.pos + this.deltaX / 2;
            let yLower = this.bottom;
            let yUpper = this.top;
            if (this.pos < (this.right + this.deltaX)) {
                while (((xLower < this.left) && (xUpper < this.left)) || ((xLower > this.right) && (xUpper > this.right))) {
                    this.pos += this.hGap;
                    xLower = this.pos - this.deltaX / 2;
                    xUpper = this.pos + this.deltaX / 2;
                    if (this.pos > (this.right + this.deltaX)) {
                        return null;
                    }
                }
                const s = new Segment([xLower, yLower], [xUpper, yUpper]);
                if (this.sLeft && s.intersects(this.sLeft)) {
                    xLower = s.xi;
                    yLower = s.yi;
                }
                if (this.sRight && s.intersects(this.sRight)) {
                    xUpper = s.xi;
                    yUpper = s.yi;
                }
                if (this.tanAngle > 0) {
                    xLower = this.right - (xLower - this.left);
                    xUpper = this.right - (xUpper - this.left);
                }
                const line = [xLower, yLower, xUpper, yUpper];
                this.pos += this.hGap;
                return line;
            }
        }
        return null;
    }
}

function lineLength(line) {
    const p1 = line[0];
    const p2 = line[1];
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}
function getIntersectingLines(line, points) {
    const intersections = [];
    const s1 = new Segment([line[0], line[1]], [line[2], line[3]]);
    for (let i = 0; i < points.length; i++) {
        const s2 = new Segment(points[i], points[(i + 1) % points.length]);
        if (s1.intersects(s2)) {
            intersections.push([s1.xi, s1.yi]);
        }
    }
    return intersections;
}
function affine(x, y, cx, cy, sinAnglePrime, cosAnglePrime, R) {
    const A = -cx * cosAnglePrime - cy * sinAnglePrime + cx;
    const B = R * (cx * sinAnglePrime - cy * cosAnglePrime) + cy;
    const C = cosAnglePrime;
    const D = sinAnglePrime;
    const E = -R * sinAnglePrime;
    const F = R * cosAnglePrime;
    return [
        A + C * x + D * y,
        B + E * x + F * y
    ];
}
function hachureLinesForPolygon(points, o) {
    const ret = [];
    if (points && points.length) {
        let left = points[0][0];
        let right = points[0][0];
        let top = points[0][1];
        let bottom = points[0][1];
        for (let i = 1; i < points.length; i++) {
            left = Math.min(left, points[i][0]);
            right = Math.max(right, points[i][0]);
            top = Math.min(top, points[i][1]);
            bottom = Math.max(bottom, points[i][1]);
        }
        const angle = o.hachureAngle;
        let gap = o.hachureGap;
        if (gap < 0) {
            gap = o.strokeWidth * 4;
        }
        gap = Math.max(gap, 0.1);
        const radPerDeg = Math.PI / 180;
        const hachureAngle = (angle % 180) * radPerDeg;
        const cosAngle = Math.cos(hachureAngle);
        const sinAngle = Math.sin(hachureAngle);
        const tanAngle = Math.tan(hachureAngle);
        const it = new HachureIterator(top - 1, bottom + 1, left - 1, right + 1, gap, sinAngle, cosAngle, tanAngle);
        let rect;
        while ((rect = it.nextLine()) != null) {
            const lines = getIntersectingLines(rect, points);
            for (let i = 0; i < lines.length; i++) {
                if (i < (lines.length - 1)) {
                    const p1 = lines[i];
                    const p2 = lines[i + 1];
                    ret.push([p1, p2]);
                }
            }
        }
    }
    return ret;
}
function hachureLinesForEllipse(helper, cx, cy, width, height, o) {
    const ret = [];
    let rx = Math.abs(width / 2);
    let ry = Math.abs(height / 2);
    rx += helper.randOffset(rx * 0.05, o);
    ry += helper.randOffset(ry * 0.05, o);
    const angle = o.hachureAngle;
    let gap = o.hachureGap;
    if (gap <= 0) {
        gap = o.strokeWidth * 4;
    }
    let fweight = o.fillWeight;
    if (fweight < 0) {
        fweight = o.strokeWidth / 2;
    }
    const radPerDeg = Math.PI / 180;
    const hachureAngle = (angle % 180) * radPerDeg;
    const tanAngle = Math.tan(hachureAngle);
    const aspectRatio = ry / rx;
    const hyp = Math.sqrt(aspectRatio * tanAngle * aspectRatio * tanAngle + 1);
    const sinAnglePrime = aspectRatio * tanAngle / hyp;
    const cosAnglePrime = 1 / hyp;
    const gapPrime = gap / ((rx * ry / Math.sqrt((ry * cosAnglePrime) * (ry * cosAnglePrime) + (rx * sinAnglePrime) * (rx * sinAnglePrime))) / rx);
    let halfLen = Math.sqrt((rx * rx) - (cx - rx + gapPrime) * (cx - rx + gapPrime));
    for (let xPos = cx - rx + gapPrime; xPos < cx + rx; xPos += gapPrime) {
        halfLen = Math.sqrt((rx * rx) - (cx - xPos) * (cx - xPos));
        const p1 = affine(xPos, cy - halfLen, cx, cy, sinAnglePrime, cosAnglePrime, aspectRatio);
        const p2 = affine(xPos, cy + halfLen, cx, cy, sinAnglePrime, cosAnglePrime, aspectRatio);
        ret.push([p1, p2]);
    }
    return ret;
}

class HachureFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        return this._fillPolygon(points, o);
    }
    fillEllipse(cx, cy, width, height, o) {
        return this._fillEllipse(cx, cy, width, height, o);
    }
    fillArc(_x, _y, _width, _height, _start, _stop, _o) {
        return null;
    }
    _fillPolygon(points, o, connectEnds = false) {
        const lines = hachureLinesForPolygon(points, o);
        const ops = this.renderLines(lines, o, connectEnds);
        return { type: 'fillSketch', ops };
    }
    _fillEllipse(cx, cy, width, height, o, connectEnds = false) {
        const lines = hachureLinesForEllipse(this.helper, cx, cy, width, height, o);
        const ops = this.renderLines(lines, o, connectEnds);
        return { type: 'fillSketch', ops };
    }
    renderLines(lines, o, connectEnds) {
        let ops = [];
        let prevPoint = null;
        for (const line of lines) {
            ops = ops.concat(this.helper.doubleLineOps(line[0][0], line[0][1], line[1][0], line[1][1], o));
            if (connectEnds && prevPoint) {
                ops = ops.concat(this.helper.doubleLineOps(prevPoint[0], prevPoint[1], line[0][0], line[0][1], o));
            }
            prevPoint = line[1];
        }
        return ops;
    }
}

class ZigZagFiller extends HachureFiller {
    fillPolygon(points, o) {
        return this._fillPolygon(points, o, true);
    }
    fillEllipse(cx, cy, width, height, o) {
        return this._fillEllipse(cx, cy, width, height, o, true);
    }
}

class HatchFiller extends HachureFiller {
    fillPolygon(points, o) {
        const set = this._fillPolygon(points, o);
        const o2 = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 });
        const set2 = this._fillPolygon(points, o2);
        set.ops = set.ops.concat(set2.ops);
        return set;
    }
    fillEllipse(cx, cy, width, height, o) {
        const set = this._fillEllipse(cx, cy, width, height, o);
        const o2 = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 });
        const set2 = this._fillEllipse(cx, cy, width, height, o2);
        set.ops = set.ops.concat(set2.ops);
        return set;
    }
}

class DotFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        o = Object.assign({}, o, { curveStepCount: 4, hachureAngle: 0 });
        const lines = hachureLinesForPolygon(points, o);
        return this.dotsOnLines(lines, o);
    }
    fillEllipse(cx, cy, width, height, o) {
        o = Object.assign({}, o, { curveStepCount: 4, hachureAngle: 0 });
        const lines = hachureLinesForEllipse(this.helper, cx, cy, width, height, o);
        return this.dotsOnLines(lines, o);
    }
    fillArc(_x, _y, _width, _height, _start, _stop, _o) {
        return null;
    }
    dotsOnLines(lines, o) {
        let ops = [];
        let gap = o.hachureGap;
        if (gap < 0) {
            gap = o.strokeWidth * 4;
        }
        gap = Math.max(gap, 0.1);
        let fweight = o.fillWeight;
        if (fweight < 0) {
            fweight = o.strokeWidth / 2;
        }
        for (const line of lines) {
            const length = lineLength(line);
            const dl = length / gap;
            const count = Math.ceil(dl) - 1;
            const alpha = Math.atan((line[1][1] - line[0][1]) / (line[1][0] - line[0][0]));
            for (let i = 0; i < count; i++) {
                const l = gap * (i + 1);
                const dy = l * Math.sin(alpha);
                const dx = l * Math.cos(alpha);
                const c = [line[0][0] - dx, line[0][1] + dy];
                const cx = this.helper.randOffsetWithRange(c[0] - gap / 4, c[0] + gap / 4, o);
                const cy = this.helper.randOffsetWithRange(c[1] - gap / 4, c[1] + gap / 4, o);
                const el = this.helper.ellipse(cx, cy, fweight, fweight, o);
                ops = ops.concat(el.ops);
            }
        }
        return { type: 'fillSketch', ops };
    }
}

class StarburstFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        const xMinMax = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        const yMinMax = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        points.forEach((p) => {
            xMinMax[0] = Math.min(xMinMax[0], p[0]);
            xMinMax[1] = Math.max(xMinMax[1], p[0]);
            yMinMax[0] = Math.min(yMinMax[0], p[1]);
            yMinMax[1] = Math.max(yMinMax[1], p[1]);
        });
        const center = centroid(points);
        const radius = Math.max(Math.sqrt(Math.pow(center[0] - xMinMax[0], 2) + Math.pow(center[1] - yMinMax[0], 2)), Math.sqrt(Math.pow(center[0] - xMinMax[1], 2) + Math.pow(center[1] - yMinMax[1], 2)));
        const gap = o.hachureGap > 0 ? o.hachureGap : o.strokeWidth * 4;
        // polygon lines
        const lines = [];
        if (points.length > 2) {
            for (let i = 0; i < points.length; i++) {
                if (i === (points.length - 1)) {
                    lines.push([points[i], points[0]]);
                }
                else {
                    lines.push([points[i], points[i + 1]]);
                }
            }
        }
        // compute intersecting points
        let intersections = [];
        const count = Math.max(1, Math.PI * radius / gap);
        for (let i = 0; i < count; i++) {
            const angle = i * Math.PI / count;
            const cl = [center, [center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle)]];
            lines.forEach((l) => {
                const intersection = linerIntersection(l, cl);
                if (intersection && intersection[0] >= xMinMax[0] && intersection[0] <= xMinMax[1] && intersection[1] >= yMinMax[0] && intersection[1] <= yMinMax[1]) {
                    intersections.push(intersection);
                }
            });
        }
        intersections = this.removeDuplocatePoints(intersections);
        // draw lines
        const linesToDraw = this.createLinesFromCenter(center, intersections);
        const ops = this.drawLines(linesToDraw, o);
        return { type: 'fillSketch', ops };
    }
    fillEllipse(cx, cy, width, height, o) {
        return this.fillArcSegment(cx, cy, width, height, 0, Math.PI * 2, o);
    }
    fillArc(x, y, width, height, start, stop, o) {
        return this.fillArcSegment(x, y, width, height, start, stop, o);
    }
    fillArcSegment(cx, cy, width, height, start, stop, o) {
        const center = [cx, cy];
        const a = width / 2;
        const b = height / 2;
        const radius = Math.max(width / 2, height / 2);
        let gap = o.hachureGap;
        if (gap < 0) {
            gap = o.strokeWidth * 4;
        }
        const count = Math.max(1, Math.abs(stop - start) * radius / gap);
        let intersections = [];
        for (let i = 0; i < count; i++) {
            const angle = i * ((stop - start) / count) + start;
            const x0 = radius * Math.cos(angle);
            const y0 = radius * Math.sin(angle);
            const d = Math.sqrt((a * a * y0 * y0) + (b * b * x0 * x0));
            const xp = (a * b * x0) / d;
            const yp = (a * b * y0) / d;
            intersections.push([center[0] + xp, center[1] + yp]);
        }
        intersections = this.removeDuplocatePoints(intersections);
        // draw lines
        const linesToDraw = this.createLinesFromCenter(center, intersections);
        const ops = this.drawLines(linesToDraw, o);
        return { type: 'fillSketch', ops };
    }
    drawLines(lines, o) {
        let ops = [];
        lines.forEach((line) => {
            const pa = line[0];
            const pb = line[1];
            ops = ops.concat(this.helper.doubleLineOps(pa[0], pa[1], pb[0], pb[1], o));
        });
        return ops;
    }
    createLinesFromCenter(center, points) {
        return points.map((p) => [center, p]);
    }
    removeDuplocatePoints(points) {
        const keys = new Set();
        return points.filter((p) => {
            const key = p.join(',');
            if (keys.has(key)) {
                return false;
            }
            keys.add(key);
            return true;
        });
    }
}

class DashedFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        const lines = hachureLinesForPolygon(points, o);
        return { type: 'fillSketch', ops: this.dashedLine(lines, o) };
    }
    fillEllipse(cx, cy, width, height, o) {
        const lines = hachureLinesForEllipse(this.helper, cx, cy, width, height, o);
        return { type: 'fillSketch', ops: this.dashedLine(lines, o) };
    }
    fillArc(_x, _y, _width, _height, _start, _stop, _o) {
        return null;
    }
    dashedLine(lines, o) {
        const offset = o.dashOffset < 0 ? (o.hachureGap < 0 ? (o.strokeWidth * 4) : o.hachureGap) : o.dashOffset;
        const gap = o.dashGap < 0 ? (o.hachureGap < 0 ? (o.strokeWidth * 4) : o.hachureGap) : o.dashGap;
        let ops = [];
        lines.forEach((line) => {
            const length = lineLength(line);
            const count = Math.floor(length / (offset + gap));
            const startOffset = (length + gap - (count * (offset + gap))) / 2;
            let p1 = line[0];
            let p2 = line[1];
            if (p1[0] > p2[0]) {
                p1 = line[1];
                p2 = line[0];
            }
            const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
            for (let i = 0; i < count; i++) {
                const lstart = i * (offset + gap);
                const lend = lstart + offset;
                const start = [p1[0] + (lstart * Math.cos(alpha)) + (startOffset * Math.cos(alpha)), p1[1] + lstart * Math.sin(alpha) + (startOffset * Math.sin(alpha))];
                const end = [p1[0] + (lend * Math.cos(alpha)) + (startOffset * Math.cos(alpha)), p1[1] + (lend * Math.sin(alpha)) + (startOffset * Math.sin(alpha))];
                ops = ops.concat(this.helper.doubleLineOps(start[0], start[1], end[0], end[1], o));
            }
        });
        return ops;
    }
}

class ZigZagLineFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        const gap = o.hachureGap < 0 ? (o.strokeWidth * 4) : o.hachureGap;
        const zo = o.zigzagOffset < 0 ? gap : o.zigzagOffset;
        o = Object.assign({}, o, { hachureGap: gap + zo });
        const lines = hachureLinesForPolygon(points, o);
        return { type: 'fillSketch', ops: this.zigzagLines(lines, zo, o) };
    }
    fillEllipse(cx, cy, width, height, o) {
        const gap = o.hachureGap < 0 ? (o.strokeWidth * 4) : o.hachureGap;
        const zo = o.zigzagOffset < 0 ? gap : o.zigzagOffset;
        o = Object.assign({}, o, { hachureGap: gap + zo });
        const lines = hachureLinesForEllipse(this.helper, cx, cy, width, height, o);
        return { type: 'fillSketch', ops: this.zigzagLines(lines, zo, o) };
    }
    fillArc(_x, _y, _width, _height, _start, _stop, _o) {
        return null;
    }
    zigzagLines(lines, zo, o) {
        let ops = [];
        lines.forEach((line) => {
            const length = lineLength(line);
            const count = Math.round(length / (2 * zo));
            let p1 = line[0];
            let p2 = line[1];
            if (p1[0] > p2[0]) {
                p1 = line[1];
                p2 = line[0];
            }
            const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
            for (let i = 0; i < count; i++) {
                const lstart = i * 2 * zo;
                const lend = (i + 1) * 2 * zo;
                const dz = Math.sqrt(2 * Math.pow(zo, 2));
                const start = [p1[0] + (lstart * Math.cos(alpha)), p1[1] + lstart * Math.sin(alpha)];
                const end = [p1[0] + (lend * Math.cos(alpha)), p1[1] + (lend * Math.sin(alpha))];
                const middle = [start[0] + dz * Math.cos(alpha + Math.PI / 4), start[1] + dz * Math.sin(alpha + Math.PI / 4)];
                ops = ops.concat(this.helper.doubleLineOps(start[0], start[1], middle[0], middle[1], o));
                ops = ops.concat(this.helper.doubleLineOps(middle[0], middle[1], end[0], end[1], o));
            }
        });
        return ops;
    }
}

const fillers = {};
function getFiller(o, helper) {
    let fillerName = o.fillStyle || 'hachure';
    if (!fillers[fillerName]) {
        switch (fillerName) {
            case 'zigzag':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new ZigZagFiller(helper);
                }
                break;
            case 'cross-hatch':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new HatchFiller(helper);
                }
                break;
            case 'dots':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new DotFiller(helper);
                }
                break;
            case 'starburst':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new StarburstFiller(helper);
                }
                break;
            case 'dashed':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new DashedFiller(helper);
                }
                break;
            case 'zigzag-line':
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new ZigZagLineFiller(helper);
                }
                break;
            case 'hachure':
            default:
                fillerName = 'hachure';
                if (!fillers[fillerName]) {
                    fillers[fillerName] = new HachureFiller(helper);
                }
                break;
        }
    }
    return fillers[fillerName];
}

const helper = {
    randOffset,
    randOffsetWithRange,
    ellipse,
    doubleLineOps
};
function line(x1, y1, x2, y2, o) {
    return { type: 'path', ops: _doubleLine(x1, y1, x2, y2, o) };
}
function linearPath(points, close, o) {
    const len = (points || []).length;
    if (len > 2) {
        let ops = [];
        for (let i = 0; i < (len - 1); i++) {
            ops = ops.concat(_doubleLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], o));
        }
        if (close) {
            ops = ops.concat(_doubleLine(points[len - 1][0], points[len - 1][1], points[0][0], points[0][1], o));
        }
        return { type: 'path', ops };
    }
    else if (len === 2) {
        return line(points[0][0], points[0][1], points[1][0], points[1][1], o);
    }
    return { type: 'path', ops: [] };
}
function polygon(points, o) {
    return linearPath(points, true, o);
}
function rectangle(x, y, width, height, o) {
    const points = [
        [x, y], [x + width, y], [x + width, y + height], [x, y + height]
    ];
    return polygon(points, o);
}
function curve(points, o) {
    const o1 = _curveWithOffset(points, 1 * (1 + o.roughness * 0.2), o);
    const o2 = _curveWithOffset(points, 1.5 * (1 + o.roughness * 0.22), o);
    return { type: 'path', ops: o1.concat(o2) };
}
function ellipse(x, y, width, height, o) {
    const increment = (Math.PI * 2) / o.curveStepCount;
    let rx = Math.abs(width / 2);
    let ry = Math.abs(height / 2);
    rx += _offsetOpt(rx * 0.05, o);
    ry += _offsetOpt(ry * 0.05, o);
    const o1 = _ellipse(increment, x, y, rx, ry, 1, increment * _offset(0.1, _offset(0.4, 1, o), o), o);
    const o2 = _ellipse(increment, x, y, rx, ry, 1.5, 0, o);
    return { type: 'path', ops: o1.concat(o2) };
}
function arc(x, y, width, height, start, stop, closed, roughClosure, o) {
    const cx = x;
    const cy = y;
    let rx = Math.abs(width / 2);
    let ry = Math.abs(height / 2);
    rx += _offsetOpt(rx * 0.01, o);
    ry += _offsetOpt(ry * 0.01, o);
    let strt = start;
    let stp = stop;
    while (strt < 0) {
        strt += Math.PI * 2;
        stp += Math.PI * 2;
    }
    if ((stp - strt) > (Math.PI * 2)) {
        strt = 0;
        stp = Math.PI * 2;
    }
    const ellipseInc = (Math.PI * 2) / o.curveStepCount;
    const arcInc = Math.min(ellipseInc / 2, (stp - strt) / 2);
    const o1 = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1, o);
    const o2 = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1.5, o);
    let ops = o1.concat(o2);
    if (closed) {
        if (roughClosure) {
            ops = ops.concat(_doubleLine(cx, cy, cx + rx * Math.cos(strt), cy + ry * Math.sin(strt), o));
            ops = ops.concat(_doubleLine(cx, cy, cx + rx * Math.cos(stp), cy + ry * Math.sin(stp), o));
        }
        else {
            ops.push({ op: 'lineTo', data: [cx, cy] });
            ops.push({ op: 'lineTo', data: [cx + rx * Math.cos(strt), cy + ry * Math.sin(strt)] });
        }
    }
    return { type: 'path', ops };
}
function svgPath(path, o) {
    path = (path || '').replace(/\n/g, ' ').replace(/(-\s)/g, '-').replace('/(\s\s)/g', ' ');
    let p = new RoughPath(path);
    if (o.simplification) {
        const fitter = new PathFitter(p.linearPoints, p.closed);
        const d = fitter.fit(o.simplification);
        p = new RoughPath(d);
    }
    let ops = [];
    const segments = p.segments || [];
    for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        const prev = i > 0 ? segments[i - 1] : null;
        const opList = _processSegment(p, s, prev, o);
        if (opList && opList.length) {
            ops = ops.concat(opList);
        }
    }
    return { type: 'path', ops };
}
// Fills
function solidFillPolygon(points, o) {
    const ops = [];
    if (points.length) {
        const offset = o.maxRandomnessOffset || 0;
        const len = points.length;
        if (len > 2) {
            ops.push({ op: 'move', data: [points[0][0] + _offsetOpt(offset, o), points[0][1] + _offsetOpt(offset, o)] });
            for (let i = 1; i < len; i++) {
                ops.push({ op: 'lineTo', data: [points[i][0] + _offsetOpt(offset, o), points[i][1] + _offsetOpt(offset, o)] });
            }
        }
    }
    return { type: 'fillPath', ops };
}
function patternFillPolygon(points, o) {
    return getFiller(o, helper).fillPolygon(points, o);
}
function patternFillEllipse(cx, cy, width, height, o) {
    return getFiller(o, helper).fillEllipse(cx, cy, width, height, o);
}
function patternFillArc(x, y, width, height, start, stop, o) {
    const arcfill = getFiller(o, helper).fillArc(x, y, width, height, start, stop, o);
    if (arcfill) {
        return arcfill;
    }
    // fall back to polygon approximation
    const cx = x;
    const cy = y;
    let rx = Math.abs(width / 2);
    let ry = Math.abs(height / 2);
    rx += _offsetOpt(rx * 0.01, o);
    ry += _offsetOpt(ry * 0.01, o);
    let strt = start;
    let stp = stop;
    while (strt < 0) {
        strt += Math.PI * 2;
        stp += Math.PI * 2;
    }
    if ((stp - strt) > (Math.PI * 2)) {
        strt = 0;
        stp = Math.PI * 2;
    }
    const increment = (stp - strt) / o.curveStepCount;
    const points = [];
    for (let angle = strt; angle <= stp; angle = angle + increment) {
        points.push([cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)]);
    }
    points.push([cx + rx * Math.cos(stp), cy + ry * Math.sin(stp)]);
    points.push([cx, cy]);
    return patternFillPolygon(points, o);
}
function randOffset(x, o) {
    return _offsetOpt(x, o);
}
function randOffsetWithRange(min, max, o) {
    return _offset(min, max, o);
}
function doubleLineOps(x1, y1, x2, y2, o) {
    return _doubleLine(x1, y1, x2, y2, o);
}
// Private helpers
function _offset(min, max, ops) {
    return ops.roughness * ((Math.random() * (max - min)) + min);
}
function _offsetOpt(x, ops) {
    return _offset(-x, x, ops);
}
function _doubleLine(x1, y1, x2, y2, o) {
    const o1 = _line(x1, y1, x2, y2, o, true, false);
    const o2 = _line(x1, y1, x2, y2, o, true, true);
    return o1.concat(o2);
}
function _line(x1, y1, x2, y2, o, move, overlay) {
    const lengthSq = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
    let offset = o.maxRandomnessOffset || 0;
    if ((offset * offset * 100) > lengthSq) {
        offset = Math.sqrt(lengthSq) / 10;
    }
    const halfOffset = offset / 2;
    const divergePoint = 0.2 + Math.random() * 0.2;
    let midDispX = o.bowing * o.maxRandomnessOffset * (y2 - y1) / 200;
    let midDispY = o.bowing * o.maxRandomnessOffset * (x1 - x2) / 200;
    midDispX = _offsetOpt(midDispX, o);
    midDispY = _offsetOpt(midDispY, o);
    const ops = [];
    const randomHalf = () => _offsetOpt(halfOffset, o);
    const randomFull = () => _offsetOpt(offset, o);
    if (move) {
        if (overlay) {
            ops.push({
                op: 'move', data: [
                    x1 + randomHalf(),
                    y1 + randomHalf()
                ]
            });
        }
        else {
            ops.push({
                op: 'move', data: [
                    x1 + _offsetOpt(offset, o),
                    y1 + _offsetOpt(offset, o)
                ]
            });
        }
    }
    if (overlay) {
        ops.push({
            op: 'bcurveTo', data: [
                midDispX + x1 + (x2 - x1) * divergePoint + randomHalf(),
                midDispY + y1 + (y2 - y1) * divergePoint + randomHalf(),
                midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomHalf(),
                midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomHalf(),
                x2 + randomHalf(),
                y2 + randomHalf()
            ]
        });
    }
    else {
        ops.push({
            op: 'bcurveTo', data: [
                midDispX + x1 + (x2 - x1) * divergePoint + randomFull(),
                midDispY + y1 + (y2 - y1) * divergePoint + randomFull(),
                midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomFull(),
                midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomFull(),
                x2 + randomFull(),
                y2 + randomFull()
            ]
        });
    }
    return ops;
}
function _curveWithOffset(points, offset, o) {
    const ps = [];
    ps.push([
        points[0][0] + _offsetOpt(offset, o),
        points[0][1] + _offsetOpt(offset, o),
    ]);
    ps.push([
        points[0][0] + _offsetOpt(offset, o),
        points[0][1] + _offsetOpt(offset, o),
    ]);
    for (let i = 1; i < points.length; i++) {
        ps.push([
            points[i][0] + _offsetOpt(offset, o),
            points[i][1] + _offsetOpt(offset, o),
        ]);
        if (i === (points.length - 1)) {
            ps.push([
                points[i][0] + _offsetOpt(offset, o),
                points[i][1] + _offsetOpt(offset, o),
            ]);
        }
    }
    return _curve(ps, null, o);
}
function _curve(points, closePoint, o) {
    const len = points.length;
    let ops = [];
    if (len > 3) {
        const b = [];
        const s = 1 - o.curveTightness;
        ops.push({ op: 'move', data: [points[1][0], points[1][1]] });
        for (let i = 1; (i + 2) < len; i++) {
            const cachedVertArray = points[i];
            b[0] = [cachedVertArray[0], cachedVertArray[1]];
            b[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
            b[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
            b[3] = [points[i + 1][0], points[i + 1][1]];
            ops.push({ op: 'bcurveTo', data: [b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]] });
        }
        if (closePoint && closePoint.length === 2) {
            const ro = o.maxRandomnessOffset;
            ops.push({ op: 'lineTo', data: [closePoint[0] + _offsetOpt(ro, o), closePoint[1] + _offsetOpt(ro, o)] });
        }
    }
    else if (len === 3) {
        ops.push({ op: 'move', data: [points[1][0], points[1][1]] });
        ops.push({
            op: 'bcurveTo', data: [
                points[1][0], points[1][1],
                points[2][0], points[2][1],
                points[2][0], points[2][1]
            ]
        });
    }
    else if (len === 2) {
        ops = ops.concat(_doubleLine(points[0][0], points[0][1], points[1][0], points[1][1], o));
    }
    return ops;
}
function _ellipse(increment, cx, cy, rx, ry, offset, overlap, o) {
    const radOffset = _offsetOpt(0.5, o) - (Math.PI / 2);
    const points = [];
    points.push([
        _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset - increment),
        _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset - increment)
    ]);
    for (let angle = radOffset; angle < (Math.PI * 2 + radOffset - 0.01); angle = angle + increment) {
        points.push([
            _offsetOpt(offset, o) + cx + rx * Math.cos(angle),
            _offsetOpt(offset, o) + cy + ry * Math.sin(angle)
        ]);
    }
    points.push([
        _offsetOpt(offset, o) + cx + rx * Math.cos(radOffset + Math.PI * 2 + overlap * 0.5),
        _offsetOpt(offset, o) + cy + ry * Math.sin(radOffset + Math.PI * 2 + overlap * 0.5)
    ]);
    points.push([
        _offsetOpt(offset, o) + cx + 0.98 * rx * Math.cos(radOffset + overlap),
        _offsetOpt(offset, o) + cy + 0.98 * ry * Math.sin(radOffset + overlap)
    ]);
    points.push([
        _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset + overlap * 0.5),
        _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset + overlap * 0.5)
    ]);
    return _curve(points, null, o);
}
function _arc(increment, cx, cy, rx, ry, strt, stp, offset, o) {
    const radOffset = strt + _offsetOpt(0.1, o);
    const points = [];
    points.push([
        _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset - increment),
        _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset - increment)
    ]);
    for (let angle = radOffset; angle <= stp; angle = angle + increment) {
        points.push([
            _offsetOpt(offset, o) + cx + rx * Math.cos(angle),
            _offsetOpt(offset, o) + cy + ry * Math.sin(angle)
        ]);
    }
    points.push([
        cx + rx * Math.cos(stp),
        cy + ry * Math.sin(stp)
    ]);
    points.push([
        cx + rx * Math.cos(stp),
        cy + ry * Math.sin(stp)
    ]);
    return _curve(points, null, o);
}
function _bezierTo(x1, y1, x2, y2, x, y, path, o) {
    const ops = [];
    const ros = [o.maxRandomnessOffset || 1, (o.maxRandomnessOffset || 1) + 0.5];
    let f = [0, 0];
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            ops.push({ op: 'move', data: [path.x, path.y] });
        }
        else {
            ops.push({ op: 'move', data: [path.x + _offsetOpt(ros[0], o), path.y + _offsetOpt(ros[0], o)] });
        }
        f = [x + _offsetOpt(ros[i], o), y + _offsetOpt(ros[i], o)];
        ops.push({
            op: 'bcurveTo', data: [
                x1 + _offsetOpt(ros[i], o), y1 + _offsetOpt(ros[i], o),
                x2 + _offsetOpt(ros[i], o), y2 + _offsetOpt(ros[i], o),
                f[0], f[1]
            ]
        });
    }
    path.setPosition(f[0], f[1]);
    return ops;
}
function _processSegment(path, seg, prevSeg, o) {
    let ops = [];
    switch (seg.key) {
        case 'M':
        case 'm': {
            const delta = seg.key === 'm';
            if (seg.data.length >= 2) {
                let x = +seg.data[0];
                let y = +seg.data[1];
                if (delta) {
                    x += path.x;
                    y += path.y;
                }
                const ro = 1 * (o.maxRandomnessOffset || 0);
                x = x + _offsetOpt(ro, o);
                y = y + _offsetOpt(ro, o);
                path.setPosition(x, y);
                ops.push({ op: 'move', data: [x, y] });
            }
            break;
        }
        case 'L':
        case 'l': {
            const delta = seg.key === 'l';
            if (seg.data.length >= 2) {
                let x = +seg.data[0];
                let y = +seg.data[1];
                if (delta) {
                    x += path.x;
                    y += path.y;
                }
                ops = ops.concat(_doubleLine(path.x, path.y, x, y, o));
                path.setPosition(x, y);
            }
            break;
        }
        case 'H':
        case 'h': {
            const delta = seg.key === 'h';
            if (seg.data.length) {
                let x = +seg.data[0];
                if (delta) {
                    x += path.x;
                }
                ops = ops.concat(_doubleLine(path.x, path.y, x, path.y, o));
                path.setPosition(x, path.y);
            }
            break;
        }
        case 'V':
        case 'v': {
            const delta = seg.key === 'v';
            if (seg.data.length) {
                let y = +seg.data[0];
                if (delta) {
                    y += path.y;
                }
                ops = ops.concat(_doubleLine(path.x, path.y, path.x, y, o));
                path.setPosition(path.x, y);
            }
            break;
        }
        case 'Z':
        case 'z': {
            if (path.first) {
                ops = ops.concat(_doubleLine(path.x, path.y, path.first[0], path.first[1], o));
                path.setPosition(path.first[0], path.first[1]);
                path.first = null;
            }
            break;
        }
        case 'C':
        case 'c': {
            const delta = seg.key === 'c';
            if (seg.data.length >= 6) {
                let x1 = +seg.data[0];
                let y1 = +seg.data[1];
                let x2 = +seg.data[2];
                let y2 = +seg.data[3];
                let x = +seg.data[4];
                let y = +seg.data[5];
                if (delta) {
                    x1 += path.x;
                    x2 += path.x;
                    x += path.x;
                    y1 += path.y;
                    y2 += path.y;
                    y += path.y;
                }
                const ob = _bezierTo(x1, y1, x2, y2, x, y, path, o);
                ops = ops.concat(ob);
                path.bezierReflectionPoint = [x + (x - x2), y + (y - y2)];
            }
            break;
        }
        case 'S':
        case 's': {
            const delta = seg.key === 's';
            if (seg.data.length >= 4) {
                let x2 = +seg.data[0];
                let y2 = +seg.data[1];
                let x = +seg.data[2];
                let y = +seg.data[3];
                if (delta) {
                    x2 += path.x;
                    x += path.x;
                    y2 += path.y;
                    y += path.y;
                }
                let x1 = x2;
                let y1 = y2;
                const prevKey = prevSeg ? prevSeg.key : '';
                let ref = null;
                if (prevKey === 'c' || prevKey === 'C' || prevKey === 's' || prevKey === 'S') {
                    ref = path.bezierReflectionPoint;
                }
                if (ref) {
                    x1 = ref[0];
                    y1 = ref[1];
                }
                const ob = _bezierTo(x1, y1, x2, y2, x, y, path, o);
                ops = ops.concat(ob);
                path.bezierReflectionPoint = [x + (x - x2), y + (y - y2)];
            }
            break;
        }
        case 'Q':
        case 'q': {
            const delta = seg.key === 'q';
            if (seg.data.length >= 4) {
                let x1 = +seg.data[0];
                let y1 = +seg.data[1];
                let x = +seg.data[2];
                let y = +seg.data[3];
                if (delta) {
                    x1 += path.x;
                    x += path.x;
                    y1 += path.y;
                    y += path.y;
                }
                const offset1 = 1 * (1 + o.roughness * 0.2);
                const offset2 = 1.5 * (1 + o.roughness * 0.22);
                ops.push({ op: 'move', data: [path.x + _offsetOpt(offset1, o), path.y + _offsetOpt(offset1, o)] });
                let f = [x + _offsetOpt(offset1, o), y + _offsetOpt(offset1, o)];
                ops.push({
                    op: 'qcurveTo', data: [
                        x1 + _offsetOpt(offset1, o), y1 + _offsetOpt(offset1, o),
                        f[0], f[1]
                    ]
                });
                ops.push({ op: 'move', data: [path.x + _offsetOpt(offset2, o), path.y + _offsetOpt(offset2, o)] });
                f = [x + _offsetOpt(offset2, o), y + _offsetOpt(offset2, o)];
                ops.push({
                    op: 'qcurveTo', data: [
                        x1 + _offsetOpt(offset2, o), y1 + _offsetOpt(offset2, o),
                        f[0], f[1]
                    ]
                });
                path.setPosition(f[0], f[1]);
                path.quadReflectionPoint = [x + (x - x1), y + (y - y1)];
            }
            break;
        }
        case 'T':
        case 't': {
            const delta = seg.key === 't';
            if (seg.data.length >= 2) {
                let x = +seg.data[0];
                let y = +seg.data[1];
                if (delta) {
                    x += path.x;
                    y += path.y;
                }
                let x1 = x;
                let y1 = y;
                const prevKey = prevSeg ? prevSeg.key : '';
                let ref = null;
                if (prevKey === 'q' || prevKey === 'Q' || prevKey === 't' || prevKey === 'T') {
                    ref = path.quadReflectionPoint;
                }
                if (ref) {
                    x1 = ref[0];
                    y1 = ref[1];
                }
                const offset1 = 1 * (1 + o.roughness * 0.2);
                const offset2 = 1.5 * (1 + o.roughness * 0.22);
                ops.push({ op: 'move', data: [path.x + _offsetOpt(offset1, o), path.y + _offsetOpt(offset1, o)] });
                let f = [x + _offsetOpt(offset1, o), y + _offsetOpt(offset1, o)];
                ops.push({
                    op: 'qcurveTo', data: [
                        x1 + _offsetOpt(offset1, o), y1 + _offsetOpt(offset1, o),
                        f[0], f[1]
                    ]
                });
                ops.push({ op: 'move', data: [path.x + _offsetOpt(offset2, o), path.y + _offsetOpt(offset2, o)] });
                f = [x + _offsetOpt(offset2, o), y + _offsetOpt(offset2, o)];
                ops.push({
                    op: 'qcurveTo', data: [
                        x1 + _offsetOpt(offset2, o), y1 + _offsetOpt(offset2, o),
                        f[0], f[1]
                    ]
                });
                path.setPosition(f[0], f[1]);
                path.quadReflectionPoint = [x + (x - x1), y + (y - y1)];
            }
            break;
        }
        case 'A':
        case 'a': {
            const delta = seg.key === 'a';
            if (seg.data.length >= 7) {
                const rx = +seg.data[0];
                const ry = +seg.data[1];
                const angle = +seg.data[2];
                const largeArcFlag = +seg.data[3];
                const sweepFlag = +seg.data[4];
                let x = +seg.data[5];
                let y = +seg.data[6];
                if (delta) {
                    x += path.x;
                    y += path.y;
                }
                if (x === path.x && y === path.y) {
                    break;
                }
                if (rx === 0 || ry === 0) {
                    ops = ops.concat(_doubleLine(path.x, path.y, x, y, o));
                    path.setPosition(x, y);
                }
                else {
                    for (let i = 0; i < 1; i++) {
                        const arcConverter = new RoughArcConverter([path.x, path.y], [x, y], [rx, ry], angle, largeArcFlag ? true : false, sweepFlag ? true : false);
                        let segment = arcConverter.getNextSegment();
                        while (segment) {
                            const ob = _bezierTo(segment.cp1[0], segment.cp1[1], segment.cp2[0], segment.cp2[1], segment.to[0], segment.to[1], path, o);
                            ops = ops.concat(ob);
                            segment = arcConverter.getNextSegment();
                        }
                    }
                }
            }
            break;
        }
    }
    return ops;
}

class RoughGenerator extends RoughGeneratorBase {
    line(x1, y1, x2, y2, options) {
        const o = this._options(options);
        return this._drawable('line', [line(x1, y1, x2, y2, o)], o);
    }
    rectangle(x, y, width, height, options) {
        const o = this._options(options);
        const paths = [];
        if (o.fill) {
            const points = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
            if (o.fillStyle === 'solid') {
                paths.push(solidFillPolygon(points, o));
            }
            else {
                paths.push(patternFillPolygon(points, o));
            }
        }
        paths.push(rectangle(x, y, width, height, o));
        return this._drawable('rectangle', paths, o);
    }
    ellipse(x, y, width, height, options) {
        const o = this._options(options);
        const paths = [];
        if (o.fill) {
            if (o.fillStyle === 'solid') {
                const shape = ellipse(x, y, width, height, o);
                shape.type = 'fillPath';
                paths.push(shape);
            }
            else {
                paths.push(patternFillEllipse(x, y, width, height, o));
            }
        }
        paths.push(ellipse(x, y, width, height, o));
        return this._drawable('ellipse', paths, o);
    }
    circle(x, y, diameter, options) {
        const ret = this.ellipse(x, y, diameter, diameter, options);
        ret.shape = 'circle';
        return ret;
    }
    linearPath(points, options) {
        const o = this._options(options);
        return this._drawable('linearPath', [linearPath(points, false, o)], o);
    }
    arc(x, y, width, height, start, stop, closed = false, options) {
        const o = this._options(options);
        const paths = [];
        if (closed && o.fill) {
            if (o.fillStyle === 'solid') {
                const shape = arc(x, y, width, height, start, stop, true, false, o);
                shape.type = 'fillPath';
                paths.push(shape);
            }
            else {
                paths.push(patternFillArc(x, y, width, height, start, stop, o));
            }
        }
        paths.push(arc(x, y, width, height, start, stop, closed, true, o));
        return this._drawable('arc', paths, o);
    }
    curve(points, options) {
        const o = this._options(options);
        return this._drawable('curve', [curve(points, o)], o);
    }
    polygon(points, options) {
        const o = this._options(options);
        const paths = [];
        if (o.fill) {
            if (o.fillStyle === 'solid') {
                paths.push(solidFillPolygon(points, o));
            }
            else {
                const size = this.computePolygonSize(points);
                const fillPoints = [
                    [0, 0],
                    [size[0], 0],
                    [size[0], size[1]],
                    [0, size[1]]
                ];
                const shape = patternFillPolygon(fillPoints, o);
                shape.type = 'path2Dpattern';
                shape.size = size;
                shape.path = this.polygonPath(points);
                paths.push(shape);
            }
        }
        paths.push(linearPath(points, true, o));
        return this._drawable('polygon', paths, o);
    }
    path(d, options) {
        const o = this._options(options);
        const paths = [];
        if (!d) {
            return this._drawable('path', paths, o);
        }
        if (o.fill) {
            if (o.fillStyle === 'solid') {
                const shape = { type: 'path2Dfill', path: d, ops: [] };
                paths.push(shape);
            }
            else {
                const size = this.computePathSize(d);
                const points = [
                    [0, 0],
                    [size[0], 0],
                    [size[0], size[1]],
                    [0, size[1]]
                ];
                const shape = patternFillPolygon(points, o);
                shape.type = 'path2Dpattern';
                shape.size = size;
                shape.path = d;
                paths.push(shape);
            }
        }
        paths.push(svgPath(d, o));
        return this._drawable('path', paths, o);
    }
}

const hasDocument = typeof document !== 'undefined';
class RoughCanvasBase {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    draw(drawable) {
        const sets = drawable.sets || [];
        const o = drawable.options || this.getDefaultOptions();
        const ctx = this.ctx;
        for (const drawing of sets) {
            switch (drawing.type) {
                case 'path':
                    ctx.save();
                    ctx.strokeStyle = o.stroke;
                    ctx.lineWidth = o.strokeWidth;
                    this._drawToContext(ctx, drawing);
                    ctx.restore();
                    break;
                case 'fillPath':
                    ctx.save();
                    ctx.fillStyle = o.fill || '';
                    this._drawToContext(ctx, drawing);
                    ctx.restore();
                    break;
                case 'fillSketch':
                    this.fillSketch(ctx, drawing, o);
                    break;
                case 'path2Dfill': {
                    this.ctx.save();
                    this.ctx.fillStyle = o.fill || '';
                    const p2d = new Path2D(drawing.path);
                    this.ctx.fill(p2d);
                    this.ctx.restore();
                    break;
                }
                case 'path2Dpattern': {
                    const doc = this.canvas.ownerDocument || (hasDocument && document);
                    if (doc) {
                        const size = drawing.size;
                        const hcanvas = doc.createElement('canvas');
                        const hcontext = hcanvas.getContext('2d');
                        const bbox = this.computeBBox(drawing.path);
                        if (bbox && (bbox.width || bbox.height)) {
                            hcanvas.width = this.canvas.width;
                            hcanvas.height = this.canvas.height;
                            hcontext.translate(bbox.x || 0, bbox.y || 0);
                        }
                        else {
                            hcanvas.width = size[0];
                            hcanvas.height = size[1];
                        }
                        this.fillSketch(hcontext, drawing, o);
                        this.ctx.save();
                        this.ctx.fillStyle = this.ctx.createPattern(hcanvas, 'repeat');
                        const p2d = new Path2D(drawing.path);
                        this.ctx.fill(p2d);
                        this.ctx.restore();
                    }
                    else {
                        console.error('Cannot render path2Dpattern. No defs/document defined.');
                    }
                    break;
                }
            }
        }
    }
    computeBBox(d) {
        if (hasDocument) {
            try {
                const ns = 'http://www.w3.org/2000/svg';
                const svg = document.createElementNS(ns, 'svg');
                svg.setAttribute('width', '0');
                svg.setAttribute('height', '0');
                const pathNode = self.document.createElementNS(ns, 'path');
                pathNode.setAttribute('d', d);
                svg.appendChild(pathNode);
                document.body.appendChild(svg);
                const bbox = pathNode.getBBox();
                document.body.removeChild(svg);
                return bbox;
            }
            catch (err) { }
        }
        return null;
    }
    fillSketch(ctx, drawing, o) {
        let fweight = o.fillWeight;
        if (fweight < 0) {
            fweight = o.strokeWidth / 2;
        }
        ctx.save();
        ctx.strokeStyle = o.fill || '';
        ctx.lineWidth = fweight;
        this._drawToContext(ctx, drawing);
        ctx.restore();
    }
    _drawToContext(ctx, drawing) {
        ctx.beginPath();
        for (const item of drawing.ops) {
            const data = item.data;
            switch (item.op) {
                case 'move':
                    ctx.moveTo(data[0], data[1]);
                    break;
                case 'bcurveTo':
                    ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
                    break;
                case 'qcurveTo':
                    ctx.quadraticCurveTo(data[0], data[1], data[2], data[3]);
                    break;
                case 'lineTo':
                    ctx.lineTo(data[0], data[1]);
                    break;
            }
        }
        if (drawing.type === 'fillPath') {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    }
}

class RoughCanvas extends RoughCanvasBase {
    constructor(canvas, config) {
        super(canvas);
        this.gen = new RoughGenerator(config || null, this.canvas);
    }
    get generator() {
        return this.gen;
    }
    getDefaultOptions() {
        return this.gen.defaultOptions;
    }
    line(x1, y1, x2, y2, options) {
        const d = this.gen.line(x1, y1, x2, y2, options);
        this.draw(d);
        return d;
    }
    rectangle(x, y, width, height, options) {
        const d = this.gen.rectangle(x, y, width, height, options);
        this.draw(d);
        return d;
    }
    ellipse(x, y, width, height, options) {
        const d = this.gen.ellipse(x, y, width, height, options);
        this.draw(d);
        return d;
    }
    circle(x, y, diameter, options) {
        const d = this.gen.circle(x, y, diameter, options);
        this.draw(d);
        return d;
    }
    linearPath(points, options) {
        const d = this.gen.linearPath(points, options);
        this.draw(d);
        return d;
    }
    polygon(points, options) {
        const d = this.gen.polygon(points, options);
        this.draw(d);
        return d;
    }
    arc(x, y, width, height, start, stop, closed = false, options) {
        const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
        this.draw(d);
        return d;
    }
    curve(points, options) {
        const d = this.gen.curve(points, options);
        this.draw(d);
        return d;
    }
    path(d, options) {
        const drawing = this.gen.path(d, options);
        this.draw(drawing);
        return drawing;
    }
}

const hasDocument$1 = typeof document !== 'undefined';
class RoughSVGBase {
    constructor(svg) {
        this.svg = svg;
    }
    get defs() {
        const doc = this.svg.ownerDocument || (hasDocument$1 && document);
        if (doc) {
            if (!this._defs) {
                const dnode = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (this.svg.firstChild) {
                    this.svg.insertBefore(dnode, this.svg.firstChild);
                }
                else {
                    this.svg.appendChild(dnode);
                }
                this._defs = dnode;
            }
        }
        return this._defs || null;
    }
    draw(drawable) {
        const sets = drawable.sets || [];
        const o = drawable.options || this.getDefaultOptions();
        const doc = this.svg.ownerDocument || window.document;
        const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (const drawing of sets) {
            let path = null;
            switch (drawing.type) {
                case 'path': {
                    path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', this.opsToPath(drawing));
                    path.style.stroke = o.stroke;
                    path.style.strokeWidth = o.strokeWidth + '';
                    path.style.fill = 'none';
                    break;
                }
                case 'fillPath': {
                    path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', this.opsToPath(drawing));
                    path.style.stroke = 'none';
                    path.style.strokeWidth = '0';
                    path.style.fill = o.fill || null;
                    break;
                }
                case 'fillSketch': {
                    path = this.fillSketch(doc, drawing, o);
                    break;
                }
                case 'path2Dfill': {
                    path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', drawing.path || '');
                    path.style.stroke = 'none';
                    path.style.strokeWidth = '0';
                    path.style.fill = o.fill || null;
                    break;
                }
                case 'path2Dpattern': {
                    if (!this.defs) {
                        console.error('Cannot render path2Dpattern. No defs/document defined.');
                    }
                    else {
                        const size = drawing.size;
                        const pattern = doc.createElementNS('http://www.w3.org/2000/svg', 'pattern');
                        const id = `rough-${Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER || 999999))}`;
                        pattern.setAttribute('id', id);
                        pattern.setAttribute('x', '0');
                        pattern.setAttribute('y', '0');
                        pattern.setAttribute('width', '1');
                        pattern.setAttribute('height', '1');
                        pattern.setAttribute('height', '1');
                        pattern.setAttribute('viewBox', `0 0 ${Math.round(size[0])} ${Math.round(size[1])}`);
                        pattern.setAttribute('patternUnits', 'objectBoundingBox');
                        const patternPath = this.fillSketch(doc, drawing, o);
                        pattern.appendChild(patternPath);
                        this.defs.appendChild(pattern);
                        path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', drawing.path || '');
                        path.style.stroke = 'none';
                        path.style.strokeWidth = '0';
                        path.style.fill = `url(#${id})`;
                    }
                    break;
                }
            }
            if (path) {
                g.appendChild(path);
            }
        }
        return g;
    }
    fillSketch(doc, drawing, o) {
        let fweight = o.fillWeight;
        if (fweight < 0) {
            fweight = o.strokeWidth / 2;
        }
        const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', this.opsToPath(drawing));
        path.style.stroke = o.fill || null;
        path.style.strokeWidth = fweight + '';
        path.style.fill = 'none';
        return path;
    }
}

class RoughSVG extends RoughSVGBase {
    constructor(svg, config) {
        super(svg);
        this.gen = new RoughGenerator(config || null, this.svg);
    }
    get generator() {
        return this.gen;
    }
    getDefaultOptions() {
        return this.gen.defaultOptions;
    }
    opsToPath(drawing) {
        return this.gen.opsToPath(drawing);
    }
    line(x1, y1, x2, y2, options) {
        const d = this.gen.line(x1, y1, x2, y2, options);
        return this.draw(d);
    }
    rectangle(x, y, width, height, options) {
        const d = this.gen.rectangle(x, y, width, height, options);
        return this.draw(d);
    }
    ellipse(x, y, width, height, options) {
        const d = this.gen.ellipse(x, y, width, height, options);
        return this.draw(d);
    }
    circle(x, y, diameter, options) {
        const d = this.gen.circle(x, y, diameter, options);
        return this.draw(d);
    }
    linearPath(points, options) {
        const d = this.gen.linearPath(points, options);
        return this.draw(d);
    }
    polygon(points, options) {
        const d = this.gen.polygon(points, options);
        return this.draw(d);
    }
    arc(x, y, width, height, start, stop, closed = false, options) {
        const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
        return this.draw(d);
    }
    curve(points, options) {
        const d = this.gen.curve(points, options);
        return this.draw(d);
    }
    path(d, options) {
        const drawing = this.gen.path(d, options);
        return this.draw(drawing);
    }
}

var rough = {
    canvas(canvas, config) {
        return new RoughCanvas(canvas, config);
    },
    svg(svg, config) {
        return new RoughSVG(svg, config);
    },
    generator(config, surface) {
        return new RoughGenerator(config, surface);
    }
};

export default rough;
