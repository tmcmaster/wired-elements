import { property, LitElement, html, customElement, query, css } from 'lit-element';
import { hachureLinesForPolygon, hachureLinesForEllipse } from 'roughjs/bin/fillers/filler-utils';
import '@polymer/iron-pages';
import '@polymer/app-layout';
import '@material/mwc-icon';
import { addListener } from '@polymer/polymer/lib/utils/gestures.js';
import { repeat } from 'lit-html/directives/repeat';

const __maxRandomnessOffset = 2;
const __roughness = 1;
const __bowing = 0.85;
const __curveTightness = 0;
const __curveStepCount = 9;

class WiresPath {
  constructor() {
    this.p = '';
  }

  get value() {
    return this.p.trim();
  }

  moveTo(x, y) {
    this.p = `${this.p}M ${x} ${y} `;
  }

  bcurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.p = `${this.p}C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
  }

}

function svgNode(tagName, attributes) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tagName);

  if (attributes) {
    for (const p in attributes) {
      n.setAttributeNS(null, p, attributes[p]);
    }
  }

  return n;
}

function _getOffset(min, max) {
  return __roughness * (Math.random() * (max - min) + min);
}

function _line(x1, y1, x2, y2, existingPath) {
  const lengthSq = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  let offset = __maxRandomnessOffset ;

  if (offset * offset * 100 > lengthSq) {
    offset = Math.sqrt(lengthSq) / 10;
  }

  const halfOffset = offset / 2;
  const divergePoint = 0.2 + Math.random() * 0.2;
  let midDispX = __bowing * __maxRandomnessOffset * (y2 - y1) / 200;
  let midDispY = __bowing * __maxRandomnessOffset * (x1 - x2) / 200;
  midDispX = _getOffset(-midDispX, midDispX);
  midDispY = _getOffset(-midDispY, midDispY);
  const path = existingPath || new WiresPath();
  path.moveTo(x1 + _getOffset(-offset, offset), y1 + _getOffset(-offset, offset));
  path.bcurveTo(midDispX + x1 + (x2 - x1) * divergePoint + _getOffset(-offset, offset), midDispY + y1 + (y2 - y1) * divergePoint + _getOffset(-offset, offset), midDispX + x1 + 2 * (x2 - x1) * divergePoint + _getOffset(-offset, offset), midDispY + y1 + 2 * (y2 - y1) * divergePoint + _getOffset(-offset, offset), x2 + _getOffset(-offset, offset), y2 + _getOffset(-offset, offset));
  path.moveTo(x1 + _getOffset(-halfOffset, halfOffset), y1 + _getOffset(-halfOffset, halfOffset));
  path.bcurveTo(midDispX + x1 + (x2 - x1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispY + y1 + (y2 - y1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispX + x1 + 2 * (x2 - x1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispY + y1 + 2 * (y2 - y1) * divergePoint + _getOffset(-halfOffset, halfOffset), x2 + _getOffset(-halfOffset, halfOffset), y2 + _getOffset(-halfOffset, halfOffset));
  return path;
}

function _continuousLine(x1, y1, x2, y2, move = false, overwrite = false, path) {
  path = path || new WiresPath();
  const lengthSq = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  let offset = __maxRandomnessOffset ;

  if (offset * offset * 100 > lengthSq) {
    offset = Math.sqrt(lengthSq) / 10;
  }

  const halfOffset = offset / 2;
  const divergePoint = 0.2 + Math.random() * 0.2;
  let midDispX = __bowing * __maxRandomnessOffset * (y2 - y1) / 200;
  let midDispY = __bowing * __maxRandomnessOffset * (x1 - x2) / 200;
  midDispX = _getOffset(-midDispX, midDispX);
  midDispY = _getOffset(-midDispY, midDispY);

  if (move) {
    path.moveTo(x1 + _getOffset(-offset, offset), y1 + _getOffset(-offset, offset));
  }

  if (!overwrite) {
    path.bcurveTo(midDispX + x1 + (x2 - x1) * divergePoint + _getOffset(-offset, offset), midDispY + y1 + (y2 - y1) * divergePoint + _getOffset(-offset, offset), midDispX + x1 + 2 * (x2 - x1) * divergePoint + _getOffset(-offset, offset), midDispY + y1 + 2 * (y2 - y1) * divergePoint + _getOffset(-offset, offset), x2 + _getOffset(-offset, offset), y2 + _getOffset(-offset, offset));
  } else {
    path.bcurveTo(midDispX + x1 + (x2 - x1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispY + y1 + (y2 - y1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispX + x1 + 2 * (x2 - x1) * divergePoint + _getOffset(-halfOffset, halfOffset), midDispY + y1 + 2 * (y2 - y1) * divergePoint + _getOffset(-halfOffset, halfOffset), x2 + _getOffset(-halfOffset, halfOffset), y2 + _getOffset(-halfOffset, halfOffset));
  }

  return path;
}

function _curve(vertArray, existingPath) {
  const vertArrayLength = vertArray.length;
  let path = existingPath || new WiresPath();

  if (vertArrayLength > 3) {
    const b = [];
    const s = 1 - __curveTightness;
    path.moveTo(vertArray[1][0], vertArray[1][1]);

    for (let i = 1; i + 2 < vertArrayLength; i++) {
      const cachedVertArray = vertArray[i];
      b[0] = [cachedVertArray[0], cachedVertArray[1]];
      b[1] = [cachedVertArray[0] + (s * vertArray[i + 1][0] - s * vertArray[i - 1][0]) / 6, cachedVertArray[1] + (s * vertArray[i + 1][1] - s * vertArray[i - 1][1]) / 6];
      b[2] = [vertArray[i + 1][0] + (s * vertArray[i][0] - s * vertArray[i + 2][0]) / 6, vertArray[i + 1][1] + (s * vertArray[i][1] - s * vertArray[i + 2][1]) / 6];
      b[3] = [vertArray[i + 1][0], vertArray[i + 1][1]];
      path.bcurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);
    }
  } else if (vertArrayLength === 3) {
    path.moveTo(vertArray[0][0], vertArray[0][1]);
    path.bcurveTo(vertArray[1][0], vertArray[1][1], vertArray[2][0], vertArray[2][1], vertArray[2][0], vertArray[2][1]);
  } else if (vertArrayLength === 2) {
    path = _line(vertArray[0][0], vertArray[0][1], vertArray[1][0], vertArray[1][1], path);
  }

  return path;
}

function _ellipse(ellipseInc, cx, cy, rx, ry, offset, overlap, existingPath) {
  const radOffset = _getOffset(-0.5, 0.5) - Math.PI / 2;
  const points = [];
  points.push([_getOffset(-offset, offset) + cx + 0.9 * rx * Math.cos(radOffset - ellipseInc), _getOffset(-offset, offset) + cy + 0.9 * ry * Math.sin(radOffset - ellipseInc)]);

  for (let angle = radOffset; angle < Math.PI * 2 + radOffset - 0.01; angle = angle + ellipseInc) {
    points.push([_getOffset(-offset, offset) + cx + rx * Math.cos(angle), _getOffset(-offset, offset) + cy + ry * Math.sin(angle)]);
  }

  points.push([_getOffset(-offset, offset) + cx + rx * Math.cos(radOffset + Math.PI * 2 + overlap * 0.5), _getOffset(-offset, offset) + cy + ry * Math.sin(radOffset + Math.PI * 2 + overlap * 0.5)]);
  points.push([_getOffset(-offset, offset) + cx + 0.98 * rx * Math.cos(radOffset + overlap), _getOffset(-offset, offset) + cy + 0.98 * ry * Math.sin(radOffset + overlap)]);
  points.push([_getOffset(-offset, offset) + cx + 0.9 * rx * Math.cos(radOffset + overlap * 0.5), _getOffset(-offset, offset) + cy + 0.9 * ry * Math.sin(radOffset + overlap * 0.5)]);
  return _curve(points, existingPath);
}

function line(parent, x1, y1, x2, y2) {
  const path = _line(x1, y1, x2, y2);

  const node = svgNode('path', {
    d: path.value
  });
  parent.appendChild(node);
  return node;
}
function rectangle(parent, x, y, width, height) {
  x = x + 2;
  y = y + 2;
  width = width - 4;
  height = height - 4;

  let path = _line(x, y, x + width, y);

  path = _line(x + width, y, x + width, y + height, path);
  path = _line(x + width, y + height, x, y + height, path);
  path = _line(x, y + height, x, y, path);
  const node = svgNode('path', {
    d: path.value
  });
  parent.appendChild(node);
  return node;
}
function polygon(parent, vertices) {
  let path;
  const vCount = vertices.length;

  if (vCount > 2) {
    for (let i = 0; i < 2; i++) {
      let move = true;

      for (let i = 1; i < vCount; i++) {
        path = _continuousLine(vertices[i - 1][0], vertices[i - 1][1], vertices[i][0], vertices[i][1], move, i > 0, path);
        move = false;
      }

      path = _continuousLine(vertices[vCount - 1][0], vertices[vCount - 1][1], vertices[0][0], vertices[0][1], move, i > 0, path);
    }
  } else if (vCount === 2) {
    path = _line(vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1]);
  } else {
    path = new WiresPath();
  }

  const node = svgNode('path', {
    d: path.value
  });
  parent.appendChild(node);
  return node;
}
function ellipse(parent, x, y, width, height) {
  width = Math.max(width > 10 ? width - 4 : width - 1, 1);
  height = Math.max(height > 10 ? height - 4 : height - 1, 1);
  const ellipseInc = Math.PI * 2 / __curveStepCount;
  let rx = Math.abs(width / 2);
  let ry = Math.abs(height / 2);
  rx += _getOffset(-rx * 0.05, rx * 0.05);
  ry += _getOffset(-ry * 0.05, ry * 0.05);

  let path = _ellipse(ellipseInc, x, y, rx, ry, 1, ellipseInc * _getOffset(0.1, _getOffset(0.4, 1)));

  path = _ellipse(ellipseInc, x, y, rx, ry, 1.5, 0, path);
  const node = svgNode('path', {
    d: path.value
  });
  parent.appendChild(node);
  return node;
}

function renderHachureLines(lines) {
  const gNode = svgNode('g');
  let prevPoint = null;
  lines.forEach(l => {
    line(gNode, l[0][0], l[0][1], l[1][0], l[1][1]);

    if (prevPoint) {
      line(gNode, prevPoint[0], prevPoint[1], l[0][0], l[0][1]);
    }

    prevPoint = l[1];
  });
  return gNode;
}

const options = {
  bowing: __bowing,
  curveStepCount: __curveStepCount,
  curveTightness: __curveTightness,
  dashGap: 0,
  dashOffset: 0,
  fill: '#000',
  fillStyle: 'hachure',
  fillWeight: 1,
  hachureAngle: -41,
  hachureGap: 5,
  maxRandomnessOffset: __maxRandomnessOffset,
  roughness: __roughness,
  simplification: 1,
  stroke: '#000',
  strokeWidth: 2,
  zigzagOffset: 0
};
function hachureFill(points) {
  const lines = hachureLinesForPolygon(points, options);
  return renderHachureLines(lines);
}
function hachureEllipseFill(cx, cy, width, height) {
  const helper = {
    randOffset(x, _o) {
      return _getOffset(-x, x);
    }

  };
  const lines = hachureLinesForEllipse(helper, cx, cy, width, height, options);
  return renderHachureLines(lines);
}
function fireWindowEvent(name, detail, bubbles = true, composed = true) {
  fireEventTo(window, name, detail, bubbles, composed);
}
function fireEventTo(destination, name, detail, bubbles = true, composed = true) {
  if (destination && name) {
    const init = {
      bubbles: typeof bubbles === 'boolean' ? bubbles : true,
      composed: typeof composed === 'boolean' ? composed : true
    };

    if (detail) {
      init.detail = detail;
    }

    const CE = window.SlickCustomEvent || CustomEvent;
    destination.dispatchEvent(new CE(name, init));
  }
}

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class WiredBase extends LitElement {
  constructor() {
    super(...arguments);
    this.debug = false;
  }

  fireEvent(name, detail, bubbles = true, composed = true) {
    fireEventTo(this, name, detail, bubbles, composed);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.refreshListener) {
      this.refreshListener = this.refreshAfterResize.bind(this);
      window.addEventListener('refresh-element', this.refreshListener);
    }

    setTimeout(() => this.refreshAfterResize(), 10);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    if (this.refreshListener) {
      window.removeEventListener('refresh-element', this.refreshListener);
      delete this.refreshListener;
    }
  }

  refreshAfterResize() {
    if (this.refreshElement) {
      if (this.debug) console.log('Refreshing wired-element: ', this.tagName);
      this.refreshElement();
    }
  }

}

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredBase.prototype, "debug", void 0);

var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$1 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredCard = class WiredCard extends WiredBase {
  constructor() {
    super(...arguments);
    this.elevation = 1;
    this.padding = 10;
    this.mode = 'shrink';
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    padding: ${this.padding}px;
                    opacity: 0;
                    /*height: 200px;*/
                    /*width: 100px;*/
                    /*border: solid blue 2px;*/
                }
                
                :host(.wired-rendered) {
                    opacity: 1;
                }
                
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                svg {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
                
                #body {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 100%;
                    max-height: 100%;
                }
                div.body {
                    display: inline-block;
                    /*border: solid orange 2px;*/
                    padding: 5px;
                }
                div.overlay {
                    /*border: solid green 2px;*/
                }
                
                slot {
                    box-sizing: border-box;
                    /*border: solid purple 2px;*/
                    /*width: 100%;*/
                    /*height: 100%;*/
                }
                #aaa {
                    display: inline-block;
                    box-sizing: border-box;
                    /*border: solid red 1px;*/
                }
                #aaa.shrink {
                    width: 100%;
                    max-height: 100%;
                }
                #aaa.stretch {
                    width: 100%;
                    height: 100%;
                }
                
            </style>
            
            <div id="aaa" class="body ${this.mode}">
                <slot id="body" @slotchange="${() => this.slotChanged()}"></slot>
            </div>
            <div id="overlay" class="overlay">
                <svg id="svg"></svg>
            </div>
        `;
  }

  slotChanged() {
    if (this.debug) console.log('slot changed');
    super.requestUpdate();
  }

  updated() {
    this.refreshElement();
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    } // margin enables the lines to wobble, and not try to write outside the SVG element. (happens with large cards)


    const s = this.getBoundingClientRect(); //console.log('CARD RESIZE: ', s);

    this.padding = (s.width + s.height) / 100;
    const margin = this.padding;
    const margins = 2 * margin;
    const elevInc = margin;
    const width = s.width - margins;
    const height = s.height - margins;
    const elev = Math.min(Math.max(1, this.elevation), 5);
    const w = width + (elev - 1) * elevInc + margins;
    const h = height + (elev - 1) * elevInc + margins;
    svg.setAttribute('width', `${w}`);
    svg.setAttribute('height', `${h}`);
    rectangle(svg, margin, margin, width, height);

    for (let i = 1; i < elev; i++) {
      line(svg, i * elevInc, height + i * elevInc, width + i * elevInc, height + i * elevInc).style.opacity = `${(85 - i * 10) / 100}`;
      line(svg, width + i * elevInc, height + i * elevInc, width + i * elevInc, i * elevInc).style.opacity = `${(85 - i * 10) / 100}`;
      line(svg, i * elevInc, height + i * elevInc, width + i * elevInc, height + i * elevInc).style.opacity = `${(85 - i * 10) / 100}`;
      line(svg, width + i * elevInc, height + i * elevInc, width + i * elevInc, i * elevInc).style.opacity = `${(85 - i * 10) / 100}`;
    }

    this.classList.add('wired-rendered');
  }

};

__decorate$1([property({
  type: Number
}), __metadata$1("design:type", Object)], WiredCard.prototype, "elevation", void 0);

__decorate$1([property({
  type: Number
}), __metadata$1("design:type", Object)], WiredCard.prototype, "padding", void 0);

__decorate$1([property({
  type: String
}), __metadata$1("design:type", Object)], WiredCard.prototype, "mode", void 0);

WiredCard = __decorate$1([customElement('wired-card')], WiredCard);

var __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$2 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredPages = class WiredPages extends WiredBase {
  constructor() {
    super();
    this.page = '';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    /*width:300px;*/
                    /*height:300px;*/
                    padding: 10px;
                    box-sizing: border-box;
                }
                
                :host([hidden]) { display: none; }
            </style>
            
            <iron-pages attr-for-selected="name" selected="${this.page}">
                <slot id="pages" @slotchange="${this.pagesHaveChanged()}"></slot>
            </iron-pages>
        `;
  }

  refreshElement() {} // TODO: pages that are not visible required the resize event. ???ß


  pagesHaveChanged() {
    console.log('-------- PAGES HAVE CHANGED.');

    if (!this.slotElement && this.shadowRoot) ;
  }

  updated(changed) {
    if (changed.has('page')) {
      console.log('Page has changed.');
      this.pageChanged();
    }
  }

  pageChanged() {
    window.dispatchEvent(new Event('resize'));
  }

};

__decorate$2([property({
  type: String
}), __metadata$2("design:type", Object)], WiredPages.prototype, "page", void 0);

__decorate$2([query('slot'), __metadata$2("design:type", HTMLSlotElement)], WiredPages.prototype, "slotElement", void 0);

WiredPages = __decorate$2([customElement('wired-pages'), __metadata$2("design:paramtypes", [])], WiredPages);
let WiredPage = class WiredPage extends WiredBase {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
            <style>
                :host { 
                    display: block;
                    box-sizing: border-box;
                    //border: solid blue 1px;
                }
                
                div.body {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    //border: solid red 1px;
                    padding: 5px;
                }
                
                div.top {
                    display:inline-block;
                    width: 100%;
                    //height:80px;
                    box-sizing: border-box;
                    //border: solid green 2px;
                }
                div.middle {    
                    flex-grow: 1;
                    box-sizing: border-box;
                    //border: solid purple 1px;
                }
                div.bottom {
                    width: 100%;
                    //height: 50px;
                    display:inline-block;
                    box-sizing: border-box;
                    //border: solid blue 1px;
                }
                
                :host([hidden]) { 
                    display: none; 
                }
            </style>
    
            <div class="body">
                <div class="top">
                    <slot name="top"></slot>
                </div>
                <div class="middle">
                    <slot name="middle"></slot>
                </div>
                <div class="bottom">
                     <slot name="bottom"></slot>
                </div>            
            </div>
            
            <slot name="drawer"></slot>
        `;
  }

  refreshElement() {}

};
WiredPage = __decorate$2([customElement('wired-page'), __metadata$2("design:paramtypes", [])], WiredPage);

var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WiredApp = class WiredApp extends WiredBase {
  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: inline-block;
                    width:100%;
                    height:100%;
                    //border: solid blue 2px;
                    box-sizing: border-box;
                    overflow: auto;
                }
                :host([hidden]) { display: none; }

            </style>

            <slot></slot>
        `;
  }

  refreshElement() {}

};
WiredApp = __decorate$3([customElement('wired-app')], WiredApp);

var __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$3 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredButton = class WiredButton extends WiredBase {
  constructor() {
    super(...arguments);
    this.elevation = 1;
    this.disabled = false;
  }

  static get styles() {
    return css`

    `;
  }

  render() {
    return html`
    <style>
      :host {
        display: inline-block;
        font-family: inherit;
        cursor: pointer;
        padding: 8px 10px;
        position: relative;
        text-align: center;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        display: inline-flex;
        outline: none;
        letter-spacing: 1.25px;
        font-size: 14px;
        text-transform: uppercase;
        opacity: 0;
      }
  
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:active) path {
        transform: scale(0.97) translate(1.5%, 1.5%);
      }
  
      :host(.wired-disabled) {
        opacity: 0.6 !important;
        background: rgba(0, 0, 0, 0.07);
        cursor: default;
        pointer-events: none;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
  
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
  
      svg {
        display: block;
      }
  
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
        transition: transform 0.05s ease;
      }
    </style>
    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `;
  }

  firstUpdated() {
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.click();
      }
    });
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', this.textContent || this.innerText);
    setTimeout(() => this.requestUpdate());
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    const elev = Math.min(Math.max(1, this.elevation), 5);
    const w = s.width + (elev - 1) * 2;
    const h = s.height + (elev - 1) * 2;
    svg.setAttribute('width', `${w}`);
    svg.setAttribute('height', `${h}`);
    rectangle(svg, 0, 0, s.width, s.height);

    for (let i = 1; i < elev; i++) {
      line(svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2).style.opacity = `${(75 - i * 10) / 100}`;
      line(svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2).style.opacity = `${(75 - i * 10) / 100}`;
      line(svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2).style.opacity = `${(75 - i * 10) / 100}`;
      line(svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2).style.opacity = `${(75 - i * 10) / 100}`;
    }

    this.classList.add('wired-rendered');
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  refreshElement() {
    this.requestUpdate();
  }

};

__decorate$4([property({
  type: Number
}), __metadata$3("design:type", Object)], WiredButton.prototype, "elevation", void 0);

__decorate$4([property({
  type: Boolean,
  reflect: true
}), __metadata$3("design:type", Object)], WiredButton.prototype, "disabled", void 0);

WiredButton = __decorate$4([customElement('wired-button')], WiredButton);

var __decorate$5 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$4 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredCheckbox = class WiredCheckbox extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: block;
      font-family: inherit;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-checkbox-icon-color, currentColor);
      stroke-width: 0.7;
    }
    `;
  }

  render() {
    return html`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `;
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  toggleCheck() {
    this.checked = !(this.checked || false);
    this.fireEvent('change', {
      checked: this.checked
    });
  }

  firstUpdated() {
    this.setAttribute('role', 'checkbox');
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleCheck();
      }
    });
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = {
      width: 24,
      height: 24
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 0, 0, s.width, s.height);
    const checkpaths = [];
    checkpaths.push(line(svg, s.width * 0.3, s.height * 0.4, s.width * 0.5, s.height * 0.7));
    checkpaths.push(line(svg, s.width * 0.5, s.height * 0.7, s.width + 5, -5));
    checkpaths.forEach(d => {
      d.style.strokeWidth = `${2.5}`;
    });

    if (this.checked) {
      checkpaths.forEach(d => {
        d.style.display = '';
      });
    } else {
      checkpaths.forEach(d => {
        d.style.display = 'none';
      });
    }

    this.classList.add('wired-rendered');
  }

  refreshElement() {}

};

__decorate$5([property({
  type: Boolean
}), __metadata$4("design:type", Object)], WiredCheckbox.prototype, "checked", void 0);

__decorate$5([property({
  type: Boolean,
  reflect: true
}), __metadata$4("design:type", Object)], WiredCheckbox.prototype, "disabled", void 0);

WiredCheckbox = __decorate$5([customElement('wired-checkbox')], WiredCheckbox);

var __decorate$6 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$5 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredItem = class WiredItem extends WiredBase {
  constructor() {
    super(...arguments);
    this.value = '';
    this.name = '';
    this.selected = false;
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    font-size: 14px;
                    text-align: left;
                }
                button {
                    cursor: pointer;
                    outline: none;
                    overflow: hidden;
                    color: inherit;
                    user-select: none;
                    position: relative;
                    font-family: inherit;
                    text-align: inherit;
                    font-size: inherit;
                    letter-spacing: 1.25px;
                    padding: 1px 10px;
                    min-height: 36px;
                    text-transform: inherit;
                    background: none;
                    border: none;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    width: 100%;
                    box-sizing: border-box;
                    white-space: nowrap;
                }
                button.selected {
                    color: var(--wired-item-selected-color, #fff);
                }
                button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: currentColor;
                    opacity: 0;
                }
                button span {
                    display: inline-block;
                    transition: transform 0.2s ease;
                    position: relative;
                }
                button:active span {
                    transform: scale(1.02);
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    display: none;
                }
                button.selected .overlay {
                    display: block;
                }
                svg {
                    display: block;
                }
                path {
                    stroke: var(--wired-item-selected-bg, #000);
                    stroke-width: 2.75;
                    fill: transparent;
                    transition: transform 0.05s ease;
                }
                @media (hover: hover) {
                    button:hover::before {
                        opacity: 0.05;
                    }
                }
            </style>
            <button class="${this.selected ? 'selected' : ''}">
                <div class="overlay">
                    <svg></svg>
                </div>
                <span>
                    <slot></slot>
                </span>
            </button>
        `;
  }

  firstUpdated() {
    if (this.selected) {
      setTimeout(() => this.requestUpdate());
    }
  }

  updated() {
    this.refreshElement();
  }

  refreshElement() {
    if (this.svg) {
      while (this.svg.hasChildNodes()) {
        this.svg.removeChild(this.svg.lastChild);
      }

      const s = this.getBoundingClientRect();
      this.svg.setAttribute('width', `${s.width}`);
      this.svg.setAttribute('height', `${s.height}`);
      const g = hachureFill([[0, 0], [s.width, 0], [s.width, s.height], [0, s.height]]);
      this.svg.appendChild(g);
    }
  }

};

__decorate$6([property(), __metadata$5("design:type", Object)], WiredItem.prototype, "value", void 0);

__decorate$6([property(), __metadata$5("design:type", Object)], WiredItem.prototype, "name", void 0);

__decorate$6([property({
  type: Boolean
}), __metadata$5("design:type", Object)], WiredItem.prototype, "selected", void 0);

__decorate$6([query('svg'), __metadata$5("design:type", SVGSVGElement)], WiredItem.prototype, "svg", void 0);

WiredItem = __decorate$6([customElement('wired-item')], WiredItem);

var __decorate$7 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$6 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredCombo = class WiredCombo extends WiredBase {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.cardShowing = false;
    this.itemNodes = [];
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }
    
    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      white-space: nowrap;
      position: relative;
    }
  
    .inline {
      display: inline-block;
      vertical-align: top
    }
  
    #textPanel {
      min-width: 90px;
      min-height: 18px;
      padding: 8px;
    }
  
    #dropPanel {
      width: 34px;
      cursor: pointer;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    #card {
      position: absolute;
      background: var(--wired-combo-popup-bg, white);
      z-index: 1;
      box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
    }

    ::slotted(wired-item) {
      display: block;
    }
    `;
  }

  render() {
    return html`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value && this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}"
      style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `;
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  firstUpdated() {
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.refreshSelection();
    this.addEventListener('blur', () => {
      if (this.cardShowing) {
        this.setCardShowing(false);
      }
    });
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
        case 38:
          event.preventDefault();
          this.selectPrevious();
          break;

        case 39:
        case 40:
          event.preventDefault();
          this.selectNext();
          break;

        case 27:
          event.preventDefault();

          if (this.cardShowing) {
            this.setCardShowing(false);
          }

          break;

        case 13:
          event.preventDefault();
          this.setCardShowing(!this.cardShowing);
          break;

        case 32:
          event.preventDefault();

          if (!this.cardShowing) {
            this.setCardShowing(true);
          }

          break;
      }
    });
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    this.refreshElement(); // aria

    this.setAttribute('aria-expanded', `${this.cardShowing}`);

    if (!this.itemNodes.length) {
      this.itemNodes = [];
      const nodes = this.shadowRoot.getElementById('slot').assignedNodes();

      if (nodes && nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          const element = nodes[i];

          if (element.tagName === 'WIRED-ITEM') {
            element.setAttribute('role', 'option');
            this.itemNodes.push(element);
          }
        }
      }
    }
  }

  refreshSelection() {
    if (this.lastSelectedItem) {
      this.lastSelectedItem.selected = false;
      this.lastSelectedItem.removeAttribute('aria-selected');
    }

    const slot = this.shadowRoot.getElementById('slot');
    const nodes = slot.assignedNodes();

    if (nodes) {
      let selectedItem = null;

      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-ITEM') {
          const value = element.value || '';

          if (this.selected && value === this.selected) {
            selectedItem = element;
            break;
          }
        }
      }

      this.lastSelectedItem = selectedItem || undefined;

      if (this.lastSelectedItem) {
        this.lastSelectedItem.selected = true;
        this.lastSelectedItem.setAttribute('aria-selected', 'true');
      }

      if (selectedItem) {
        this.value = {
          value: selectedItem.value || '',
          text: selectedItem.textContent || ''
        };
      } else {
        this.value = undefined;
      }
    }
  }

  setCardShowing(showing) {
    this.cardShowing = showing;
    const card = this.shadowRoot.getElementById('card');
    card.style.display = showing ? '' : 'none';

    if (showing) {
      setTimeout(() => {
        card.requestUpdate();
        const nodes = this.shadowRoot.getElementById('slot').assignedNodes().filter(d => {
          return d.nodeType === Node.ELEMENT_NODE;
        });
        nodes.forEach(n => {
          const e = n;

          if (e.requestUpdate) {
            e.requestUpdate();
          }
        });
      }, 10);
    }

    this.setAttribute('aria-expanded', `${this.cardShowing}`);
  }

  onItemClick(event) {
    event.stopPropagation();
    this.selected = event.target.value;
    this.refreshSelection();
    this.fireSelected();
    setTimeout(() => {
      this.setCardShowing(false);
    });
  }

  fireSelected() {
    this.fireEvent('selected', {
      selected: this.selected
    });
  }

  selectPrevious() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index === 0) {
        index = list.length - 1;
      } else {
        index--;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  selectNext() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index >= list.length - 1) {
        index = 0;
      } else {
        index++;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  onCombo(event) {
    event.stopPropagation();
    this.setCardShowing(!this.cardShowing);
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.shadowRoot.getElementById('container').getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    const textBounds = this.shadowRoot.getElementById('textPanel').getBoundingClientRect();
    this.shadowRoot.getElementById('dropPanel').style.minHeight = textBounds.height + 'px';
    rectangle(svg, 0, 0, textBounds.width, textBounds.height);
    const dropx = textBounds.width - 4;
    rectangle(svg, dropx, 0, 34, textBounds.height);
    const dropOffset = Math.max(0, Math.abs((textBounds.height - 24) / 2));
    const poly = polygon(svg, [[dropx + 8, 5 + dropOffset], [dropx + 26, 5 + dropOffset], [dropx + 17, dropOffset + Math.min(textBounds.height, 18)]]);
    poly.style.fill = 'currentColor';
    poly.style.pointerEvents = this.disabled ? 'none' : 'auto';
    poly.style.cursor = 'pointer';
    this.classList.add('wired-rendered');
  }

};

__decorate$7([property({
  type: Object
}), __metadata$6("design:type", Object)], WiredCombo.prototype, "value", void 0);

__decorate$7([property({
  type: String
}), __metadata$6("design:type", String)], WiredCombo.prototype, "selected", void 0);

__decorate$7([property({
  type: Boolean,
  reflect: true
}), __metadata$6("design:type", Object)], WiredCombo.prototype, "disabled", void 0);

WiredCombo = __decorate$7([customElement('wired-combo')], WiredCombo);

var __decorate$8 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$7 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredDrawer = class WiredDrawer extends WiredBase {
  constructor() {
    super();
    this.align = 'left';
    if (this.debug) console.log('Constructing the drawer.'); // if (this.shadowRoot) {
    //     this.drawer = this.shadowRoot.getElementById('drawer') as AppDrawerElement;
    //     if (!this.drawer) {
    //         console.log('Could not find the drawer.');
    //     }
    // } else {
    //     console.log('There is no shadow root.');
    // }
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (this.shadowRoot) {
        this.drawer = this.shadowRoot.getElementById('drawer');
        if (this.debug) console.log('DRAWER: ', this.drawer);

        if (!this.drawer) {
          console.log('Could not find the drawer.');
        }
      } else {
        console.log('There is no shadow root.');
      }
    }, 2000);
  }

  open() {
    if (this.drawer) {
      this.drawer.open();
    } else {
      console.log('There is no drawer.');
    }
  }

  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }
              
                wired-card {
                    padding: 5px;
                    box-sizing: border-box; 
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
                wired-card > slot {
                    display: block;
                    padding: 20px;
                }
                app-drawer {
                    z-index: 1000;
                }
            </style>
            <app-drawer id="drawer" swipe-open align="${this.align}">
                <wired-card>
                    <slot></slot>
                </wired-card>
            </app-drawer>
        `;
  }

  refreshElement() {}

};

__decorate$8([property({
  type: String
}), __metadata$7("design:type", Object)], WiredDrawer.prototype, "align", void 0);

WiredDrawer = __decorate$8([customElement('wired-drawer'), __metadata$7("design:paramtypes", [])], WiredDrawer);

var __decorate$9 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$8 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredFab = class WiredFab extends WiredBase {
  constructor() {
    super(...arguments);
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      padding: 16px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box !important;
      outline: none;
      color: #fff;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      pointer-events: none;
    }
  
    :host(:active) mwc-icon {
      opacity: 1;
      transform: scale(1.15);
    }

    :host(:focus) mwc-icon {
      opacity: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-fab-bg-color, #018786);
      stroke-width: 3;
      fill: transparent;
    }
  
    mwc-icon {
      position: relative;
      font-size: var(--wired-icon-size, 24px);
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0.85;
    }
    `;
  }

  render() {
    return html`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `;
  }

  firstUpdated() {
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.click();
      }
    });
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', this.textContent || this.innerText);
    setTimeout(() => this.requestUpdate());
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    this.refreshElement();
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    const min = Math.min(s.width, s.height);
    svg.setAttribute('width', `${min}`);
    svg.setAttribute('height', `${min}`);
    const g = hachureEllipseFill(min / 2, min / 2, min, min);
    svg.appendChild(g);
    this.classList.add('wired-rendered');
  }

};

__decorate$9([property({
  type: Boolean,
  reflect: true
}), __metadata$8("design:type", Object)], WiredFab.prototype, "disabled", void 0);

WiredFab = __decorate$9([customElement('wired-fab')], WiredFab);

var __decorate$a = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$9 = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredHelper = class WiredHelper extends LitElement {
  constructor() {
    super(...arguments);
    this.debug = false;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.resizeListener) {
      this.resizeListener = this.dispatchRefreshEvent.bind(this);
      window.addEventListener('resize', this.resizeListener);
    }

    setTimeout(() => this.dispatchRefreshEvent(), 10);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      delete this.resizeListener;
    }
  }

  dispatchRefreshEvent() {
    if (this.debug) console.log('Resize has occurred, and element refresh is required.');
    fireWindowEvent('refresh-element');
  }

  render() {
    return html`
            <style>
                :host {
                    box-sizing: border-box;
                    display: block;
                    padding: 15px;
                }
                :host([hidden]) { display: none; }
                
                button {
                    clear: both;
                    float: left;
                    border: solid lightgrey 1px;
                }
            </style>
            ${this.debug ? html`<button @click="${() => this.refresh()}">Refresh</button>` : ''}
        `;
  }

  refresh() {
    if (this.debug) console.log('refreshing element render');
    fireWindowEvent('refresh-element');
  }

  refreshElement() {}

};

__decorate$a([property({
  type: Boolean
}), __metadata$9("design:type", Object)], WiredHelper.prototype, "debug", void 0);

WiredHelper = __decorate$a([customElement('wired-helper')], WiredHelper);

var __decorate$b = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$a = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredIconButton = class WiredIconButton extends WiredBase {
  constructor() {
    super(...arguments);
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      padding: 8px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box !important;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      pointer-events: none;
    }
  
    :host(:active) path {
      transform: scale(0.96) translate(2%, 2%);
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: var(--wired-icon-bg-color, transparent);
      transition: transform 0.05s ease;
    }
  
    mwc-icon {
      position: relative;
      font-size: var(--wired-icon-size, 24px);
    }
    `;
  }

  render() {
    return html`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `;
  }

  firstUpdated() {
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.click();
      }
    });
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', this.textContent || this.innerText);
    setTimeout(() => this.requestUpdate());
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    const min = Math.min(s.width, s.height);
    svg.setAttribute('width', `${min}`);
    svg.setAttribute('height', `${min}`);
    ellipse(svg, min / 2, min / 2, min, min);
    this.classList.add('wired-rendered');
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  refreshElement() {}

};

__decorate$b([property({
  type: Boolean,
  reflect: true
}), __metadata$a("design:type", Object)], WiredIconButton.prototype, "disabled", void 0);

WiredIconButton = __decorate$b([customElement('wired-icon-button')], WiredIconButton);

var __decorate$c = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$b = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredInput = class WiredInput extends WiredBase {
  constructor() {
    super(...arguments);
    this.placeholder = '';
    this.type = 'text';
    this.autocomplete = '';
    this.autocapitalize = '';
    this.autocorrect = '';
    this.disabled = false;
    this.required = false;
    this.autofocus = false;
    this.readonly = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.resizeHandler) {
      this.resizeHandler = this.debounce(this.refreshElement.bind(this), 200, false, this);
      window.addEventListener('resize', this.resizeHandler);
    }

    setTimeout(() => this.refreshElement());
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      delete this.resizeHandler;
    }
  }

  debounce(func, wait, immediate, context) {
    let timeout = 0;
    return () => {
      const args = arguments;

      const later = () => {
        timeout = 0;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    padding: 5px;
                    font-family: sans-serif;
                    width: 150px;
                    outline: none;
                    opacity: 0;
                }
                
                :host(.wired-rendered) {
                    opacity: 1;
                }
                
                :host(.wired-disabled) {
                    opacity: 0.6 !important;
                    cursor: default;
                    pointer-events: none;
                }
                
                :host(.wired-disabled) svg {
                    background: rgba(0, 0, 0, 0.07);
                }
                
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                svg {
                    display: block;
                }
                
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
                
                input {
                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                    outline: none;
                    border: none;
                    font-family: inherit;
                    font-size: inherit;
                    font-weight: inherit;
                    color: inherit;
                    padding: 6px;
                }            
            </style>
            <input id="txt" name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
                ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
                maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
                size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" @change="${this.onChange}">
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
        `;
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  get input() {
    if (this.shadowRoot) {
      return this.shadowRoot.getElementById('txt');
    }

    return null;
  }

  get value() {
    const input = this.input;
    return input && input.value || '';
  }

  set value(v) {
    if (this.shadowRoot) {
      const input = this.input;

      if (input) {
        input.value = v;
      }
    } else {
      this.pendingValue = v;
    }
  }

  firstUpdated() {
    this.value = this.value || this.getAttribute('value') || '';
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    this.refreshElement();
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    const elev = 1;
    const margin = 2;
    const margins = margin * 2;
    const height = s.height - margins - elev;
    const width = s.width - margins - elev;
    svg.setAttribute('width', `${s.width + margins}`);
    svg.setAttribute('height', `${s.height + margins}`);
    rectangle(svg, margin, margin, width, height);

    if (typeof this.pendingValue !== 'undefined') {
      this.input.value = this.pendingValue;
      delete this.pendingValue;
    }

    this.classList.add('wired-rendered');
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }
  }

  onChange(event) {
    event.stopPropagation();
    this.fireEvent(event.type, {
      sourceEvent: event
    });
  }

};

__decorate$c([property({
  type: String
}), __metadata$b("design:type", Object)], WiredInput.prototype, "placeholder", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", String)], WiredInput.prototype, "name", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", String)], WiredInput.prototype, "min", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", String)], WiredInput.prototype, "max", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", String)], WiredInput.prototype, "step", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", Object)], WiredInput.prototype, "type", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", Object)], WiredInput.prototype, "autocomplete", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", Object)], WiredInput.prototype, "autocapitalize", void 0);

__decorate$c([property({
  type: String
}), __metadata$b("design:type", Object)], WiredInput.prototype, "autocorrect", void 0);

__decorate$c([property({
  type: Boolean,
  reflect: true
}), __metadata$b("design:type", Object)], WiredInput.prototype, "disabled", void 0);

__decorate$c([property({
  type: Boolean
}), __metadata$b("design:type", Object)], WiredInput.prototype, "required", void 0);

__decorate$c([property({
  type: Boolean
}), __metadata$b("design:type", Object)], WiredInput.prototype, "autofocus", void 0);

__decorate$c([property({
  type: Boolean
}), __metadata$b("design:type", Object)], WiredInput.prototype, "readonly", void 0);

__decorate$c([property({
  type: Number
}), __metadata$b("design:type", Number)], WiredInput.prototype, "minlength", void 0);

__decorate$c([property({
  type: Number
}), __metadata$b("design:type", Number)], WiredInput.prototype, "maxlength", void 0);

__decorate$c([property({
  type: Number
}), __metadata$b("design:type", Number)], WiredInput.prototype, "size", void 0);

WiredInput = __decorate$c([customElement('wired-input')], WiredInput);

var __decorate$d = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WiredLayout = class WiredLayout extends WiredBase {
  render() {
    // noinspection CssUnresolvedCustomProperty
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: var(--wired-layout-flex-direction, row);
                    width: 100%;
                    justify-content: var(--wired-layout-justify-content, space-between);
                }
                :host([hidden]) { display: none; }
            </style>
            <slot></slot>
            <slot name="left"></slot>
            <slot name="center"></slot>
            <slot name="right"></slot>
        `;
  }

  refreshElement() {}

};
WiredLayout = __decorate$d([customElement('wired-layout')], WiredLayout);

var __decorate$e = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$c = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredListbox = class WiredListbox extends WiredBase {
  constructor() {
    super(...arguments);
    this.horizontal = false;
    this.itemNodes = [];
    this.itemClickHandler = this.onItemClick.bind(this);
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    font-family: inherit;
                    position: relative;
                    padding: 5px;
                    outline: none;
                    opacity: 0;
                }
            
                :host(.wired-rendered) {
                    opacity: 1;
                }
            
                :host(:focus) path {
                    stroke-width: 1.5;
                }
              
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
              
                svg {
                    display: block;
                }
              
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
            
                ::slotted(wired-item) {
                    display: block;
                }
            
                :host(.wired-horizontal) ::slotted(wired-item) {
                    display: inline-block;
                }
            </style>
            <slot id="slot" @slotchange="${() => this.requestUpdate()}"></slot>
            <div class="overlay">
              <svg id="svg"></svg>
            </div>
        `;
  }

  firstUpdated() {
    this.setAttribute('role', 'listbox');
    this.tabIndex = +(this.getAttribute('tabindex') || 0);
    this.refreshSelection();
    this.addEventListener('click', this.itemClickHandler);
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
        case 38:
          event.preventDefault();
          this.selectPrevious();
          break;

        case 39:
        case 40:
          event.preventDefault();
          this.selectNext();
          break;
      }
    });
  }

  updated() {
    this.refreshElement();
  }

  addNodes(nodes) {
    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-ITEM') {
          element.setAttribute('role', 'option');
          this.itemNodes.push(element);
          if (this.debug) console.log('Added WiredItem: ', element);
        } else if (element.tagName === 'SLOT') {
          console.log('found slot: ', element);
          const nodes = element.assignedNodes();
          this.addNodes(nodes);
        }
      }
    }
  }

  onItemClick(event) {
    event.stopPropagation();
    this.selected = event.target.value;
    this.refreshSelection();
    this.fireSelected();
  }

  refreshSelection() {
    if (this.lastSelectedItem) {
      this.lastSelectedItem.selected = false;
      this.lastSelectedItem.removeAttribute('aria-selected');
    }

    const slot = this.shadowRoot.getElementById('slot');
    const nodes = slot.assignedNodes();

    if (nodes) {
      let selectedItem = null;

      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-ITEM') {
          const value = element.value || '';

          if (this.selected && value === this.selected) {
            selectedItem = element;
            break;
          }
        }
      }

      this.lastSelectedItem = selectedItem || undefined;

      if (this.lastSelectedItem) {
        this.lastSelectedItem.selected = true;
        this.lastSelectedItem.setAttribute('aria-selected', 'true');
      }

      if (selectedItem) {
        this.value = {
          value: selectedItem.value || '',
          text: selectedItem.textContent || ''
        };
      } else {
        this.value = undefined;
      }
    }
  }

  fireSelected() {
    this.fireEvent('selected', {
      selected: this.selected
    });
  }

  selectPrevious() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index === 0) {
        index = list.length - 1;
      } else {
        index--;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  selectNext() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index >= list.length - 1) {
        index = 0;
      } else {
        index++;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 0, 0, s.width, s.height);
    this.classList.add('wired-rendered');

    if (this.horizontal) {
      this.classList.add('wired-horizontal');
    } else {
      this.classList.remove('wired-horizontal');
    }

    if (!this.itemNodes.length) {
      this.itemNodes = [];
      const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
      this.addNodes(nodes);
    }
  }

};

__decorate$e([property({
  type: Object
}), __metadata$c("design:type", Object)], WiredListbox.prototype, "value", void 0);

__decorate$e([property({
  type: String
}), __metadata$c("design:type", String)], WiredListbox.prototype, "selected", void 0);

__decorate$e([property({
  type: Boolean
}), __metadata$c("design:type", Object)], WiredListbox.prototype, "horizontal", void 0);

WiredListbox = __decorate$e([customElement('wired-listbox')], WiredListbox);

var __decorate$f = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$d = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredMenu = class WiredMenu extends WiredBase {
  constructor() {
    super();
    this.hide();
  }

  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                }
                
                :host([hidden]) { display: none; }
                
                ::slotted(wired-item) {
                    clear:both;
                    float: left;
                    width: 100%;
                    text-align: center;
                    --wired-item-selected-bg; black;
                }
            </style>
              <wired-card>
                <slot id="menu-items" @slotchange="${this.menuItemAdded()}"></slot>
              </wired-card>
        `;
  }

  menuItemAdded() {
    // TODO: review if listeners need to be removed from previous elements.
    console.log('Menu items changed.');
    setTimeout(() => {
      if (this.shadowRoot) {
        const slot = this.shadowRoot.getElementById('menu-items');

        if (slot) {
          const assigned = slot.assignedNodes();
          assigned.forEach(wi => {
            wi.addEventListener('click', () => {
              const item = wi;
              console.log('selected: ', item.value);
              this.fireEvent('selected', {
                selected: item.value
              });
              item.selected = true;
              setTimeout(() => {
                item.selected = false;
                this.hide();
              }, 300);
            });
          });
        }
      }
    }, 1000);
  }

  hide() {
    console.log('hiding menu');
    this.style.display = 'none';
  }

  show() {
    console.log('showing menu');
    this.style.display = 'block';
  }

  refreshElement() {}

};
WiredMenu = __decorate$f([customElement('wired-menu'), __metadata$d("design:paramtypes", [])], WiredMenu);

var __decorate$g = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$e = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredProgress = class WiredProgress extends WiredBase {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.percentage = false;
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    width: 400px;
                    height: 42px;
                    font-family: sans-serif;
                    opacity: 0;
                }
            
                :host(.wired-rendered) {
                    opacity: 1;
                }
              
                svg {
                    display: block;
                }
              
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
              
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
              
                .labelContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
              
                .progressLabel {
                    color: var(--wired-progress-label-color, #000);
                    font-size: var(--wired-progress-font-size, 14px);
                    background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
                    padding: 2px 6px;
                    border-radius: 4px;
                    letter-spacing: 1.25px;
                }
              
                .progbox path {
                    stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
                    stroke-width: 2.75;
                    fill: none;
                }    
            </style>
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
            <div class="overlay labelContainer">
                <div class="progressLabel">${this.getProgressLabel()}</div>
            </div>
        `;
  }

  getProgressLabel() {
    if (this.percentage) {
      if (this.max === this.min) {
        return '%';
      } else {
        const pct = Math.floor((this.value - this.min) / (this.max - this.min) * 100);
        return pct + '%';
      }
    } else {
      return '' + this.value;
    }
  }

  updated() {
    this.refreshElement();
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);

    if (!this.box) {
      this.box = rectangle(svg, 0, 0, s.width, s.height);
    } else {
      svg.appendChild(this.box);
    }

    let pct = 0;

    if (this.max > this.min) {
      pct = (this.value - this.min) / (this.max - this.min);
      const progWidth = s.width * Math.max(0, Math.min(pct, 100));
      const progBox = hachureFill([[0, 0], [progWidth, 0], [progWidth, s.height], [0, s.height]]);
      svg.appendChild(progBox);
      progBox.classList.add('progbox');
    }

    this.classList.add('wired-rendered');
  }

};

__decorate$g([property({
  type: Number
}), __metadata$e("design:type", Object)], WiredProgress.prototype, "value", void 0);

__decorate$g([property({
  type: Number
}), __metadata$e("design:type", Object)], WiredProgress.prototype, "min", void 0);

__decorate$g([property({
  type: Number
}), __metadata$e("design:type", Object)], WiredProgress.prototype, "max", void 0);

__decorate$g([property({
  type: Boolean
}), __metadata$e("design:type", Object)], WiredProgress.prototype, "percentage", void 0);

WiredProgress = __decorate$g([customElement('wired-progress')], WiredProgress);

var __decorate$h = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$f = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredRadio = class WiredRadio extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
    this.iconsize = 24;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
      padding: 5px;
      font-family: inherit;
      width: 150px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-radio-icon-color, currentColor);
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .filledPath {
      fill: var(--wired-radio-icon-color, currentColor);
    }
    `;
  }

  render() {
    return html`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `;
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  toggleCheck() {
    this.checked = !(this.checked || false);
    this.fireEvent('change', {
      checked: this.checked
    });
  }

  firstUpdated() {
    this.setAttribute('role', 'checkbox');
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleCheck();
      }
    });
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    this.dot = undefined;
    const s = {
      width: this.iconsize || 24,
      height: this.iconsize || 24
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    ellipse(svg, s.width / 2, s.height / 2, s.width, s.height);
    const iw = Math.max(s.width * 0.6, 5);
    const ih = Math.max(s.height * 0.6, 5);
    this.dot = ellipse(svg, s.width / 2, s.height / 2, iw, ih);
    this.dot.classList.add('filledPath');
    this.dot.style.display = this.checked ? '' : 'none';
    this.classList.add('wired-rendered');
  }

  refreshElement() {}

};

__decorate$h([property({
  type: Boolean
}), __metadata$f("design:type", Object)], WiredRadio.prototype, "checked", void 0);

__decorate$h([property({
  type: Boolean,
  reflect: true
}), __metadata$f("design:type", Object)], WiredRadio.prototype, "disabled", void 0);

__decorate$h([property({
  type: String
}), __metadata$f("design:type", String)], WiredRadio.prototype, "name", void 0);

__decorate$h([property({
  type: Number
}), __metadata$f("design:type", Object)], WiredRadio.prototype, "iconsize", void 0);

WiredRadio = __decorate$h([customElement('wired-radio')], WiredRadio);

var __decorate$i = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$g = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredRadioGroup = class WiredRadioGroup extends WiredBase {
  constructor() {
    super(...arguments);
    this.radioNodes = [];
    this.checkListener = this.handleChecked.bind(this);
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `;
  }

  render() {
    return html`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this.checkListener);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('checked', this.checkListener);
  }

  handleChecked(event) {
    const checked = event.detail.checked;
    const item = event.target;
    const name = item.name || '';

    if (!checked) {
      item.checked = true;
    } else {
      this.selected = checked && name || '';
      this.fireSelected();
    }
  }

  fireSelected() {
    this.fireEvent('selected', {
      selected: this.selected
    });
  }

  slotChange() {
    this.requestUpdate();
  }

  firstUpdated() {
    this.setAttribute('role', 'radiogroup');
    this.tabIndex = +(this.getAttribute('tabindex') || 0);
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
        case 38:
          event.preventDefault();
          this.selectPrevious();
          break;

        case 39:
        case 40:
          event.preventDefault();
          this.selectNext();
          break;
      }
    });
  }

  updated() {
    const slot = this.shadowRoot.getElementById('slot');
    const nodes = slot.assignedNodes();
    this.radioNodes = [];

    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-RADIO') {
          this.radioNodes.push(element);
          const name = element.name || '';

          if (this.selected && name === this.selected) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        }
      }
    }
  }

  selectPrevious() {
    const list = this.radioNodes;

    if (list.length) {
      let radio = null;
      let index = -1;

      if (this.selected) {
        for (let i = 0; i < list.length; i++) {
          const n = list[i];

          if (n.name === this.selected) {
            index = i;
            break;
          }
        }

        if (index < 0) {
          radio = list[0];
        } else {
          index--;

          if (index < 0) {
            index = list.length - 1;
          }

          radio = list[index];
        }
      } else {
        radio = list[0];
      }

      if (radio) {
        radio.focus();
        this.selected = radio.name;
        this.fireSelected();
      }
    }
  }

  selectNext() {
    const list = this.radioNodes;

    if (list.length) {
      let radio = null;
      let index = -1;

      if (this.selected) {
        for (let i = 0; i < list.length; i++) {
          const n = list[i];

          if (n.name === this.selected) {
            index = i;
            break;
          }
        }

        if (index < 0) {
          radio = list[0];
        } else {
          index++;

          if (index >= list.length) {
            index = 0;
          }

          radio = list[index];
        }
      } else {
        radio = list[0];
      }

      if (radio) {
        radio.focus();
        this.selected = radio.name;
        this.fireSelected();
      }
    }
  }

  refreshElement() {}

};

__decorate$i([property({
  type: String
}), __metadata$g("design:type", String)], WiredRadioGroup.prototype, "selected", void 0);

WiredRadioGroup = __decorate$i([customElement('wired-radio-group')], WiredRadioGroup);

var __decorate$j = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$h = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredSlider = class WiredSlider extends WiredBase {
  constructor() {
    super(...arguments);
    this._value = 0;
    this.min = 0;
    this.max = 100;
    this.knobradius = 10;
    this.disabled = false;
    this.step = 1;
    this.barWidth = 0;
    this.intermediateValue = this.min;
    this.pct = 0;
    this.startx = 0;
    this.dragging = false;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
      width: 300px;
      height: 40px;
      outline: none;
      box-sizing: border-box;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 5px;
    }
  
    :host(.wired-disabled) .knob {
      pointer-events: none !important;
    }
  
    :host(:focus) .knob {
      cursor: move;
      stroke: var(--wired-slider-knob-outline-color, #000);
      fill-opacity: 0.8;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .knob {
      pointer-events: auto;
      fill: var(--wired-slider-knob-zero-color, gray);
      stroke: var(--wired-slider-knob-zero-color, gray);
      transition: transform 0.15s ease;
      cursor: pointer;
    }
  
    .hasValue {
      fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
      stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
    }
  
    .bar {
      stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
    }
    `;
  }

  render() {
    return html`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this.setValue(v, true);
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  firstUpdated() {
    this.refreshElement();
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }
  }

  setAriaValue() {
    this.setAttribute('aria-valuenow', `${this.value}`);
  }

  setValue(v, skipEvent = false) {
    this._value = v;
    this.setAriaValue();
    this.onValueChange();

    if (!skipEvent) {
      this.fireEvent('change', {
        value: this.intermediateValue
      });
    }
  }

  incremenent() {
    const newValue = Math.min(this.max, Math.round(this.value + this.step));

    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }

  decrement() {
    const newValue = Math.max(this.min, Math.round(this.value - this.step));

    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }

  onValueChange() {
    if (!this.knob) {
      return;
    }

    let pct = 0;

    if (this.max > this.min) {
      pct = Math.min(1, Math.max((this.value - this.min) / (this.max - this.min), 0));
    }

    this.pct = pct;

    if (pct) {
      this.knob.classList.add('hasValue');
    } else {
      this.knob.classList.remove('hasValue');
    }

    const knobOffset = pct * this.barWidth;
    this.knobGroup.style.transform = `translateX(${Math.round(knobOffset)}px)`;
  }

  knobdown(event) {
    this.knobExpand(true);
    event.preventDefault();
    this.focus();
  }

  resetKnob() {
    this.knobExpand(false);
  }

  knobExpand(value) {
    if (this.knob) {
      if (value) {
        this.knob.classList.add('expanded');
      } else {
        this.knob.classList.remove('expanded');
      }
    }
  }

  onTrack(event) {
    event.stopPropagation();

    switch (event.detail.state) {
      case 'start':
        this.trackStart();
        break;

      case 'track':
        this.trackX(event);
        break;

      case 'end':
        this.trackEnd();
        break;
    }
  }

  trackStart() {
    this.intermediateValue = this.value;
    this.startx = this.pct * this.barWidth;
    this.dragging = true;
  }

  trackX(event) {
    if (!this.dragging) {
      this.trackStart();
    }

    const dx = event.detail.dx || 0;
    const newX = Math.max(Math.min(this.startx + dx, this.barWidth), 0);
    this.knobGroup.style.transform = `translateX(${Math.round(newX)}px)`;
    const newPct = newX / this.barWidth;
    this.intermediateValue = this.min + newPct * (this.max - this.min);
  }

  trackEnd() {
    this.dragging = false;
    this.resetKnob();
    this.setValue(this.intermediateValue);
    this.pct = (this.value - this.min) / (this.max - this.min);
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    const radius = this.knobradius || 10;
    this.barWidth = s.width - 2 * radius;
    this.bar = line(svg, radius, s.height / 2, s.width - radius, s.height / 2);
    this.bar.classList.add('bar');
    this.knobGroup = svgNode('g');
    svg.appendChild(this.knobGroup);
    this.knob = ellipse(this.knobGroup, radius, s.height / 2, radius * 2, radius * 2);
    this.knob.classList.add('knob');
    this.onValueChange();
    this.classList.add('wired-rendered'); // aria

    this.setAttribute('role', 'slider');
    this.setAttribute('aria-valuemax', `${this.max}`);
    this.setAttribute('aria-valuemin', `${this.min}`);
    this.setAriaValue(); // attach events

    addListener(this.knob, 'down', event => {
      if (!this.disabled) {
        this.knobdown(event);
      }
    });
    addListener(this.knob, 'up', () => {
      if (!this.disabled) {
        this.resetKnob();
      }
    });
    addListener(this.knob, 'track', event => {
      if (!this.disabled) {
        this.onTrack(event);
      }
    });
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 38:
        case 39:
          this.incremenent();
          break;

        case 37:
        case 40:
          this.decrement();
          break;

        case 36:
          this.setValue(this.min);
          break;

        case 35:
          this.setValue(this.max);
          break;
      }
    });
  }

};

__decorate$j([property({
  type: Number
}), __metadata$h("design:type", Object)], WiredSlider.prototype, "_value", void 0);

__decorate$j([property({
  type: Number
}), __metadata$h("design:type", Object)], WiredSlider.prototype, "min", void 0);

__decorate$j([property({
  type: Number
}), __metadata$h("design:type", Object)], WiredSlider.prototype, "max", void 0);

__decorate$j([property({
  type: Number
}), __metadata$h("design:type", Object)], WiredSlider.prototype, "knobradius", void 0);

__decorate$j([property({
  type: Boolean,
  reflect: true
}), __metadata$h("design:type", Object)], WiredSlider.prototype, "disabled", void 0);

WiredSlider = __decorate$j([customElement('wired-slider')], WiredSlider);

var __decorate$k = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$i = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredSpinner = class WiredSpinner extends WiredBase {
  constructor() {
    super(...arguments);
    this.spinning = false;
    this.duration = 1500;
    this.value = 0;
    this.timerstart = 0;
    this.frame = 0;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    #svg {
      display: block;
      width: 76px;
      height: 76px;
    }

    path {
      stroke: currentColor;
      stroke-opacity: 0.5;
      stroke-width: 1.5;
      fill: none;
    }
    .knob path {
      stroke-width: 2.8 !important;
      stroke-opacity: 1;
    }
    `;
  }

  render() {
    return html`
    <svg id="svg"></svg>
    `;
  }

  firstUpdated() {
    if (this.svg) {
      ellipse(this.svg, 38, 38, 60, 60);
      this.knob = hachureEllipseFill(0, 0, 20, 20);
      this.knob.classList.add('knob');
      this.svg.appendChild(this.knob);
    }

    this.updateCursor();
    this.classList.add('wired-rendered');
  }

  updated() {
    if (this.spinning) {
      this.startSpinner();
    } else {
      this.stopSpinner();
    }
  }

  startSpinner() {
    this.stopSpinner();
    this.value = 0;
    this.timerstart = 0;
    this.nextTick();
  }

  stopSpinner() {
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
  }

  nextTick() {
    this.frame = window.requestAnimationFrame(t => this.tick(t));
  }

  tick(t) {
    if (this.spinning) {
      if (!this.timerstart) {
        this.timerstart = t;
      }

      this.value = Math.min(1, (t - this.timerstart) / this.duration);
      this.updateCursor();

      if (this.value >= 1) {
        this.value = 0;
        this.timerstart = 0;
      }

      this.nextTick();
    } else {
      this.frame = 0;
    }
  }

  updateCursor() {
    if (this.knob) {
      const position = [Math.round(38 + 25 * Math.cos(this.value * Math.PI * 2)), Math.round(38 + 25 * Math.sin(this.value * Math.PI * 2))];
      this.knob.style.transform = `translate3d(${position[0]}px, ${position[1]}px, 0) rotateZ(${Math.round(this.value * 360 * 2)}deg)`;
    }
  }

  refreshElement() {}

};

__decorate$k([property({
  type: Boolean
}), __metadata$i("design:type", Object)], WiredSpinner.prototype, "spinning", void 0);

__decorate$k([property({
  type: Number
}), __metadata$i("design:type", Object)], WiredSpinner.prototype, "duration", void 0);

__decorate$k([query('svg'), __metadata$i("design:type", SVGSVGElement)], WiredSpinner.prototype, "svg", void 0);

WiredSpinner = __decorate$k([customElement('wired-spinner')], WiredSpinner);

var __decorate$l = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$j = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredTab = class WiredTab extends WiredBase {
  constructor() {
    super(...arguments);
    this.name = '';
    this.label = '';
  }

  static get styles() {
    return css`
    :host {
      display: block;
      width: 100%;
      height:100%;
    }
    wired-card {
      width: 100%;
      height: 100%;
    }
    wired-card > slot {
      display: block;
      padding: 10px;
    }
    `;
  }

  render() {
    return html`
    <wired-card>
      <slot part="body"></slot>
    </wired-card>
    `;
  }

  relayout() {
    setTimeout(() => {
      if (this.card) {
        this.card.requestUpdate();
      }
    });
  }

  refreshElement() {}

};

__decorate$l([property({
  type: String
}), __metadata$j("design:type", Object)], WiredTab.prototype, "name", void 0);

__decorate$l([property({
  type: String
}), __metadata$j("design:type", Object)], WiredTab.prototype, "label", void 0);

__decorate$l([query('wired-card'), __metadata$j("design:type", WiredCard)], WiredTab.prototype, "card", void 0);

WiredTab = __decorate$l([customElement('wired-tab')], WiredTab);
let WizardTabs = class WizardTabs extends WiredBase {
  constructor() {
    super(...arguments);
    this.pages = [];
    this.pageMap = new Map();
  }

  static get styles() {
    return css`

    `;
  }

  render() {
    return html`
            <style>
                :host {
                  display: block;
                }
            
                .hidden {
                  display: none !important;
                }
              
                ::slotted(.hidden) {
                  display: none !important;
                }
            
                :host ::slotted(.hidden) {
                  display: none !important;
                }
                
                #bar, #tabs { 
                    width: 100%;
                } 
                #bar {
                    display: inline-block;
                  padding-left: 25px;
                  padding-right: 25px;
                }
                #tabs {
                 height: 100%;
                 }
            </style>
            <div id="bar">
              ${repeat(this.pages, p => p.name, p => html`
              <wired-item role="tab" .value="${p.name}" .selected="${p.name === this.selected}" ?aria-selected="${p.name === this.selected}"
                @click="${() => this.selected = p.name}">${p.label || p.name}</wired-item>
              `)}
            </div>
            <div id="tabs">
              <slot @slotchange="${this.mapPages()}"></slot>
            </div>
    `;
  }

  mapPages() {
    this.pages = [];
    this.pageMap.clear();

    if (this.slotElement) {
      const assigned = this.slotElement.assignedNodes();

      if (assigned && assigned.length) {
        for (let i = 0; i < assigned.length; i++) {
          const n = assigned[i];

          if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === 'wired-tab') {
            const e = n;
            this.pages.push(e);
            const name = e.getAttribute('name') || '';

            if (name) {
              name.trim().split(' ').forEach(nameSegment => {
                if (nameSegment) {
                  this.pageMap.set(nameSegment, e);
                }
              });
            }
          }
        }

        if (!this.selected) {
          if (this.pages.length) {
            this.selected = this.pages[0].name;
          }
        }

        this.requestUpdate();
      }
    }
  }

  firstUpdated() {
    this.mapPages();
    this.tabIndex = +(this.getAttribute('tabindex') || 0);
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
        case 38:
          event.preventDefault();
          this.selectPrevious();
          break;

        case 39:
        case 40:
          event.preventDefault();
          this.selectNext();
          break;
      }
    });
  }

  updated() {
    const newPage = this.getElement();

    for (let i = 0; i < this.pages.length; i++) {
      const p = this.pages[i];

      if (p === newPage) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    }

    this.current = newPage || undefined;

    if (this.current) {
      this.current.relayout();
    }
  }

  getElement() {
    let e = undefined;

    if (this.selected) {
      e = this.pageMap.get(this.selected);
    }

    if (!e) {
      e = this.pages[0];
    }

    return e || null;
  }

  selectPrevious() {
    const list = this.pages;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.current) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index === 0) {
        index = list.length - 1;
      } else {
        index--;
      }

      this.selected = list[index].name || '';
    }
  }

  selectNext() {
    const list = this.pages;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.current) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index >= list.length - 1) {
        index = 0;
      } else {
        index++;
      }

      this.selected = list[index].name || '';
    }
  }

  refreshElement() {}

};

__decorate$l([property({
  type: String
}), __metadata$j("design:type", String)], WizardTabs.prototype, "selected", void 0);

__decorate$l([query('slot'), __metadata$j("design:type", HTMLSlotElement)], WizardTabs.prototype, "slotElement", void 0);

WizardTabs = __decorate$l([customElement('wired-tabs')], WizardTabs);

var __decorate$m = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$k = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredTextarea = class WiredTextarea extends WiredBase {
  constructor() {
    super(...arguments);
    this.rows = 1;
    this.maxrows = 0;
    this.autocomplete = '';
    this.autofocus = false;
    this.disabled = false;
    this.inputmode = '';
    this.placeholder = '';
    this.required = false;
    this.readonly = false;
    this.tokens = [];
    this.prevHeight = 0;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
      font-family: sans-serif;
      width: 400px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }
  
    .fit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  
    .overlay {
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .mirror-text {
      visibility: hidden;
      word-wrap: break-word;
    }

    #mirror {
      padding: 10px;
    }
  
    textarea {
      position: relative;
      outline: none;
      border: none;
      resize: none;
      background: inherit;
      color: inherit;
      width: 100%;
      height: 100%;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
      text-align: inherit;
      padding: 10px;
      box-sizing: border-box;
    }
    `;
  }

  render() {
    return html`
    <div id="mirror" class="mirror-text">&#160;</div>
    <div class="fit">
      <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
        placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
        rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}" @input="${this.onInput}"></textarea>
    </div>
    <div class="fit overlay">
      <svg id="svg"></svg>
    </div>
    `;
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  get textarea() {
    if (this.shadowRoot) {
      return this.shadowRoot.getElementById('textarea');
    }

    return null;
  }

  get mirror() {
    return this.shadowRoot.getElementById('mirror');
  }

  get value() {
    const input = this.textarea;
    return input && input.value || '';
  }

  set value(v) {
    const textarea = this.textarea;

    if (!textarea) {
      return;
    }

    if (textarea.value !== v) {
      textarea.value = v || '';
    }

    this.mirror.innerHTML = this.valueForMirror();
    this.requestUpdate();
  }

  valueForMirror() {
    const input = this.textarea;

    if (!input) {
      return '';
    }

    this.tokens = input && input.value ? input.value.replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/'/gm, '&#39;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;').split('\n') : [''];
    return this.constrain(this.tokens);
  }

  constrain(tokens) {
    let _tokens;

    tokens = tokens || [''];

    if (this.maxrows > 0 && tokens.length > this.maxrows) {
      _tokens = tokens.slice(0, this.maxrows);
    } else {
      _tokens = tokens.slice(0);
    }

    while (this.rows > 0 && _tokens.length < this.rows) {
      _tokens.push('');
    }

    return _tokens.join('<br/>') + '&#160;';
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }
  }

  firstUpdated() {
    this.value = this.value || this.getAttribute('value') || '';
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    this.refreshElement();
  }

  updateCached() {
    this.mirror.innerHTML = this.constrain(this.tokens);
  }

  onInput() {
    this.value = this.textarea.value;
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');
    const s = this.getBoundingClientRect();

    if (this.prevHeight !== s.height) {
      while (svg.hasChildNodes()) {
        svg.removeChild(svg.lastChild);
      }

      svg.setAttribute('width', `${s.width}`);
      svg.setAttribute('height', `${s.height}`);
      rectangle(svg, 2, 2, s.width - 2, s.height - 2);
      this.prevHeight = s.height;
      this.classList.add('wired-rendered');
      this.updateCached();
    }
  }

};

__decorate$m([property({
  type: Number
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "rows", void 0);

__decorate$m([property({
  type: Number
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "maxrows", void 0);

__decorate$m([property({
  type: String
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "autocomplete", void 0);

__decorate$m([property({
  type: Boolean
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "autofocus", void 0);

__decorate$m([property({
  type: Boolean,
  reflect: true
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "disabled", void 0);

__decorate$m([property({
  type: String
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "inputmode", void 0);

__decorate$m([property({
  type: String
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "placeholder", void 0);

__decorate$m([property({
  type: Boolean
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "required", void 0);

__decorate$m([property({
  type: Boolean
}), __metadata$k("design:type", Object)], WiredTextarea.prototype, "readonly", void 0);

__decorate$m([property({
  type: Number
}), __metadata$k("design:type", Number)], WiredTextarea.prototype, "minlength", void 0);

__decorate$m([property({
  type: Number
}), __metadata$k("design:type", Number)], WiredTextarea.prototype, "maxlength", void 0);

WiredTextarea = __decorate$m([customElement('wired-textarea')], WiredTextarea);

var __decorate$n = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WiredTitle = class WiredTitle extends WiredBase {
  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }
              
                h1 {
                    font-family: 'Shadows Into Light', cursive;
                    text-align: center;
                    font-size: 50px;
                    text-transform: uppercase;
                }
            </style>
            <h1><slot></slot></h1>
        `;
  }

  refreshElement() {}

};
WiredTitle = __decorate$n([customElement('wired-title')], WiredTitle);

var __decorate$o = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$l = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredToggle = class WiredToggle extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      cursor: pointer;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.4 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(:focus) path {
      stroke-width: 1.2;
    }

    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }

    .knob {
      transition: transform 0.3s ease;
    }
    .knob path {
      stroke-width: 0.7;
    }
    .knob.checked {
      transform: translateX(48px);
    }
    .knobfill path {
      stroke-width: 3 !important;
      fill: transparent;
    }
    .knob.unchecked .knobfill path {
      stroke: var(--wired-toggle-off-color, gray);
    }
    .knob.checked .knobfill path {
      stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
    }
    `;
  }

  render() {
    return html`
    <div @click="${this.toggleCheck}">
      <svg id="svg"></svg>
    </div>
    `;
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  toggleCheck() {
    this.checked = !(this.checked || false);
    this.fireEvent('change', {
      checked: this.checked
    });
  }

  firstUpdated() {
    this.setAttribute('role', 'switch');
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleCheck();
      }
    });
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = {
      width: 80,
      height: 34
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 16, 8, s.width - 32, 18);
    this.knob = svgNode('g');
    this.knob.classList.add('knob');
    svg.appendChild(this.knob);
    const knobFill = hachureEllipseFill(16, 16, 32, 32);
    knobFill.classList.add('knobfill');
    this.knob.appendChild(knobFill);
    ellipse(this.knob, 16, 16, 32, 32);
    this.classList.add('wired-rendered');
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    if (this.knob) {
      const cl = this.knob.classList;

      if (this.checked) {
        cl.remove('unchecked');
        cl.add('checked');
      } else {
        cl.remove('checked');
        cl.add('unchecked');
      }
    }

    this.setAttribute('aria-checked', `${this.checked}`);
  }

  refreshElement() {}

};

__decorate$o([property({
  type: Boolean
}), __metadata$l("design:type", Object)], WiredToggle.prototype, "checked", void 0);

__decorate$o([property({
  type: Boolean,
  reflect: true
}), __metadata$l("design:type", Object)], WiredToggle.prototype, "disabled", void 0);

WiredToggle = __decorate$o([customElement('wired-toggle')], WiredToggle);

var __decorate$p = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let WiredToolbar = class WiredToolbar extends WiredBase {
  render() {
    return html`
            <style>
                :host { 
                    display: inline-block;
                    box-sizing: border-box;
                    width:100%;
                    height:60px;
                    border: solid orange 2px;
                }
                :host([hidden]) { display: none; }
              
                wired-card::slotted(body) {
                    box-sizing: border-box;
                    width:100%;
                    height:60px;
                    padding: 5px;
                    border: solid green 1px;
                }
            </style>
            <wired-card>
                <slot></slot>
            </wired-card>
        `;
  }

  refreshElement() {}

};
WiredToolbar = __decorate$p([customElement('wired-toolbar')], WiredToolbar);

var __decorate$q = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata$m = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let WiredTooltip = class WiredTooltip extends WiredBase {
  constructor() {
    super(...arguments);
    this.offset = 14;
    this.position = 'bottom';
    this.dirty = false;
    this.showing = false;
    this._target = null;
    this.showHandler = this.show.bind(this);
    this.hideHandler = this.hide.bind(this);
  }

  static get styles() {
    return css`
    :host {
      display: block;
      position: absolute;
      outline: none;
      z-index: 1002;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
      font-family: inherit;
      font-size: 9pt;
      line-height: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke-width: 0.7;
      stroke: var(--wired-tooltip-border-color, currentColor);
      fill: var(--wired-tooltip-background, rgba(255, 255, 255, 0.9));
    }
  
    #container {
      position: relative;
      padding: 8px;
    }
    `;
  }

  render() {
    return html`
    <div id="container" style="display: none;">
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
      <span style="position: relative;">${this.text}</span>
    </div>
    `;
  }

  get target() {
    if (this._target) {
      return this._target;
    }

    const parent = this.parentNode;
    const owner = (this.getRootNode ? this.getRootNode() : null) || document;
    let t = null;

    if (this.for) {
      t = owner.querySelector('#' + this.for);
    } else if (parent) {
      t = parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? owner.host : parent;
    }

    return t;
  }

  detachListeners() {
    if (this._target) {
      this._target.removeEventListener('mouseenter', this.showHandler);

      this._target.removeEventListener('focus', this.showHandler);

      this._target.removeEventListener('mouseleave', this.hideHandler);

      this._target.removeEventListener('blur', this.hideHandler);

      this._target.removeEventListener('click', this.hideHandler);
    }

    this.removeEventListener('mouseenter', this.hideHandler);
  }

  attachListeners() {
    if (this._target) {
      this._target.addEventListener('mouseenter', this.showHandler);

      this._target.addEventListener('focus', this.showHandler);

      this._target.addEventListener('mouseleave', this.hideHandler);

      this._target.addEventListener('blur', this.hideHandler);

      this._target.addEventListener('click', this.hideHandler);
    }

    this.addEventListener('mouseenter', this.hideHandler);
  }

  refreshTarget() {
    this.detachListeners();
    this._target = null;
    this._target = this.target;
    this.attachListeners();
    this.dirty = true;
  }

  layout() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    let w = s.width;
    let h = s.height;

    switch (this.position) {
      case 'left':
      case 'right':
        w = w + this.offset;
        break;

      default:
        h = h + this.offset;
        break;
    }

    svg.setAttribute('width', `${w}`);
    svg.setAttribute('height', `${h}`);
    let points = [];

    switch (this.position) {
      case 'top':
        points = [[2, 2], [w - 2, 2], [w - 2, h - this.offset], [w / 2 + 8, h - this.offset], [w / 2, h - this.offset + 8], [w / 2 - 8, h - this.offset], [0, h - this.offset]];
        break;

      case 'left':
        points = [[2, 2], [w - this.offset, 2], [w - this.offset, h / 2 - 8], [w - this.offset + 8, h / 2], [w - this.offset, h / 2 + 8], [w - this.offset, h], [2, h - 2]];
        break;

      case 'right':
        points = [[this.offset, 2], [w - 2, 2], [w - 2, h - 2], [this.offset, h - 2], [this.offset, h / 2 + 8], [this.offset - 8, h / 2], [this.offset, h / 2 - 8]];
        svg.style.transform = `translateX(${-this.offset}px)`;
        break;

      default:
        points = [[2, this.offset], [0, h - 2], [w - 2, h - 2], [w - 2, this.offset], [w / 2 + 8, this.offset], [w / 2, this.offset - 8], [w / 2 - 8, this.offset]];
        svg.style.transform = `translateY(${-this.offset}px)`;
        break;
    }

    polygon(svg, points);
    this.dirty = false;
  }

  firstUpdated() {
    this.layout();
  }

  updated(changedProps) {
    if (changedProps.has('position') || changedProps.has('text')) {
      this.dirty = true;
    }

    if (!this._target || changedProps.has('for')) {
      this.refreshTarget();
    }

    if (this.dirty) {
      this.layout();
    }
  }

  show() {
    if (this.showing) {
      return;
    }

    this.showing = true;
    this.shadowRoot.getElementById('container').style.display = '';
    this.updatePosition();
    setTimeout(() => {
      this.layout();
    }, 1);
  }

  hide() {
    if (!this.showing) {
      return;
    }

    this.showing = false;
    this.shadowRoot.getElementById('container').style.display = 'none';
  }

  updatePosition() {
    if (!this._target || !this.offsetParent) {
      return;
    }

    const offset = this.offset;
    const parentRect = this.offsetParent.getBoundingClientRect();

    const targetRect = this._target.getBoundingClientRect();

    const tipRect = this.getBoundingClientRect();
    const horizontalCenterOffset = (targetRect.width - tipRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - tipRect.height) / 2;
    const targetLeft = targetRect.left - parentRect.left;
    const targetTop = targetRect.top - parentRect.top;
    let tooltipLeft, tooltipTop;

    switch (this.position) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - tipRect.height - offset;
        break;

      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;

      case 'left':
        tooltipLeft = targetLeft - tipRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;

      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }

    this.style.left = tooltipLeft + 'px';
    this.style.top = tooltipTop + 'px';
  }

  refreshElement() {}

};

__decorate$q([property({
  type: String
}), __metadata$m("design:type", String)], WiredTooltip.prototype, "for", void 0);

__decorate$q([property({
  type: String
}), __metadata$m("design:type", String)], WiredTooltip.prototype, "text", void 0);

__decorate$q([property({
  type: Number
}), __metadata$m("design:type", Object)], WiredTooltip.prototype, "offset", void 0);

__decorate$q([property({
  type: String
}), __metadata$m("design:type", String)], WiredTooltip.prototype, "position", void 0);

WiredTooltip = __decorate$q([customElement('wired-tooltip')], WiredTooltip);

export { WiredApp, WiredButton, WiredCard, WiredCheckbox, WiredCombo, WiredDrawer, WiredFab, WiredHelper, WiredIconButton, WiredInput, WiredItem, WiredLayout, WiredListbox, WiredMenu, WiredPage, WiredPages, WiredProgress, WiredRadio, WiredRadioGroup, WiredSlider, WiredSpinner, WiredTab, WiredTextarea, WiredTitle, WiredToggle, WiredToolbar, WiredTooltip, WizardTabs, fireWindowEvent };
//# sourceMappingURL=index.js.map
