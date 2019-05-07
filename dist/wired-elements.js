var WiredElements=function(e){"use strict";const t=new WeakMap,i=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,i=null)=>{let s=t;for(;s!==i;){const t=s.nextSibling;e.removeChild(s),s=t}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${l}`),h="$lit$";class c{constructor(e,t){this.parts=[],this.element=t;let i=-1,s=0;const n=[],r=t=>{const o=t.content,l=document.createTreeWalker(o,133,null,!1);let c=0;for(;l.nextNode();){i++;const t=l.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const n=t.attributes;let r=0;for(let e=0;e<n.length;e++)n[e].value.indexOf(a)>=0&&r++;for(;r-- >0;){const n=e.strings[s],r=f.exec(n)[2],o=r.toLowerCase()+h,a=t.getAttribute(o).split(d);this.parts.push({type:"attribute",index:i,name:r,strings:a}),t.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===t.tagName&&r(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const r=t.parentNode,o=e.split(d),a=o.length-1;for(let e=0;e<a;e++)r.insertBefore(""===o[e]?u():document.createTextNode(o[e]),t),this.parts.push({type:"node",index:++i});""===o[a]?(r.insertBefore(u(),t),n.push(t)):t.data=o[a],s+=a}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&i!==c||(i++,e.insertBefore(u(),t)),c=i,this.parts.push({type:"node",index:i}),null===t.nextSibling?t.data="":(n.push(t),i--),s++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1})}}};r(t);for(const e of n)e.parentNode.removeChild(e)}}const p=e=>-1!==e.index,u=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(e,t,i){this._parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this._parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let i=0,n=0;const r=e=>{const s=document.createTreeWalker(e,133,null,!1);let o=s.nextNode();for(;i<t.length&&null!==o;){const e=t[i];if(p(e))if(n===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(o.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(o,e.name,e.strings,this.options));i++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=s.nextNode();else this._parts.push(void 0),i++}};return r(e),s&&(document.adoptNode(e),customElements.upgrade(e)),e}}class m{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="";for(let i=0;i<e;i++){const e=this.strings[i],s=f.exec(e);t+=s?e.substr(0,s.index)+s[1]+s[2]+h+s[3]+a:e+l}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const g=e=>null===e||!("object"==typeof e||"function"==typeof e);class y{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new b(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let s=0;s<t;s++){i+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)i+="string"==typeof t?t:String(t);else i+="string"==typeof e?e:String(e)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===r||g(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=r,e(this)}this.value!==r&&this.committer.commit()}}class v{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(u()),this.endNode=e.appendChild(u())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=u()),e._insert(this.endNode=u())}insertAfterPart(e){e._insert(this.startNode=u()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}const e=this._pendingValue;e!==r&&(g(e)?e!==this.value&&this._commitText(e):e instanceof m?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===o?(this.value=o,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof _&&this.value.template===t)this.value.update(e.values);else{const i=new _(t,e.processor,this.options),s=i._clone();i.update(e.values),this._commitNode(s),this.value=i}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)void 0===(i=t[s])&&(i=new v(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class w{constructor(e,t,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}if(this._pendingValue===r)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=r}}class x extends y{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends b{}let C=!1;try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class k{constructor(e,t,i){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}if(this._pendingValue===r)return;const e=this._pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=P(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=r}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const P=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const E=new class{handleAttributeExpressions(e,t,i,s){const n=t[0];return"."===n?new x(e,t.slice(1),i).parts:"@"===n?[new k(e,t.slice(1),s.eventContext)]:"?"===n?[new w(e,t.slice(1),i)]:new y(e,t,i).parts}handleTextExpression(e){return new v(e)}};function T(e){let t=R.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},R.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);return void 0===(i=t.keyString.get(s))&&(i=new c(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const R=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const N=(e,...t)=>new m(e,t,"html",E),A=133;function I(e,t){const{element:{content:i},parts:s}=e,n=document.createTreeWalker(i,A,null,!1);let r=M(s),o=s[r],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(d.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,o=s[r=M(s,r)]}d.forEach(e=>e.parentNode.removeChild(e))}const L=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,A,null,!1);for(;i.nextNode();)t++;return t},M=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(p(t))return i}return-1};const D=(e,t)=>`${e}--${t}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1);const j=e=>t=>{const i=D(t.type,e);let s=R.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},R.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(a);if(void 0===(n=s.keyString.get(r))){const i=t.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(i,e),n=new c(t,i),s.keyString.set(r,n)}return s.stringsArray.set(t.strings,n),n},W=["html","svg"],H=new Set,$=(e,t,i)=>{H.add(i);const s=e.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,i);const n=document.createElement("style");for(let e=0;e<s.length;e++){const t=s[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}if((e=>{W.forEach(t=>{const i=R.get(D(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),I(e,i)})})})(i),function(e,t,i=null){const{element:{content:s},parts:n}=e;if(null==i)return void s.appendChild(t);const r=document.createTreeWalker(s,A,null,!1);let o=M(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=L(t),i.parentNode.insertBefore(t,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=M(n,o);return}o=M(n,o)}}(t,n,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,i),window.ShadyCSS.nativeShadow){const i=t.element.content.querySelector("style");e.insertBefore(i.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(n,t.element.content.firstChild);const e=new Set;e.add(n),I(t,e)}};window.JSCompiler_renameProperty=((e,t)=>e);const F={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:B},V=Promise.resolve(!0),U=1,Y=4,G=8,X=16,J=32;class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=V,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(t){const s=this[e];this[i]=t,this._requestUpdate(e,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const e=Object.getPrototypeOf(this);if("function"==typeof e.finalize&&e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=B){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||F,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||F.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|J,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=q){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|G,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=this._updateState&~G}}_attributeToProperty(e,t){if(this._updateState&G)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i._classProperties.get(s)||q;this._updateState=this._updateState|X,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~X}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const s=this.constructor,n=s._classProperties.get(e)||q;s._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|Y;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{e=i,t=s});try{await i}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&J}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&U}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&U||(this._updateState=this._updateState|U,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}K.finalized=!0;const Q=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),Z=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}}:Object.assign({},t,{finisher(i){i.createProperty(t.key,e)}}),ee=(e,t,i)=>{t.constructor.createProperty(i,e)};function te(e){return(t,i)=>void 0!==i?ee(e,t,i):Z(e,t)}function ie(e){return(t,i)=>{const s={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==i?se(s,t,i):ne(s,t)}}const se=(e,t,i)=>{Object.defineProperty(t,i,e)},ne=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),re="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol();class ae{constructor(e,t){if(t!==oe)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(re?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ae)return e.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ae(i,oe)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const de=e=>e.flat?e.flat(1/0):function e(t,i=[]){for(let s=0,n=t.length;s<n;s++){const n=t[s];Array.isArray(n)?e(n,i):i.push(n)}return i}(e);class he extends K{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){de(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?re?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof m&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}he.finalized=!0,he.render=((e,t,i)=>{const s=i.scopeName,r=O.has(t),o=t instanceof ShadowRoot&&z&&e instanceof m,a=o&&!H.has(s),l=a?document.createDocumentFragment():t;if(((e,t,i)=>{let s=O.get(t);void 0===s&&(n(t,t.firstChild),O.set(t,s=new v(Object.assign({templateFactory:T},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:j(s)},i)),a){const e=O.get(l);O.delete(l),e.value instanceof _&&$(l,e.value.template,s),n(t,t.firstChild),t.appendChild(l),O.set(t,e)}!r&&o&&window.ShadyCSS.styleElement(t.host)});class ce{constructor(e,t){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=e[0],this.py1=e[1],this.px2=t[0],this.py2=t[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(e){if(this.isUndefined()||e.isUndefined())return!1;let t=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,n=0;const r=this.a,o=this.b,a=this.c;return Math.abs(o)>1e-5&&(t=-r/o,s=-a/o),Math.abs(e.b)>1e-5&&(i=-e.a/e.b,n=-e.c/e.b),t===Number.MAX_VALUE?i===Number.MAX_VALUE?-a/r==-e.c/e.a&&(this.py1>=Math.min(e.py1,e.py2)&&this.py1<=Math.max(e.py1,e.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(e.py1,e.py2)&&this.py2<=Math.max(e.py1,e.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(e.py1-this.yi)*(this.yi-e.py2)<-1e-5)&&(!(Math.abs(e.a)<1e-5)||!((e.px1-this.xi)*(this.xi-e.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=e.px1,this.yi=t*this.xi+s,!((e.py1-this.yi)*(this.yi-e.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(r)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):t===i?s===n&&(this.px1>=Math.min(e.px1,e.px2)&&this.px1<=Math.max(e.py1,e.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(e.px1,e.px2)&&this.px2<=Math.max(e.px1,e.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-s)/(t-i),this.yi=t*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(e.px1-this.xi)*(this.xi-e.px2)<-1e-5))}}class pe{constructor(e,t,i,s,n,r,o,a){this.deltaX=0,this.hGap=0,this.top=e,this.bottom=t,this.left=i,this.right=s,this.gap=n,this.sinAngle=r,this.tanAngle=a,Math.abs(r)<1e-4?this.pos=i+n:Math.abs(r)>.9999?this.pos=e+n:(this.deltaX=(t-e)*Math.abs(a),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(n/o),this.sLeft=new ce([i,t],[i,e]),this.sRight=new ce([s,t],[s,e]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const e=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,e}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const e=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,e}}else{let e=this.pos-this.deltaX/2,t=this.pos+this.deltaX/2,i=this.bottom,s=this.top;if(this.pos<this.right+this.deltaX){for(;e<this.left&&t<this.left||e>this.right&&t>this.right;)if(this.pos+=this.hGap,e=this.pos-this.deltaX/2,t=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new ce([e,i],[t,s]);this.sLeft&&n.intersects(this.sLeft)&&(e=n.xi,i=n.yi),this.sRight&&n.intersects(this.sRight)&&(t=n.xi,s=n.yi),this.tanAngle>0&&(e=this.right-(e-this.left),t=this.right-(t-this.left));const r=[e,i,t,s];return this.pos+=this.hGap,r}}return null}}function ue(e,t){const i=[],s=new ce([e[0],e[1]],[e[2],e[3]]);for(let e=0;e<t.length;e++){const n=new ce(t[e],t[(e+1)%t.length]);s.intersects(n)&&i.push([s.xi,s.yi])}return i}function fe(e,t,i,s,n,r,o){return[-i*r-s*n+i+r*e+n*t,o*(i*n-s*r)+s+-o*n*e+o*r*t]}const _e=2,me=1,ge=.85,ye=0,be=9;class ve{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(e,t){this.p=`${this.p}M ${e} ${t} `}bcurveTo(e,t,i,s,n,r){this.p=`${this.p}C ${e} ${t}, ${i} ${s}, ${n} ${r} `}}function we(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}function xe(e,t){return me*(Math.random()*(t-e)+e)}function Se(e,t,i,s,n){const r=Math.pow(e-i,2)+Math.pow(t-s,2);let o=_e;o*o*100>r&&(o=Math.sqrt(r)/10);const a=o/2,l=.2+.2*Math.random();let d=ge*_e*(s-t)/200,h=ge*_e*(e-i)/200;d=xe(-d,d),h=xe(-h,h);const c=n||new ve;return c.moveTo(e+xe(-o,o),t+xe(-o,o)),c.bcurveTo(d+e+(i-e)*l+xe(-o,o),h+t+(s-t)*l+xe(-o,o),d+e+2*(i-e)*l+xe(-o,o),h+t+2*(s-t)*l+xe(-o,o),i+xe(-o,o),s+xe(-o,o)),c.moveTo(e+xe(-a,a),t+xe(-a,a)),c.bcurveTo(d+e+(i-e)*l+xe(-a,a),h+t+(s-t)*l+xe(-a,a),d+e+2*(i-e)*l+xe(-a,a),h+t+2*(s-t)*l+xe(-a,a),i+xe(-a,a),s+xe(-a,a)),c}function Ce(e,t,i,s,n=!1,r=!1,o){o=o||new ve;const a=Math.pow(e-i,2)+Math.pow(t-s,2);let l=_e;l*l*100>a&&(l=Math.sqrt(a)/10);const d=l/2,h=.2+.2*Math.random();let c=ge*_e*(s-t)/200,p=ge*_e*(e-i)/200;return c=xe(-c,c),p=xe(-p,p),n&&o.moveTo(e+xe(-l,l),t+xe(-l,l)),r?o.bcurveTo(c+e+(i-e)*h+xe(-d,d),p+t+(s-t)*h+xe(-d,d),c+e+2*(i-e)*h+xe(-d,d),p+t+2*(s-t)*h+xe(-d,d),i+xe(-d,d),s+xe(-d,d)):o.bcurveTo(c+e+(i-e)*h+xe(-l,l),p+t+(s-t)*h+xe(-l,l),c+e+2*(i-e)*h+xe(-l,l),p+t+2*(s-t)*h+xe(-l,l),i+xe(-l,l),s+xe(-l,l)),o}function ke(e,t,i,s,n,r,o,a){const l=xe(-.5,.5)-Math.PI/2,d=[];d.push([xe(-r,r)+t+.9*s*Math.cos(l-e),xe(-r,r)+i+.9*n*Math.sin(l-e)]);for(let o=l;o<2*Math.PI+l-.01;o+=e)d.push([xe(-r,r)+t+s*Math.cos(o),xe(-r,r)+i+n*Math.sin(o)]);return d.push([xe(-r,r)+t+s*Math.cos(l+2*Math.PI+.5*o),xe(-r,r)+i+n*Math.sin(l+2*Math.PI+.5*o)]),d.push([xe(-r,r)+t+.98*s*Math.cos(l+o),xe(-r,r)+i+.98*n*Math.sin(l+o)]),d.push([xe(-r,r)+t+.9*s*Math.cos(l+.5*o),xe(-r,r)+i+.9*n*Math.sin(l+.5*o)]),function(e,t){const i=e.length;let s=t||new ve;if(i>3){const t=[],n=1-ye;s.moveTo(e[1][0],e[1][1]);for(let r=1;r+2<i;r++){const i=e[r];t[0]=[i[0],i[1]],t[1]=[i[0]+(n*e[r+1][0]-n*e[r-1][0])/6,i[1]+(n*e[r+1][1]-n*e[r-1][1])/6],t[2]=[e[r+1][0]+(n*e[r][0]-n*e[r+2][0])/6,e[r+1][1]+(n*e[r][1]-n*e[r+2][1])/6],t[3]=[e[r+1][0],e[r+1][1]],s.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[3][0],t[3][1])}}else 3===i?(s.moveTo(e[0][0],e[0][1]),s.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1])):2===i&&(s=Se(e[0][0],e[0][1],e[1][0],e[1][1],s));return s}(d,a)}function Pe(e,t,i,s,n){const r=we("path",{d:Se(t,i,s,n).value});return e.appendChild(r),r}function Ee(e,t,i,s,n){n-=4;let r=Se(t+=2,i+=2,t+(s-=4),i);r=Se(t+s,i,t+s,i+n,r),r=Se(t+s,i+n,t,i+n,r);const o=we("path",{d:(r=Se(t,i+n,t,i,r)).value});return e.appendChild(o),o}function Te(e,t){let i;const s=t.length;if(s>2)for(let e=0;e<2;e++){let n=!0;for(let e=1;e<s;e++)i=Ce(t[e-1][0],t[e-1][1],t[e][0],t[e][1],n,e>0,i),n=!1;i=Ce(t[s-1][0],t[s-1][1],t[0][0],t[0][1],n,e>0,i)}else i=2===s?Se(t[0][0],t[0][1],t[1][0],t[1][1]):new ve;const n=we("path",{d:i.value});return e.appendChild(n),n}function Re(e,t,i,s,n){s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1);const r=2*Math.PI/be;let o=Math.abs(s/2),a=Math.abs(n/2),l=ke(r,t,i,o+=xe(.05*-o,.05*o),a+=xe(.05*-a,.05*a),1,r*xe(.1,xe(.4,1)));const d=we("path",{d:(l=ke(r,t,i,o,a,1.5,0,l)).value});return e.appendChild(d),d}function Oe(e){const t=we("g");let i=null;return e.forEach(e=>{Pe(t,e[0][0],e[0][1],e[1][0],e[1][1]),i&&Pe(t,i[0],i[1],e[0][0],e[0][1]),i=e[1]}),t}const Ne={bowing:ge,curveStepCount:be,curveTightness:ye,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:_e,roughness:me,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function Ae(e){return Oe(function(e,t){const i=[];if(e&&e.length){let s=e[0][0],n=e[0][0],r=e[0][1],o=e[0][1];for(let t=1;t<e.length;t++)s=Math.min(s,e[t][0]),n=Math.max(n,e[t][0]),r=Math.min(r,e[t][1]),o=Math.max(o,e[t][1]);const a=t.hachureAngle;let l=t.hachureGap;l<0&&(l=4*t.strokeWidth),l=Math.max(l,.1);const d=a%180*(Math.PI/180),h=Math.cos(d),c=Math.sin(d),p=Math.tan(d),u=new pe(r-1,o+1,s-1,n+1,l,c,h,p);let f;for(;null!=(f=u.nextLine());){const t=ue(f,e);for(let e=0;e<t.length;e++)if(e<t.length-1){const s=t[e],n=t[e+1];i.push([s,n])}}}return i}(e,Ne))}function Ie(e,t,i,s){return Oe(function(e,t,i,s,n,r){const o=[];let a=Math.abs(s/2),l=Math.abs(n/2);a+=e.randOffset(.05*a,r),l+=e.randOffset(.05*l,r);const d=r.hachureAngle;let h=r.hachureGap;h<=0&&(h=4*r.strokeWidth);let c=r.fillWeight;c<0&&(c=r.strokeWidth/2);const p=d%180*(Math.PI/180),u=Math.tan(p),f=l/a,_=Math.sqrt(f*u*f*u+1),m=f*u/_,g=1/_,y=h/(a*l/Math.sqrt(l*g*(l*g)+a*m*(a*m))/a);let b=Math.sqrt(a*a-(t-a+y)*(t-a+y));for(let e=t-a+y;e<t+a;e+=y){const s=fe(e,i-(b=Math.sqrt(a*a-(t-e)*(t-e))),t,i,m,g,f),n=fe(e,i+b,t,i,m,g,f);o.push([s,n])}return o}({randOffset:(e,t)=>xe(-e,e)},e,t,i,s,Ne))}function Le(e,t,i=!0,s=!0){Me(window,e,t,i,s)}function Me(e,t,i,s=!0,n=!0){if(e&&t){const r={bubbles:"boolean"!=typeof s||s,composed:"boolean"!=typeof n||n};i&&(r.detail=i);const o=window.SlickCustomEvent||CustomEvent;e.dispatchEvent(new o(t,r))}}var De=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ze extends he{constructor(){super(...arguments),this.debug=!1}fireEvent(e,t,i=!0,s=!0){Me(this,e,t,i,s)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.refreshListener||(this.refreshListener=this.refreshAfterResize.bind(this),window.addEventListener("refresh-element",this.refreshListener)),setTimeout(()=>this.refreshAfterResize(),10)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.refreshListener&&(window.removeEventListener("refresh-element",this.refreshListener),delete this.refreshListener)}refreshAfterResize(){this.refreshElement&&(this.debug&&console.log("Refreshing wired-element: ",this.tagName),this.refreshElement())}}(function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);r>3&&o&&Object.defineProperty(t,i,o)})([te({type:Boolean}),De("design:type",Object)],ze.prototype,"debug",void 0);const je=!(window.ShadyDOM&&window.ShadyDOM.inUse);let We,He;function $e(e){We=(!e||!e.shimcssproperties)&&(je||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(He=window.ShadyCSS.cssBuild);const Fe=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?We=window.ShadyCSS.nativeCss:window.ShadyCSS?($e(window.ShadyCSS),window.ShadyCSS=void 0):$e(window.WebComponents&&window.WebComponents.flags);const Be=We;class qe{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function Ve(e){return function e(t,i){let s=i.substring(t.start,t.end-1);t.parsedCssText=t.cssText=s.trim();if(t.parent){let e=t.previous?t.previous.end:t.parent.start;s=(s=(s=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e})}(s=i.substring(e,t.start-1))).replace(Je.multipleSpaces," ")).substring(s.lastIndexOf(";")+1);let n=t.parsedSelector=t.selector=s.trim();t.atRule=0===n.indexOf(Ze),t.atRule?0===n.indexOf(Qe)?t.type=Ye.MEDIA_RULE:n.match(Je.keyframesRule)&&(t.type=Ye.KEYFRAMES_RULE,t.keyframesName=t.selector.split(Je.multipleSpaces).pop()):0===n.indexOf(Ke)?t.type=Ye.MIXIN_RULE:t.type=Ye.STYLE_RULE}let n=t.rules;if(n)for(let t,s=0,r=n.length;s<r&&(t=n[s]);s++)e(t,i);return t}(function(e){let t=new qe;t.start=0,t.end=e.length;let i=t;for(let s=0,n=e.length;s<n;s++)if(e[s]===Ge){i.rules||(i.rules=[]);let e=i,t=e.rules[e.rules.length-1]||null;(i=new qe).start=s+1,i.parent=e,i.previous=t,e.rules.push(i)}else e[s]===Xe&&(i.end=s+1,i=i.parent||t);return t}(e=e.replace(Je.comments,"").replace(Je.port,"")),e)}function Ue(e,t,i=""){let s="";if(e.cssText||e.rules){let i=e.rules;if(i&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(Ke)}(i))for(let e,n=0,r=i.length;n<r&&(e=i[n]);n++)s=Ue(e,t,s);else(s=(s=t?e.cssText:function(e){return function(e){return e.replace(Je.mixinApply,"").replace(Je.varApply,"")}(e=function(e){return e.replace(Je.customProp,"").replace(Je.mixinProp,"")}(e))}(e.cssText)).trim())&&(s="  "+s+"\n")}return s&&(e.selector&&(i+=e.selector+" "+Ge+"\n"),i+=s,e.selector&&(i+=Xe+"\n\n")),i}const Ye={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},Ge="{",Xe="}",Je={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},Ke="--",Qe="@media",Ze="@",et=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,tt=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,it=/@media\s(.*)/,st=new Set,nt="shady-unscoped";function rt(e){const t=e.textContent;if(!st.has(t)){st.add(t);const i=e.cloneNode(!0);document.head.appendChild(i)}}function ot(e){return e.hasAttribute(nt)}function at(e,t){return e?("string"==typeof e&&(e=Ve(e)),t&&dt(e,t),Ue(e,Be)):""}function lt(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=Ve(e.textContent)),e.__cssRules||null}function dt(e,t,i,s){if(!e)return;let n=!1,r=e.type;if(s&&r===Ye.MEDIA_RULE){let t=e.selector.match(it);t&&(window.matchMedia(t[1]).matches||(n=!0))}r===Ye.STYLE_RULE?t(e):i&&r===Ye.KEYFRAMES_RULE?i(e):r===Ye.MIXIN_RULE&&(n=!0);let o=e.rules;if(o&&!n)for(let e,n=0,r=o.length;n<r&&(e=o[n]);n++)dt(e,t,i,s)}window.ShadyDOM&&window.ShadyDOM.wrap;const ht="css-build";function ct(e){if(void 0!==He)return He;if(void 0===e.__cssBuild){const t=e.getAttribute(ht);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===ht)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}function pt(e){return""!==ct(e)}function ut(e,t){for(let i in t)null===i?e.style.removeProperty(i):e.style.setProperty(i,t[i])}function ft(e,t){const i=window.getComputedStyle(e).getPropertyValue(t);return i?i.trim():""}const _t=/;\s*/m,mt=/^\s*(initial)|(inherit)\s*$/,gt=/\s*!important/,yt="_-_";class bt{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let vt=null;class wt{constructor(){this._currentElement=null,this._measureElement=null,this._map=new bt}detectMixin(e){return function(e){const t=tt.test(e)||et.test(e);return tt.lastIndex=0,et.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],i=e.querySelectorAll("style");for(let e=0;e<i.length;e++){const s=i[e];ot(s)?je||(rt(s),s.parentNode.removeChild(s)):(t.push(s.textContent),s.parentNode.removeChild(s))}return t.join("").trim()}(e.content);if(t){const i=document.createElement("style");return i.textContent=t,e.content.insertBefore(i,e.content.firstChild),i}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const i=e._gatheredStyle;return i?this.transformStyle(i,t):null}transformStyle(e,t=""){let i=lt(e);return this.transformRules(i,t),e.textContent=at(i),i}transformCustomStyle(e){let t=lt(e);return dt(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=at(t),t}transformRules(e,t){this._currentElement=t,dt(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(et,(e,i,s,n)=>this._produceCssProperties(e,i,s,n,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const i={};let s=!1;return dt(t,t=>{(s=s||t===e)||t.selector===e.selector&&Object.assign(i,this._cssTextToMap(t.parsedCssText))}),i}_consumeCssProperties(e,t){let i=null;for(;i=tt.exec(e);){let s=i[0],n=i[1],r=i.index,o=r+s.indexOf("@apply"),a=r+s.length,l=e.slice(0,o),d=e.slice(a),h=t?this._fallbacksFromPreviousRules(t):{};Object.assign(h,this._cssTextToMap(l));let c=this._atApplyToCssProperties(n,h);e=`${l}${c}${d}`,tt.lastIndex=r+c.length}return e}_atApplyToCssProperties(e,t){e=e.replace(_t,"");let i=[],s=this._map.get(e);if(s||(this._map.set(e,{}),s=this._map.get(e)),s){let n,r,o;this._currentElement&&(s.dependants[this._currentElement]=!0);const a=s.properties;for(n in a)o=t&&t[n],r=[n,": var(",e,yt,n],o&&r.push(",",o.replace(gt,"")),r.push(")"),gt.test(a[n])&&r.push(" !important"),i.push(r.join(""))}return i.join("; ")}_replaceInitialOrInherit(e,t){let i=mt.exec(t);return i&&(t=i[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let i,s,n=e.split(";"),r={};for(let e,o,a=0;a<n.length;a++)(e=n[a])&&(o=e.split(":")).length>1&&(i=o[0].trim(),s=o.slice(1).join(":"),t&&(s=this._replaceInitialOrInherit(i,s)),r[i]=s);return r}_invalidateMixinEntry(e){if(vt)for(let t in e.dependants)t!==this._currentElement&&vt(t)}_produceCssProperties(e,t,i,s,n){if(i&&function e(t,i){let s=t.indexOf("var(");if(-1===s)return i(t,"","","");let n=function(e,t){let i=0;for(let s=t,n=e.length;s<n;s++)if("("===e[s])i++;else if(")"===e[s]&&0==--i)return s;return-1}(t,s+3),r=t.substring(s+4,n),o=t.substring(0,s),a=e(t.substring(n+1),i),l=r.indexOf(",");return-1===l?i(o,r.trim(),"",a):i(o,r.substring(0,l).trim(),r.substring(l+1).trim(),a)}(i,(e,t)=>{t&&this._map.get(t)&&(s=`@apply ${t};`)}),!s)return e;let r=this._consumeCssProperties(""+s,n),o=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(r,!0),l=a,d=this._map.get(t),h=d&&d.properties;h?l=Object.assign(Object.create(h),a):this._map.set(t,l);let c,p,u=[],f=!1;for(c in l)void 0===(p=a[c])&&(p="initial"),!h||c in h||(f=!0),u.push(`${t}${yt}${c}: ${p}`);return f&&this._invalidateMixinEntry(d),d&&(d.properties=l),i&&(o=`${e};${o}`),`${o}${u.join("; ")};`}}wt.prototype.detectMixin=wt.prototype.detectMixin,wt.prototype.transformStyle=wt.prototype.transformStyle,wt.prototype.transformCustomStyle=wt.prototype.transformCustomStyle,wt.prototype.transformRules=wt.prototype.transformRules,wt.prototype.transformRule=wt.prototype.transformRule,wt.prototype.transformTemplate=wt.prototype.transformTemplate,wt.prototype._separator=yt,Object.defineProperty(wt.prototype,"invalidCallback",{get:()=>vt,set(e){vt=e}});const xt={},St="_applyShimCurrentVersion",Ct="_applyShimNextVersion",kt="_applyShimValidatingVersion",Pt=Promise.resolve();function Et(e){let t=xt[e];t&&function(e){e[St]=e[St]||0,e[kt]=e[kt]||0,e[Ct]=(e[Ct]||0)+1}(t)}function Tt(e){return e[St]===e[Ct]}let Rt,Ot=null,Nt=window.HTMLImports&&window.HTMLImports.whenReady||null;function At(e){requestAnimationFrame(function(){Nt?Nt(e):(Ot||(Ot=new Promise(e=>{Rt=e}),"complete"===document.readyState?Rt():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&Rt()})),Ot.then(function(){e&&e()}))})}const It="__seenByShadyCSS",Lt="__shadyCSSCachedStyle";let Mt=null,Dt=null;class zt{constructor(){this.customStyles=[],this.enqueued=!1,At(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&Dt&&(this.enqueued=!0,At(Dt))}addCustomStyle(e){e[It]||(e[It]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[Lt])return e[Lt];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const i=e[t];if(i[Lt])continue;const s=this.getStyleForCustomStyle(i);if(s){const e=s.__appliedElement||s;Mt&&Mt(e),i[Lt]=e}}return e}}zt.prototype.addCustomStyle=zt.prototype.addCustomStyle,zt.prototype.getStyleForCustomStyle=zt.prototype.getStyleForCustomStyle,zt.prototype.processStyles=zt.prototype.processStyles,Object.defineProperties(zt.prototype,{transformCallback:{get:()=>Mt,set(e){Mt=e}},validateCallback:{get:()=>Dt,set(e){let t=!1;Dt||(t=!0),Dt=e,t&&this.enqueueDocumentValidation()}}});const jt=new wt;class Wt{constructor(){this.customStyleInterface=null,jt.invalidCallback=Et}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=(e=>{jt.transformCustomStyle(e)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})}))}prepareTemplate(e,t){if(this.ensure(),pt(e))return;xt[t]=e;let i=jt.transformTemplate(e,t);e._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let i=e[t],s=this.customStyleInterface.getStyleForCustomStyle(i);s&&jt.transformCustomStyle(s)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&ut(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,i="",s="";return t?t.indexOf("-")>-1?i=t:(s=t,i=e.getAttribute&&e.getAttribute("is")||""):(i=e.is,s=e.extends),{is:i,typeExtension:s}}(e),i=xt[t];if((!i||!pt(i))&&i&&!Tt(i)){(function(e){return!Tt(e)&&e[kt]===e[Ct]})(i)||(this.prepareTemplate(i,t),function(e){e[kt]=e[Ct],e._validating||(e._validating=!0,Pt.then(function(){e[St]=e[Ct],e._validating=!1}))}(i));let s=e.shadowRoot;if(s){let e=s.querySelector("style");e&&(e.__cssRules=i._styleAst,e.textContent=at(i._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new Wt;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,i,s){e.flushCustomStyles(),e.prepareTemplate(t,i)},prepareTemplateStyles(e,t,i){window.ShadyCSS.prepareTemplate(e,t,i)},prepareTemplateDom(e,t){},styleSubtree(t,i){e.flushCustomStyles(),e.styleSubtree(t,i)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>ft(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:Be,nativeShadow:je,cssBuild:He,disableRuntime:Fe},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=jt,window.JSCompiler_renameProperty=function(e,t){return e};let Ht,$t,Ft=/(url\()([^)]*)(\))/g,Bt=/(^\/)|(^#)|(^[\w-\d]*:)/;function qt(e,t){if(e&&Bt.test(e))return e;if(void 0===Ht){Ht=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",Ht="http://a/c%20d"===e.href}catch(e){}}return t||(t=document.baseURI||window.location.href),Ht?new URL(e,t).href:($t||(($t=document.implementation.createHTMLDocument("temp")).base=$t.createElement("base"),$t.head.appendChild($t.base),$t.anchor=$t.createElement("a"),$t.body.appendChild($t.anchor)),$t.base.href=t,$t.anchor.href=e,$t.anchor.href||e)}function Vt(e,t){return e.replace(Ft,function(e,i,s,n){return i+"'"+qt(s.replace(/["']/g,""),t)+"'"+n})}function Ut(e){return e.substring(0,e.lastIndexOf("/")+1)}const Yt=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let Gt=Ut(document.baseURI||window.location.href),Xt=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,Jt=!1,Kt=!1,Qt=!1,Zt=!1,ei=!1,ti=0;const ii=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=ti++;return function(s){let n=s.__mixinSet;if(n&&n[i])return s;let r=t,o=r.get(s);o||(o=e(s),r.set(s,o));let a=Object.create(o.__mixinSet||n||null);return a[i]=!0,o.__mixinSet=a,o}};let si={},ni={};function ri(e,t){si[e]=ni[e.toLowerCase()]=t}function oi(e){return si[e]||ni[e.toLowerCase()]}class ai extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=oi(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,s){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=qt(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=Ut(t)}return this.__assetpath}register(e){if(e=e||this.id){if(Kt&&void 0!==oi(e))throw ri(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,ri(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}ai.prototype.modules=si,customElements.define("dom-module",ai);const li="link[rel=import][type~=css]",di="include",hi="shady-unscoped";function ci(e){return ai.import(e)}function pi(e){const t=Vt((e.body?e.body:e).textContent,e.baseURI),i=document.createElement("style");return i.textContent=t,i}function ui(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...fi(t[e]));return i}function fi(e){const t=ci(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...mi(t));const i=t.querySelector("template");i&&e.push(..._i(i,t.assetpath)),t._styles=e}return t._styles}function _i(e,t){if(!e._styles){const i=[],s=e.content.querySelectorAll("style");for(let e=0;e<s.length;e++){let n=s[e],r=n.getAttribute(di);r&&i.push(...ui(r).filter(function(e,t,i){return i.indexOf(e)===t})),t&&(n.textContent=Vt(n.textContent,t)),i.push(n)}e._styles=i}return e._styles}function mi(e){const t=[],i=e.querySelectorAll(li);for(let e=0;e<i.length;e++){let s=i[e];if(s.import){const e=s.import,i=s.hasAttribute(hi);if(i&&!e._unscopedStyle){const t=pi(e);t.setAttribute(hi,""),e._unscopedStyle=t}else e._style||(e._style=pi(e));t.push(i?e._unscopedStyle:e._style)}}return t}function gi(e){let t=ci(e);if(t&&void 0===t._cssText){let e=function(e){let t="",i=mi(e);for(let e=0;e<i.length;e++)t+=i[e].textContent;return t}(t),i=t.querySelector("template");i&&(e+=function(e,t){let i="";const s=_i(e,t);for(let e=0;e<s.length;e++){let t=s[e];t.parentNode&&t.parentNode.removeChild(t),i+=t.textContent}return i}(i,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}const yi=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:e=>e;function bi(e){return e.indexOf(".")>=0}function vi(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function wi(e,t){return 0===e.indexOf(t+".")}function xi(e,t){return 0===t.indexOf(e+".")}function Si(e,t,i){return t+i.slice(e.length)}function Ci(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let s=e[i].toString().split(".");for(let e=0;e<s.length;e++)t.push(s[e])}return t.join(".")}return e}function ki(e){return Array.isArray(e)?Ci(e).split("."):e.toString().split(".")}function Pi(e,t,i){let s=e,n=ki(t);for(let e=0;e<n.length;e++){if(!s)return;s=s[n[e]]}return i&&(i.path=n.join(".")),s}function Ei(e,t,i){let s=e,n=ki(t),r=n[n.length-1];if(n.length>1){for(let e=0;e<n.length-1;e++){if(!(s=s[n[e]]))return}s[r]=i}else s[t]=i;return n.join(".")}const Ti={},Ri=/-[a-z]/g,Oi=/([A-Z])/g;function Ni(e){return Ti[e]||(Ti[e]=e.indexOf("-")<0?e:e.replace(Ri,e=>e[1].toUpperCase()))}function Ai(e){return Ti[e]||(Ti[e]=e.replace(Oi,"-$1").toLowerCase())}let Ii=0,Li=0,Mi=[],Di=0,zi=document.createTextNode("");new window.MutationObserver(function(){const e=Mi.length;for(let t=0;t<e;t++){let e=Mi[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}Mi.splice(0,e),Li+=e}).observe(zi,{characterData:!0});const ji={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},Wi={run:e=>window.requestAnimationFrame(e),cancel(e){window.cancelAnimationFrame(e)}},Hi={run:e=>(zi.textContent=Di++,Mi.push(e),Ii++),cancel(e){const t=e-Li;if(t>=0){if(!Mi[t])throw new Error("invalid async handle: "+e);Mi[t]=null}}},$i=Hi,Fi=ii(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let s=this.__data[e],n=this._shouldPropertyChange(e,t,s);return n&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=s),this.__data[e]=t,this.__dataPending[e]=t),n}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,$i.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i))}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,s){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,s)}_attributeToProperty(e,t,i){if(!this.__serializing){const s=this.__dataAttributes,n=s&&s[e]||e;this[n]=this._deserializeValue(t,i||this.constructor.typeForProperty(n))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const s=this._serializeValue(t);void 0===s?e.removeAttribute(i):("class"!==i&&"name"!==i&&"slot"!==i||(e=yi(e)),e.setAttribute(i,s))}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}}),Bi={};let qi=HTMLElement.prototype;for(;qi;){let e=Object.getOwnPropertyNames(qi);for(let t=0;t<e.length;t++)Bi[e[t]]=!0;qi=Object.getPrototypeOf(qi)}const Vi=ii(e=>{const t=Fi(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(Ni(e[t]))}static attributeNameForProperty(e){return Ai(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const i=this;i.hasAttribute(e)||this._valueToNodeAttribute(i,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!Bi[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),Ui=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),Yi={"dom-if":!0,"dom-repeat":!0};function Gi(e){let t=e.getAttribute("is");if(t&&Yi[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;)e.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return e}function Xi(e,t){let i=t.parentInfo&&Xi(e,t.parentInfo);if(!i)return e;Ui.currentNode=i;for(let e=Ui.firstChild(),i=0;e;e=Ui.nextSibling())if(t.parentIndex===i++)return e}function Ji(e,t,i,s){s.id&&(t[s.id]=i)}function Ki(e,t,i){if(i.events&&i.events.length)for(let s,n=0,r=i.events;n<r.length&&(s=r[n]);n++)e._addMethodEventListenerToNode(t,s.name,s.value,e)}function Qi(e,t,i){i.templateInfo&&(t._templateInfo=i.templateInfo)}const Zi=ii(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let s,n=e;return"template"!=n.localName||n.hasAttribute("preserve-content")?"slot"===n.localName&&(t.hasInsertionPoint=!0):s=this._parseTemplateNestedTemplate(n,t,i)||s,Ui.currentNode=n,Ui.firstChild()&&(s=this._parseTemplateChildNodes(n,t,i)||s),n.hasAttributes&&n.hasAttributes()&&(s=this._parseTemplateNodeAttributes(n,t,i)||s),s}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName){Ui.currentNode=e;for(let s,n=Ui.firstChild(),r=0;n;n=s){if("template"==n.localName&&(n=Gi(n)),Ui.currentNode=n,s=Ui.nextSibling(),n.nodeType===Node.TEXT_NODE){let i=s;for(;i&&i.nodeType===Node.TEXT_NODE;)n.textContent+=i.textContent,s=Ui.nextSibling(),e.removeChild(i),i=s;if(t.stripWhiteSpace&&!n.textContent.trim()){e.removeChild(n);continue}}let o={parentIndex:r,parentInfo:i};this._parseTemplateNode(n,t,o)&&(o.infoIndex=t.nodeInfoList.push(o)-1),Ui.currentNode=n,Ui.parentNode()&&r++}}}static _parseTemplateNestedTemplate(e,t,i){let s=this._parseTemplate(e,t);return(s.content=e.content.ownerDocument.createDocumentFragment()).appendChild(e.content),i.templateInfo=s,!0}static _parseTemplateNodeAttributes(e,t,i){let s=!1,n=Array.from(e.attributes);for(let r,o=n.length-1;r=n[o];o--)s=this._parseTemplateNodeAttribute(e,t,i,r.name,r.value)||s;return s}static _parseTemplateNodeAttribute(e,t,i,s,n){return"on-"===s.slice(0,3)?(e.removeAttribute(s),i.events=i.events||[],i.events.push({name:s.slice(3),value:n}),!0):"id"===s&&(i.id=n,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),i=t.nodeInfoList,s=t.content||e.content,n=document.importNode(s,!0);n.__noInsertionPoint=!t.hasInsertionPoint;let r=n.nodeList=new Array(i.length);n.$={};for(let e,t=0,s=i.length;t<s&&(e=i[t]);t++){let i=r[t]=Xi(n,e);Ji(0,n.$,i,e),Qi(0,i,e),Ki(this,i,e)}return n=n}_addMethodEventListenerToNode(e,t,i,s){let n=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(s=s||e,0,i);return this._addEventListenerToNode(e,t,n),n}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}});let es=0;const ts={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},is=/[A-Z]/;function ss(e,t){let i=e[t];if(i){if(!e.hasOwnProperty(t)){i=e[t]=Object.create(e[t]);for(let e in i){let t=i[e],s=i[e]=Array(t.length);for(let e=0;e<t.length;e++)s[e]=t[e]}}}else i=e[t]={};return i}function ns(e,t,i,s,n,r){if(t){let o=!1,a=es++;for(let l in i)rs(e,t,a,l,i,s,n,r)&&(o=!0);return o}return!1}function rs(e,t,i,s,n,r,o,a){let l=!1,d=t[o?vi(s):s];if(d)for(let t,h=0,c=d.length;h<c&&(t=d[h]);h++)t.info&&t.info.lastRun===i||o&&!os(s,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,s,n,r,t.info,o,a),l=!0);return l}function os(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!wi(i,e))||!(!t.wildcard||!xi(i,e))}return!0}function as(e,t,i,s,n){let r="string"==typeof n.method?e[n.method]:n.method,o=n.property;r?r.call(e,e.__data[o],s[o]):n.dynamicFn||console.warn("observer method `"+n.method+"` not defined")}function ls(e,t,i){let s=vi(t);if(s!==t){return ds(e,Ai(s)+"-changed",i[t],t),!0}return!1}function ds(e,t,i,s){let n={value:i,queueProperty:!0};s&&(n.path=s),yi(e).dispatchEvent(new CustomEvent(t,{detail:n}))}function hs(e,t,i,s,n,r){let o=(r?vi(t):t)!=t?t:null,a=o?Pi(e,o):e.__data[t];o&&void 0===a&&(a=i[t]),ds(e,n.eventName,a,o)}function cs(e,t,i,s,n){let r=e.__data[t];Xt&&(r=Xt(r,n.attrName,"attribute",e)),e._propertyToAttribute(t,n.attrName,r)}function ps(e,t,i,s,n){let r=bs(e,t,i,s,n),o=n.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[o]?e._setPendingProperty(o,r,!0):e[o]=r}function us(e,t,i,s,n,r,o){i.bindings=i.bindings||[];let a={kind:s,target:n,parts:r,literal:o,isCompound:1!==r.length};if(i.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||Ai(n)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let s=a.parts[i];s.compoundIndex=i,fs(e,t,a,s,l)}}function fs(e,t,i,s,n){if(!s.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let r=s.dependencies,o={index:n,binding:i,part:s,evaluator:e};for(let i=0;i<r.length;i++){let s=r[i];"string"==typeof s&&((s=Cs(s)).wildcard=!0),e._addTemplatePropertyEffect(t,s.rootProperty,{fn:_s,info:o,trigger:s})}}}function _s(e,t,i,s,n,r,o){let a=o[n.index],l=n.binding,d=n.part;if(r&&d.source&&t.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let s=i[t];t=Si(d.source,l.target,t),a._setPendingPropertyOrPath(t,s,!1,!0)&&e._enqueueClient(a)}else{!function(e,t,i,s,n){n=function(e,t,i,s){if(i.isCompound){let n=e.__dataCompoundStorage[i.target];n[s.compoundIndex]=t,t=n.join("")}return"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t)),t}(t,n,i,s),Xt&&(n=Xt(n,i.target,i.kind,t));if("attribute"==i.kind)e._valueToNodeAttribute(t,n,i.target);else{let s=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[s]?t[ts.READ_ONLY]&&t[ts.READ_ONLY][s]||t._setPendingProperty(s,n)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,s,n)}}(e,a,l,d,n.evaluator._evaluateBinding(e,d,t,i,s,r))}}function ms(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),s=t.parts,n=new Array(s.length);for(let e=0;e<s.length;e++)n[e]=s[e].literal;let r=t.target;i[r]=n,t.literal&&"property"==t.kind&&(e[r]=t.literal)}}function gs(e,t,i){if(i.listenerEvent){let s=i.parts[0];e.addEventListener(i.listenerEvent,function(e){!function(e,t,i,s,n){let r,o=e.detail,a=o&&o.path;a?(s=Si(i,s,a),r=o&&o.value):r=e.currentTarget[i],r=n?!r:r,t[ts.READ_ONLY]&&t[ts.READ_ONLY][s]||!t._setPendingPropertyOrPath(s,r,!0,Boolean(a))||o&&o.queueProperty||t._invalidateProperties()}(e,t,i.target,s.source,s.negate)})}}function ys(e,t,i,s,n,r){r=t.static||r&&("object"!=typeof r||r[t.methodName]);let o={methodName:t.methodName,args:t.args,methodInfo:n,dynamicFn:r};for(let n,r=0;r<t.args.length&&(n=t.args[r]);r++)n.literal||e._addPropertyEffect(n.rootProperty,i,{fn:s,info:o,trigger:n});r&&e._addPropertyEffect(t.methodName,i,{fn:s,info:o})}function bs(e,t,i,s,n){let r=e._methodHost||e,o=r[n.methodName];if(o){let s=e._marshalArgs(n.args,t,i);return o.apply(r,s)}n.dynamicFn||console.warn("method `"+n.methodName+"` not defined")}const vs=[],ws=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function xs(e){let t="";for(let i=0;i<e.length;i++){t+=e[i].literal||""}return t}function Ss(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:vs};if(t[2].trim()){return function(e,t){return t.args=e.map(function(e){let i=Cs(e);return i.literal||(t.static=!1),i},this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function Cs(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},s=t[0];switch("-"===s&&(s=t[1]),s>="0"&&s<="9"&&(s="#"),s){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=vi(t),i.structured=bi(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function ks(e,t,i){let s=Pi(e,i);return void 0===s&&(s=t[i]),s}function Ps(e,t,i,s){e.notifyPath(i+".splices",{indexSplices:s}),e.notifyPath(i+".length",t.length)}function Es(e,t,i,s,n,r){Ps(e,t,i,[{index:s,addedCount:n,removed:r,object:t,type:"splice"}])}const Ts=ii(e=>{const t=Zi(Vi(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return ts}_initializeProperties(){super._initializeProperties(),Rs.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[ts.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==ts.READ_ONLY);let s=ss(this,t)[e];s||(s=this[t][e]=[]),s.push(i)}_removePropertyEffect(e,t,i){let s=ss(this,t)[e],n=s.indexOf(i);n>=0&&s.splice(n,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,ts.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,ts.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,ts.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,ts.COMPUTE)}_setPendingPropertyOrPath(e,t,i,s){if(s||vi(Array.isArray(e)?e[0]:e)!==e){if(!s){let i=Pi(this,e);if(!(e=Ei(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let s=e.__dataLinkedPaths;if(s){let n;for(let r in s){let o=s[r];xi(r,t)?(n=Si(r,o,t),e._setPendingPropertyOrPath(n,i,!0,!0)):xi(o,t)&&(n=Si(o,r,t),e._setPendingPropertyOrPath(n,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||(e[t]=i)}_setPendingProperty(e,t,i){let s=this.__dataHasPaths&&bi(e),n=s?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,n[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),s?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(s||this[ts.NOTIFY]&&this[ts.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[ts.READ_ONLY]&&this[ts.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let s=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,s){let n=e[ts.COMPUTE];if(n){let r=t;for(;ns(e,n,r,i,s);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),r=e.__dataPending,e.__dataPending=null}}(this,t,i,s);let n=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,i,s),this._flushClients(),ns(this,this[ts.REFLECT],t,i,s),ns(this,this[ts.OBSERVE],t,i,s),n&&function(e,t,i,s,n){let r,o,a=e[ts.NOTIFY],l=es++;for(let o in t)t[o]&&(a&&rs(e,a,l,o,i,s,n)?r=!0:n&&ls(e,o,i)&&(r=!0));r&&(o=e.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,n,t,i,s),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[ts.PROPAGATE]&&ns(this,this[ts.PROPAGATE],e,t,i);let s=this.__templateInfo;for(;s;)ns(this,s.propertyEffects,e,t,i,s.nodeList),s=s.nextTemplateInfo}linkPaths(e,t){e=Ci(e),t=Ci(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Ci(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};Ps(this,Pi(this,e,i),i.path,t)}get(e,t){return Pi(t||this,e)}set(e,t,i){i?Ei(i,e,t):this[ts.READ_ONLY]&&this[ts.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},s=Pi(this,e,i),n=s.length,r=s.push(...t);return t.length&&Es(this,s,i.path,n,t.length,[]),r}pop(e){let t={path:""},i=Pi(this,e,t),s=Boolean(i.length),n=i.pop();return s&&Es(this,i,t.path,i.length,0,[n]),n}splice(e,t,i,...s){let n,r={path:""},o=Pi(this,e,r);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),n=2===arguments.length?o.splice(t):o.splice(t,i,...s),(s.length||n.length)&&Es(this,o,r.path,t,s.length,n),n}shift(e){let t={path:""},i=Pi(this,e,t),s=Boolean(i.length),n=i.shift();return s&&Es(this,i,t.path,0,0,[n]),n}unshift(e,...t){let i={path:""},s=Pi(this,e,i),n=s.unshift(...t);return t.length&&Es(this,s,i.path,0,t.length,[]),n}notifyPath(e,t){let i;if(1==arguments.length){let s={path:""};t=Pi(this,e,s),i=s.path}else i=Array.isArray(e)?Ci(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,ts.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let s={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,ts.OBSERVE,{fn:as,info:s,trigger:{name:e}}),i&&this._addPropertyEffect(t,ts.OBSERVE,{fn:as,info:s,trigger:{name:t}})}_createMethodObserver(e,t){let i=Ss(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");ys(this,i,ts.OBSERVE,bs,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,ts.NOTIFY,{fn:hs,info:{eventName:Ai(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,ts.REFLECT,{fn:cs,info:{attrName:t}})}_createComputedProperty(e,t,i){let s=Ss(t);if(!s)throw new Error("Malformed computed expression '"+t+"'");ys(this,s,ts.COMPUTE,ps,e,i)}_marshalArgs(e,t,i){const s=this.__data,n=[];for(let r=0,o=e.length;r<o;r++){let{name:o,structured:a,wildcard:l,value:d,literal:h}=e[r];if(!h)if(l){const e=xi(o,t),n=ks(s,i,e?t:o);d={path:e?t:o,value:n,base:e?Pi(s,o):n}}else d=a?ks(s,i,o):s[o];n[r]=d}return n}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),s=this.__templateInfo==i;if(!s)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t&&((i=Object.create(i)).wasPreBound=s,!s&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=i,i.previousTemplateInfo=e,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let s=e.propertyEffects=e.propertyEffects||{};(s[t]=s[t]||[]).push(i)}_stampTemplate(e){Rs.beginHosting(this);let t=super._stampTemplate(e);Rs.endHosting(this);let i=this._bindTemplate(e,!0);if(i.nodeList=t.nodeList,!i.wasPreBound){let e=i.childNodes=[];for(let i=t.firstChild;i;i=i.nextSibling)e.push(i)}return t.templateInfo=i,function(e,t){let{nodeList:i,nodeInfoList:s}=t;if(s.length)for(let t=0;t<s.length;t++){let n=s[t],r=i[t],o=n.bindings;if(o)for(let t=0;t<o.length;t++){let i=o[t];ms(r,i),gs(r,e,i)}r.__dataHost=e}}(this,i),this.__dataReady&&ns(this,i.propertyEffects,this.__data,null,!1,i.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let i=t.childNodes;for(let e=0;e<i.length;e++){let t=i[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,t,i){let s=super._parseTemplateNode(e,t,i);if(e.nodeType===Node.TEXT_NODE){let n=this._parseBindings(e.textContent,t);n&&(e.textContent=xs(n)||" ",us(this,t,i,"text","textContent",n),s=!0)}return s}static _parseTemplateNodeAttribute(e,t,i,s,n){let r=this._parseBindings(n,t);if(r){let n=s,o="property";is.test(s)?o="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),o="attribute");let a=xs(r);return a&&"attribute"==o&&("class"==s&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(s)),e.setAttribute(s,a)),"input"===e.localName&&"value"===n&&e.setAttribute(n,""),e.removeAttribute(n),"property"===o&&(s=Ni(s)),us(this,t,i,o,s,r,a),!0}return super._parseTemplateNodeAttribute(e,t,i,s,n)}static _parseTemplateNestedTemplate(e,t,i){let s=super._parseTemplateNestedTemplate(e,t,i),n=i.templateInfo.hostProps;for(let e in n)us(this,t,i,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}]);return s}static _parseBindings(e,t){let i,s=[],n=0;for(;null!==(i=ws.exec(e));){i.index>n&&s.push({literal:e.slice(n,i.index)});let r=i[1][0],o=Boolean(i[2]),a=i[3].trim(),l=!1,d="",h=-1;"{"==r&&(h=a.indexOf("::"))>0&&(d=a.substring(h+2),a=a.substring(0,h),l=!0);let c=Ss(a),p=[];if(c){let{args:e,methodName:i}=c;for(let t=0;t<e.length;t++){let i=e[t];i.literal||p.push(i)}let s=t.dynamicFns;(s&&s[i]||c.static)&&(p.push(i),c.dynamicFn=!0)}else p.push(a);s.push({source:a,mode:r,negate:o,customEvent:l,signature:c,dependencies:p,event:d}),n=ws.lastIndex}if(n&&n<e.length){let t=e.substring(n);t&&s.push({literal:t})}return s.length?s:null}static _evaluateBinding(e,t,i,s,n,r){let o;return o=t.signature?bs(e,i,s,0,t.signature):i!=t.source?Pi(e,t.source):r&&bi(i)?Pi(e,i):e.__data[i],t.negate&&(o=!o),o}}});const Rs=new class{constructor(){this.stack=[]}registerHost(e){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(e)}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}};const Os=ii(e=>{const t=Fi(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof n?t:null}function s(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=function(e){const t={};for(let i in e){const s=e[i];t[i]="function"==typeof s?{type:s}:s}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class n extends t{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){this.prototype;const e=this._properties;this.__observedAttributes=e?Object.keys(e).map(e=>this.attributeNameForProperty(e)):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=s(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,s(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return n}),Ns="3.2.0",As=window.ShadyCSS&&window.ShadyCSS.cssBuild,Is=ii(e=>{const t=Os(Ts(e));function i(e,t,i,s){if(!As){const n=t.content.querySelectorAll("style"),r=_i(t),o=function(e){let t=ci(e);return t?mi(t):[]}(i),a=t.content.firstElementChild;for(let i=0;i<o.length;i++){let n=o[i];n.textContent=e._processStyleText(n.textContent,s),t.content.insertBefore(n,a)}let l=0;for(let t=0;t<r.length;t++){let i=r[t],o=n[l];o!==i?(i=i.cloneNode(!0),o.parentNode.insertBefore(i,o)):l++,i.textContent=e._processStyleText(i.textContent,s)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i)}return class extends t{static get polymerElementVersion(){return Ns}static _finalizeClass(){super._finalizeClass();const e=((t=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",t))||(t.__ownObservers=t.hasOwnProperty(JSCompiler_renameProperty("observers",t))?t.observers:null),t.__ownObservers);var t;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):Zt||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let r in e)t=this.prototype,i=r,s=e[r],n=e,s.computed&&(s.readOnly=!0),s.computed&&(t._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):t._createComputedProperty(i,s.computed,n)),s.readOnly&&!t._hasReadOnlyEffect(i)?t._createReadOnlyProperty(i,!s.computed):!1===s.readOnly&&t._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),s.reflectToAttribute&&!t._hasReflectEffect(i)?t._createReflectedProperty(i):!1===s.reflectToAttribute&&t._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),s.notify&&!t._hasNotifyEffect(i)?t._createNotifyingProperty(i):!1===s.notify&&t._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),s.observer&&t._createPropertyObserver(i,s.observer,n[s.observer]),t._addPropertyToAttributeMap(i);var t,i,s,n}static createObservers(e,t){const i=this.prototype;for(let s=0;s<e.length;s++)i._createMethodObserver(e[s],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!Kt||Qt)&&(t=ai.import(e,"template"),Kt&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=Ut(e.url);else{const e=ai.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=Gt,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let s=t[i];"value"in s&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=s)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return Vt(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const s=this.importPath;i(this,t,e,s?qt(s):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=yi(this);if(t.attachShadow)return e?(t.shadowRoot||t.attachShadow({mode:"open"}),t.shadowRoot.appendChild(e),ei&&window.ShadyDOM&&ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=qt(this.importPath)),qt(e,t)}static _parseTemplateContent(e,t,i){return t.dynamicFns=t.dynamicFns||this._properties,super._parseTemplateContent(e,t,i)}static _addTemplatePropertyEffect(e,t,i){return!Zt||t in this._properties||console.warn(`Property '${t}' used in template but not declared in 'properties'; `+"attribute will not be observed."),super._addTemplatePropertyEffect(e,t,i)}}});class Ls{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,Ms.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),Ms.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,i){return e instanceof Ls?e._cancelAsync():e=new Ls,e.setConfig(t,i),e}}let Ms=new Set;const Ds=function(e){Ms.add(e)},zs=function(){const e=Boolean(Ms.size);return Ms.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e};let js="string"==typeof document.head.style.touchAction,Ws="__polymerGestures",Hs="__polymerGesturesHandled",$s="__polymerGesturesTouchAction",Fs=25,Bs=5,qs=2500,Vs=["mousedown","mousemove","mouseup","click"],Us=[0,1,4,2],Ys=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function Gs(e){return Vs.indexOf(e)>-1}let Xs=!1;function Js(e){if(!Gs(e)&&"touchend"!==e)return js&&Xs&&Jt?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){Xs=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let Ks=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Qs=[],Zs={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},en={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function tn(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let i=e.getRootNode();if(e.id){let s=i.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<s.length;e++)t.push(s[e])}}return t}let sn=function(e){let t=e.sourceCapabilities;var i;if((!t||t.firesTouchEvents)&&(e[Hs]={skip:!0},"click"===e.type)){let t=!1,s=dn(e);for(let e=0;e<s.length;e++){if(s[e].nodeType===Node.ELEMENT_NODE)if("label"===s[e].localName)Qs.push(s[e]);else if(i=s[e],Zs[i.localName]){let i=tn(s[e]);for(let e=0;e<i.length;e++)t=t||Qs.indexOf(i[e])>-1}if(s[e]===on.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function nn(e){let t=Ks?["click"]:Vs;for(let i,s=0;s<t.length;s++)i=t[s],e?(Qs.length=0,document.addEventListener(i,sn,!0)):document.removeEventListener(i,sn,!0)}function rn(e){let t=e.type;if(!Gs(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!Ys&&(t=Us[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let on={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function an(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function ln(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}document.addEventListener("touchend",function(e){on.mouse.mouseIgnoreJob||nn(!0),on.mouse.target=dn(e)[0],on.mouse.mouseIgnoreJob=Ls.debounce(on.mouse.mouseIgnoreJob,ji.after(qs),function(){nn(),on.mouse.target=null,on.mouse.mouseIgnoreJob=null})},!!Xs&&{passive:!0});const dn=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],hn={},cn=[];function pn(e){const t=dn(e);return t.length>0?t[0]:e.target}function un(e){let t,i=e.type,s=e.currentTarget[Ws];if(!s)return;let n=s[i];if(n){if(!e[Hs]&&(e[Hs]={},"touch"===i.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===i&&1===e.touches.length&&(on.touch.id=t.identifier),on.touch.id!==t.identifier)return;js||"touchstart"!==i&&"touchmove"!==i||function(e){let t=e.changedTouches[0],i=e.type;if("touchstart"===i)on.touch.x=t.clientX,on.touch.y=t.clientY,on.touch.scrollDecided=!1;else if("touchmove"===i){if(on.touch.scrollDecided)return;on.touch.scrollDecided=!0;let i=function(e){let t="auto",i=dn(e);for(let e,s=0;s<i.length;s++)if((e=i[s])[$s]){t=e[$s];break}return t}(e),s=!1,n=Math.abs(on.touch.x-t.clientX),r=Math.abs(on.touch.y-t.clientY);e.cancelable&&("none"===i?s=!0:"pan-x"===i?s=r>n:"pan-y"===i&&(s=n>r)),s?e.preventDefault():bn("track")}}(e)}if(!(t=e[Hs]).skip){for(let i,s=0;s<cn.length;s++)n[(i=cn[s]).name]&&!t[i.name]&&i.flow&&i.flow.start.indexOf(e.type)>-1&&i.reset&&i.reset();for(let s,r=0;r<cn.length;r++)n[(s=cn[r]).name]&&!t[s.name]&&(t[s.name]=!0,s[i](e))}}}function fn(e,t,i){return!!hn[t]&&(function(e,t,i){let s=hn[t],n=s.deps,r=s.name,o=e[Ws];o||(e[Ws]=o={});for(let t,i,s=0;s<n.length;s++)t=n[s],Ks&&Gs(t)&&"click"!==t||((i=o[t])||(o[t]=i={_count:0}),0===i._count&&e.addEventListener(t,un,Js(t)),i[r]=(i[r]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),s.touchAction&&gn(e,s.touchAction)}(e,t,i),!0)}function _n(e,t,i){return!!hn[t]&&(function(e,t,i){let s=hn[t],n=s.deps,r=s.name,o=e[Ws];if(o)for(let t,i,s=0;s<n.length;s++)t=n[s],(i=o[t])&&i[r]&&(i[r]=(i[r]||1)-1,i._count=(i._count||1)-1,0===i._count&&e.removeEventListener(t,un,Js(t)));e.removeEventListener(t,i)}(e,t,i),!0)}function mn(e){cn.push(e);for(let t=0;t<e.emits.length;t++)hn[e.emits[t]]=e}function gn(e,t){js&&e instanceof HTMLElement&&Hi.run(()=>{e.style.touchAction=t}),e[$s]=t}function yn(e,t,i){let s=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=i,yi(e).dispatchEvent(s),s.defaultPrevented){let e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function bn(e){let t=function(e){for(let t,i=0;i<cn.length;i++){t=cn[i];for(let i,s=0;s<t.emits.length;s++)if((i=t.emits[s])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function vn(e,t,i,s){t&&yn(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:s,prevent:function(e){return bn(e)}})}function wn(e,t,i){if(e.prevent)return!1;if(e.started)return!0;let s=Math.abs(e.x-t),n=Math.abs(e.y-i);return s>=Bs||n>=Bs}function xn(e,t,i){if(!t)return;let s,n=e.moves[e.moves.length-2],r=e.moves[e.moves.length-1],o=r.x-e.x,a=r.y-e.y,l=0;n&&(s=r.x-n.x,l=r.y-n.y),yn(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:o,dy:a,ddx:s,ddy:l,sourceEvent:i,hover:function(){return function(e,t){let i=document.elementFromPoint(e,t),s=i;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(e,t));)s&&(i=s);return i}(i.clientX,i.clientY)}})}function Sn(e,t,i){let s=Math.abs(t.clientX-e.x),n=Math.abs(t.clientY-e.y),r=pn(i||t);!r||en[r.localName]&&r.hasAttribute("disabled")||(isNaN(s)||isNaN(n)||s<=Fs&&n<=Fs||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=pn(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let i=t.getBoundingClientRect(),s=e.pageX,n=e.pageY;return!(s>=i.left&&s<=i.right&&n>=i.top&&n<=i.bottom)}return!1}(t))&&(e.prevent||yn(r,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}mn({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){ln(this.info)},mousedown:function(e){if(!rn(e))return;let t=pn(e),i=this;an(this.info,function(e){rn(e)||(vn("up",t,e),ln(i.info))},function(e){rn(e)&&vn("up",t,e),ln(i.info)}),vn("down",t,e)},touchstart:function(e){vn("down",pn(e),e.changedTouches[0],e)},touchend:function(e){vn("up",pn(e),e.changedTouches[0],e)}}),mn({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,ln(this.info)},mousedown:function(e){if(!rn(e))return;let t=pn(e),i=this,s=function(e){let s=e.clientX,n=e.clientY;wn(i.info,s,n)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&bn("tap"),i.info.addMove({x:s,y:n}),rn(e)||(i.info.state="end",ln(i.info)),t&&xn(i.info,t,e),i.info.started=!0)};an(this.info,s,function(e){i.info.started&&s(e),ln(i.info)}),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=pn(e),i=e.changedTouches[0],s=i.clientX,n=i.clientY;wn(this.info,s,n)&&("start"===this.info.state&&bn("tap"),this.info.addMove({x:s,y:n}),xn(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=pn(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),xn(this.info,t,i))}}),mn({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){rn(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){rn(e)&&Sn(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){Sn(this.info,e.changedTouches[0],e)}});const Cn=ii(e=>{return class extends e{_addEventListenerToNode(e,t,i){fn(e,t,i)||super._addEventListenerToNode(e,t,i)}_removeEventListenerFromNode(e,t,i){_n(e,t,i)||super._removeEventListenerFromNode(e,t,i)}}}),kn=/:host\(:dir\((ltr|rtl)\)\)/g,Pn=':host([dir="$1"])',En=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Tn=':host([dir="$2"]) $1',Rn=/:dir\((?:ltr|rtl)\)/,On=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),Nn=[];let An=null,In="";function Ln(){In=document.documentElement.getAttribute("dir")}function Mn(e){if(!e.__autoDirOptOut){e.setAttribute("dir",In)}}function Dn(){Ln(),In=document.documentElement.getAttribute("dir");for(let e=0;e<Nn.length;e++)Mn(Nn[e])}const zn=ii(e=>{On||An||(Ln(),(An=new MutationObserver(Dn)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=Vi(e);class i extends t{static _processStyleText(e,t){return e=super._processStyleText(e,t),!On&&Rn.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=(t=t.replace(kn,Pn)).replace(En,Tn)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(An&&An.takeRecords().length&&Dn(),Nn.push(this),Mn(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=Nn.indexOf(this);e>-1&&Nn.splice(e,1)}}}return i.__activateDir=!1,i});let jn=!1,Wn=[],Hn=[];function $n(){jn=!0,requestAnimationFrame(function(){jn=!1,function(e){for(;e.length;)Fn(e.shift())}(Wn),setTimeout(function(){!function(e){for(let t=0,i=e.length;t<i;t++)Fn(e.shift())}(Hn)})})}function Fn(e){const t=e[0],i=e[1],s=e[2];try{i.apply(t,s)}catch(e){setTimeout(()=>{throw e})}}function Bn(e,t,i){jn||$n(),Hn.push([e,t,i])}function qn(){document.body.removeAttribute("unresolved")}function Vn(e,t,i){return{index:e,removed:t,addedCount:i}}"interactive"===document.readyState||"complete"===document.readyState?qn():window.addEventListener("DOMContentLoaded",qn);const Un=0,Yn=1,Gn=2,Xn=3;function Jn(e,t,i,s,n,r){let o,a=0,l=0,d=Math.min(i-t,r-n);if(0==t&&0==n&&(a=function(e,t,i){for(let s=0;s<i;s++)if(!Qn(e[s],t[s]))return s;return i}(e,s,d)),i==e.length&&r==s.length&&(l=function(e,t,i){let s=e.length,n=t.length,r=0;for(;r<i&&Qn(e[--s],t[--n]);)r++;return r}(e,s,d-a)),n+=a,r-=l,(i-=l)-(t+=a)==0&&r-n==0)return[];if(t==i){for(o=Vn(t,[],0);n<r;)o.removed.push(s[n++]);return[o]}if(n==r)return[Vn(t,[],i-t)];let h=function(e){let t=e.length-1,i=e[0].length-1,s=e[t][i],n=[];for(;t>0||i>0;){if(0==t){n.push(Gn),i--;continue}if(0==i){n.push(Xn),t--;continue}let r,o=e[t-1][i-1],a=e[t-1][i],l=e[t][i-1];(r=a<l?a<o?a:o:l<o?l:o)==o?(o==s?n.push(Un):(n.push(Yn),s=o),t--,i--):r==a?(n.push(Xn),t--,s=a):(n.push(Gn),i--,s=l)}return n.reverse(),n}(function(e,t,i,s,n,r){let o=r-n+1,a=i-t+1,l=new Array(o);for(let e=0;e<o;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let i=1;i<o;i++)for(let r=1;r<a;r++)if(Qn(e[t+r-1],s[n+i-1]))l[i][r]=l[i-1][r-1];else{let e=l[i-1][r]+1,t=l[i][r-1]+1;l[i][r]=e<t?e:t}return l}(e,t,i,s,n,r));o=void 0;let c=[],p=t,u=n;for(let e=0;e<h.length;e++)switch(h[e]){case Un:o&&(c.push(o),o=void 0),p++,u++;break;case Yn:o||(o=Vn(p,[],0)),o.addedCount++,p++,o.removed.push(s[u]),u++;break;case Gn:o||(o=Vn(p,[],0)),o.addedCount++,p++;break;case Xn:o||(o=Vn(p,[],0)),o.removed.push(s[u]),u++}return o&&c.push(o),c}function Kn(e,t){return Jn(e,0,e.length,t,0,t.length)}function Qn(e,t){return e===t}function Zn(e){return"slot"===e.localName}let er=class{static getFlattenedNodes(e){const t=yi(e);return Zn(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>Zn(e)?yi(e=e).assignedNodes({flatten:!0}):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){Zn(this._target)?this._listenSlots([this._target]):yi(this._target).children&&(this._listenSlots(yi(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){Zn(this._target)?this._unlistenSlots([this._target]):yi(this._target).children&&(this._unlistenSlots(yi(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,Hi.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let i=e[t];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),i=Kn(t,this._effectiveNodes);for(let t,s=0;s<i.length&&(t=i[s]);s++)for(let i,s=0;s<t.removed.length&&(i=t.removed[s]);s++)e.removedNodes.push(i);for(let s,n=0;n<i.length&&(s=i[n]);n++)for(let i=s.index;i<s.index+s.addedCount;i++)e.addedNodes.push(t[i]);this._effectiveNodes=t;let s=!1;return(e.addedNodes.length||e.removedNodes.length)&&(s=!0,this.callback.call(this._target,e)),s}_listenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];Zn(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];Zn(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};const tr=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=zs()}while(e||t)},ir=Element.prototype,sr=ir.matches||ir.matchesSelector||ir.mozMatchesSelector||ir.msMatchesSelector||ir.oMatchesSelector||ir.webkitMatchesSelector,nr=function(e,t){return sr.call(e,t)};class rr{constructor(e){this.node=e}observeNodes(e){return new er(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(yi(this.node).contains(e))return!0;let t=e,i=e.ownerDocument;for(;t&&t!==i&&t!==this.node;)t=yi(t).parentNode||yi(t).host;return t===this.node}getOwnerRoot(){return yi(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?yi(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=yi(this.node).assignedSlot;for(;t;)e.push(t),t=yi(t).assignedSlot;return e}importNode(e,t){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return yi(i).importNode(e,t)}getEffectiveChildNodes(){return er.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),i=[];for(let s,n=0,r=t.length;n<r&&(s=t[n]);n++)s.nodeType===Node.ELEMENT_NODE&&nr(s,e)&&i.push(s);return i}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function or(e,t){for(let i=0;i<t.length;i++){let s=t[i];Object.defineProperty(e,s,{get:function(){return this.node[s]},configurable:!0})}}class ar{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}rr.prototype.cloneNode,rr.prototype.appendChild,rr.prototype.insertBefore,rr.prototype.removeChild,rr.prototype.replaceChild,rr.prototype.setAttribute,rr.prototype.removeAttribute,rr.prototype.querySelector,rr.prototype.querySelectorAll,rr.prototype.parentNode,rr.prototype.firstChild,rr.prototype.lastChild,rr.prototype.nextSibling,rr.prototype.previousSibling,rr.prototype.firstElementChild,rr.prototype.lastElementChild,rr.prototype.nextElementSibling,rr.prototype.previousElementSibling,rr.prototype.childNodes,rr.prototype.children,rr.prototype.classList,rr.prototype.textContent,rr.prototype.innerHTML;let lr=rr;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(rr.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=rr.prototype[t])}),or(e.prototype,["classList"]),lr=e,Object.defineProperties(ar.prototype,{localTarget:{get(){return this.event.currentTarget},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let i=0;i<t.length;i++){let s=t[i];e[s]=function(){return this.node[s].apply(this.node,arguments)}}}(rr.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),or(rr.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let i=0;i<t.length;i++){let s=t[i];Object.defineProperty(e,s,{get:function(){return this.node[s]},set:function(e){this.node[s]=e},configurable:!0})}}(rr.prototype,["textContent","innerHTML"]);const dr=function(e){if((e=e||document)instanceof lr)return e;if(e instanceof ar)return e;let t=e.__domApi;return t||(t=e instanceof Event?new ar(e):new lr(e),e.__domApi=t),t};let hr=window.ShadyCSS;const cr=ii(e=>{const t=zn(Cn(Is(e))),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,i,s){t!==i&&(super.attributeChangedCallback(e,t,i,s),this.attributeChanged(e,t,i))}attributeChanged(e,t,i){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,i){this._propertyToAttribute(e,t,i)}serializeValueToAttribute(e,t,i){this._valueToNodeAttribute(i||this,e,t)}extend(e,t){if(!e||!t)return e||t;let i=Object.getOwnPropertyNames(t);for(let s,n=0;n<i.length&&(s=i[n]);n++){let i=Object.getOwnPropertyDescriptor(t,s);i&&Object.defineProperty(e,s,i)}return e}mixin(e,t){for(let i in t)e[i]=t[i];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,i){i=i||{},t=null==t?{}:t;let s=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});s.detail=t;let n=i.node||this;return yi(n).dispatchEvent(s),s}listen(e,t,i){e=e||this;let s=this.__boundListeners||(this.__boundListeners=new WeakMap),n=s.get(e);n||(n={},s.set(e,n));let r=t+i;n[r]||(n[r]=this._addMethodEventListenerToNode(e,t,i,this))}unlisten(e,t,i){e=e||this;let s=this.__boundListeners&&this.__boundListeners.get(e),n=t+i,r=s&&s[n];r&&(this._removeEventListenerFromNode(e,t,r),s[n]=null)}setScrollDirection(e,t){gn(t||this,i[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=yi(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=dr(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return dr(this).getEffectiveChildNodes()}queryDistributedElements(e){return dr(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(e){return e.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let i,s=0;i=e[s];s++)i.nodeType!==Node.COMMENT_NODE&&t.push(i.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?dr(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter(function(e){return e.nodeType===Node.ELEMENT_NODE})}isLightDescendant(e){return this!==e&&yi(this).contains(e)&&yi(this).getRootNode()===yi(e).getRootNode()}isLocalDescendant(e){return this.root===yi(e).getRootNode()}scopeSubtree(e,t){}getComputedStyleValue(e){return hr.getComputedStyleValue(this,e)}debounce(e,t,i){return this._debouncers=this._debouncers||{},this._debouncers[e]=Ls.debounce(this._debouncers[e],i>0?ji.after(i):Hi,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?ji.run(e.bind(this),t):~Hi.run(e.bind(this))}cancelAsync(e){e<0?Hi.cancel(~e):ji.cancel(e)}create(e,t){let i=document.createElement(e);if(t)if(i.setProperties)i.setProperties(t);else for(let e in t)i[e]=t[e];return i}elementMatches(e,t){return nr(t||this,e)}toggleAttribute(e,t){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(t=!i.hasAttribute(e)),t?(yi(i).setAttribute(e,""),!0):(yi(i).removeAttribute(e),!1)}toggleClass(e,t,i){i=i||this,1==arguments.length&&(t=!i.classList.contains(e)),t?i.classList.add(e):i.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,i,s){s=s||this,this.transform("translate3d("+e+","+t+","+i+")",s)}arrayDelete(e,t){let i;if(Array.isArray(e)){if((i=e.indexOf(t))>=0)return e.splice(i,1)}else{if((i=Pi(this,e).indexOf(t))>=0)return this.splice(e,i,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return s.prototype.is="",s}),pr={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},ur={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},fr=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},ur);function _r(e,t,i,s){!function(e,t,i){const s=e._noAccessors,n=Object.getOwnPropertyNames(e);for(let r=0;r<n.length;r++){let o=n[r];if(!(o in i))if(s)t[o]=e[o];else{let i=Object.getOwnPropertyDescriptor(e,o);i&&(i.configurable=!0,Object.defineProperty(t,o,i))}}}(t,e,s);for(let e in pr)t[e]&&(i[e]=i[e]||[],i[e].push(t[e]))}function mr(e,t){for(const i in t){const s=e[i],n=t[i];e[i]=!("value"in n)&&s&&"value"in s?Object.assign({value:s.value},n):n}}function gr(e,t,i){let s;const n={};class r extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(s)for(let e,t=0;t<s.length;t++)(e=s[t]).properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else super._finalizeClass()}static get properties(){const t={};if(s)for(let e=0;e<s.length;e++)mr(t,s[e].properties);return mr(t,e.properties),t}static get observers(){let t=[];if(s)for(let e,i=0;i<s.length;i++)(e=s[i]).observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=n.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=r.prototype;if(!e.hasOwnProperty("__hasRegisterFinished")){e.__hasRegisterFinished=!0,super._registered(),Zt&&o(e);const t=Object.getPrototypeOf(this);let i=n.beforeRegister;if(i)for(let e=0;e<i.length;e++)i[e].call(t);if(i=n.registered)for(let e=0;e<i.length;e++)i[e].call(t)}}_applyListeners(){super._applyListeners();const e=n.listeners;if(e)for(let t=0;t<e.length;t++){const i=e[t];if(i)for(let e in i)this._addMethodEventListenerToNode(this,e,i[e])}}_ensureAttributes(){const e=n.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const i=e[t];for(let e in i)this._ensureAttribute(e,i[e])}super._ensureAttributes()}ready(){super.ready();let e=n.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=n.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=n.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,i){super.attributeChanged();let s=n.attributeChanged;if(s)for(let n=0;n<s.length;n++)s[n].call(this,e,t,i)}}if(i){Array.isArray(i)||(i=[i]);let e=t.prototype.behaviors;s=function e(t,i,s){i=i||[];for(let n=t.length-1;n>=0;n--){let r=t[n];r?Array.isArray(r)?e(r,i):i.indexOf(r)<0&&(!s||s.indexOf(r)<0)&&i.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return i}(i,null,e),r.prototype.behaviors=e?e.concat(i):s}const o=t=>{s&&function(e,t,i){for(let s=0;s<t.length;s++)_r(e,t[s],i,fr)}(t,s,n),_r(t,e,n,ur)};return Zt||o(r.prototype),r.generatedFrom=e,r}const yr=function(e){let t;return t="function"==typeof e?e:yr.Class(e),customElements.define(t.is,t),t};function br(e,t,i,s,n){let r;n&&(r="object"==typeof i&&null!==i)&&(s=e.__dataTemp[t]);let o=s!==i&&(s==s||i==i);return r&&o&&(e.__dataTemp[t]=i),o}yr.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let i=t?t(cr(HTMLElement)):cr(HTMLElement);return(i=gr(e,i,e.behaviors)).is=i.prototype.is=e.is,i};const vr=ii(e=>{return class extends e{_shouldPropertyChange(e,t,i){return br(this,e,t,i,!0)}}}),wr=ii(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,i){return br(this,e,t,i,this.mutableData)}}});vr._mutablePropertyChange=br;let xr=null;function Sr(){return xr}Sr.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Sr,writable:!0}});const Cr=Ts(Sr),kr=vr(Cr);const Pr=Ts(class{});class Er extends Pr{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=this.children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(e&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,i(e)});else{let s=this.__dataHost.__dataHost;s&&s._addEventListenerToNode(e,t,i)}}_showHideChildren(e){let t=this.children;for(let i=0;i<t.length;i++){let s=t[i];if(Boolean(e)!=Boolean(s.__hideTemplateChildren__))if(s.nodeType===Node.TEXT_NODE)e?(s.__polymerTextContent__=s.textContent,s.textContent=""):s.textContent=s.__polymerTextContent__;else if("slot"===s.localName)if(e)s.__polymerReplaced__=document.createComment("hidden-slot"),yi(yi(s).parentNode).replaceChild(s.__polymerReplaced__,s);else{const e=s.__polymerReplaced__;e&&yi(yi(e).parentNode).replaceChild(s,e)}else s.style&&(e?(s.__polymerDisplay__=s.style.display,s.style.display="none"):s.style.display=s.__polymerDisplay__);s.__hideTemplateChildren__=e,s._showHideChildren&&s._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,i){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(e,t,i)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}Er.prototype.__dataHost,Er.prototype.__templatizeOptions,Er.prototype._methodHost,Er.prototype.__templatizeOwner,Er.prototype.__hostProps;const Tr=vr(Er);function Rr(e){let t=e.__dataHost;return t&&t._methodHost||t}function Or(e,t,i){let s=i.mutableData?Tr:Er;Lr.mixin&&(s=Lr.mixin(s));let n=class extends s{};return n.prototype.__templatizeOptions=i,n.prototype._bindTemplate(e),function(e,t,i,s){let n=i.hostProps||{};for(let t in s.instanceProps){delete n[t];let i=s.notifyInstanceProp;i&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:Ir(t,i)})}if(s.forwardHostProp&&t.__dataHost)for(let t in n)e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,i){e.__dataHost._setPendingPropertyOrPath("_host_"+t,i[t],!0,!0)}})}(n,e,t,i),n}function Nr(e,t,i){let s=i.forwardHostProp;if(s){let n=t.templatizeTemplateClass;if(!n){let e=i.mutableData?kr:Cr;n=t.templatizeTemplateClass=class extends e{};let r=t.hostProps;for(let e in r)n.prototype._addPropertyEffect("_host_"+e,n.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:Ar(e,s)}),n.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){xr=e,Object.setPrototypeOf(e,t.prototype),new t,xr=null}(e,n),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function Ar(e,t){return function(e,i,s){t.call(e.__templatizeOwner,i.substring("_host_".length),s[i])}}function Ir(e,t){return function(e,i,s){t.call(e.__templatizeOwner,e,i,s[i])}}function Lr(e,t,i){if(Kt&&!Rr(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let s=(t?t.constructor:Er)._parseTemplate(e),n=s.templatizeInstanceClass;n||(n=Or(e,s,i),s.templatizeInstanceClass=n),Nr(e,s,i);let r=class extends n{};return r.prototype._methodHost=Rr(e),r.prototype.__dataHost=e,r.prototype.__templatizeOwner=t,r.prototype.__hostProps=s.hostProps,r=r}const Mr=Cn(wr(Ts(HTMLElement)));customElements.define("dom-bind",class extends Mr{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),Kt)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){yi(yi(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});class Dr{constructor(e){this.value=e.toString()}toString(){return this.value}}function zr(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof Dr)return function(e){if(e instanceof Dr)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}const jr=function(e,...t){const i=document.createElement("template");return i.innerHTML=t.reduce((t,i,s)=>t+zr(i)+e[s+1],e[0]),i},Wr=Is(HTMLElement),Hr=wr(Wr);class $r extends Hr{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let e=yi(yi(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=Lr(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let i=this.__instances;for(let s,n=0;n<i.length&&(s=i[n]);n++)s.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,i){if((s=this.as)===(n=t)||wi(s,n)||xi(s,n)){let s=e[this.itemsIndexAs];t==this.as&&(this.items[s]=i);let n=Si(this.as,`${JSCompiler_renameProperty("items",this)}.${s}`,t);this.notifyPath(n,i)}var s,n}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,i=this.__getMethodHost();return function(){return i[t].apply(i,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let i=0;i<t.length;i++)0===e.indexOf(t[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=Ls.debounce(this.__renderDebouncer,t>0?ji.after(t):Hi,e.bind(this)),Ds(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),tr()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let i=0;i<e.length;i++)t[i]=i;this.__filterFn&&(t=t.filter((t,i,s)=>this.__filterFn(e[t],i,s))),this.__sortFn&&t.sort((t,i)=>this.__sortFn(e[t],e[i]));const i=this.__itemsIdxToInstIdx={};let s=0;const n=Math.min(t.length,this.__limit);for(;s<n;s++){let n=this.__instances[s],r=t[s],o=e[r];i[r]=s,n?(n._setPendingProperty(this.as,o),n._setPendingProperty(this.indexAs,s),n._setPendingProperty(this.itemsIndexAs,r),n._flushProperties()):this.__insertInstance(o,s,r)}for(let e=this.__instances.length-1;e>=s;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const i=yi(t.root);for(let e=0;e<t.children.length;e++){let s=t.children[e];i.appendChild(s)}return t}__attachInstance(e,t){let i=this.__instances[e];t.insertBefore(i.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,i){let s={};return s[this.as]=e,s[this.indexAs]=t,s[this.itemsIndexAs]=i,new this.__ctor(s)}__insertInstance(e,t,i){let s=this.__pool.pop();s?(s._setPendingProperty(this.as,e),s._setPendingProperty(this.indexAs,t),s._setPendingProperty(this.itemsIndexAs,i),s._flushProperties()):s=this.__stampInstance(e,t,i);let n=this.__instances[t+1],r=n?n.children[0]:this;return yi(yi(this).parentNode).insertBefore(s.root,r),this.__instances[t]=s,s}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let i=e.slice(6),s=i.indexOf("."),n=s<0?i:i.substring(0,s);if(n==parseInt(n,10)){let e=s<0?"":i.substring(s+1);this.__handleObservedPaths(e);let r=this.__itemsIdxToInstIdx[n],o=this.__instances[r];if(o){let i=this.as+(e?"."+e:"");o._setPendingPropertyOrPath(i,t,!1,!0),o._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return function(e,t){let i;for(;t;)if(i=t.__templatizeInstance){if(i.__dataHost==e)return i;t=i.__dataHost}else t=yi(t).parentNode;return null}(this.template,e)}}customElements.define($r.is,$r);class Fr extends Wr{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=Ls.debounce(this.__renderDebouncer,Hi,()=>this.__render()),Ds(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=yi(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||yi(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){tr()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=yi(this).parentNode;if(e){if(!this.__ctor){let e=yi(this).querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!yi(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=Lr(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[vi(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(yi(this).previousSibling!==t[t.length-1])for(let i,s=0;s<t.length&&(i=t[s]);s++)yi(e).insertBefore(i,this)}}else this.__instance=new this.__ctor,yi(e).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=yi(e[0]).parentNode;if(t){t=yi(t);for(let i,s=0;s<e.length&&(i=e[s]);s++)t.removeChild(i)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(Fr.is,Fr);let Br=ii(e=>{let t=Is(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let i=t.path;if(i==JSCompiler_renameProperty("items",this)){let i=t.base||[],s=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),s){let e=Kn(i,s);this.__applySplices(e)}this.__lastItems=i,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let i=0;i<e.length;i++){let s=e[i];t.forEach((e,i)=>{e<s.index||(e>=s.index+s.removed.length?t.set(i,e+s.addedCount-s.removed.length):t.set(i,-1))});for(let e=0;e<s.addedCount;e++){let i=s.index+e;t.has(this.items[i])&&t.set(this.items[i],i)}}this.__updateLinks();let i=0;t.forEach((e,s)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,t.delete(s)):i++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((i,s)=>{t==e++&&this.deselect(s)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let i;this.__selectedMap.delete(e),this.multi&&(i=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(Wr);class qr extends Br{static get is(){return"array-selector"}static get template(){return null}}customElements.define(qr.is,qr);const Vr=new zt;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,i){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,i){},styleSubtree(e,t){Vr.processStyles(),ut(e,t)},styleElement(e){Vr.processStyles()},styleDocument(e){Vr.processStyles(),ut(document.body,e)},getComputedStyleValue:(e,t)=>ft(e,t),flushCustomStyles(){},nativeCss:Be,nativeShadow:je,cssBuild:He,disableRuntime:Fe}),window.ShadyCSS.CustomStyleInterface=Vr;const Ur="include",Yr=window.ShadyCSS.CustomStyleInterface;let Gr;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,Yr.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(Ur);return t&&(e.removeAttribute(Ur),e.textContent=function(e){let t=e.trim().split(/\s+/),i="";for(let e=0;e<t.length;e++)i+=gi(t[e]);return i}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),Gr=vr._mutablePropertyChange;cr(HTMLElement).prototype;var Xr=new Set;const Jr={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(Xr.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach(function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)},this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():Yt||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=dr(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",function t(){document.removeEventListener("readystatechange",t),e()})}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach(function(e){e!==this&&e._findParent()},this):(Xr.forEach(function(e){e!==this&&e._findParent()},this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?Xr.delete(this):Xr.add(this)}};class Kr{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach(function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)},this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var i=this.selection.indexOf(e);i>=0&&this.selection.splice(i,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}const Qr={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new Kr(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&dr(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=dr(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,i=0;t=this.items[i];i++)if(this._valueForItem(t)==e)return i},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var i=e[Ni(this.attrForSelected)];return null!=i?i:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return dr(e).observeNodes(function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})})},_activateHandler:function(e){for(var t=e.target,i=this.items;t&&t!=this;){var s=i.indexOf(t);if(s>=0){var n=this._indexToValue(s);return void this._itemActivate(n,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}};yr({_template:jr`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
`,is:"iron-pages",behaviors:[Jr,Qr],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(e,t){this.async(this.notifyResize)}});var Zr=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},eo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCard=class extends ze{constructor(){super(...arguments),this.elevation=1,this.padding=10}render(){return N`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    padding: ${this.padding}px;
                    opacity: 0;
                    /*height: 200px;*/
                    /*width: 100px;*/
                    //border: solid blue 2px;
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
                    //border: solid orange 2px;
                    padding: 5px;
                }
                div.overlay {
                    //border: solid green 2px;
                }
                
                slot {
                    box-sizing: border-box;
                    //border: solid purple 2px;
                }
                #aaa {
                    width: 100%;
                }
            </style>
            <div id="aaa" class="body">
                <slot id="body" @slotchange="${()=>this.slotChanged()}"></slot>
            </div>
            <div id="overlay" class="overlay">
                <svg id="svg"></svg>
            </div>
        `}slotChanged(){this.debug&&console.log("slot changed"),super.requestUpdate()}updated(){this.refreshElement()}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect();this.padding=(t.width+t.height)/100;const i=this.padding,s=2*i,n=i,r=t.width-s,o=t.height-s,a=Math.min(Math.max(1,this.elevation),5),l=r+(a-1)*n+s,d=o+(a-1)*n+s;e.setAttribute("width",`${l}`),e.setAttribute("height",`${d}`),Ee(e,i,i,r,o);for(let t=1;t<a;t++)Pe(e,t*n,o+t*n,r+t*n,o+t*n).style.opacity=`${(85-10*t)/100}`,Pe(e,r+t*n,o+t*n,r+t*n,t*n).style.opacity=`${(85-10*t)/100}`,Pe(e,t*n,o+t*n,r+t*n,o+t*n).style.opacity=`${(85-10*t)/100}`,Pe(e,r+t*n,o+t*n,r+t*n,t*n).style.opacity=`${(85-10*t)/100}`;this.classList.add("wired-rendered")}},Zr([te({type:Number}),eo("design:type",Object)],e.WiredCard.prototype,"elevation",void 0),Zr([te({type:Number}),eo("design:type",Object)],e.WiredCard.prototype,"padding",void 0),e.WiredCard=Zr([Q("wired-card")],e.WiredCard);var to=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},io=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredPages=class extends ze{constructor(){super(),this.page=""}connectedCallback(){super.connectedCallback()}render(){return N`
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
        `}refreshElement(){}pagesHaveChanged(){console.log("-------- PAGES HAVE CHANGED."),!this.slotElement&&this.shadowRoot}updated(e){e.has("page")&&(console.log("Page has changed."),this.pageChanged())}pageChanged(){window.dispatchEvent(new Event("resize"))}},to([te({type:String}),io("design:type",Object)],e.WiredPages.prototype,"page",void 0),to([ie("slot"),io("design:type",HTMLSlotElement)],e.WiredPages.prototype,"slotElement",void 0),e.WiredPages=to([Q("wired-pages"),io("design:paramtypes",[])],e.WiredPages),e.WiredPage=class extends ze{constructor(){super()}connectedCallback(){super.connectedCallback()}render(){return N`
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
        `}refreshElement(){}},e.WiredPage=to([Q("wired-page"),io("design:paramtypes",[])],e.WiredPage);var so=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};e.WiredApp=class extends ze{render(){return N`
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
        `}refreshElement(){}},e.WiredApp=so([Q("wired-app")],e.WiredApp);var no=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},ro=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredButton=class extends ze{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return le`

    `}render(){return N`
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
    `}firstUpdated(){this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),r=i.height+2*(s-1);t.setAttribute("width",`${n}`),t.setAttribute("height",`${r}`),Ee(t,0,0,i.width,i.height);for(let e=1;e<s;e++)Pe(t,2*e,i.height+2*e,i.width+2*e,i.height+2*e).style.opacity=`${(75-10*e)/100}`,Pe(t,i.width+2*e,i.height+2*e,i.width+2*e,2*e).style.opacity=`${(75-10*e)/100}`,Pe(t,2*e,i.height+2*e,i.width+2*e,i.height+2*e).style.opacity=`${(75-10*e)/100}`,Pe(t,i.width+2*e,i.height+2*e,i.width+2*e,2*e).style.opacity=`${(75-10*e)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){this.requestUpdate()}},no([te({type:Number}),ro("design:type",Object)],e.WiredButton.prototype,"elevation",void 0),no([te({type:Boolean,reflect:!0}),ro("design:type",Object)],e.WiredButton.prototype,"disabled",void 0),e.WiredButton=no([Q("wired-button")],e.WiredButton);var oo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},ao=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCheckbox=class extends ze{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return le`
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
    `}render(){return N`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.toggleCheck())})}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=24,s=24;t.setAttribute("width",`${i}`),t.setAttribute("height",`${s}`),Ee(t,0,0,i,s);const n=[];n.push(Pe(t,.3*i,.4*s,.5*i,.7*s)),n.push(Pe(t,.5*i,.7*s,i+5,-5)),n.forEach(e=>{e.style.strokeWidth="2.5"}),this.checked?n.forEach(e=>{e.style.display=""}):n.forEach(e=>{e.style.display="none"}),this.classList.add("wired-rendered")}refreshElement(){}},oo([te({type:Boolean}),ao("design:type",Object)],e.WiredCheckbox.prototype,"checked",void 0),oo([te({type:Boolean,reflect:!0}),ao("design:type",Object)],e.WiredCheckbox.prototype,"disabled",void 0),e.WiredCheckbox=oo([Q("wired-checkbox")],e.WiredCheckbox);var lo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},ho=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredItem=class extends ze{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}render(){return N`
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
            <button class="${this.selected?"selected":""}">
                <div class="overlay">
                    <svg></svg>
                </div>
                <span>
                    <slot></slot>
                </span>
            </button>
        `}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){this.refreshElement()}refreshElement(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const e=this.getBoundingClientRect();this.svg.setAttribute("width",`${e.width}`),this.svg.setAttribute("height",`${e.height}`);const t=Ae([[0,0],[e.width,0],[e.width,e.height],[0,e.height]]);this.svg.appendChild(t)}}},lo([te(),ho("design:type",Object)],e.WiredItem.prototype,"value",void 0),lo([te(),ho("design:type",Object)],e.WiredItem.prototype,"name",void 0),lo([te({type:Boolean}),ho("design:type",Object)],e.WiredItem.prototype,"selected",void 0),lo([ie("svg"),ho("design:type",SVGSVGElement)],e.WiredItem.prototype,"svg",void 0),e.WiredItem=lo([Q("wired-item")],e.WiredItem);var co=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},po=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredCombo=class extends ze{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return le`
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
    `}render(){return N`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(e){if(e.has("disabled")&&this.refreshDisabledState(),this.refreshElement(),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}setCardShowing(e){this.cardShowing=e;const t=this.shadowRoot.getElementById("card");t.style.display=e?"":"none",e&&setTimeout(()=>{t.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(e=>e.nodeType===Node.ELEMENT_NODE).forEach(e=>{const t=e;t.requestUpdate&&t.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${t.width}`),e.setAttribute("height",`${t.height}`);const i=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=i.height+"px",Ee(e,0,0,i.width,i.height);const s=i.width-4;Ee(e,s,0,34,i.height);const n=Math.max(0,Math.abs((i.height-24)/2)),r=Te(e,[[s+8,5+n],[s+26,5+n],[s+17,n+Math.min(i.height,18)]]);r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered")}},co([te({type:Object}),po("design:type",Object)],e.WiredCombo.prototype,"value",void 0),co([te({type:String}),po("design:type",String)],e.WiredCombo.prototype,"selected",void 0),co([te({type:Boolean,reflect:!0}),po("design:type",Object)],e.WiredCombo.prototype,"disabled",void 0),e.WiredCombo=co([Q("wired-combo")],e.WiredCombo);const uo={},fo=jr`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;fo.setAttribute("style","display: none;"),document.head.appendChild(fo.content);var _o=document.createElement("style");_o.textContent="[hidden] { display: none !important; }",document.head.appendChild(_o),yr({_template:jr`
    <style>
      :host {
        position: fixed;
        top: -120px;
        right: 0;
        bottom: -120px;
        left: 0;

        visibility: hidden;

        transition-property: visibility;
      }

      :host([opened]) {
        visibility: visible;
      }

      :host([persistent]) {
        width: var(--app-drawer-width, 256px);
      }

      :host([persistent][position=left]) {
        right: auto;
      }

      :host([persistent][position=right]) {
        left: auto;
      }

      #contentContainer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        width: var(--app-drawer-width, 256px);
        padding: 120px 0;

        transition-property: -webkit-transform;
        transition-property: transform;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);

        background-color: #FFF;

        @apply --app-drawer-content-container;
      }

      #contentContainer[persistent] {
        width: 100%;
      }

      #contentContainer[position=right] {
        right: 0;
        left: auto;

        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
      }

      #contentContainer[swipe-open]::after {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 100%;

        visibility: visible;

        width: 20px;

        content: '';
      }

      #contentContainer[swipe-open][position=right]::after {
        right: 100%;
        left: auto;
      }

      #contentContainer[opened] {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      #scrim {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        transition-property: opacity;
        -webkit-transform: translateZ(0);
        transform:  translateZ(0);

        opacity: 0;
        background: var(--app-drawer-scrim-background, rgba(0, 0, 0, 0.5));
      }

      #scrim.visible {
        opacity: 1;
      }

      :host([no-transition]) #contentContainer {
        transition-property: none;
      }
    </style>

    <div id="scrim" on-click="close"></div>

    <!-- HACK(keanulee): Bind attributes here (in addition to :host) for styling to workaround Safari
    bug. https://bugs.webkit.org/show_bug.cgi?id=170762 -->
    <div id="contentContainer" opened\$="[[opened]]" persistent\$="[[persistent]]" position\$="[[position]]" swipe-open\$="[[swipeOpen]]">
      <slot></slot>
    </div>
`,is:"app-drawer",properties:{opened:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},persistent:{type:Boolean,value:!1,reflectToAttribute:!0},transitionDuration:{type:Number,value:200},align:{type:String,value:"left"},position:{type:String,readOnly:!0,reflectToAttribute:!0},swipeOpen:{type:Boolean,value:!1,reflectToAttribute:!0},noFocusTrap:{type:Boolean,value:!1},disableSwipe:{type:Boolean,value:!1}},observers:["resetLayout(position, isAttached)","_resetPosition(align, isAttached)","_styleTransitionDuration(transitionDuration)","_openedPersistentChanged(opened, persistent)"],_translateOffset:0,_trackDetails:null,_drawerState:0,_boundEscKeydownHandler:null,_firstTabStop:null,_lastTabStop:null,attached:function(){Bn(this,function(){this._boundEscKeydownHandler=this._escKeydownHandler.bind(this),this.addEventListener("keydown",this._tabKeydownHandler.bind(this)),this.listen(this,"track","_track"),this.setScrollDirection("y")}),this.fire("app-reset-layout")},detached:function(){document.removeEventListener("keydown",this._boundEscKeydownHandler)},open:function(){this.opened=!0},close:function(){this.opened=!1},toggle:function(){this.opened=!this.opened},getWidth:function(){return this._savedWidth||this.$.contentContainer.offsetWidth},_isRTL:function(){return"rtl"===window.getComputedStyle(this).direction},_resetPosition:function(){switch(this.align){case"start":return void this._setPosition(this._isRTL()?"right":"left");case"end":return void this._setPosition(this._isRTL()?"left":"right")}this._setPosition(this.align)},_escKeydownHandler:function(e){27===e.keyCode&&(e.preventDefault(),this.close())},_track:function(e){if(!this.persistent&&!this.disableSwipe)switch(e.preventDefault(),e.detail.state){case"start":this._trackStart(e);break;case"track":this._trackMove(e);break;case"end":this._trackEnd(e)}},_trackStart:function(e){this._drawerState=this._DRAWER_STATE.TRACKING;var t=this.$.contentContainer.getBoundingClientRect();this._savedWidth=t.width,"left"===this.position?this._translateOffset=t.left:this._translateOffset=t.right-window.innerWidth,this._trackDetails=[],this._styleTransitionDuration(0),this.style.visibility="visible"},_trackMove:function(e){this._translateDrawer(e.detail.dx+this._translateOffset),this._trackDetails.push({dx:e.detail.dx,timeStamp:Date.now()})},_trackEnd:function(e){var t=e.detail.dx+this._translateOffset,i=this.getWidth(),s="left"===this.position?t>=0||t<=-i:t<=0||t>=i;if(!s){var n=this._trackDetails;if(this._trackDetails=null,this._flingDrawer(e,n),this._drawerState===this._DRAWER_STATE.FLINGING)return}var r=i/2;e.detail.dx<-r?this.opened="right"===this.position:e.detail.dx>r&&(this.opened="left"===this.position),s?this.debounce("_resetDrawerState",this._resetDrawerState):this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration),this._styleTransitionDuration(this.transitionDuration),this._resetDrawerTranslate(),this.style.visibility=""},_calculateVelocity:function(e,t){for(var i,s=Date.now(),n=s-100,r=0,o=t.length-1;r<=o;){var a=r+o>>1,l=t[a];l.timeStamp>=n?(i=l,o=a-1):r=a+1}return i?(e.detail.dx-i.dx)/(s-i.timeStamp||1):0},_flingDrawer:function(e,t){var i=this._calculateVelocity(e,t);if(!(Math.abs(i)<this._MIN_FLING_THRESHOLD)){this._drawerState=this._DRAWER_STATE.FLINGING;var s,n=e.detail.dx+this._translateOffset,r=this.getWidth(),o="left"===this.position,a=i>0;s=!a&&o?-(n+r):a&&!o?r-n:-n,a?(i=Math.max(i,this._MIN_TRANSITION_VELOCITY),this.opened="left"===this.position):(i=Math.min(i,-this._MIN_TRANSITION_VELOCITY),this.opened="right"===this.position);var l=this._FLING_INITIAL_SLOPE*s/i;this._styleTransitionDuration(l),this._styleTransitionTimingFunction(this._FLING_TIMING_FUNCTION),this._resetDrawerTranslate(),this.debounce("_resetDrawerState",this._resetDrawerState,l)}},_styleTransitionDuration:function(e){this.style.transitionDuration=e+"ms",this.$.contentContainer.style.transitionDuration=e+"ms",this.$.scrim.style.transitionDuration=e+"ms"},_styleTransitionTimingFunction:function(e){this.$.contentContainer.style.transitionTimingFunction=e,this.$.scrim.style.transitionTimingFunction=e},_translateDrawer:function(e){var t=this.getWidth();"left"===this.position?(e=Math.max(-t,Math.min(e,0)),this.$.scrim.style.opacity=1+e/t):(e=Math.max(0,Math.min(e,t)),this.$.scrim.style.opacity=1-e/t),this.translate3d(e+"px","0","0",this.$.contentContainer)},_resetDrawerTranslate:function(){this.$.scrim.style.opacity="",this.transform("",this.$.contentContainer)},_resetDrawerState:function(){var e=this._drawerState;e===this._DRAWER_STATE.FLINGING&&(this._styleTransitionDuration(this.transitionDuration),this._styleTransitionTimingFunction(""),this.style.visibility=""),this._savedWidth=null,this.opened?this._drawerState=this.persistent?this._DRAWER_STATE.OPENED_PERSISTENT:this._DRAWER_STATE.OPENED:this._drawerState=this._DRAWER_STATE.CLOSED,e!==this._drawerState&&(this._drawerState===this._DRAWER_STATE.OPENED?(this._setKeyboardFocusTrap(),document.addEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow="hidden"):(document.removeEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow=""),e!==this._DRAWER_STATE.INIT&&this.fire("app-drawer-transitioned"))},resetLayout:function(){this.fire("app-reset-layout")},_setKeyboardFocusTrap:function(){if(!this.noFocusTrap){var e=['a[href]:not([tabindex="-1"])','area[href]:not([tabindex="-1"])','input:not([disabled]):not([tabindex="-1"])','select:not([disabled]):not([tabindex="-1"])','textarea:not([disabled]):not([tabindex="-1"])','button:not([disabled]):not([tabindex="-1"])','iframe:not([tabindex="-1"])','[tabindex]:not([tabindex="-1"])','[contentEditable=true]:not([tabindex="-1"])'].join(","),t=dr(this).querySelectorAll(e);t.length>0?(this._firstTabStop=t[0],this._lastTabStop=t[t.length-1]):(this._firstTabStop=null,this._lastTabStop=null);var i=this.getAttribute("tabindex");i&&parseInt(i,10)>-1?this.focus():this._firstTabStop&&this._firstTabStop.focus()}},_tabKeydownHandler:function(e){if(!this.noFocusTrap){this._drawerState===this._DRAWER_STATE.OPENED&&9===e.keyCode&&(e.shiftKey?this._firstTabStop&&dr(e).localTarget===this._firstTabStop&&(e.preventDefault(),this._lastTabStop.focus()):this._lastTabStop&&dr(e).localTarget===this._lastTabStop&&(e.preventDefault(),this._firstTabStop.focus()))}},_openedPersistentChanged:function(e,t){this.toggleClass("visible",e&&!t,this.$.scrim),this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration)},_MIN_FLING_THRESHOLD:.2,_MIN_TRANSITION_VELOCITY:1.2,_FLING_TIMING_FUNCTION:"cubic-bezier(0.667, 1, 0.667, 1)",_FLING_INITIAL_SLOPE:1.5,_DRAWER_STATE:{INIT:0,OPENED:1,OPENED_PERSISTENT:2,CLOSED:3,TRACKING:4,FLINGING:5}}),yr({is:"iron-media-query",properties:{queryMatches:{type:Boolean,value:!1,readOnly:!0,notify:!0},query:{type:String,observer:"queryChanged"},full:{type:Boolean,value:!1},_boundMQHandler:{value:function(){return this.queryHandler.bind(this)}},_mq:{value:null}},attached:function(){this.style.display="none",this.queryChanged()},detached:function(){this._remove()},_add:function(){this._mq&&this._mq.addListener(this._boundMQHandler)},_remove:function(){this._mq&&this._mq.removeListener(this._boundMQHandler),this._mq=null},queryChanged:function(){this._remove();var e=this.query;e&&(this.full||"("===e[0]||(e="("+e+")"),this._mq=window.matchMedia(e),this._add(),this.queryHandler(this._mq))},queryHandler:function(e){this._setQueryMatches(e.matches)}});const mo=[Jr,{listeners:{"app-reset-layout":"_appResetLayoutHandler","iron-resize":"resetLayout"},attached:function(){this.fire("app-reset-layout")},_appResetLayoutHandler:function(e){dr(e).path[0]!==this&&(this.resetLayout(),e.stopPropagation())},_updateLayoutStates:function(){console.error("unimplemented")},resetLayout:function(){var e=this._updateLayoutStates.bind(this);this._layoutDebouncer=Ls.debounce(this._layoutDebouncer,Wi,e),Ds(this._layoutDebouncer),this._notifyDescendantResize()},_notifyLayoutChanged:function(){var e=this;requestAnimationFrame(function(){e.fire("app-reset-layout")})},_notifyDescendantResize:function(){this.isAttached&&this._interestedResizables.forEach(function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)},this)}}];yr({_template:jr`
    <style>
      :host {
        display: block;
        /**
         * Force app-drawer-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements.
         */
        position: relative;
        z-index: 0;
      }

      :host ::slotted([slot=drawer]) {
        z-index: 1;
      }

      :host([fullbleed]) {
        @apply --layout-fit;
      }

      #contentContainer {
        /* Create a stacking context here so that all children appear below the header. */
        position: relative;
        z-index: 0;
        height: 100%;
        transition: var(--app-drawer-layout-content-transition, none);
      }

      #contentContainer[drawer-position=left] {
        margin-left: var(--app-drawer-width, 256px);
      }

      #contentContainer[drawer-position=right] {
        margin-right: var(--app-drawer-width, 256px);
      }
    </style>

    <slot id="drawerSlot" name="drawer"></slot>

    <div id="contentContainer" drawer-position\$="[[_drawerPosition]]">
      <slot></slot>
    </div>

    <iron-media-query query="[[_computeMediaQuery(forceNarrow, responsiveWidth)]]" on-query-matches-changed="_onQueryMatchesChanged"></iron-media-query>
`,is:"app-drawer-layout",behaviors:[mo],properties:{forceNarrow:{type:Boolean,value:!1},responsiveWidth:{type:String,value:"640px"},narrow:{type:Boolean,reflectToAttribute:!0,readOnly:!0,notify:!0},openedWhenNarrow:{type:Boolean,value:!1},_drawerPosition:{type:String}},listeners:{click:"_clickHandler"},observers:["_narrowChanged(narrow)"],get drawer(){return dr(this.$.drawerSlot).getDistributedNodes()[0]},attached:function(){var e=this.drawer;e&&e.setAttribute("no-transition","")},_clickHandler:function(e){var t=dr(e).localTarget;if(t&&t.hasAttribute("drawer-toggle")){var i=this.drawer;i&&!i.persistent&&i.toggle()}},_updateLayoutStates:function(){var e=this.drawer;this.isAttached&&e&&(this._drawerPosition=this.narrow?null:e.position,this._drawerNeedsReset&&(this.narrow?(e.opened=this.openedWhenNarrow,e.persistent=!1):e.opened=e.persistent=!0,e.hasAttribute("no-transition")&&Bn(this,function(){e.removeAttribute("no-transition")}),this._drawerNeedsReset=!1))},_narrowChanged:function(){this._drawerNeedsReset=!0,this.resetLayout()},_onQueryMatchesChanged:function(e){this._setNarrow(e.detail.value)},_computeMediaQuery:function(e,t){return e?"(min-width: 0px)":"(max-width: "+t+")"}});const go=document.createElement("template");go.setAttribute("style","display: none;"),go.innerHTML='<dom-module id="app-grid-style">\n  <template>\n    <style>\n      :host {\n        /**\n         * The width for the expandible item is:\n         * ((100% - subPixelAdjustment) / columns * itemColumns - gutter\n         *\n         * - subPixelAdjustment: 0.1px (Required for IE 11)\n         * - gutter: var(--app-grid-gutter)\n         * - columns: var(--app-grid-columns)\n         * - itemColumn: var(--app-grid-expandible-item-columns)\n         */\n        --app-grid-expandible-item: {\n          -webkit-flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          max-width: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n        };\n      }\n\n      .app-grid {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n\n        padding-top: var(--app-grid-gutter, 0px);\n        padding-left: var(--app-grid-gutter, 0px);\n        box-sizing: border-box;\n      }\n\n      .app-grid > * {\n        /* Required for IE 10 */\n        -ms-flex: 1 1 100%;\n        -webkit-flex: 1;\n        flex: 1;\n\n        /* The width for an item is: (100% - subPixelAdjustment - gutter * columns) / columns */\n        -webkit-flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n\n        max-width: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        margin-bottom: var(--app-grid-gutter, 0px);\n        margin-right: var(--app-grid-gutter, 0px);\n        height: var(--app-grid-item-height);\n        box-sizing: border-box;\n      }\n\n      .app-grid[has-aspect-ratio] > * {\n        position: relative;\n      }\n\n      .app-grid[has-aspect-ratio] > *::before {\n        display: block;\n        content: "";\n        padding-top: var(--app-grid-item-height, 100%);\n      }\n\n      .app-grid[has-aspect-ratio] > * > * {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(go.content);const yo=[{properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(e,t){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),t)if("document"===e)this.scrollTarget=this._doc;else if("string"==typeof e){var i=this.domHost;this.scrollTarget=i&&i.$?i.$[e]:dr(this.ownerDocument).querySelector("#"+e)}else this._isValidScrollTarget()&&(this._oldScrollTarget=e,this._toggleScrollListener(this._shouldHaveListener,e))},_scrollHandler:function(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(e){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,e):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=e)},set _scrollLeft(e){this.scrollTarget===this._doc?window.scrollTo(e,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=e)},scroll:function(e,t){var i;"object"==typeof e?(i=e.left,t=e.top):i=e,i=i||0,t=t||0,this.scrollTarget===this._doc?window.scrollTo(i,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=i,this.scrollTarget.scrollTop=t)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(e,t){var i=t===this._doc?window:t;e?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),i.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(i.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(e){this._shouldHaveListener=e,this._toggleScrollListener(e,this.scrollTarget)}},{properties:{effects:{type:String},effectsConfig:{type:Object,value:function(){return{}}},disabled:{type:Boolean,reflectToAttribute:!0,value:!1},threshold:{type:Number,value:0},thresholdTriggered:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0}},observers:["_effectsChanged(effects, effectsConfig, isAttached)"],_updateScrollState:function(e){},isOnScreen:function(){return!1},isContentBelow:function(){return!1},_effectsRunFn:null,_effects:null,get _clampedScrollTop(){return Math.max(0,this._scrollTop)},attached:function(){this._scrollStateChanged()},detached:function(){this._tearDownEffects()},createEffect:function(e,t){var i=uo[e];if(!i)throw new ReferenceError(this._getUndefinedMsg(e));var s=this._boundEffect(i,t||{});return s.setUp(),s},_effectsChanged:function(e,t,i){this._tearDownEffects(),e&&i&&(e.split(" ").forEach(function(e){var i;""!==e&&((i=uo[e])?this._effects.push(this._boundEffect(i,t[e])):console.warn(this._getUndefinedMsg(e)))},this),this._setUpEffect())},_layoutIfDirty:function(){return this.offsetWidth},_boundEffect:function(e,t){t=t||{};var i=parseFloat(t.startsAt||0),s=parseFloat(t.endsAt||1),n=s-i,r=function(){},o=0===i&&1===s?e.run:function(t,s){e.run.call(this,Math.max(0,(t-i)/n),s)};return{setUp:e.setUp?e.setUp.bind(this,t):r,run:e.run?o.bind(this):r,tearDown:e.tearDown?e.tearDown.bind(this):r}},_setUpEffect:function(){this.isAttached&&this._effects&&(this._effectsRunFn=[],this._effects.forEach(function(e){!1!==e.setUp()&&this._effectsRunFn.push(e.run)},this))},_tearDownEffects:function(){this._effects&&this._effects.forEach(function(e){e.tearDown()}),this._effectsRunFn=[],this._effects=[]},_runEffects:function(e,t){this._effectsRunFn&&this._effectsRunFn.forEach(function(i){i(e,t)})},_scrollHandler:function(){this._scrollStateChanged()},_scrollStateChanged:function(){if(!this.disabled){var e=this._clampedScrollTop;this._updateScrollState(e),this.threshold>0&&this._setThresholdTriggered(e>=this.threshold)}},_getDOMRef:function(e){console.warn("_getDOMRef","`"+e+"` is undefined")},_getUndefinedMsg:function(e){return"Scroll effect `"+e+"` is undefined. Did you forget to import app-layout/app-scroll-effects/effects/"+e+".html ?"}}];yr({_template:jr`
    <style>
      :host {
        position: relative;
        display: block;
        transition-timing-function: linear;
        transition-property: -webkit-transform;
        transition-property: transform;
      }

      :host::before {
        position: absolute;
        right: 0px;
        bottom: -5px;
        left: 0px;
        width: 100%;
        height: 5px;
        content: "";
        transition: opacity 0.4s;
        pointer-events: none;
        opacity: 0;
        box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
        will-change: opacity;
        @apply --app-header-shadow;
      }

      :host([shadow])::before {
        opacity: 1;
      }

      #background {
        @apply --layout-fit;
        overflow: hidden;
      }

      #backgroundFrontLayer,
      #backgroundRearLayer {
        @apply --layout-fit;
        height: 100%;
        pointer-events: none;
        background-size: cover;
      }

      #backgroundFrontLayer {
        @apply --app-header-background-front-layer;
      }

      #backgroundRearLayer {
        opacity: 0;
        @apply --app-header-background-rear-layer;
      }

      #contentContainer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      :host([disabled]),
      :host([disabled])::after,
      :host([disabled]) #backgroundFrontLayer,
      :host([disabled]) #backgroundRearLayer,
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]),
      :host([silent-scroll])::after,
      :host([silent-scroll]) #backgroundFrontLayer,
      :host([silent-scroll]) #backgroundRearLayer {
        transition: none !important;
      }

      :host([disabled]) ::slotted(app-toolbar:first-of-type),
      :host([disabled]) ::slotted([sticky]),
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]) ::slotted(app-toolbar:first-of-type),
      :host([silent-scroll]) ::slotted([sticky]) {
        transition: none !important;
      }

    </style>
    <div id="contentContainer">
      <slot id="slot"></slot>
    </div>
`,is:"app-header",behaviors:[yo,mo],properties:{condenses:{type:Boolean,value:!1},fixed:{type:Boolean,value:!1},reveals:{type:Boolean,value:!1},shadow:{type:Boolean,reflectToAttribute:!0,value:!1}},observers:["_configChanged(isAttached, condenses, fixed)"],_height:0,_dHeight:0,_stickyElTop:0,_stickyElRef:null,_top:0,_progress:0,_wasScrollingDown:!1,_initScrollTop:0,_initTimestamp:0,_lastTimestamp:0,_lastScrollTop:0,get _maxHeaderTop(){return this.fixed?this._dHeight:this._height+5},get _stickyEl(){if(this._stickyElRef)return this._stickyElRef;for(var e,t=dr(this.$.slot).getDistributedNodes(),i=0;e=t[i];i++)if(e.nodeType===Node.ELEMENT_NODE){if(e.hasAttribute("sticky")){this._stickyElRef=e;break}this._stickyElRef||(this._stickyElRef=e)}return this._stickyElRef},_configChanged:function(){this.resetLayout(),this._notifyLayoutChanged()},_updateLayoutStates:function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var e=this._clampedScrollTop,t=0===this._height||0===e,i=this.disabled;this._height=this.offsetHeight,this._stickyElRef=null,this.disabled=!0,t||this._updateScrollState(0,!0),this._mayMove()?this._dHeight=this._stickyEl?this._height-this._stickyEl.offsetHeight:0:this._dHeight=0,this._stickyElTop=this._stickyEl?this._stickyEl.offsetTop:0,this._setUpEffect(),t?this._updateScrollState(e,!0):(this._updateScrollState(this._lastScrollTop,!0),this._layoutIfDirty()),this.disabled=i}},_updateScrollState:function(e,t){if(0!==this._height){var i=0,s=0,n=this._top,r=(this._lastScrollTop,this._maxHeaderTop),o=e-this._lastScrollTop,a=Math.abs(o),l=e>this._lastScrollTop,d=performance.now();if(this._mayMove()&&(s=this._clamp(this.reveals?n+o:e,0,r)),e>=this._dHeight&&(s=this.condenses&&!this.fixed?Math.max(this._dHeight,s):s,this.style.transitionDuration="0ms"),this.reveals&&!this.disabled&&a<100&&((d-this._initTimestamp>300||this._wasScrollingDown!==l)&&(this._initScrollTop=e,this._initTimestamp=d),e>=r))if(Math.abs(this._initScrollTop-e)>30||a>10){l&&e>=r?s=r:!l&&e>=this._dHeight&&(s=this.condenses&&!this.fixed?this._dHeight:0);var h=o/(d-this._lastTimestamp);this.style.transitionDuration=this._clamp((s-n)/h,0,300)+"ms"}else s=this._top;i=0===this._dHeight?e>0?1:0:s/this._dHeight,t||(this._lastScrollTop=e,this._top=s,this._wasScrollingDown=l,this._lastTimestamp=d),(t||i!==this._progress||n!==s||0===e)&&(this._progress=i,this._runEffects(i,s),this._transformHeader(s))}},_mayMove:function(){return this.condenses||!this.fixed},willCondense:function(){return this._dHeight>0&&this.condenses},isOnScreen:function(){return 0!==this._height&&this._top<this._height},isContentBelow:function(){return 0===this._top?this._clampedScrollTop>0:this._clampedScrollTop-this._maxHeaderTop>=0},_transformHeader:function(e){this.translate3d(0,-e+"px",0),this._stickyEl&&this.translate3d(0,this.condenses&&e>=this._stickyElTop?Math.min(e,this._dHeight)-this._stickyElTop+"px":0,0,this._stickyEl)},_clamp:function(e,t,i){return Math.min(i,Math.max(t,e))},_ensureBgContainers:function(){this._bgContainer||(this._bgContainer=document.createElement("div"),this._bgContainer.id="background",this._bgRear=document.createElement("div"),this._bgRear.id="backgroundRearLayer",this._bgContainer.appendChild(this._bgRear),this._bgFront=document.createElement("div"),this._bgFront.id="backgroundFrontLayer",this._bgContainer.appendChild(this._bgFront),dr(this.root).insertBefore(this._bgContainer,this.$.contentContainer))},_getDOMRef:function(e){switch(e){case"backgroundFrontLayer":return this._ensureBgContainers(),this._bgFront;case"backgroundRearLayer":return this._ensureBgContainers(),this._bgRear;case"background":return this._ensureBgContainers(),this._bgContainer;case"mainTitle":return dr(this).querySelector("[main-title]");case"condensedTitle":return dr(this).querySelector("[condensed-title]")}return null},getScrollState:function(){return{progress:this._progress,top:this._top}}}),yr({_template:jr`
    <style>
      :host {
        display: block;
        /**
         * Force app-header-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements (e.g. app-drawer-layout).
         * This could be done using \`isolation: isolate\`, but that's not well supported
         * across browsers.
         */
        position: relative;
        z-index: 0;
      }

      #wrapper ::slotted([slot=header]) {
        @apply --layout-fixed-top;
        z-index: 1;
      }

      #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) {
        height: 100%;
      }

      :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
        position: absolute;
      }

      :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) #wrapper #contentContainer {
        @apply --layout-fit;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
        position: relative;
      }

      :host([fullbleed]) {
        @apply --layout-vertical;
        @apply --layout-fit;
      }

      :host([fullbleed]) #wrapper,
      :host([fullbleed]) #wrapper #contentContainer {
        @apply --layout-vertical;
        @apply --layout-flex;
      }

      #contentContainer {
        /* Create a stacking context here so that all children appear below the header. */
        position: relative;
        z-index: 0;
      }

      @media print {
        :host([has-scrolling-region]) #wrapper #contentContainer {
          overflow-y: visible;
        }
      }

    </style>

    <div id="wrapper" class="initializing">
      <slot id="headerSlot" name="header"></slot>

      <div id="contentContainer">
        <slot></slot>
      </div>
    </div>
`,is:"app-header-layout",behaviors:[mo],properties:{hasScrollingRegion:{type:Boolean,value:!1,reflectToAttribute:!0}},observers:["resetLayout(isAttached, hasScrollingRegion)"],get header(){return dr(this.$.headerSlot).getDistributedNodes()[0]},_updateLayoutStates:function(){var e=this.header;if(this.isAttached&&e){this.$.wrapper.classList.remove("initializing"),e.scrollTarget=this.hasScrollingRegion?this.$.contentContainer:this.ownerDocument.documentElement;var t=e.offsetHeight;this.hasScrollingRegion?(e.style.left="",e.style.right=""):requestAnimationFrame(function(){var t=this.getBoundingClientRect(),i=document.documentElement.clientWidth-t.right;e.style.left=t.left+"px",e.style.right=i+"px"}.bind(this));var i=this.$.contentContainer.style;e.fixed&&!e.condenses&&this.hasScrollingRegion?(i.marginTop=t+"px",i.paddingTop=""):(i.paddingTop=t+"px",i.marginTop="")}}}),yr({_template:jr`
    <style>

      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
        height: 64px;
        padding: 0 16px;
        pointer-events: none;
        font-size: var(--app-toolbar-font-size, 20px);
      }

      :host ::slotted(*) {
        pointer-events: auto;
      }

      :host ::slotted(paper-icon-button) {
        /* paper-icon-button/issues/33 */
        font-size: 0;
      }

      :host ::slotted([main-title]),
      :host ::slotted([condensed-title]) {
        pointer-events: none;
        @apply --layout-flex;
      }

      :host ::slotted([bottom-item]) {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
      }

      :host ::slotted([top-item]) {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      }

      :host ::slotted([spacer]) {
        margin-left: 64px;
      }
    </style>

    <slot></slot>
`,is:"app-toolbar"}),yr({_template:jr`
    <style>
      :host {
        position: relative;
        display: block;
      }

      #background {
        @apply --layout-fit;
        overflow: hidden;
        height: 100%;
      }

      #backgroundFrontLayer {
        min-height: 100%;
        pointer-events: none;
        background-size: cover;
        @apply --app-box-background-front-layer;
      }

      #contentContainer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      :host([disabled]),
      :host([disabled]) #backgroundFrontLayer {
        transition: none !important;
      }
    </style>

    <div id="background">
      <div id="backgroundFrontLayer">
        <slot name="background"></slot>
      </div>
    </div>
    <div id="contentContainer">
      <slot></slot>
    </div>
`,is:"app-box",behaviors:[yo,Jr],listeners:{"iron-resize":"_resizeHandler"},_progress:0,attached:function(){this.resetLayout()},_debounceRaf:function(e){var t=this;this._raf&&window.cancelAnimationFrame(this._raf),this._raf=window.requestAnimationFrame(function(){t._raf=null,e.call(t)})},resetLayout:function(){this._debounceRaf(function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var e=this._clampedScrollTop,t=this.disabled;this.disabled=!0,this._elementTop=this._getElementTop(),this._elementHeight=this.offsetHeight,this._cachedScrollTargetHeight=this._scrollTargetHeight,this._setUpEffect(),this._updateScrollState(e),this.disabled=t}})},_getElementTop:function(){for(var e=this,t=0;e&&e!==this.scrollTarget;)t+=e.offsetTop,e=e.offsetParent;return t},_updateScrollState:function(e){if(this.isOnScreen()){var t=this._elementTop-e;this._progress=1-(t+this._elementHeight)/this._cachedScrollTargetHeight,this._runEffects(this._progress,e)}},isOnScreen:function(){return this._elementTop<this._scrollTop+this._cachedScrollTargetHeight&&this._elementTop+this._elementHeight>this._scrollTop},_resizeHandler:function(){this.resetLayout()},_getDOMRef:function(e){return"background"===e?this.$.background:"backgroundFrontLayer"===e?this.$.backgroundFrontLayer:void 0},getScrollState:function(){return{progress:this._progress}}});var bo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},vo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredDrawer=class extends ze{constructor(){super(),this.align="left",this.debug&&console.log("Constructing the drawer.")}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.shadowRoot?(this.drawer=this.shadowRoot.getElementById("drawer"),this.debug&&console.log("DRAWER: ",this.drawer),this.drawer||console.log("Could not find the drawer.")):console.log("There is no shadow root.")},2e3)}open(){this.drawer?this.drawer.open():console.log("There is no drawer.")}render(){return N`
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
        `}refreshElement(){}},bo([te({type:String}),vo("design:type",Object)],e.WiredDrawer.prototype,"align",void 0),e.WiredDrawer=bo([Q("wired-drawer"),vo("design:paramtypes",[])],e.WiredDrawer),window.navigator.userAgent.match("Trident")&&(DOMTokenList.prototype.toggle=function(e,t){return void 0===t||t?this.add(e):this.remove(e),void 0===t||t});const wo=le`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,xo=document.createElement("link");xo.rel="stylesheet",xo.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(xo);var So=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let Co=class extends he{render(){return N`<slot></slot>`}};Co.styles=wo,Co=So([Q("mwc-icon")],Co);var ko=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Po=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredFab=class extends ze{constructor(){super(...arguments),this.disabled=!1}static get styles(){return le`
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
    `}render(){return N`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(e){e.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect(),i=Math.min(t.width,t.height);e.setAttribute("width",`${i}`),e.setAttribute("height",`${i}`);const s=Ie(i/2,i/2,i,i);e.appendChild(s),this.classList.add("wired-rendered")}},ko([te({type:Boolean,reflect:!0}),Po("design:type",Object)],e.WiredFab.prototype,"disabled",void 0),e.WiredFab=ko([Q("wired-fab")],e.WiredFab);var Eo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},To=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredHelper=class extends he{constructor(){super(...arguments),this.debug=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.resizeListener||(this.resizeListener=this.dispatchRefreshEvent.bind(this),window.addEventListener("resize",this.resizeListener)),setTimeout(()=>this.dispatchRefreshEvent(),10)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),delete this.resizeListener)}dispatchRefreshEvent(){this.debug&&console.log("Resize has occurred, and element refresh is required."),Le("refresh-element")}render(){return N`
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
            ${this.debug?N`<button @click="${()=>this.refresh()}">Refresh</button>`:""}
        `}refresh(){this.debug&&console.log("refreshing element render"),Le("refresh-element")}refreshElement(){}},Eo([te({type:Boolean}),To("design:type",Object)],e.WiredHelper.prototype,"debug",void 0),e.WiredHelper=Eo([Q("wired-helper")],e.WiredHelper);var Ro=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Oo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredIconButton=class extends ze{constructor(){super(...arguments),this.disabled=!1}static get styles(){return le`
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
    `}render(){return N`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);t.setAttribute("width",`${s}`),t.setAttribute("height",`${s}`),Re(t,s/2,s/2,s,s),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){}},Ro([te({type:Boolean,reflect:!0}),Oo("design:type",Object)],e.WiredIconButton.prototype,"disabled",void 0),e.WiredIconButton=Ro([Q("wired-icon-button")],e.WiredIconButton);var No=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Ao=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredInput=class extends ze{constructor(){super(...arguments),this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.disabled=!1,this.required=!1,this.autofocus=!1,this.readonly=!1}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.refreshElement.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.refreshElement())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(e,t,i,s){let n=0;return()=>{const r=arguments,o=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||e.apply(s,r)},t),o&&e.apply(s,r)}}render(){return N`
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
        `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get input(){return this.shadowRoot?this.shadowRoot.getElementById("txt"):null}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;t&&(t.value=e)}else this.pendingValue=e}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(e){e.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect(),i=t.height-4-1,s=t.width-4-1;e.setAttribute("width",`${t.width+4}`),e.setAttribute("height",`${t.height+4}`),Ee(e,2,2,s,i),void 0!==this.pendingValue&&(this.input.value=this.pendingValue,delete this.pendingValue),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}onChange(e){e.stopPropagation(),this.fireEvent(e.type,{sourceEvent:e})}},No([te({type:String}),Ao("design:type",Object)],e.WiredInput.prototype,"placeholder",void 0),No([te({type:String}),Ao("design:type",String)],e.WiredInput.prototype,"name",void 0),No([te({type:String}),Ao("design:type",String)],e.WiredInput.prototype,"min",void 0),No([te({type:String}),Ao("design:type",String)],e.WiredInput.prototype,"max",void 0),No([te({type:String}),Ao("design:type",String)],e.WiredInput.prototype,"step",void 0),No([te({type:String}),Ao("design:type",Object)],e.WiredInput.prototype,"type",void 0),No([te({type:String}),Ao("design:type",Object)],e.WiredInput.prototype,"autocomplete",void 0),No([te({type:String}),Ao("design:type",Object)],e.WiredInput.prototype,"autocapitalize",void 0),No([te({type:String}),Ao("design:type",Object)],e.WiredInput.prototype,"autocorrect",void 0),No([te({type:Boolean,reflect:!0}),Ao("design:type",Object)],e.WiredInput.prototype,"disabled",void 0),No([te({type:Boolean}),Ao("design:type",Object)],e.WiredInput.prototype,"required",void 0),No([te({type:Boolean}),Ao("design:type",Object)],e.WiredInput.prototype,"autofocus",void 0),No([te({type:Boolean}),Ao("design:type",Object)],e.WiredInput.prototype,"readonly",void 0),No([te({type:Number}),Ao("design:type",Number)],e.WiredInput.prototype,"minlength",void 0),No([te({type:Number}),Ao("design:type",Number)],e.WiredInput.prototype,"maxlength",void 0),No([te({type:Number}),Ao("design:type",Number)],e.WiredInput.prototype,"size",void 0),e.WiredInput=No([Q("wired-input")],e.WiredInput);var Io=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};e.WiredLayout=class extends ze{render(){return N`
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
        `}},e.WiredLayout=Io([Q("wired-layout")],e.WiredLayout);var Lo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Mo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredListbox=class extends ze{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}render(){return N`
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
            <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
            <div class="overlay">
              <svg id="svg"></svg>
            </div>
        `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){this.refreshElement()}addNodes(e){if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-ITEM"===i.tagName)i.setAttribute("role","option"),this.itemNodes.push(i),this.debug&&console.log("Added WiredItem: ",i);else if("SLOT"===i.tagName){console.log("found slot: ",i);const e=i.assignedNodes();this.addNodes(e)}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect();if(e.setAttribute("width",`${t.width}`),e.setAttribute("height",`${t.height}`),Ee(e,0,0,t.width,t.height),this.classList.add("wired-rendered"),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();this.addNodes(e)}}},Lo([te({type:Object}),Mo("design:type",Object)],e.WiredListbox.prototype,"value",void 0),Lo([te({type:String}),Mo("design:type",String)],e.WiredListbox.prototype,"selected",void 0),Lo([te({type:Boolean}),Mo("design:type",Object)],e.WiredListbox.prototype,"horizontal",void 0),e.WiredListbox=Lo([Q("wired-listbox")],e.WiredListbox);var Do=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},zo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredMenu=class extends ze{constructor(){super(),this.hide()}render(){return N`
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
        `}menuItemAdded(){console.log("Menu items changed."),setTimeout(()=>{if(this.shadowRoot){const e=this.shadowRoot.getElementById("menu-items");if(e){e.assignedNodes().forEach(e=>{e.addEventListener("click",()=>{const t=e;console.log("selected: ",t.value),this.fireEvent("selected",{selected:t.value}),t.selected=!0,setTimeout(()=>{t.selected=!1,this.hide()},300)})})}}},1e3)}hide(){console.log("hiding menu"),this.style.display="none"}show(){console.log("showing menu"),this.style.display="block"}refreshElement(){}},e.WiredMenu=Do([Q("wired-menu"),zo("design:paramtypes",[])],e.WiredMenu);var jo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Wo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredProgress=class extends ze{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}render(){return N`
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
        `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}updated(){this.refreshElement()}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect();e.setAttribute("width",`${t.width}`),e.setAttribute("height",`${t.height}`),this.box?e.appendChild(this.box):this.box=Ee(e,0,0,t.width,t.height);let i=0;if(this.max>this.min){i=(this.value-this.min)/(this.max-this.min);const s=t.width*Math.max(0,Math.min(i,100)),n=Ae([[0,0],[s,0],[s,t.height],[0,t.height]]);e.appendChild(n),n.classList.add("progbox")}this.classList.add("wired-rendered")}},jo([te({type:Number}),Wo("design:type",Object)],e.WiredProgress.prototype,"value",void 0),jo([te({type:Number}),Wo("design:type",Object)],e.WiredProgress.prototype,"min",void 0),jo([te({type:Number}),Wo("design:type",Object)],e.WiredProgress.prototype,"max",void 0),jo([te({type:Boolean}),Wo("design:type",Object)],e.WiredProgress.prototype,"percentage",void 0),e.WiredProgress=jo([Q("wired-progress")],e.WiredProgress);var Ho=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},$o=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredRadio=class extends ze{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return le`
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
    `}render(){return N`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.toggleCheck())})}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);this.dot=void 0;const i={width:this.iconsize||24,height:this.iconsize||24};t.setAttribute("width",`${i.width}`),t.setAttribute("height",`${i.height}`),Re(t,i.width/2,i.height/2,i.width,i.height);const s=Math.max(.6*i.width,5),n=Math.max(.6*i.height,5);this.dot=Re(t,i.width/2,i.height/2,s,n),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}refreshElement(){}},Ho([te({type:Boolean}),$o("design:type",Object)],e.WiredRadio.prototype,"checked",void 0),Ho([te({type:Boolean,reflect:!0}),$o("design:type",Object)],e.WiredRadio.prototype,"disabled",void 0),Ho([te({type:String}),$o("design:type",String)],e.WiredRadio.prototype,"name",void 0),Ho([te({type:Number}),$o("design:type",Object)],e.WiredRadio.prototype,"iconsize",void 0),e.WiredRadio=Ho([Q("wired-radio")],e.WiredRadio);var Fo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Bo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredRadioGroup=class extends ze{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return le`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return N`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(e){const t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const e=i.name||"";this.selected&&e===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(--i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++){if(e[t].name===this.selected){i=t;break}}i<0?t=e[0]:(++i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}refreshElement(){}},Fo([te({type:String}),Bo("design:type",String)],e.WiredRadioGroup.prototype,"selected",void 0),e.WiredRadioGroup=Fo([Q("wired-radio-group")],e.WiredRadioGroup);var qo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Vo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredSlider=class extends ze{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return le`
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
    `}render(){return N`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}get value(){return this._value}set value(e){this.setValue(e,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.refreshElement()}updated(e){e.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(e,t=!1){this._value=e,this.setAriaValue(),this.onValueChange(),t||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const e=Math.min(this.max,Math.round(this.value+this.step));e!==this.value&&this.setValue(e)}decrement(){const e=Math.max(this.min,Math.round(this.value-this.step));e!==this.value&&this.setValue(e)}onValueChange(){if(!this.knob)return;let e=0;this.max>this.min&&(e=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=e,e?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const t=e*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(t)}px)`}knobdown(e){this.knobExpand(!0),e.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(e){this.knob&&(e?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(e){switch(e.stopPropagation(),e.detail.state){case"start":this.trackStart();break;case"track":this.trackX(e);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(e){this.dragging||this.trackStart();const t=e.detail.dx||0,i=Math.max(Math.min(this.startx+t,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(i)}px)`;const s=i/this.barWidth;this.intermediateValue=this.min+s*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}refreshElement(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect();e.setAttribute("width",`${t.width}`),e.setAttribute("height",`${t.height}`);const i=this.knobradius||10;this.barWidth=t.width-2*i,this.bar=Pe(e,i,t.height/2,t.width-i,t.height/2),this.bar.classList.add("bar"),this.knobGroup=we("g"),e.appendChild(this.knobGroup),this.knob=Re(this.knobGroup,i,t.height/2,2*i,2*i),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),fn(this.knob,"down",e=>{this.disabled||this.knobdown(e)}),fn(this.knob,"up",()=>{this.disabled||this.resetKnob()}),fn(this.knob,"track",e=>{this.disabled||this.onTrack(e)}),this.addEventListener("keydown",e=>{switch(e.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}},qo([te({type:Number}),Vo("design:type",Object)],e.WiredSlider.prototype,"_value",void 0),qo([te({type:Number}),Vo("design:type",Object)],e.WiredSlider.prototype,"min",void 0),qo([te({type:Number}),Vo("design:type",Object)],e.WiredSlider.prototype,"max",void 0),qo([te({type:Number}),Vo("design:type",Object)],e.WiredSlider.prototype,"knobradius",void 0),qo([te({type:Boolean,reflect:!0}),Vo("design:type",Object)],e.WiredSlider.prototype,"disabled",void 0),e.WiredSlider=qo([Q("wired-slider")],e.WiredSlider);var Uo=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},Yo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredSpinner=class extends ze{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return le`
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
    `}render(){return N`
    <svg id="svg"></svg>
    `}firstUpdated(){this.svg&&(Re(this.svg,38,38,60,60),this.knob=Ie(0,0,20,20),this.knob.classList.add("knob"),this.svg.appendChild(this.knob)),this.updateCursor(),this.classList.add("wired-rendered")}updated(){this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(e=>this.tick(e))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}updateCursor(){if(this.knob){const e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}refreshElement(){}},Uo([te({type:Boolean}),Yo("design:type",Object)],e.WiredSpinner.prototype,"spinning",void 0),Uo([te({type:Number}),Yo("design:type",Object)],e.WiredSpinner.prototype,"duration",void 0),Uo([ie("svg"),Yo("design:type",SVGSVGElement)],e.WiredSpinner.prototype,"svg",void 0),e.WiredSpinner=Uo([Q("wired-spinner")],e.WiredSpinner);const Go=(e,t)=>{const i=e.startNode.parentNode,s=void 0===t?e.endNode:t.startNode,n=i.insertBefore(u(),s);i.insertBefore(u(),s);const r=new v(e.options);return r.insertAfterNode(n),r},Xo=(e,t)=>(e.setValue(t),e.commit(),e),Jo=(e,t,i)=>{const s=e.startNode.parentNode,n=i?i.startNode:e.endNode,r=t.endNode.nextSibling;r!==n&&((e,t,i=null,s=null)=>{let n=t;for(;n!==i;){const t=n.nextSibling;e.insertBefore(n,s),n=t}})(s,t.startNode,r,n)},Ko=e=>{n(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},Qo=(e,t,i)=>{const s=new Map;for(let n=t;n<=i;n++)s.set(e[n],n);return s},Zo=new WeakMap,ea=new WeakMap,ta=(e=>(...i)=>{const s=e(...i);return t.set(s,!0),s})((e,t,i)=>{let s;return void 0===i?i=t:void 0!==t&&(s=t),t=>{if(!(t instanceof v))throw new Error("repeat can only be used in text bindings");const n=Zo.get(t)||[],r=ea.get(t)||[],o=[],a=[],l=[];let d,h,c=0;for(const t of e)l[c]=s?s(t,c):c,a[c]=i(t,c),c++;let p=0,u=n.length-1,f=0,_=a.length-1;for(;p<=u&&f<=_;)if(null===n[p])p++;else if(null===n[u])u--;else if(r[p]===l[f])o[f]=Xo(n[p],a[f]),p++,f++;else if(r[u]===l[_])o[_]=Xo(n[u],a[_]),u--,_--;else if(r[p]===l[_])o[_]=Xo(n[p],a[_]),Jo(t,n[p],o[_+1]),p++,_--;else if(r[u]===l[f])o[f]=Xo(n[u],a[f]),Jo(t,n[u],n[p]),u--,f++;else if(void 0===d&&(d=Qo(l,f,_),h=Qo(r,p,u)),d.has(r[p]))if(d.has(r[u])){const e=h.get(l[f]),i=void 0!==e?n[e]:null;if(null===i){const e=Go(t,n[p]);Xo(e,a[f]),o[f]=e}else o[f]=Xo(i,a[f]),Jo(t,i,n[p]),n[e]=null;f++}else Ko(n[u]),u--;else Ko(n[p]),p++;for(;f<=_;){const e=Go(t,o[_+1]);Xo(e,a[f]),o[f++]=e}for(;p<=u;){const e=n[p++];null!==e&&Ko(e)}Zo.set(t,o),ea.set(t,l)}});var ia=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredTab=class extends ze{constructor(){super(...arguments),this.name="",this.label=""}static get styles(){return le`
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
    `}render(){return N`
    <wired-card>
      <slot part="body"></slot>
    </wired-card>
    `}relayout(){setTimeout(()=>{this.card&&this.card.requestUpdate()})}refreshElement(){}},ia([te({type:String}),sa("design:type",Object)],e.WiredTab.prototype,"name",void 0),ia([te({type:String}),sa("design:type",Object)],e.WiredTab.prototype,"label",void 0),ia([ie("wired-card"),sa("design:type",e.WiredCard)],e.WiredTab.prototype,"card",void 0),e.WiredTab=ia([Q("wired-tab")],e.WiredTab),e.WizardTabs=class extends ze{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return le`

    `}render(){return N`
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
              ${ta(this.pages,e=>e.name,e=>N`
              <wired-item role="tab" .value="${e.name}" .selected="${e.name===this.selected}" ?aria-selected="${e.name===this.selected}"
                @click="${()=>this.selected=e.name}">${e.label||e.name}</wired-item>
              `)}
            </div>
            <div id="tabs">
              <slot @slotchange="${this.mapPages()}"></slot>
            </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){const i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const e=i;this.pages.push(e);const t=e.getAttribute("name")||"";t&&t.trim().split(" ").forEach(t=>{t&&this.pageMap.set(t,e)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}})}updated(){const e=this.getElement();for(let t=0;t<this.pages.length;t++){const i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.relayout()}getElement(){let e=void 0;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}refreshElement(){}},ia([te({type:String}),sa("design:type",String)],e.WizardTabs.prototype,"selected",void 0),ia([ie("slot"),sa("design:type",HTMLSlotElement)],e.WizardTabs.prototype,"slotElement",void 0),e.WizardTabs=ia([Q("wired-tabs")],e.WizardTabs);var na=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},ra=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredTextarea=class extends ze{constructor(){super(...arguments),this.rows=1,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.disabled=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1,this.tokens=[],this.prevHeight=0}static get styles(){return le`
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
    `}render(){return N`
    <div id="mirror" class="mirror-text">&#160;</div>
    <div class="fit">
      <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
        placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
        rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}" @input="${this.onInput}"></textarea>
    </div>
    <div class="fit overlay">
      <svg id="svg"></svg>
    </div>
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get textarea(){return this.shadowRoot?this.shadowRoot.getElementById("textarea"):null}get mirror(){return this.shadowRoot.getElementById("mirror")}get value(){const e=this.textarea;return e&&e.value||""}set value(e){const t=this.textarea;t&&(t.value!==e&&(t.value=e||""),this.mirror.innerHTML=this.valueForMirror(),this.requestUpdate())}valueForMirror(){const e=this.textarea;return e?(this.tokens=e&&e.value?e.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this.constrain(this.tokens)):""}constrain(e){let t;for(e=e||[""],t=this.maxrows>0&&e.length>this.maxrows?e.slice(0,this.maxrows):e.slice(0);this.rows>0&&t.length<this.rows;)t.push("");return t.join("<br/>")+"&#160;"}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(e){e.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}updateCached(){this.mirror.innerHTML=this.constrain(this.tokens)}onInput(){this.value=this.textarea.value}refreshElement(){const e=this.shadowRoot.getElementById("svg"),t=this.getBoundingClientRect();if(this.prevHeight!==t.height){for(;e.hasChildNodes();)e.removeChild(e.lastChild);e.setAttribute("width",`${t.width}`),e.setAttribute("height",`${t.height}`),Ee(e,2,2,t.width-2,t.height-2),this.prevHeight=t.height,this.classList.add("wired-rendered"),this.updateCached()}}},na([te({type:Number}),ra("design:type",Object)],e.WiredTextarea.prototype,"rows",void 0),na([te({type:Number}),ra("design:type",Object)],e.WiredTextarea.prototype,"maxrows",void 0),na([te({type:String}),ra("design:type",Object)],e.WiredTextarea.prototype,"autocomplete",void 0),na([te({type:Boolean}),ra("design:type",Object)],e.WiredTextarea.prototype,"autofocus",void 0),na([te({type:Boolean,reflect:!0}),ra("design:type",Object)],e.WiredTextarea.prototype,"disabled",void 0),na([te({type:String}),ra("design:type",Object)],e.WiredTextarea.prototype,"inputmode",void 0),na([te({type:String}),ra("design:type",Object)],e.WiredTextarea.prototype,"placeholder",void 0),na([te({type:Boolean}),ra("design:type",Object)],e.WiredTextarea.prototype,"required",void 0),na([te({type:Boolean}),ra("design:type",Object)],e.WiredTextarea.prototype,"readonly",void 0),na([te({type:Number}),ra("design:type",Number)],e.WiredTextarea.prototype,"minlength",void 0),na([te({type:Number}),ra("design:type",Number)],e.WiredTextarea.prototype,"maxlength",void 0),e.WiredTextarea=na([Q("wired-textarea")],e.WiredTextarea);var oa=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};e.WiredTitle=class extends ze{render(){return N`
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
        `}refreshElement(){}},e.WiredTitle=oa([Q("wired-title")],e.WiredTitle);var aa=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},la=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};e.WiredToggle=class extends ze{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return le`
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
    `}render(){return N`
    <div @click="${this.toggleCheck}">
      <svg id="svg"></svg>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","switch"),this.addEventListener("keydown",e=>{13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),this.toggleCheck())});const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=80,i=34;e.setAttribute("width",`${t}`),e.setAttribute("height",`${i}`),Ee(e,16,8,t-32,18),this.knob=we("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);const s=Ie(16,16,32,32);s.classList.add("knobfill"),this.knob.appendChild(s),Re(this.knob,16,16,32,32),this.classList.add("wired-rendered")}updated(e){if(e.has("disabled")&&this.refreshDisabledState(),this.knob){const e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}this.setAttribute("aria-checked",`${this.checked}`)}refreshElement(){}},aa([te({type:Boolean}),la("design:type",Object)],e.WiredToggle.prototype,"checked",void 0),aa([te({type:Boolean,reflect:!0}),la("design:type",Object)],e.WiredToggle.prototype,"disabled",void 0),e.WiredToggle=aa([Q("wired-toggle")],e.WiredToggle);var da=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};e.WiredToolbar=class extends ze{render(){return N`
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
        `}refreshElement(){}},e.WiredToolbar=da([Q("wired-toolbar")],e.WiredToolbar);var ha=function(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},ca=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};return e.WiredTooltip=class extends ze{constructor(){super(...arguments),this.offset=14,this.position="bottom",this.dirty=!1,this.showing=!1,this._target=null,this.showHandler=this.show.bind(this),this.hideHandler=this.hide.bind(this)}static get styles(){return le`
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
    `}render(){return N`
    <div id="container" style="display: none;">
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
      <span style="position: relative;">${this.text}</span>
    </div>
    `}get target(){if(this._target)return this._target;const e=this.parentNode,t=(this.getRootNode?this.getRootNode():null)||document;let i=null;return this.for?i=t.querySelector("#"+this.for):e&&(i=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE?t.host:e),i}detachListeners(){this._target&&(this._target.removeEventListener("mouseenter",this.showHandler),this._target.removeEventListener("focus",this.showHandler),this._target.removeEventListener("mouseleave",this.hideHandler),this._target.removeEventListener("blur",this.hideHandler),this._target.removeEventListener("click",this.hideHandler)),this.removeEventListener("mouseenter",this.hideHandler)}attachListeners(){this._target&&(this._target.addEventListener("mouseenter",this.showHandler),this._target.addEventListener("focus",this.showHandler),this._target.addEventListener("mouseleave",this.hideHandler),this._target.addEventListener("blur",this.hideHandler),this._target.addEventListener("click",this.hideHandler)),this.addEventListener("mouseenter",this.hideHandler)}refreshTarget(){this.detachListeners(),this._target=null,this._target=this.target,this.attachListeners(),this.dirty=!0}layout(){const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const t=this.getBoundingClientRect();let i=t.width,s=t.height;switch(this.position){case"left":case"right":i+=this.offset;break;default:s+=this.offset}e.setAttribute("width",`${i}`),e.setAttribute("height",`${s}`);let n=[];switch(this.position){case"top":n=[[2,2],[i-2,2],[i-2,s-this.offset],[i/2+8,s-this.offset],[i/2,s-this.offset+8],[i/2-8,s-this.offset],[0,s-this.offset]];break;case"left":n=[[2,2],[i-this.offset,2],[i-this.offset,s/2-8],[i-this.offset+8,s/2],[i-this.offset,s/2+8],[i-this.offset,s],[2,s-2]];break;case"right":n=[[this.offset,2],[i-2,2],[i-2,s-2],[this.offset,s-2],[this.offset,s/2+8],[this.offset-8,s/2],[this.offset,s/2-8]],e.style.transform=`translateX(${-this.offset}px)`;break;default:n=[[2,this.offset],[0,s-2],[i-2,s-2],[i-2,this.offset],[i/2+8,this.offset],[i/2,this.offset-8],[i/2-8,this.offset]],e.style.transform=`translateY(${-this.offset}px)`}Te(e,n),this.dirty=!1}firstUpdated(){this.layout()}updated(e){(e.has("position")||e.has("text"))&&(this.dirty=!0),this._target&&!e.has("for")||this.refreshTarget(),this.dirty&&this.layout()}show(){this.showing||(this.showing=!0,this.shadowRoot.getElementById("container").style.display="",this.updatePosition(),setTimeout(()=>{this.layout()},1))}hide(){this.showing&&(this.showing=!1,this.shadowRoot.getElementById("container").style.display="none")}updatePosition(){if(!this._target||!this.offsetParent)return;const e=this.offset,t=this.offsetParent.getBoundingClientRect(),i=this._target.getBoundingClientRect(),s=this.getBoundingClientRect(),n=(i.width-s.width)/2,r=(i.height-s.height)/2,o=i.left-t.left,a=i.top-t.top;let l,d;switch(this.position){case"top":l=o+n,d=a-s.height-e;break;case"bottom":l=o+n,d=a+i.height+e;break;case"left":l=o-s.width-e,d=a+r;break;case"right":l=o+i.width+e,d=a+r}this.style.left=l+"px",this.style.top=d+"px"}refreshElement(){}},ha([te({type:String}),ca("design:type",String)],e.WiredTooltip.prototype,"for",void 0),ha([te({type:String}),ca("design:type",String)],e.WiredTooltip.prototype,"text",void 0),ha([te({type:Number}),ca("design:type",Object)],e.WiredTooltip.prototype,"offset",void 0),ha([te({type:String}),ca("design:type",String)],e.WiredTooltip.prototype,"position",void 0),e.WiredTooltip=ha([Q("wired-tooltip")],e.WiredTooltip),e}({});
