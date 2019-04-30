var WiredElements=function(t){"use strict";const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${l}`),h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],r=e=>{const o=e.content,l=document.createTreeWalker(o,133,null,!1);let c=0;for(;l.nextNode();){i++;const e=l.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(a)>=0&&r++;for(;r-- >0;){const n=t.strings[s],r=f.exec(n)[2],o=r.toLowerCase()+h,a=e.getAttribute(o).split(d);this.parts.push({type:"attribute",index:i,name:r,strings:a}),e.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const r=e.parentNode,o=t.split(d),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?u():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++i});""===o[a]?(r.insertBefore(u(),e),n.push(e)):e.data=o[a],s+=a}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&i!==c||(i++,t.insertBefore(u(),e)),c=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const p=t=>-1!==t.index,u=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const r=t=>{const s=document.createTreeWalker(t,133,null,!1);let o=s.nextNode();for(;i<e.length&&null!==o;){const t=e[i];if(p(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=s.nextNode();else this._parts.push(void 0),i++}};return r(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class m{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=f.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+h+s[3]+a:t+l}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t);class g{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||y(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class v{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=u()),t._insert(this.endNode=u())}insertAfterPart(t){t._insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}const t=this._pendingValue;t!==r&&(y(t)?t!==this.value&&this._commitText(t):t instanceof m?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===o?(this.value=o,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new v(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class w{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=r}}class x extends g{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends b{}let C=!1;try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class k{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=P(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const P=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const T=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new x(t,e.slice(1),i).parts:"@"===n?[new k(t,e.slice(1),s.eventContext)]:"?"===n?[new w(t,e.slice(1),i)]:new g(t,e,i).parts}handleTextExpression(t){return new v(t)}};function E(t){let e=O.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},O.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(a);return void 0===(i=e.keyString.get(s))&&(i=new c(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const O=new Map,N=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const R=(t,...e)=>new m(t,e,"html",T),A=133;function I(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,A,null,!1);let r=M(s),o=s[r],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,o=s[r=M(s,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const L=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,A,null,!1);for(;i.nextNode();)e++;return e},M=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};const D=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1);const j=t=>e=>{const i=D(e.type,t);let s=O.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},O.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(a);if(void 0===(n=s.keyString.get(r))){const i=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(i,t),n=new c(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},H=["html","svg"],W=new Set,$=(t,e,i)=>{W.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{H.forEach(e=>{const i=O.get(D(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),I(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,A,null,!1);let o=M(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=L(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=M(n,o);return}o=M(n,o)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),I(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:B},V=Promise.resolve(!0),U=1,Y=4,X=8,G=16,J=32;class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=V,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||F,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||F.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|J,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=q){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|X,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~X}}_attributeToProperty(t,e){if(this._updateState&X)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||q;this._updateState=this._updateState|G,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~G}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||q;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&G||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Y;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&J}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&U}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&U||(this._updateState=this._updateState|U,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}K.finalized=!0;const Q=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),Z=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),tt=(t,e,i)=>{e.constructor.createProperty(i,t)};function et(t){return(e,i)=>void 0!==i?tt(t,e,i):Z(t,e)}function it(t){return(e,i)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==i?st(s,e,i):nt(s,e)}}const st=(t,e,i)=>{Object.defineProperty(e,i,t)},nt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof at)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new at(i,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const dt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class ht extends K{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){dt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof m&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ht.finalized=!0,ht.render=((t,e,i)=>{const s=i.scopeName,r=N.has(e),o=e instanceof ShadowRoot&&z&&t instanceof m,a=o&&!W.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=N.get(e);void 0===s&&(n(e,e.firstChild),N.set(e,s=new v(Object.assign({templateFactory:E},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:j(s)},i)),a){const t=N.get(l);N.delete(l),t.value instanceof _&&$(l,t.value.template,s),n(e,e.firstChild),e.appendChild(l),N.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});class ct extends ht{fireEvent(t,e,i=!0,s=!0){if(t){const n={bubbles:"boolean"!=typeof i||i,composed:"boolean"!=typeof s||s};e&&(n.detail=e);const r=window.SlickCustomEvent||CustomEvent;this.dispatchEvent(new r(t,n))}}}class pt{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,n=0;const r=this.a,o=this.b,a=this.c;return Math.abs(o)>1e-5&&(e=-r/o,s=-a/o),Math.abs(t.b)>1e-5&&(i=-t.a/t.b,n=-t.c/t.b),e===Number.MAX_VALUE?i===Number.MAX_VALUE?-a/r==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+s,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(r)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===i?s===n&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-s)/(e-i),this.yi=e*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}class ut{constructor(t,e,i,s,n,r,o,a){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=i,this.right=s,this.gap=n,this.sinAngle=r,this.tanAngle=a,Math.abs(r)<1e-4?this.pos=i+n:Math.abs(r)>.9999?this.pos=t+n:(this.deltaX=(e-t)*Math.abs(a),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(n/o),this.sLeft=new pt([i,e],[i,t]),this.sRight=new pt([s,e],[s,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,i=this.bottom,s=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new pt([t,i],[e,s]);this.sLeft&&n.intersects(this.sLeft)&&(t=n.xi,i=n.yi),this.sRight&&n.intersects(this.sRight)&&(e=n.xi,s=n.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const r=[t,i,e,s];return this.pos+=this.hGap,r}}return null}}function ft(t,e){const i=[],s=new pt([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const n=new pt(e[t],e[(t+1)%e.length]);s.intersects(n)&&i.push([s.xi,s.yi])}return i}function _t(t,e,i,s,n,r,o){return[-i*r-s*n+i+r*t+n*e,o*(i*n-s*r)+s+-o*n*t+o*r*e]}const mt=2,yt=1,gt=.85,bt=0,vt=9;class wt{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(t,e){this.p=`${this.p}M ${t} ${e} `}bcurveTo(t,e,i,s,n,r){this.p=`${this.p}C ${t} ${e}, ${i} ${s}, ${n} ${r} `}}function xt(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg",t);if(e)for(const t in e)i.setAttributeNS(null,t,e[t]);return i}function St(t,e){return yt*(Math.random()*(e-t)+t)}function Ct(t,e,i,s,n){const r=Math.pow(t-i,2)+Math.pow(e-s,2);let o=mt;o*o*100>r&&(o=Math.sqrt(r)/10);const a=o/2,l=.2+.2*Math.random();let d=gt*mt*(s-e)/200,h=gt*mt*(t-i)/200;d=St(-d,d),h=St(-h,h);const c=n||new wt;return c.moveTo(t+St(-o,o),e+St(-o,o)),c.bcurveTo(d+t+(i-t)*l+St(-o,o),h+e+(s-e)*l+St(-o,o),d+t+2*(i-t)*l+St(-o,o),h+e+2*(s-e)*l+St(-o,o),i+St(-o,o),s+St(-o,o)),c.moveTo(t+St(-a,a),e+St(-a,a)),c.bcurveTo(d+t+(i-t)*l+St(-a,a),h+e+(s-e)*l+St(-a,a),d+t+2*(i-t)*l+St(-a,a),h+e+2*(s-e)*l+St(-a,a),i+St(-a,a),s+St(-a,a)),c}function kt(t,e,i,s,n=!1,r=!1,o){o=o||new wt;const a=Math.pow(t-i,2)+Math.pow(e-s,2);let l=mt;l*l*100>a&&(l=Math.sqrt(a)/10);const d=l/2,h=.2+.2*Math.random();let c=gt*mt*(s-e)/200,p=gt*mt*(t-i)/200;return c=St(-c,c),p=St(-p,p),n&&o.moveTo(t+St(-l,l),e+St(-l,l)),r?o.bcurveTo(c+t+(i-t)*h+St(-d,d),p+e+(s-e)*h+St(-d,d),c+t+2*(i-t)*h+St(-d,d),p+e+2*(s-e)*h+St(-d,d),i+St(-d,d),s+St(-d,d)):o.bcurveTo(c+t+(i-t)*h+St(-l,l),p+e+(s-e)*h+St(-l,l),c+t+2*(i-t)*h+St(-l,l),p+e+2*(s-e)*h+St(-l,l),i+St(-l,l),s+St(-l,l)),o}function Pt(t,e,i,s,n,r,o,a){const l=St(-.5,.5)-Math.PI/2,d=[];d.push([St(-r,r)+e+.9*s*Math.cos(l-t),St(-r,r)+i+.9*n*Math.sin(l-t)]);for(let o=l;o<2*Math.PI+l-.01;o+=t)d.push([St(-r,r)+e+s*Math.cos(o),St(-r,r)+i+n*Math.sin(o)]);return d.push([St(-r,r)+e+s*Math.cos(l+2*Math.PI+.5*o),St(-r,r)+i+n*Math.sin(l+2*Math.PI+.5*o)]),d.push([St(-r,r)+e+.98*s*Math.cos(l+o),St(-r,r)+i+.98*n*Math.sin(l+o)]),d.push([St(-r,r)+e+.9*s*Math.cos(l+.5*o),St(-r,r)+i+.9*n*Math.sin(l+.5*o)]),function(t,e){const i=t.length;let s=e||new wt;if(i>3){const e=[],n=1-bt;s.moveTo(t[1][0],t[1][1]);for(let r=1;r+2<i;r++){const i=t[r];e[0]=[i[0],i[1]],e[1]=[i[0]+(n*t[r+1][0]-n*t[r-1][0])/6,i[1]+(n*t[r+1][1]-n*t[r-1][1])/6],e[2]=[t[r+1][0]+(n*t[r][0]-n*t[r+2][0])/6,t[r+1][1]+(n*t[r][1]-n*t[r+2][1])/6],e[3]=[t[r+1][0],t[r+1][1]],s.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[3][0],e[3][1])}}else 3===i?(s.moveTo(t[0][0],t[0][1]),s.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1])):2===i&&(s=Ct(t[0][0],t[0][1],t[1][0],t[1][1],s));return s}(d,a)}function Tt(t,e,i,s,n){const r=xt("path",{d:Ct(e,i,s,n).value});return t.appendChild(r),r}function Et(t,e,i,s,n){n-=4;let r=Ct(e+=2,i+=2,e+(s-=4),i);r=Ct(e+s,i,e+s,i+n,r),r=Ct(e+s,i+n,e,i+n,r);const o=xt("path",{d:(r=Ct(e,i+n,e,i,r)).value});return t.appendChild(o),o}function Ot(t,e){let i;const s=e.length;if(s>2)for(let t=0;t<2;t++){let n=!0;for(let t=1;t<s;t++)i=kt(e[t-1][0],e[t-1][1],e[t][0],e[t][1],n,t>0,i),n=!1;i=kt(e[s-1][0],e[s-1][1],e[0][0],e[0][1],n,t>0,i)}else i=2===s?Ct(e[0][0],e[0][1],e[1][0],e[1][1]):new wt;const n=xt("path",{d:i.value});return t.appendChild(n),n}function Nt(t,e,i,s,n){s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1);const r=2*Math.PI/vt;let o=Math.abs(s/2),a=Math.abs(n/2),l=Pt(r,e,i,o+=St(.05*-o,.05*o),a+=St(.05*-a,.05*a),1,r*St(.1,St(.4,1)));const d=xt("path",{d:(l=Pt(r,e,i,o,a,1.5,0,l)).value});return t.appendChild(d),d}function Rt(t){const e=xt("g");let i=null;return t.forEach(t=>{Tt(e,t[0][0],t[0][1],t[1][0],t[1][1]),i&&Tt(e,i[0],i[1],t[0][0],t[0][1]),i=t[1]}),e}const At={bowing:gt,curveStepCount:vt,curveTightness:bt,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:mt,roughness:yt,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function It(t){return Rt(function(t,e){const i=[];if(t&&t.length){let s=t[0][0],n=t[0][0],r=t[0][1],o=t[0][1];for(let e=1;e<t.length;e++)s=Math.min(s,t[e][0]),n=Math.max(n,t[e][0]),r=Math.min(r,t[e][1]),o=Math.max(o,t[e][1]);const a=e.hachureAngle;let l=e.hachureGap;l<0&&(l=4*e.strokeWidth),l=Math.max(l,.1);const d=a%180*(Math.PI/180),h=Math.cos(d),c=Math.sin(d),p=Math.tan(d),u=new ut(r-1,o+1,s-1,n+1,l,c,h,p);let f;for(;null!=(f=u.nextLine());){const e=ft(f,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const s=e[t],n=e[t+1];i.push([s,n])}}}return i}(t,At))}function Lt(t,e,i,s){return Rt(function(t,e,i,s,n,r){const o=[];let a=Math.abs(s/2),l=Math.abs(n/2);a+=t.randOffset(.05*a,r),l+=t.randOffset(.05*l,r);const d=r.hachureAngle;let h=r.hachureGap;h<=0&&(h=4*r.strokeWidth);let c=r.fillWeight;c<0&&(c=r.strokeWidth/2);const p=d%180*(Math.PI/180),u=Math.tan(p),f=l/a,_=Math.sqrt(f*u*f*u+1),m=f*u/_,y=1/_,g=h/(a*l/Math.sqrt(l*y*(l*y)+a*m*(a*m))/a);let b=Math.sqrt(a*a-(e-a+g)*(e-a+g));for(let t=e-a+g;t<e+a;t+=g){const s=_t(t,i-(b=Math.sqrt(a*a-(e-t)*(e-t))),e,i,m,y,f),n=_t(t,i+b,e,i,m,y,f);o.push([s,n])}return o}({randOffset:(t,e)=>St(-t,t)},t,e,i,s,At))}var Mt=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Dt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredButton=class extends ct{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return lt`
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
    `}render(){return R`
    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),r=i.height+2*(s-1);e.setAttribute("width",`${n}`),e.setAttribute("height",`${r}`),Et(e,0,0,i.width,i.height);for(let t=1;t<s;t++)Tt(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Tt(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`,Tt(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Tt(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},Mt([et({type:Number}),Dt("design:type",Object)],t.WiredButton.prototype,"elevation",void 0),Mt([et({type:Boolean,reflect:!0}),Dt("design:type",Object)],t.WiredButton.prototype,"disabled",void 0),t.WiredButton=Mt([Q("wired-button")],t.WiredButton);var zt=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},jt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCard=class extends ct{constructor(){super(...arguments),this.elevation=1}render(){return R`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    padding: 10px;
                    opacity: 0;
                    /*height: 200px;*/
                    /*width: 300px;*/
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
                }
                
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
                
                div.body, #body {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="body">
                <slot id="body" @slotchange="${()=>this.requestUpdate()}"></slot>
            </div>
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
        `}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.updated.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(t,e,i,s){let n=0;return()=>{const r=arguments,o=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||t.apply(s,r)},e),o&&t.apply(s,r)}}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),i=Math.min(Math.max(1,this.elevation),5),s=e.width+6*(i-1)+6,n=e.height+6*(i-1)+6;t.setAttribute("width",`${s}`),t.setAttribute("height",`${n}`),Et(t,6,6,e.width-12,e.height-12);for(let s=1;s<i;s++)Tt(t,6*s,e.height-12+6*s,e.width-12+6*s,e.height-12+6*s).style.opacity=`${(85-10*s)/100}`,Tt(t,e.width-12+6*s,e.height-12+6*s,e.width-12+6*s,6*s).style.opacity=`${(85-10*s)/100}`,Tt(t,6*s,e.height-12+6*s,e.width-12+6*s,e.height-12+6*s).style.opacity=`${(85-10*s)/100}`,Tt(t,e.width-12+6*s,e.height-12+6*s,e.width-12+6*s,6*s).style.opacity=`${(85-10*s)/100}`;this.classList.add("wired-rendered")}},zt([et({type:Number}),jt("design:type",Object)],t.WiredCard.prototype,"elevation",void 0),t.WiredCard=zt([Q("wired-card")],t.WiredCard);var Ht=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Wt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCheckbox=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){console.log("CHECKBOX Update"),t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=24,s=24;e.setAttribute("width",`${i}`),e.setAttribute("height",`${s}`),Et(e,0,0,i,s);const n=[];n.push(Tt(e,.3*i,.4*s,.5*i,.7*s)),n.push(Tt(e,.5*i,.7*s,i+5,-5)),n.forEach(t=>{t.style.strokeWidth="2.5"}),this.checked?n.forEach(t=>{t.style.display=""}):n.forEach(t=>{t.style.display="none"}),this.classList.add("wired-rendered")}},Ht([et({type:Boolean}),Wt("design:type",Object)],t.WiredCheckbox.prototype,"checked",void 0),Ht([et({type:Boolean,reflect:!0}),Wt("design:type",Object)],t.WiredCheckbox.prototype,"disabled",void 0),t.WiredCheckbox=Ht([Q("wired-checkbox")],t.WiredCheckbox);var $t=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ft=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredItem=class extends ct{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return lt`
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
    `}render(){return R`
    <button class="${this.selected?"selected":""}">
      <div class="overlay">
        <svg></svg>
      </div>
      <span>
        <slot></slot>
      </span>
    </button>`}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const t=this.getBoundingClientRect();this.svg.setAttribute("width",`${t.width}`),this.svg.setAttribute("height",`${t.height}`);const e=It([[0,0],[t.width,0],[t.width,t.height],[0,t.height]]);this.svg.appendChild(e)}}},$t([et(),Ft("design:type",Object)],t.WiredItem.prototype,"value",void 0),$t([et(),Ft("design:type",Object)],t.WiredItem.prototype,"name",void 0),$t([et({type:Boolean}),Ft("design:type",Object)],t.WiredItem.prototype,"selected",void 0),$t([it("svg"),Ft("design:type",SVGSVGElement)],t.WiredItem.prototype,"svg",void 0),t.WiredItem=$t([Q("wired-item")],t.WiredItem);var Bt=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},qt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCombo=class extends ct{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return lt`
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
    `}render(){return R`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext();break;case 27:t.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:t.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:t.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Et(e,0,0,s.width,s.height);const n=s.width-4;Et(e,n,0,34,s.height);const r=Math.max(0,Math.abs((s.height-24)/2)),o=Ot(e,[[n+8,5+r],[n+26,5+r],[n+17,r+Math.min(s.height,18)]]);if(o.style.fill="currentColor",o.style.pointerEvents=this.disabled?"none":"auto",o.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}setCardShowing(t){this.cardShowing=t;const e=this.shadowRoot.getElementById("card");e.style.display=t?"":"none",t&&setTimeout(()=>{e.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach(t=>{const e=t;e.requestUpdate&&e.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(t){t.stopPropagation(),this.setCardShowing(!this.cardShowing)}},Bt([et({type:Object}),qt("design:type",Object)],t.WiredCombo.prototype,"value",void 0),Bt([et({type:String}),qt("design:type",String)],t.WiredCombo.prototype,"selected",void 0),Bt([et({type:Boolean,reflect:!0}),qt("design:type",Object)],t.WiredCombo.prototype,"disabled",void 0),t.WiredCombo=Bt([Q("wired-combo")],t.WiredCombo);const Vt=!(window.ShadyDOM&&window.ShadyDOM.inUse);let Ut,Yt;function Xt(t){Ut=(!t||!t.shimcssproperties)&&(Vt||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(Yt=window.ShadyCSS.cssBuild);const Gt=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?Ut=window.ShadyCSS.nativeCss:window.ShadyCSS?(Xt(window.ShadyCSS),window.ShadyCSS=void 0):Xt(window.WebComponents&&window.WebComponents.flags);const Jt=Ut;class Kt{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function Qt(t){return function t(e,i){let s=i.substring(e.start,e.end-1);e.parsedCssText=e.cssText=s.trim();if(e.parent){let t=e.previous?e.previous.end:e.parent.start;s=(s=(s=function(t){return t.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let t=arguments[1],e=6-t.length;for(;e--;)t="0"+t;return"\\"+t})}(s=i.substring(t,e.start-1))).replace(se.multipleSpaces," ")).substring(s.lastIndexOf(";")+1);let n=e.parsedSelector=e.selector=s.trim();e.atRule=0===n.indexOf(oe),e.atRule?0===n.indexOf(re)?e.type=te.MEDIA_RULE:n.match(se.keyframesRule)&&(e.type=te.KEYFRAMES_RULE,e.keyframesName=e.selector.split(se.multipleSpaces).pop()):0===n.indexOf(ne)?e.type=te.MIXIN_RULE:e.type=te.STYLE_RULE}let n=e.rules;if(n)for(let e,s=0,r=n.length;s<r&&(e=n[s]);s++)t(e,i);return e}(function(t){let e=new Kt;e.start=0,e.end=t.length;let i=e;for(let s=0,n=t.length;s<n;s++)if(t[s]===ee){i.rules||(i.rules=[]);let t=i,e=t.rules[t.rules.length-1]||null;(i=new Kt).start=s+1,i.parent=t,i.previous=e,t.rules.push(i)}else t[s]===ie&&(i.end=s+1,i=i.parent||e);return e}(t=t.replace(se.comments,"").replace(se.port,"")),t)}function Zt(t,e,i=""){let s="";if(t.cssText||t.rules){let i=t.rules;if(i&&!function(t){let e=t[0];return Boolean(e)&&Boolean(e.selector)&&0===e.selector.indexOf(ne)}(i))for(let t,n=0,r=i.length;n<r&&(t=i[n]);n++)s=Zt(t,e,s);else(s=(s=e?t.cssText:function(t){return function(t){return t.replace(se.mixinApply,"").replace(se.varApply,"")}(t=function(t){return t.replace(se.customProp,"").replace(se.mixinProp,"")}(t))}(t.cssText)).trim())&&(s="  "+s+"\n")}return s&&(t.selector&&(i+=t.selector+" "+ee+"\n"),i+=s,t.selector&&(i+=ie+"\n\n")),i}const te={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},ee="{",ie="}",se={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},ne="--",re="@media",oe="@",ae=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,le=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,de=/@media\s(.*)/,he=new Set,ce="shady-unscoped";function pe(t){const e=t.textContent;if(!he.has(e)){he.add(e);const i=t.cloneNode(!0);document.head.appendChild(i)}}function ue(t){return t.hasAttribute(ce)}function fe(t,e){return t?("string"==typeof t&&(t=Qt(t)),e&&me(t,e),Zt(t,Jt)):""}function _e(t){return!t.__cssRules&&t.textContent&&(t.__cssRules=Qt(t.textContent)),t.__cssRules||null}function me(t,e,i,s){if(!t)return;let n=!1,r=t.type;if(s&&r===te.MEDIA_RULE){let e=t.selector.match(de);e&&(window.matchMedia(e[1]).matches||(n=!0))}r===te.STYLE_RULE?e(t):i&&r===te.KEYFRAMES_RULE?i(t):r===te.MIXIN_RULE&&(n=!0);let o=t.rules;if(o&&!n)for(let t,n=0,r=o.length;n<r&&(t=o[n]);n++)me(t,e,i,s)}window.ShadyDOM&&window.ShadyDOM.wrap;const ye="css-build";function ge(t){if(void 0!==Yt)return Yt;if(void 0===t.__cssBuild){const e=t.getAttribute(ye);if(e)t.__cssBuild=e;else{const e=function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;if(e instanceof Comment){const t=e.textContent.trim().split(":");if(t[0]===ye)return t[1]}return""}(t);""!==e&&function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;e.parentNode.removeChild(e)}(t),t.__cssBuild=e}}return t.__cssBuild||""}function be(t){return""!==ge(t)}function ve(t,e){for(let i in e)null===i?t.style.removeProperty(i):t.style.setProperty(i,e[i])}function we(t,e){const i=window.getComputedStyle(t).getPropertyValue(e);return i?i.trim():""}const xe=/;\s*/m,Se=/^\s*(initial)|(inherit)\s*$/,Ce=/\s*!important/,ke="_-_";class Pe{constructor(){this._map={}}set(t,e){t=t.trim(),this._map[t]={properties:e,dependants:{}}}get(t){return t=t.trim(),this._map[t]||null}}let Te=null;class Ee{constructor(){this._currentElement=null,this._measureElement=null,this._map=new Pe}detectMixin(t){return function(t){const e=le.test(t)||ae.test(t);return le.lastIndex=0,ae.lastIndex=0,e}(t)}gatherStyles(t){const e=function(t){const e=[],i=t.querySelectorAll("style");for(let t=0;t<i.length;t++){const s=i[t];ue(s)?Vt||(pe(s),s.parentNode.removeChild(s)):(e.push(s.textContent),s.parentNode.removeChild(s))}return e.join("").trim()}(t.content);if(e){const i=document.createElement("style");return i.textContent=e,t.content.insertBefore(i,t.content.firstChild),i}return null}transformTemplate(t,e){void 0===t._gatheredStyle&&(t._gatheredStyle=this.gatherStyles(t));const i=t._gatheredStyle;return i?this.transformStyle(i,e):null}transformStyle(t,e=""){let i=_e(t);return this.transformRules(i,e),t.textContent=fe(i),i}transformCustomStyle(t){let e=_e(t);return me(e,t=>{":root"===t.selector&&(t.selector="html"),this.transformRule(t)}),t.textContent=fe(e),e}transformRules(t,e){this._currentElement=e,me(t,t=>{this.transformRule(t)}),this._currentElement=null}transformRule(t){t.cssText=this.transformCssText(t.parsedCssText,t),":root"===t.selector&&(t.selector=":host > *")}transformCssText(t,e){return t=t.replace(ae,(t,i,s,n)=>this._produceCssProperties(t,i,s,n,e)),this._consumeCssProperties(t,e)}_getInitialValueForProperty(t){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(t)}_fallbacksFromPreviousRules(t){let e=t;for(;e.parent;)e=e.parent;const i={};let s=!1;return me(e,e=>{(s=s||e===t)||e.selector===t.selector&&Object.assign(i,this._cssTextToMap(e.parsedCssText))}),i}_consumeCssProperties(t,e){let i=null;for(;i=le.exec(t);){let s=i[0],n=i[1],r=i.index,o=r+s.indexOf("@apply"),a=r+s.length,l=t.slice(0,o),d=t.slice(a),h=e?this._fallbacksFromPreviousRules(e):{};Object.assign(h,this._cssTextToMap(l));let c=this._atApplyToCssProperties(n,h);t=`${l}${c}${d}`,le.lastIndex=r+c.length}return t}_atApplyToCssProperties(t,e){t=t.replace(xe,"");let i=[],s=this._map.get(t);if(s||(this._map.set(t,{}),s=this._map.get(t)),s){let n,r,o;this._currentElement&&(s.dependants[this._currentElement]=!0);const a=s.properties;for(n in a)o=e&&e[n],r=[n,": var(",t,ke,n],o&&r.push(",",o.replace(Ce,"")),r.push(")"),Ce.test(a[n])&&r.push(" !important"),i.push(r.join(""))}return i.join("; ")}_replaceInitialOrInherit(t,e){let i=Se.exec(e);return i&&(e=i[1]?this._getInitialValueForProperty(t):"apply-shim-inherit"),e}_cssTextToMap(t,e=!1){let i,s,n=t.split(";"),r={};for(let t,o,a=0;a<n.length;a++)(t=n[a])&&(o=t.split(":")).length>1&&(i=o[0].trim(),s=o.slice(1).join(":"),e&&(s=this._replaceInitialOrInherit(i,s)),r[i]=s);return r}_invalidateMixinEntry(t){if(Te)for(let e in t.dependants)e!==this._currentElement&&Te(e)}_produceCssProperties(t,e,i,s,n){if(i&&function t(e,i){let s=e.indexOf("var(");if(-1===s)return i(e,"","","");let n=function(t,e){let i=0;for(let s=e,n=t.length;s<n;s++)if("("===t[s])i++;else if(")"===t[s]&&0==--i)return s;return-1}(e,s+3),r=e.substring(s+4,n),o=e.substring(0,s),a=t(e.substring(n+1),i),l=r.indexOf(",");return-1===l?i(o,r.trim(),"",a):i(o,r.substring(0,l).trim(),r.substring(l+1).trim(),a)}(i,(t,e)=>{e&&this._map.get(e)&&(s=`@apply ${e};`)}),!s)return t;let r=this._consumeCssProperties(""+s,n),o=t.slice(0,t.indexOf("--")),a=this._cssTextToMap(r,!0),l=a,d=this._map.get(e),h=d&&d.properties;h?l=Object.assign(Object.create(h),a):this._map.set(e,l);let c,p,u=[],f=!1;for(c in l)void 0===(p=a[c])&&(p="initial"),!h||c in h||(f=!0),u.push(`${e}${ke}${c}: ${p}`);return f&&this._invalidateMixinEntry(d),d&&(d.properties=l),i&&(o=`${t};${o}`),`${o}${u.join("; ")};`}}Ee.prototype.detectMixin=Ee.prototype.detectMixin,Ee.prototype.transformStyle=Ee.prototype.transformStyle,Ee.prototype.transformCustomStyle=Ee.prototype.transformCustomStyle,Ee.prototype.transformRules=Ee.prototype.transformRules,Ee.prototype.transformRule=Ee.prototype.transformRule,Ee.prototype.transformTemplate=Ee.prototype.transformTemplate,Ee.prototype._separator=ke,Object.defineProperty(Ee.prototype,"invalidCallback",{get:()=>Te,set(t){Te=t}});const Oe={},Ne="_applyShimCurrentVersion",Re="_applyShimNextVersion",Ae="_applyShimValidatingVersion",Ie=Promise.resolve();function Le(t){let e=Oe[t];e&&function(t){t[Ne]=t[Ne]||0,t[Ae]=t[Ae]||0,t[Re]=(t[Re]||0)+1}(e)}function Me(t){return t[Ne]===t[Re]}let De,ze=null,je=window.HTMLImports&&window.HTMLImports.whenReady||null;function He(t){requestAnimationFrame(function(){je?je(t):(ze||(ze=new Promise(t=>{De=t}),"complete"===document.readyState?De():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&De()})),ze.then(function(){t&&t()}))})}const We="__seenByShadyCSS",$e="__shadyCSSCachedStyle";let Fe=null,Be=null;class qe{constructor(){this.customStyles=[],this.enqueued=!1,He(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&Be&&(this.enqueued=!0,He(Be))}addCustomStyle(t){t[We]||(t[We]=!0,this.customStyles.push(t),this.enqueueDocumentValidation())}getStyleForCustomStyle(t){if(t[$e])return t[$e];let e;return e=t.getStyle?t.getStyle():t}processStyles(){const t=this.customStyles;for(let e=0;e<t.length;e++){const i=t[e];if(i[$e])continue;const s=this.getStyleForCustomStyle(i);if(s){const t=s.__appliedElement||s;Fe&&Fe(t),i[$e]=t}}return t}}qe.prototype.addCustomStyle=qe.prototype.addCustomStyle,qe.prototype.getStyleForCustomStyle=qe.prototype.getStyleForCustomStyle,qe.prototype.processStyles=qe.prototype.processStyles,Object.defineProperties(qe.prototype,{transformCallback:{get:()=>Fe,set(t){Fe=t}},validateCallback:{get:()=>Be,set(t){let e=!1;Be||(e=!0),Be=t,e&&this.enqueueDocumentValidation()}}});const Ve=new Ee;class Ue{constructor(){this.customStyleInterface=null,Ve.invalidCallback=Le}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=(t=>{Ve.transformCustomStyle(t)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})}))}prepareTemplate(t,e){if(this.ensure(),be(t))return;Oe[e]=t;let i=Ve.transformTemplate(t,e);t._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let t=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let e=0;e<t.length;e++){let i=t[e],s=this.customStyleInterface.getStyleForCustomStyle(i);s&&Ve.transformCustomStyle(s)}this.customStyleInterface.enqueued=!1}}styleSubtree(t,e){if(this.ensure(),e&&ve(t,e),t.shadowRoot){this.styleElement(t);let e=t.shadowRoot.children||t.shadowRoot.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}else{let e=t.children||t.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}}styleElement(t){this.ensure();let{is:e}=function(t){let e=t.localName,i="",s="";return e?e.indexOf("-")>-1?i=e:(s=e,i=t.getAttribute&&t.getAttribute("is")||""):(i=t.is,s=t.extends),{is:i,typeExtension:s}}(t),i=Oe[e];if((!i||!be(i))&&i&&!Me(i)){(function(t){return!Me(t)&&t[Ae]===t[Re]})(i)||(this.prepareTemplate(i,e),function(t){t[Ae]=t[Re],t._validating||(t._validating=!0,Ie.then(function(){t[Ne]=t[Re],t._validating=!1}))}(i));let s=t.shadowRoot;if(s){let t=s.querySelector("style");t&&(t.__cssRules=i._styleAst,t.textContent=fe(i._styleAst))}}}styleDocument(t){this.ensure(),this.styleSubtree(document.body,t)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const t=new Ue;let e=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(e,i,s){t.flushCustomStyles(),t.prepareTemplate(e,i)},prepareTemplateStyles(t,e,i){window.ShadyCSS.prepareTemplate(t,e,i)},prepareTemplateDom(t,e){},styleSubtree(e,i){t.flushCustomStyles(),t.styleSubtree(e,i)},styleElement(e){t.flushCustomStyles(),t.styleElement(e)},styleDocument(e){t.flushCustomStyles(),t.styleDocument(e)},getComputedStyleValue:(t,e)=>we(t,e),flushCustomStyles(){t.flushCustomStyles()},nativeCss:Jt,nativeShadow:Vt,cssBuild:Yt,disableRuntime:Gt},e&&(window.ShadyCSS.CustomStyleInterface=e)}window.ShadyCSS.ApplyShim=Ve,window.JSCompiler_renameProperty=function(t,e){return t};let Ye,Xe,Ge=/(url\()([^)]*)(\))/g,Je=/(^\/)|(^#)|(^[\w-\d]*:)/;function Ke(t,e){if(t&&Je.test(t))return t;if(void 0===Ye){Ye=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",Ye="http://a/c%20d"===t.href}catch(t){}}return e||(e=document.baseURI||window.location.href),Ye?new URL(t,e).href:(Xe||((Xe=document.implementation.createHTMLDocument("temp")).base=Xe.createElement("base"),Xe.head.appendChild(Xe.base),Xe.anchor=Xe.createElement("a"),Xe.body.appendChild(Xe.anchor)),Xe.base.href=e,Xe.anchor.href=t,Xe.anchor.href||t)}function Qe(t,e){return t.replace(Ge,function(t,i,s,n){return i+"'"+Ke(s.replace(/["']/g,""),e)+"'"+n})}function Ze(t){return t.substring(0,t.lastIndexOf("/")+1)}const ti=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let ei=Ze(document.baseURI||window.location.href),ii=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,si=!1,ni=!1,ri=!1,oi=!1,ai=!1,li=0;const di=function(t){let e=t.__mixinApplications;e||(e=new WeakMap,t.__mixinApplications=e);let i=li++;return function(s){let n=s.__mixinSet;if(n&&n[i])return s;let r=e,o=r.get(s);o||(o=t(s),r.set(s,o));let a=Object.create(o.__mixinSet||n||null);return a[i]=!0,o.__mixinSet=a,o}};let hi={},ci={};function pi(t,e){hi[t]=ci[t.toLowerCase()]=e}function ui(t){return hi[t]||ci[t.toLowerCase()]}class fi extends HTMLElement{static get observedAttributes(){return["id"]}static import(t,e){if(t){let i=ui(t);return i&&e?i.querySelector(e):i}return null}attributeChangedCallback(t,e,i,s){e!==i&&this.register()}get assetpath(){if(!this.__assetpath){const t=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,e=Ke(this.getAttribute("assetpath")||"",t.baseURI);this.__assetpath=Ze(e)}return this.__assetpath}register(t){if(t=t||this.id){if(ni&&void 0!==ui(t))throw pi(t,null),new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);this.id=t,pi(t,this),(e=this).querySelector("style")&&console.warn("dom-module %s has style outside template",e.id)}var e}}fi.prototype.modules=hi,customElements.define("dom-module",fi);const _i="link[rel=import][type~=css]",mi="include",yi="shady-unscoped";function gi(t){return fi.import(t)}function bi(t){const e=Qe((t.body?t.body:t).textContent,t.baseURI),i=document.createElement("style");return i.textContent=e,i}function vi(t){const e=t.trim().split(/\s+/),i=[];for(let t=0;t<e.length;t++)i.push(...wi(e[t]));return i}function wi(t){const e=gi(t);if(!e)return console.warn("Could not find style data in module named",t),[];if(void 0===e._styles){const t=[];t.push(...Si(e));const i=e.querySelector("template");i&&t.push(...xi(i,e.assetpath)),e._styles=t}return e._styles}function xi(t,e){if(!t._styles){const i=[],s=t.content.querySelectorAll("style");for(let t=0;t<s.length;t++){let n=s[t],r=n.getAttribute(mi);r&&i.push(...vi(r).filter(function(t,e,i){return i.indexOf(t)===e})),e&&(n.textContent=Qe(n.textContent,e)),i.push(n)}t._styles=i}return t._styles}function Si(t){const e=[],i=t.querySelectorAll(_i);for(let t=0;t<i.length;t++){let s=i[t];if(s.import){const t=s.import,i=s.hasAttribute(yi);if(i&&!t._unscopedStyle){const e=bi(t);e.setAttribute(yi,""),t._unscopedStyle=e}else t._style||(t._style=bi(t));e.push(i?t._unscopedStyle:t._style)}}return e}function Ci(t){let e=gi(t);if(e&&void 0===e._cssText){let t=function(t){let e="",i=Si(t);for(let t=0;t<i.length;t++)e+=i[t].textContent;return e}(e),i=e.querySelector("template");i&&(t+=function(t,e){let i="";const s=xi(t,e);for(let t=0;t<s.length;t++){let e=s[t];e.parentNode&&e.parentNode.removeChild(e),i+=e.textContent}return i}(i,e.assetpath)),e._cssText=t||null}return e||console.warn("Could not find style data in module named",t),e&&e._cssText||""}const ki=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:t=>t;function Pi(t){return t.indexOf(".")>=0}function Ti(t){let e=t.indexOf(".");return-1===e?t:t.slice(0,e)}function Ei(t,e){return 0===t.indexOf(e+".")}function Oi(t,e){return 0===e.indexOf(t+".")}function Ni(t,e,i){return e+i.slice(t.length)}function Ri(t){if(Array.isArray(t)){let e=[];for(let i=0;i<t.length;i++){let s=t[i].toString().split(".");for(let t=0;t<s.length;t++)e.push(s[t])}return e.join(".")}return t}function Ai(t){return Array.isArray(t)?Ri(t).split("."):t.toString().split(".")}function Ii(t,e,i){let s=t,n=Ai(e);for(let t=0;t<n.length;t++){if(!s)return;s=s[n[t]]}return i&&(i.path=n.join(".")),s}function Li(t,e,i){let s=t,n=Ai(e),r=n[n.length-1];if(n.length>1){for(let t=0;t<n.length-1;t++){if(!(s=s[n[t]]))return}s[r]=i}else s[e]=i;return n.join(".")}const Mi={},Di=/-[a-z]/g,zi=/([A-Z])/g;function ji(t){return Mi[t]||(Mi[t]=t.indexOf("-")<0?t:t.replace(Di,t=>t[1].toUpperCase()))}function Hi(t){return Mi[t]||(Mi[t]=t.replace(zi,"-$1").toLowerCase())}let Wi=0,$i=0,Fi=[],Bi=0,qi=document.createTextNode("");new window.MutationObserver(function(){const t=Fi.length;for(let e=0;e<t;e++){let t=Fi[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}Fi.splice(0,t),$i+=t}).observe(qi,{characterData:!0});const Vi={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},Ui={run:t=>window.requestAnimationFrame(t),cancel(t){window.cancelAnimationFrame(t)}},Yi={run:t=>(qi.textContent=Bi++,Fi.push(t),Wi++),cancel(t){const e=t-$i;if(e>=0){if(!Fi[e])throw new Error("invalid async handle: "+t);Fi[e]=null}}},Xi=Yi,Gi=di(t=>{return class extends t{static createProperties(t){const e=this.prototype;for(let i in t)i in e||e._createPropertyAccessor(i)}static attributeNameForProperty(t){return t.toLowerCase()}static typeForProperty(t){}_createPropertyAccessor(t,e){this._addPropertyToAttributeMap(t),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[t]||(this.__dataHasAccessor[t]=!0,this._definePropertyAccessor(t,e))}_addPropertyToAttributeMap(t){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[t]){const e=this.constructor.attributeNameForProperty(t);this.__dataAttributes[e]=t}}_definePropertyAccessor(t,e){Object.defineProperty(this,t,{get(){return this._getProperty(t)},set:e?function(){}:function(e){this._setProperty(t,e)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let t in this.__dataHasAccessor)this.hasOwnProperty(t)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[t]=this[t],delete this[t])}_initializeInstanceProperties(t){Object.assign(this,t)}_setProperty(t,e){this._setPendingProperty(t,e)&&this._invalidateProperties()}_getProperty(t){return this.__data[t]}_setPendingProperty(t,e,i){let s=this.__data[t],n=this._shouldPropertyChange(t,e,s);return n&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||t in this.__dataOld||(this.__dataOld[t]=s),this.__data[t]=e,this.__dataPending[t]=e),n}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,Xi.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const t=this.__data,e=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(t,e,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(t,e,i))}_shouldPropertiesChange(t,e,i){return Boolean(e)}_propertiesChanged(t,e,i){}_shouldPropertyChange(t,e,i){return i!==e&&(i==i||e==e)}attributeChangedCallback(t,e,i,s){e!==i&&this._attributeToProperty(t,i),super.attributeChangedCallback&&super.attributeChangedCallback(t,e,i,s)}_attributeToProperty(t,e,i){if(!this.__serializing){const s=this.__dataAttributes,n=s&&s[t]||t;this[n]=this._deserializeValue(e,i||this.constructor.typeForProperty(n))}}_propertyToAttribute(t,e,i){this.__serializing=!0,i=arguments.length<3?this[t]:i,this._valueToNodeAttribute(this,i,e||this.constructor.attributeNameForProperty(t)),this.__serializing=!1}_valueToNodeAttribute(t,e,i){const s=this._serializeValue(e);void 0===s?t.removeAttribute(i):("class"!==i&&"name"!==i&&"slot"!==i||(t=ki(t)),t.setAttribute(i,s))}_serializeValue(t){switch(typeof t){case"boolean":return t?"":void 0;default:return null!=t?t.toString():void 0}}_deserializeValue(t,e){switch(e){case Boolean:return null!==t;case Number:return Number(t);default:return t}}}}),Ji={};let Ki=HTMLElement.prototype;for(;Ki;){let t=Object.getOwnPropertyNames(Ki);for(let e=0;e<t.length;e++)Ji[t[e]]=!0;Ki=Object.getPrototypeOf(Ki)}const Qi=di(t=>{const e=Gi(t);return class extends e{static createPropertiesForAttributes(){let t=this.observedAttributes;for(let e=0;e<t.length;e++)this.prototype._createPropertyAccessor(ji(t[e]))}static attributeNameForProperty(t){return Hi(t)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(t){for(let e in t)this._setProperty(e,t[e])}_ensureAttribute(t,e){const i=this;i.hasAttribute(t)||this._valueToNodeAttribute(i,e,t)}_serializeValue(t){switch(typeof t){case"object":if(t instanceof Date)return t.toString();if(t)try{return JSON.stringify(t)}catch(t){return""}default:return super._serializeValue(t)}}_deserializeValue(t,e){let i;switch(e){case Object:try{i=JSON.parse(t)}catch(e){i=t}break;case Array:try{i=JSON.parse(t)}catch(e){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)}break;case Date:i=isNaN(t)?String(t):Number(t),i=new Date(i);break;default:i=super._deserializeValue(t,e)}return i}_definePropertyAccessor(t,e){!function(t,e){if(!Ji[e]){let i=t[e];void 0!==i&&(t.__data?t._setPendingProperty(e,i):(t.__dataProto?t.hasOwnProperty(JSCompiler_renameProperty("__dataProto",t))||(t.__dataProto=Object.create(t.__dataProto)):t.__dataProto={},t.__dataProto[e]=i))}}(this,t),super._definePropertyAccessor(t,e)}_hasAccessor(t){return this.__dataHasAccessor&&this.__dataHasAccessor[t]}_isPropertyPending(t){return Boolean(this.__dataPending&&t in this.__dataPending)}}}),Zi=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),ts={"dom-if":!0,"dom-repeat":!0};function es(t){let e=t.getAttribute("is");if(e&&ts[e]){let i=t;for(i.removeAttribute("is"),t=i.ownerDocument.createElement(e),i.parentNode.replaceChild(t,i),t.appendChild(i);i.attributes.length;)t.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return t}function is(t,e){let i=e.parentInfo&&is(t,e.parentInfo);if(!i)return t;Zi.currentNode=i;for(let t=Zi.firstChild(),i=0;t;t=Zi.nextSibling())if(e.parentIndex===i++)return t}function ss(t,e,i,s){s.id&&(e[s.id]=i)}function ns(t,e,i){if(i.events&&i.events.length)for(let s,n=0,r=i.events;n<r.length&&(s=r[n]);n++)t._addMethodEventListenerToNode(e,s.name,s.value,t)}function rs(t,e,i){i.templateInfo&&(e._templateInfo=i.templateInfo)}const os=di(t=>{return class extends t{static _parseTemplate(t,e){if(!t._templateInfo){let i=t._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=e&&e.stripWhiteSpace||t.hasAttribute("strip-whitespace"),this._parseTemplateContent(t,i,{parent:null})}return t._templateInfo}static _parseTemplateContent(t,e,i){return this._parseTemplateNode(t.content,e,i)}static _parseTemplateNode(t,e,i){let s,n=t;return"template"!=n.localName||n.hasAttribute("preserve-content")?"slot"===n.localName&&(e.hasInsertionPoint=!0):s=this._parseTemplateNestedTemplate(n,e,i)||s,Zi.currentNode=n,Zi.firstChild()&&(s=this._parseTemplateChildNodes(n,e,i)||s),n.hasAttributes&&n.hasAttributes()&&(s=this._parseTemplateNodeAttributes(n,e,i)||s),s}static _parseTemplateChildNodes(t,e,i){if("script"!==t.localName&&"style"!==t.localName){Zi.currentNode=t;for(let s,n=Zi.firstChild(),r=0;n;n=s){if("template"==n.localName&&(n=es(n)),Zi.currentNode=n,s=Zi.nextSibling(),n.nodeType===Node.TEXT_NODE){let i=s;for(;i&&i.nodeType===Node.TEXT_NODE;)n.textContent+=i.textContent,s=Zi.nextSibling(),t.removeChild(i),i=s;if(e.stripWhiteSpace&&!n.textContent.trim()){t.removeChild(n);continue}}let o={parentIndex:r,parentInfo:i};this._parseTemplateNode(n,e,o)&&(o.infoIndex=e.nodeInfoList.push(o)-1),Zi.currentNode=n,Zi.parentNode()&&r++}}}static _parseTemplateNestedTemplate(t,e,i){let s=this._parseTemplate(t,e);return(s.content=t.content.ownerDocument.createDocumentFragment()).appendChild(t.content),i.templateInfo=s,!0}static _parseTemplateNodeAttributes(t,e,i){let s=!1,n=Array.from(t.attributes);for(let r,o=n.length-1;r=n[o];o--)s=this._parseTemplateNodeAttribute(t,e,i,r.name,r.value)||s;return s}static _parseTemplateNodeAttribute(t,e,i,s,n){return"on-"===s.slice(0,3)?(t.removeAttribute(s),i.events=i.events||[],i.events.push({name:s.slice(3),value:n}),!0):"id"===s&&(i.id=n,!0)}static _contentForTemplate(t){let e=t._templateInfo;return e&&e.content||t.content}_stampTemplate(t){t&&!t.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(t);let e=this.constructor._parseTemplate(t),i=e.nodeInfoList,s=e.content||t.content,n=document.importNode(s,!0);n.__noInsertionPoint=!e.hasInsertionPoint;let r=n.nodeList=new Array(i.length);n.$={};for(let t,e=0,s=i.length;e<s&&(t=i[e]);e++){let i=r[e]=is(n,t);ss(0,n.$,i,t),rs(0,i,t),ns(this,i,t)}return n=n}_addMethodEventListenerToNode(t,e,i,s){let n=function(t,e,i){return t=t._methodHost||t,function(e){t[i]?t[i](e,e.detail):console.warn("listener method `"+i+"` not defined")}}(s=s||t,0,i);return this._addEventListenerToNode(t,e,n),n}_addEventListenerToNode(t,e,i){t.addEventListener(e,i)}_removeEventListenerFromNode(t,e,i){t.removeEventListener(e,i)}}});let as=0;const ls={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},ds=/[A-Z]/;function hs(t,e){let i=t[e];if(i){if(!t.hasOwnProperty(e)){i=t[e]=Object.create(t[e]);for(let t in i){let e=i[t],s=i[t]=Array(e.length);for(let t=0;t<e.length;t++)s[t]=e[t]}}}else i=t[e]={};return i}function cs(t,e,i,s,n,r){if(e){let o=!1,a=as++;for(let l in i)ps(t,e,a,l,i,s,n,r)&&(o=!0);return o}return!1}function ps(t,e,i,s,n,r,o,a){let l=!1,d=e[o?Ti(s):s];if(d)for(let e,h=0,c=d.length;h<c&&(e=d[h]);h++)e.info&&e.info.lastRun===i||o&&!us(s,e.trigger)||(e.info&&(e.info.lastRun=i),e.fn(t,s,n,r,e.info,o,a),l=!0);return l}function us(t,e){if(e){let i=e.name;return i==t||!(!e.structured||!Ei(i,t))||!(!e.wildcard||!Oi(i,t))}return!0}function fs(t,e,i,s,n){let r="string"==typeof n.method?t[n.method]:n.method,o=n.property;r?r.call(t,t.__data[o],s[o]):n.dynamicFn||console.warn("observer method `"+n.method+"` not defined")}function _s(t,e,i){let s=Ti(e);if(s!==e){return ms(t,Hi(s)+"-changed",i[e],e),!0}return!1}function ms(t,e,i,s){let n={value:i,queueProperty:!0};s&&(n.path=s),ki(t).dispatchEvent(new CustomEvent(e,{detail:n}))}function ys(t,e,i,s,n,r){let o=(r?Ti(e):e)!=e?e:null,a=o?Ii(t,o):t.__data[e];o&&void 0===a&&(a=i[e]),ms(t,n.eventName,a,o)}function gs(t,e,i,s,n){let r=t.__data[e];ii&&(r=ii(r,n.attrName,"attribute",t)),t._propertyToAttribute(e,n.attrName,r)}function bs(t,e,i,s,n){let r=Ps(t,e,i,s,n),o=n.methodInfo;t.__dataHasAccessor&&t.__dataHasAccessor[o]?t._setPendingProperty(o,r,!0):t[o]=r}function vs(t,e,i,s,n,r,o){i.bindings=i.bindings||[];let a={kind:s,target:n,parts:r,literal:o,isCompound:1!==r.length};if(i.bindings.push(a),function(t){return Boolean(t.target)&&"attribute"!=t.kind&&"text"!=t.kind&&!t.isCompound&&"{"===t.parts[0].mode}(a)){let{event:t,negate:e}=a.parts[0];a.listenerEvent=t||Hi(n)+"-changed",a.listenerNegate=e}let l=e.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let s=a.parts[i];s.compoundIndex=i,ws(t,e,a,s,l)}}function ws(t,e,i,s,n){if(!s.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let r=s.dependencies,o={index:n,binding:i,part:s,evaluator:t};for(let i=0;i<r.length;i++){let s=r[i];"string"==typeof s&&((s=Rs(s)).wildcard=!0),t._addTemplatePropertyEffect(e,s.rootProperty,{fn:xs,info:o,trigger:s})}}}function xs(t,e,i,s,n,r,o){let a=o[n.index],l=n.binding,d=n.part;if(r&&d.source&&e.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let s=i[e];e=Ni(d.source,l.target,e),a._setPendingPropertyOrPath(e,s,!1,!0)&&t._enqueueClient(a)}else{!function(t,e,i,s,n){n=function(t,e,i,s){if(i.isCompound){let n=t.__dataCompoundStorage[i.target];n[s.compoundIndex]=e,e=n.join("")}return"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==t.localName&&"textarea"!==t.localName)||(e=null==e?"":e)),e}(e,n,i,s),ii&&(n=ii(n,i.target,i.kind,e));if("attribute"==i.kind)t._valueToNodeAttribute(e,n,i.target);else{let s=i.target;e.__isPropertyEffectsClient&&e.__dataHasAccessor&&e.__dataHasAccessor[s]?e[ls.READ_ONLY]&&e[ls.READ_ONLY][s]||e._setPendingProperty(s,n)&&t._enqueueClient(e):t._setUnmanagedPropertyToNode(e,s,n)}}(t,a,l,d,n.evaluator._evaluateBinding(t,d,e,i,s,r))}}function Ss(t,e){if(e.isCompound){let i=t.__dataCompoundStorage||(t.__dataCompoundStorage={}),s=e.parts,n=new Array(s.length);for(let t=0;t<s.length;t++)n[t]=s[t].literal;let r=e.target;i[r]=n,e.literal&&"property"==e.kind&&(t[r]=e.literal)}}function Cs(t,e,i){if(i.listenerEvent){let s=i.parts[0];t.addEventListener(i.listenerEvent,function(t){!function(t,e,i,s,n){let r,o=t.detail,a=o&&o.path;a?(s=Ni(i,s,a),r=o&&o.value):r=t.currentTarget[i],r=n?!r:r,e[ls.READ_ONLY]&&e[ls.READ_ONLY][s]||!e._setPendingPropertyOrPath(s,r,!0,Boolean(a))||o&&o.queueProperty||e._invalidateProperties()}(t,e,i.target,s.source,s.negate)})}}function ks(t,e,i,s,n,r){r=e.static||r&&("object"!=typeof r||r[e.methodName]);let o={methodName:e.methodName,args:e.args,methodInfo:n,dynamicFn:r};for(let n,r=0;r<e.args.length&&(n=e.args[r]);r++)n.literal||t._addPropertyEffect(n.rootProperty,i,{fn:s,info:o,trigger:n});r&&t._addPropertyEffect(e.methodName,i,{fn:s,info:o})}function Ps(t,e,i,s,n){let r=t._methodHost||t,o=r[n.methodName];if(o){let s=t._marshalArgs(n.args,e,i);return o.apply(r,s)}n.dynamicFn||console.warn("method `"+n.methodName+"` not defined")}const Ts=[],Es=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function Os(t){let e="";for(let i=0;i<t.length;i++){e+=t[i].literal||""}return e}function Ns(t){let e=t.match(/([^\s]+?)\(([\s\S]*)\)/);if(e){let t={methodName:e[1],static:!0,args:Ts};if(e[2].trim()){return function(t,e){return e.args=t.map(function(t){let i=Rs(t);return i.literal||(e.static=!1),i},this),e}(e[2].replace(/\\,/g,"&comma;").split(","),t)}return t}return null}function Rs(t){let e=t.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:e,value:"",literal:!1},s=e[0];switch("-"===s&&(s=e[1]),s>="0"&&s<="9"&&(s="#"),s){case"'":case'"':i.value=e.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(e),i.literal=!0}return i.literal||(i.rootProperty=Ti(e),i.structured=Pi(e),i.structured&&(i.wildcard=".*"==e.slice(-2),i.wildcard&&(i.name=e.slice(0,-2)))),i}function As(t,e,i){let s=Ii(t,i);return void 0===s&&(s=e[i]),s}function Is(t,e,i,s){t.notifyPath(i+".splices",{indexSplices:s}),t.notifyPath(i+".length",e.length)}function Ls(t,e,i,s,n,r){Is(t,e,i,[{index:s,addedCount:n,removed:r,object:e,type:"splice"}])}const Ms=di(t=>{const e=os(Qi(t));return class extends e{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return ls}_initializeProperties(){super._initializeProperties(),Ds.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(t){this.__data=Object.create(t),this.__dataPending=Object.create(t),this.__dataOld={}}_initializeInstanceProperties(t){let e=this[ls.READ_ONLY];for(let i in t)e&&e[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=t[i])}_addPropertyEffect(t,e,i){this._createPropertyAccessor(t,e==ls.READ_ONLY);let s=hs(this,e)[t];s||(s=this[e][t]=[]),s.push(i)}_removePropertyEffect(t,e,i){let s=hs(this,e)[t],n=s.indexOf(i);n>=0&&s.splice(n,1)}_hasPropertyEffect(t,e){let i=this[e];return Boolean(i&&i[t])}_hasReadOnlyEffect(t){return this._hasPropertyEffect(t,ls.READ_ONLY)}_hasNotifyEffect(t){return this._hasPropertyEffect(t,ls.NOTIFY)}_hasReflectEffect(t){return this._hasPropertyEffect(t,ls.REFLECT)}_hasComputedEffect(t){return this._hasPropertyEffect(t,ls.COMPUTE)}_setPendingPropertyOrPath(t,e,i,s){if(s||Ti(Array.isArray(t)?t[0]:t)!==t){if(!s){let i=Ii(this,t);if(!(t=Li(this,t,e))||!super._shouldPropertyChange(t,e,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(t,e,i))return function(t,e,i){let s=t.__dataLinkedPaths;if(s){let n;for(let r in s){let o=s[r];Oi(r,e)?(n=Ni(r,o,e),t._setPendingPropertyOrPath(n,i,!0,!0)):Oi(o,e)&&(n=Ni(o,r,e),t._setPendingPropertyOrPath(n,i,!0,!0))}}}(this,t,e),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[t])return this._setPendingProperty(t,e,i);this[t]=e}return!1}_setUnmanagedPropertyToNode(t,e,i){i===t[e]&&"object"!=typeof i||(t[e]=i)}_setPendingProperty(t,e,i){let s=this.__dataHasPaths&&Pi(t),n=s?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(t,e,n[t])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),t in this.__dataOld||(this.__dataOld[t]=this.__data[t]),s?this.__dataTemp[t]=e:this.__data[t]=e,this.__dataPending[t]=e,(s||this[ls.NOTIFY]&&this[ls.NOTIFY][t])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[t]=i),!0)}_setProperty(t,e){this._setPendingProperty(t,e,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(t){this.__dataPendingClients=this.__dataPendingClients||[],t!==this&&this.__dataPendingClients.push(t)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let t=this.__dataPendingClients;if(t){this.__dataPendingClients=null;for(let e=0;e<t.length;e++){let i=t[e];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(t,e){for(let i in t)!e&&this[ls.READ_ONLY]&&this[ls.READ_ONLY][i]||this._setPendingPropertyOrPath(i,t[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(t,e,i){let s=this.__dataHasPaths;this.__dataHasPaths=!1,function(t,e,i,s){let n=t[ls.COMPUTE];if(n){let r=e;for(;cs(t,n,r,i,s);)Object.assign(i,t.__dataOld),Object.assign(e,t.__dataPending),r=t.__dataPending,t.__dataPending=null}}(this,e,i,s);let n=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(e,i,s),this._flushClients(),cs(this,this[ls.REFLECT],e,i,s),cs(this,this[ls.OBSERVE],e,i,s),n&&function(t,e,i,s,n){let r,o,a=t[ls.NOTIFY],l=as++;for(let o in e)e[o]&&(a&&ps(t,a,l,o,i,s,n)?r=!0:n&&_s(t,o,i)&&(r=!0));r&&(o=t.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,n,e,i,s),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(t,e,i){this[ls.PROPAGATE]&&cs(this,this[ls.PROPAGATE],t,e,i);let s=this.__templateInfo;for(;s;)cs(this,s.propertyEffects,t,e,i,s.nodeList),s=s.nextTemplateInfo}linkPaths(t,e){t=Ri(t),e=Ri(e),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[t]=e}unlinkPaths(t){t=Ri(t),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[t]}notifySplices(t,e){let i={path:""};Is(this,Ii(this,t,i),i.path,e)}get(t,e){return Ii(e||this,t)}set(t,e,i){i?Li(i,t,e):this[ls.READ_ONLY]&&this[ls.READ_ONLY][t]||this._setPendingPropertyOrPath(t,e,!0)&&this._invalidateProperties()}push(t,...e){let i={path:""},s=Ii(this,t,i),n=s.length,r=s.push(...e);return e.length&&Ls(this,s,i.path,n,e.length,[]),r}pop(t){let e={path:""},i=Ii(this,t,e),s=Boolean(i.length),n=i.pop();return s&&Ls(this,i,e.path,i.length,0,[n]),n}splice(t,e,i,...s){let n,r={path:""},o=Ii(this,t,r);return e<0?e=o.length-Math.floor(-e):e&&(e=Math.floor(e)),n=2===arguments.length?o.splice(e):o.splice(e,i,...s),(s.length||n.length)&&Ls(this,o,r.path,e,s.length,n),n}shift(t){let e={path:""},i=Ii(this,t,e),s=Boolean(i.length),n=i.shift();return s&&Ls(this,i,e.path,0,0,[n]),n}unshift(t,...e){let i={path:""},s=Ii(this,t,i),n=s.unshift(...e);return e.length&&Ls(this,s,i.path,0,e.length,[]),n}notifyPath(t,e){let i;if(1==arguments.length){let s={path:""};e=Ii(this,t,s),i=s.path}else i=Array.isArray(t)?Ri(t):t;this._setPendingPropertyOrPath(i,e,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(t,e){var i;this._addPropertyEffect(t,ls.READ_ONLY),e&&(this["_set"+(i=t,i[0].toUpperCase()+i.substring(1))]=function(e){this._setProperty(t,e)})}_createPropertyObserver(t,e,i){let s={property:t,method:e,dynamicFn:Boolean(i)};this._addPropertyEffect(t,ls.OBSERVE,{fn:fs,info:s,trigger:{name:t}}),i&&this._addPropertyEffect(e,ls.OBSERVE,{fn:fs,info:s,trigger:{name:e}})}_createMethodObserver(t,e){let i=Ns(t);if(!i)throw new Error("Malformed observer expression '"+t+"'");ks(this,i,ls.OBSERVE,Ps,null,e)}_createNotifyingProperty(t){this._addPropertyEffect(t,ls.NOTIFY,{fn:ys,info:{eventName:Hi(t)+"-changed",property:t}})}_createReflectedProperty(t){let e=this.constructor.attributeNameForProperty(t);"-"===e[0]?console.warn("Property "+t+" cannot be reflected to attribute "+e+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(t,ls.REFLECT,{fn:gs,info:{attrName:e}})}_createComputedProperty(t,e,i){let s=Ns(e);if(!s)throw new Error("Malformed computed expression '"+e+"'");ks(this,s,ls.COMPUTE,bs,t,i)}_marshalArgs(t,e,i){const s=this.__data,n=[];for(let r=0,o=t.length;r<o;r++){let{name:o,structured:a,wildcard:l,value:d,literal:h}=t[r];if(!h)if(l){const t=Oi(o,e),n=As(s,i,t?e:o);d={path:t?e:o,value:n,base:t?Ii(s,o):n}}else d=a?As(s,i,o):s[o];n[r]=d}return n}static addPropertyEffect(t,e,i){this.prototype._addPropertyEffect(t,e,i)}static createPropertyObserver(t,e,i){this.prototype._createPropertyObserver(t,e,i)}static createMethodObserver(t,e){this.prototype._createMethodObserver(t,e)}static createNotifyingProperty(t){this.prototype._createNotifyingProperty(t)}static createReadOnlyProperty(t,e){this.prototype._createReadOnlyProperty(t,e)}static createReflectedProperty(t){this.prototype._createReflectedProperty(t)}static createComputedProperty(t,e,i){this.prototype._createComputedProperty(t,e,i)}static bindTemplate(t){return this.prototype._bindTemplate(t)}_bindTemplate(t,e){let i=this.constructor._parseTemplate(t),s=this.__templateInfo==i;if(!s)for(let t in i.propertyEffects)this._createPropertyAccessor(t);if(e&&((i=Object.create(i)).wasPreBound=s,!s&&this.__templateInfo)){let t=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=t.nextTemplateInfo=i,i.previousTemplateInfo=t,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(t,e,i){(t.hostProps=t.hostProps||{})[e]=!0;let s=t.propertyEffects=t.propertyEffects||{};(s[e]=s[e]||[]).push(i)}_stampTemplate(t){Ds.beginHosting(this);let e=super._stampTemplate(t);Ds.endHosting(this);let i=this._bindTemplate(t,!0);if(i.nodeList=e.nodeList,!i.wasPreBound){let t=i.childNodes=[];for(let i=e.firstChild;i;i=i.nextSibling)t.push(i)}return e.templateInfo=i,function(t,e){let{nodeList:i,nodeInfoList:s}=e;if(s.length)for(let e=0;e<s.length;e++){let n=s[e],r=i[e],o=n.bindings;if(o)for(let e=0;e<o.length;e++){let i=o[e];Ss(r,i),Cs(r,t,i)}r.__dataHost=t}}(this,i),this.__dataReady&&cs(this,i.propertyEffects,this.__data,null,!1,i.nodeList),e}_removeBoundDom(t){let e=t.templateInfo;e.previousTemplateInfo&&(e.previousTemplateInfo.nextTemplateInfo=e.nextTemplateInfo),e.nextTemplateInfo&&(e.nextTemplateInfo.previousTemplateInfo=e.previousTemplateInfo),this.__templateInfoLast==e&&(this.__templateInfoLast=e.previousTemplateInfo),e.previousTemplateInfo=e.nextTemplateInfo=null;let i=e.childNodes;for(let t=0;t<i.length;t++){let e=i[t];e.parentNode.removeChild(e)}}static _parseTemplateNode(t,e,i){let s=super._parseTemplateNode(t,e,i);if(t.nodeType===Node.TEXT_NODE){let n=this._parseBindings(t.textContent,e);n&&(t.textContent=Os(n)||" ",vs(this,e,i,"text","textContent",n),s=!0)}return s}static _parseTemplateNodeAttribute(t,e,i,s,n){let r=this._parseBindings(n,e);if(r){let n=s,o="property";ds.test(s)?o="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),o="attribute");let a=Os(r);return a&&"attribute"==o&&("class"==s&&t.hasAttribute("class")&&(a+=" "+t.getAttribute(s)),t.setAttribute(s,a)),"input"===t.localName&&"value"===n&&t.setAttribute(n,""),t.removeAttribute(n),"property"===o&&(s=ji(s)),vs(this,e,i,o,s,r,a),!0}return super._parseTemplateNodeAttribute(t,e,i,s,n)}static _parseTemplateNestedTemplate(t,e,i){let s=super._parseTemplateNestedTemplate(t,e,i),n=i.templateInfo.hostProps;for(let t in n)vs(this,e,i,"property","_host_"+t,[{mode:"{",source:t,dependencies:[t]}]);return s}static _parseBindings(t,e){let i,s=[],n=0;for(;null!==(i=Es.exec(t));){i.index>n&&s.push({literal:t.slice(n,i.index)});let r=i[1][0],o=Boolean(i[2]),a=i[3].trim(),l=!1,d="",h=-1;"{"==r&&(h=a.indexOf("::"))>0&&(d=a.substring(h+2),a=a.substring(0,h),l=!0);let c=Ns(a),p=[];if(c){let{args:t,methodName:i}=c;for(let e=0;e<t.length;e++){let i=t[e];i.literal||p.push(i)}let s=e.dynamicFns;(s&&s[i]||c.static)&&(p.push(i),c.dynamicFn=!0)}else p.push(a);s.push({source:a,mode:r,negate:o,customEvent:l,signature:c,dependencies:p,event:d}),n=Es.lastIndex}if(n&&n<t.length){let e=t.substring(n);e&&s.push({literal:e})}return s.length?s:null}static _evaluateBinding(t,e,i,s,n,r){let o;return o=e.signature?Ps(t,i,s,0,e.signature):i!=e.source?Ii(t,e.source):r&&Pi(i)?Ii(t,i):t.__data[i],e.negate&&(o=!o),o}}});const Ds=new class{constructor(){this.stack=[]}registerHost(t){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(t)}beginHosting(t){this.stack.push(t)}endHosting(t){let e=this.stack.length;e&&this.stack[e-1]==t&&this.stack.pop()}};const zs=di(t=>{const e=Gi(t);function i(t){const e=Object.getPrototypeOf(t);return e.prototype instanceof n?e:null}function s(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",t))){let e=null;if(t.hasOwnProperty(JSCompiler_renameProperty("properties",t))){const i=t.properties;i&&(e=function(t){const e={};for(let i in t){const s=t[i];e[i]="function"==typeof s?{type:s}:s}return e}(i))}t.__ownProperties=e}return t.__ownProperties}class n extends e{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){this.prototype;const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(t=>this.attributeNameForProperty(t)):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const t=i(this);t&&t.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const t=s(this);t&&this.createProperties(t)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const t=i(this);this.__properties=Object.assign({},t&&t._properties,s(this))}return this.__properties}static typeForProperty(t){const e=this._properties[t];return e&&e.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return n}),js="3.2.0",Hs=window.ShadyCSS&&window.ShadyCSS.cssBuild,Ws=di(t=>{const e=zs(Ms(t));function i(t,e,i,s){if(!Hs){const n=e.content.querySelectorAll("style"),r=xi(e),o=function(t){let e=gi(t);return e?Si(e):[]}(i),a=e.content.firstElementChild;for(let i=0;i<o.length;i++){let n=o[i];n.textContent=t._processStyleText(n.textContent,s),e.content.insertBefore(n,a)}let l=0;for(let e=0;e<r.length;e++){let i=r[e],o=n[l];o!==i?(i=i.cloneNode(!0),o.parentNode.insertBefore(i,o)):l++,i.textContent=t._processStyleText(i.textContent,s)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(e,i)}return class extends e{static get polymerElementVersion(){return js}static _finalizeClass(){super._finalizeClass();const t=((e=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",e))||(e.__ownObservers=e.hasOwnProperty(JSCompiler_renameProperty("observers",e))?e.observers:null),e.__ownObservers);var e;t&&this.createObservers(t,this._properties),this._prepareTemplate()}static _prepareTemplate(){let t=this.template;t&&("string"==typeof t?(console.error("template getter must return HTMLTemplateElement"),t=null):oi||(t=t.cloneNode(!0))),this.prototype._template=t}static createProperties(t){for(let r in t)e=this.prototype,i=r,s=t[r],n=t,s.computed&&(s.readOnly=!0),s.computed&&(e._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):e._createComputedProperty(i,s.computed,n)),s.readOnly&&!e._hasReadOnlyEffect(i)?e._createReadOnlyProperty(i,!s.computed):!1===s.readOnly&&e._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),s.reflectToAttribute&&!e._hasReflectEffect(i)?e._createReflectedProperty(i):!1===s.reflectToAttribute&&e._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),s.notify&&!e._hasNotifyEffect(i)?e._createNotifyingProperty(i):!1===s.notify&&e._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),s.observer&&e._createPropertyObserver(i,s.observer,n[s.observer]),e._addPropertyToAttributeMap(i);var e,i,s,n}static createObservers(t,e){const i=this.prototype;for(let s=0;s<t.length;s++)i._createMethodObserver(t[s],e)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(t){let e=null;if(t&&(!ni||ri)&&(e=fi.import(t,"template"),ni&&!e))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);return e}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(t){this._template=t}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const t=this.importMeta;if(t)this._importPath=Ze(t.url);else{const t=fi.import(this.is);this._importPath=t&&t.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=ei,this.importPath=this.constructor.importPath;let t=function(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",t))){t.__propertyDefaults=null;let e=t._properties;for(let i in e){let s=e[i];"value"in s&&(t.__propertyDefaults=t.__propertyDefaults||{},t.__propertyDefaults[i]=s)}}return t.__propertyDefaults}(this.constructor);if(t)for(let e in t){let i=t[e];if(!this.hasOwnProperty(e)){let t="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(e)?this._setPendingProperty(e,t,!0):this[e]=t}}}static _processStyleText(t,e){return Qe(t,e)}static _finalizeTemplate(t){const e=this.prototype._template;if(e&&!e.__polymerFinalized){e.__polymerFinalized=!0;const s=this.importPath;i(this,e,t,s?Ke(s):""),this.prototype._bindTemplate(e)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(t){const e=ki(this);if(e.attachShadow)return t?(e.shadowRoot||e.attachShadow({mode:"open"}),e.shadowRoot.appendChild(t),ai&&window.ShadyDOM&&ShadyDOM.flushInitial(e.shadowRoot),e.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(t){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,t)}resolveUrl(t,e){return!e&&this.importPath&&(e=Ke(this.importPath)),Ke(t,e)}static _parseTemplateContent(t,e,i){return e.dynamicFns=e.dynamicFns||this._properties,super._parseTemplateContent(t,e,i)}static _addTemplatePropertyEffect(t,e,i){return!oi||e in this._properties||console.warn(`Property '${e}' used in template but not declared in 'properties'; `+"attribute will not be observed."),super._addTemplatePropertyEffect(t,e,i)}}});class $s{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,Fs.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),Fs.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,i){return t instanceof $s?t._cancelAsync():t=new $s,t.setConfig(e,i),t}}let Fs=new Set;const Bs=function(t){Fs.add(t)},qs=function(){const t=Boolean(Fs.size);return Fs.forEach(t=>{try{t.flush()}catch(t){setTimeout(()=>{throw t})}}),t};let Vs="string"==typeof document.head.style.touchAction,Us="__polymerGestures",Ys="__polymerGesturesHandled",Xs="__polymerGesturesTouchAction",Gs=25,Js=5,Ks=2500,Qs=["mousedown","mousemove","mouseup","click"],Zs=[0,1,4,2],tn=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function en(t){return Qs.indexOf(t)>-1}let sn=!1;function nn(t){if(!en(t)&&"touchend"!==t)return Vs&&sn&&si?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){sn=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let rn=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const on=[],an={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},ln={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function dn(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let i=t.getRootNode();if(t.id){let s=i.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<s.length;t++)e.push(s[t])}}return e}let hn=function(t){let e=t.sourceCapabilities;var i;if((!e||e.firesTouchEvents)&&(t[Ys]={skip:!0},"click"===t.type)){let e=!1,s=mn(t);for(let t=0;t<s.length;t++){if(s[t].nodeType===Node.ELEMENT_NODE)if("label"===s[t].localName)on.push(s[t]);else if(i=s[t],an[i.localName]){let i=dn(s[t]);for(let t=0;t<i.length;t++)e=e||on.indexOf(i[t])>-1}if(s[t]===un.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function cn(t){let e=rn?["click"]:Qs;for(let i,s=0;s<e.length;s++)i=e[s],t?(on.length=0,document.addEventListener(i,hn,!0)):document.removeEventListener(i,hn,!0)}function pn(t){let e=t.type;if(!en(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!tn&&(e=Zs[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let un={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function fn(t,e,i){t.movefn=e,t.upfn=i,document.addEventListener("mousemove",e),document.addEventListener("mouseup",i)}function _n(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){un.mouse.mouseIgnoreJob||cn(!0),un.mouse.target=mn(t)[0],un.mouse.mouseIgnoreJob=$s.debounce(un.mouse.mouseIgnoreJob,Vi.after(Ks),function(){cn(),un.mouse.target=null,un.mouse.mouseIgnoreJob=null})},!!sn&&{passive:!0});const mn=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],yn={},gn=[];function bn(t){const e=mn(t);return e.length>0?e[0]:t.target}function vn(t){let e,i=t.type,s=t.currentTarget[Us];if(!s)return;let n=s[i];if(n){if(!t[Ys]&&(t[Ys]={},"touch"===i.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===i&&1===t.touches.length&&(un.touch.id=e.identifier),un.touch.id!==e.identifier)return;Vs||"touchstart"!==i&&"touchmove"!==i||function(t){let e=t.changedTouches[0],i=t.type;if("touchstart"===i)un.touch.x=e.clientX,un.touch.y=e.clientY,un.touch.scrollDecided=!1;else if("touchmove"===i){if(un.touch.scrollDecided)return;un.touch.scrollDecided=!0;let i=function(t){let e="auto",i=mn(t);for(let t,s=0;s<i.length;s++)if((t=i[s])[Xs]){e=t[Xs];break}return e}(t),s=!1,n=Math.abs(un.touch.x-e.clientX),r=Math.abs(un.touch.y-e.clientY);t.cancelable&&("none"===i?s=!0:"pan-x"===i?s=r>n:"pan-y"===i&&(s=n>r)),s?t.preventDefault():Pn("track")}}(t)}if(!(e=t[Ys]).skip){for(let i,s=0;s<gn.length;s++)n[(i=gn[s]).name]&&!e[i.name]&&i.flow&&i.flow.start.indexOf(t.type)>-1&&i.reset&&i.reset();for(let s,r=0;r<gn.length;r++)n[(s=gn[r]).name]&&!e[s.name]&&(e[s.name]=!0,s[i](t))}}}function wn(t,e,i){return!!yn[e]&&(function(t,e,i){let s=yn[e],n=s.deps,r=s.name,o=t[Us];o||(t[Us]=o={});for(let e,i,s=0;s<n.length;s++)e=n[s],rn&&en(e)&&"click"!==e||((i=o[e])||(o[e]=i={_count:0}),0===i._count&&t.addEventListener(e,vn,nn(e)),i[r]=(i[r]||0)+1,i._count=(i._count||0)+1);t.addEventListener(e,i),s.touchAction&&Cn(t,s.touchAction)}(t,e,i),!0)}function xn(t,e,i){return!!yn[e]&&(function(t,e,i){let s=yn[e],n=s.deps,r=s.name,o=t[Us];if(o)for(let e,i,s=0;s<n.length;s++)e=n[s],(i=o[e])&&i[r]&&(i[r]=(i[r]||1)-1,i._count=(i._count||1)-1,0===i._count&&t.removeEventListener(e,vn,nn(e)));t.removeEventListener(e,i)}(t,e,i),!0)}function Sn(t){gn.push(t);for(let e=0;e<t.emits.length;e++)yn[t.emits[e]]=t}function Cn(t,e){Vs&&t instanceof HTMLElement&&Yi.run(()=>{t.style.touchAction=e}),t[Xs]=e}function kn(t,e,i){let s=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=i,ki(t).dispatchEvent(s),s.defaultPrevented){let t=i.preventer||i.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function Pn(t){let e=function(t){for(let e,i=0;i<gn.length;i++){e=gn[i];for(let i,s=0;s<e.emits.length;s++)if((i=e.emits[s])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function Tn(t,e,i,s){e&&kn(e,t,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:s,prevent:function(t){return Pn(t)}})}function En(t,e,i){if(t.prevent)return!1;if(t.started)return!0;let s=Math.abs(t.x-e),n=Math.abs(t.y-i);return s>=Js||n>=Js}function On(t,e,i){if(!e)return;let s,n=t.moves[t.moves.length-2],r=t.moves[t.moves.length-1],o=r.x-t.x,a=r.y-t.y,l=0;n&&(s=r.x-n.x,l=r.y-n.y),kn(e,"track",{state:t.state,x:i.clientX,y:i.clientY,dx:o,dy:a,ddx:s,ddy:l,sourceEvent:i,hover:function(){return function(t,e){let i=document.elementFromPoint(t,e),s=i;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(t,e));)s&&(i=s);return i}(i.clientX,i.clientY)}})}function Nn(t,e,i){let s=Math.abs(e.clientX-t.x),n=Math.abs(e.clientY-t.y),r=bn(i||e);!r||ln[r.localName]&&r.hasAttribute("disabled")||(isNaN(s)||isNaN(n)||s<=Gs&&n<=Gs||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=bn(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let i=e.getBoundingClientRect(),s=t.pageX,n=t.pageY;return!(s>=i.left&&s<=i.right&&n>=i.top&&n<=i.bottom)}return!1}(e))&&(t.prevent||kn(r,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i}))}Sn({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){_n(this.info)},mousedown:function(t){if(!pn(t))return;let e=bn(t),i=this;fn(this.info,function(t){pn(t)||(Tn("up",e,t),_n(i.info))},function(t){pn(t)&&Tn("up",e,t),_n(i.info)}),Tn("down",e,t)},touchstart:function(t){Tn("down",bn(t),t.changedTouches[0],t)},touchend:function(t){Tn("up",bn(t),t.changedTouches[0],t)}}),Sn({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,_n(this.info)},mousedown:function(t){if(!pn(t))return;let e=bn(t),i=this,s=function(t){let s=t.clientX,n=t.clientY;En(i.info,s,n)&&(i.info.state=i.info.started?"mouseup"===t.type?"end":"track":"start","start"===i.info.state&&Pn("tap"),i.info.addMove({x:s,y:n}),pn(t)||(i.info.state="end",_n(i.info)),e&&On(i.info,e,t),i.info.started=!0)};fn(this.info,s,function(t){i.info.started&&s(t),_n(i.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=bn(t),i=t.changedTouches[0],s=i.clientX,n=i.clientY;En(this.info,s,n)&&("start"===this.info.state&&Pn("tap"),this.info.addMove({x:s,y:n}),On(this.info,e,i),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=bn(t),i=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),On(this.info,e,i))}}),Sn({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){pn(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){pn(t)&&Nn(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){Nn(this.info,t.changedTouches[0],t)}});const Rn=di(t=>{return class extends t{_addEventListenerToNode(t,e,i){wn(t,e,i)||super._addEventListenerToNode(t,e,i)}_removeEventListenerFromNode(t,e,i){xn(t,e,i)||super._removeEventListenerFromNode(t,e,i)}}}),An=/:host\(:dir\((ltr|rtl)\)\)/g,In=':host([dir="$1"])',Ln=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Mn=':host([dir="$2"]) $1',Dn=/:dir\((?:ltr|rtl)\)/,zn=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),jn=[];let Hn=null,Wn="";function $n(){Wn=document.documentElement.getAttribute("dir")}function Fn(t){if(!t.__autoDirOptOut){t.setAttribute("dir",Wn)}}function Bn(){$n(),Wn=document.documentElement.getAttribute("dir");for(let t=0;t<jn.length;t++)Fn(jn[t])}const qn=di(t=>{zn||Hn||($n(),(Hn=new MutationObserver(Bn)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const e=Qi(t);class i extends e{static _processStyleText(t,e){return t=super._processStyleText(t,e),!zn&&Dn.test(t)&&(t=this._replaceDirInCssText(t),this.__activateDir=!0),t}static _replaceDirInCssText(t){let e=t;return e=(e=e.replace(An,In)).replace(Ln,Mn)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){e.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(Hn&&Hn.takeRecords().length&&Bn(),jn.push(this),Fn(this))}disconnectedCallback(){if(e.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const t=jn.indexOf(this);t>-1&&jn.splice(t,1)}}}return i.__activateDir=!1,i});let Vn=!1,Un=[],Yn=[];function Xn(){Vn=!0,requestAnimationFrame(function(){Vn=!1,function(t){for(;t.length;)Gn(t.shift())}(Un),setTimeout(function(){!function(t){for(let e=0,i=t.length;e<i;e++)Gn(t.shift())}(Yn)})})}function Gn(t){const e=t[0],i=t[1],s=t[2];try{i.apply(e,s)}catch(t){setTimeout(()=>{throw t})}}function Jn(t,e,i){Vn||Xn(),Yn.push([t,e,i])}function Kn(){document.body.removeAttribute("unresolved")}function Qn(t,e,i){return{index:t,removed:e,addedCount:i}}"interactive"===document.readyState||"complete"===document.readyState?Kn():window.addEventListener("DOMContentLoaded",Kn);const Zn=0,tr=1,er=2,ir=3;function sr(t,e,i,s,n,r){let o,a=0,l=0,d=Math.min(i-e,r-n);if(0==e&&0==n&&(a=function(t,e,i){for(let s=0;s<i;s++)if(!rr(t[s],e[s]))return s;return i}(t,s,d)),i==t.length&&r==s.length&&(l=function(t,e,i){let s=t.length,n=e.length,r=0;for(;r<i&&rr(t[--s],e[--n]);)r++;return r}(t,s,d-a)),n+=a,r-=l,(i-=l)-(e+=a)==0&&r-n==0)return[];if(e==i){for(o=Qn(e,[],0);n<r;)o.removed.push(s[n++]);return[o]}if(n==r)return[Qn(e,[],i-e)];let h=function(t){let e=t.length-1,i=t[0].length-1,s=t[e][i],n=[];for(;e>0||i>0;){if(0==e){n.push(er),i--;continue}if(0==i){n.push(ir),e--;continue}let r,o=t[e-1][i-1],a=t[e-1][i],l=t[e][i-1];(r=a<l?a<o?a:o:l<o?l:o)==o?(o==s?n.push(Zn):(n.push(tr),s=o),e--,i--):r==a?(n.push(ir),e--,s=a):(n.push(er),i--,s=l)}return n.reverse(),n}(function(t,e,i,s,n,r){let o=r-n+1,a=i-e+1,l=new Array(o);for(let t=0;t<o;t++)l[t]=new Array(a),l[t][0]=t;for(let t=0;t<a;t++)l[0][t]=t;for(let i=1;i<o;i++)for(let r=1;r<a;r++)if(rr(t[e+r-1],s[n+i-1]))l[i][r]=l[i-1][r-1];else{let t=l[i-1][r]+1,e=l[i][r-1]+1;l[i][r]=t<e?t:e}return l}(t,e,i,s,n,r));o=void 0;let c=[],p=e,u=n;for(let t=0;t<h.length;t++)switch(h[t]){case Zn:o&&(c.push(o),o=void 0),p++,u++;break;case tr:o||(o=Qn(p,[],0)),o.addedCount++,p++,o.removed.push(s[u]),u++;break;case er:o||(o=Qn(p,[],0)),o.addedCount++,p++;break;case ir:o||(o=Qn(p,[],0)),o.removed.push(s[u]),u++}return o&&c.push(o),c}function nr(t,e){return sr(t,0,t.length,e,0,e.length)}function rr(t,e){return t===e}function or(t){return"slot"===t.localName}let ar=class{static getFlattenedNodes(t){const e=ki(t);return or(t)?(t=t,e.assignedNodes({flatten:!0})):Array.from(e.childNodes).map(t=>or(t)?ki(t=t).assignedNodes({flatten:!0}):[t]).reduce((t,e)=>t.concat(e),[])}constructor(t,e){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=t,this.callback=e,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){or(this._target)?this._listenSlots([this._target]):ki(this._target).children&&(this._listenSlots(ki(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,t=>{this._processMutations(t)}):(this._nativeChildrenObserver=new MutationObserver(t=>{this._processMutations(t)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){or(this._target)?this._unlistenSlots([this._target]):ki(this._target).children&&(this._unlistenSlots(ki(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,Yi.run(()=>this.flush()))}_processMutations(t){this._processSlotMutations(t),this.flush()}_processSlotMutations(t){if(t)for(let e=0;e<t.length;e++){let i=t[e];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let t={target:this._target,addedNodes:[],removedNodes:[]},e=this.constructor.getFlattenedNodes(this._target),i=nr(e,this._effectiveNodes);for(let e,s=0;s<i.length&&(e=i[s]);s++)for(let i,s=0;s<e.removed.length&&(i=e.removed[s]);s++)t.removedNodes.push(i);for(let s,n=0;n<i.length&&(s=i[n]);n++)for(let i=s.index;i<s.index+s.addedCount;i++)t.addedNodes.push(e[i]);this._effectiveNodes=e;let s=!1;return(t.addedNodes.length||t.removedNodes.length)&&(s=!0,this.callback.call(this._target,t)),s}_listenSlots(t){for(let e=0;e<t.length;e++){let i=t[e];or(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(t){for(let e=0;e<t.length;e++){let i=t[e];or(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};const lr=function(){let t,e;do{t=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),e=qs()}while(t||e)},dr=Element.prototype,hr=dr.matches||dr.matchesSelector||dr.mozMatchesSelector||dr.msMatchesSelector||dr.oMatchesSelector||dr.webkitMatchesSelector,cr=function(t,e){return hr.call(t,e)};class pr{constructor(t){this.node=t}observeNodes(t){return new ar(this.node,t)}unobserveNodes(t){t.disconnect()}notifyObserver(){}deepContains(t){if(ki(this.node).contains(t))return!0;let e=t,i=t.ownerDocument;for(;e&&e!==i&&e!==this.node;)e=ki(e).parentNode||ki(e).host;return e===this.node}getOwnerRoot(){return ki(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?ki(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let t=[],e=ki(this.node).assignedSlot;for(;e;)t.push(e),e=ki(e).assignedSlot;return t}importNode(t,e){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return ki(i).importNode(t,e)}getEffectiveChildNodes(){return ar.getFlattenedNodes(this.node)}queryDistributedElements(t){let e=this.getEffectiveChildNodes(),i=[];for(let s,n=0,r=e.length;n<r&&(s=e[n]);n++)s.nodeType===Node.ELEMENT_NODE&&cr(s,t)&&i.push(s);return i}get activeElement(){let t=this.node;return void 0!==t._activeElement?t._activeElement:t.activeElement}}function ur(t,e){for(let i=0;i<e.length;i++){let s=e[i];Object.defineProperty(t,s,{get:function(){return this.node[s]},configurable:!0})}}class fr{constructor(t){this.event=t}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}pr.prototype.cloneNode,pr.prototype.appendChild,pr.prototype.insertBefore,pr.prototype.removeChild,pr.prototype.replaceChild,pr.prototype.setAttribute,pr.prototype.removeAttribute,pr.prototype.querySelector,pr.prototype.querySelectorAll,pr.prototype.parentNode,pr.prototype.firstChild,pr.prototype.lastChild,pr.prototype.nextSibling,pr.prototype.previousSibling,pr.prototype.firstElementChild,pr.prototype.lastElementChild,pr.prototype.nextElementSibling,pr.prototype.previousElementSibling,pr.prototype.childNodes,pr.prototype.children,pr.prototype.classList,pr.prototype.textContent,pr.prototype.innerHTML;let _r=pr;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class t extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(pr.prototype).forEach(e=>{"activeElement"!=e&&(t.prototype[e]=pr.prototype[e])}),ur(t.prototype,["classList"]),_r=t,Object.defineProperties(fr.prototype,{localTarget:{get(){return this.event.currentTarget},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(t,e){for(let i=0;i<e.length;i++){let s=e[i];t[s]=function(){return this.node[s].apply(this.node,arguments)}}}(pr.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),ur(pr.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(t,e){for(let i=0;i<e.length;i++){let s=e[i];Object.defineProperty(t,s,{get:function(){return this.node[s]},set:function(t){this.node[s]=t},configurable:!0})}}(pr.prototype,["textContent","innerHTML"]);const mr=function(t){if((t=t||document)instanceof _r)return t;if(t instanceof fr)return t;let e=t.__domApi;return e||(e=t instanceof Event?new fr(t):new _r(t),t.__domApi=e),e};let yr=window.ShadyCSS;const gr=di(t=>{const e=qn(Rn(Ws(t))),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends e{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(t,e,i,s){e!==i&&(super.attributeChangedCallback(t,e,i,s),this.attributeChanged(t,e,i))}attributeChanged(t,e,i){}_initializeProperties(){let t=Object.getPrototypeOf(this);t.hasOwnProperty("__hasRegisterFinished")||(this._registered(),t.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(t){return this._serializeValue(t)}deserialize(t,e){return this._deserializeValue(t,e)}reflectPropertyToAttribute(t,e,i){this._propertyToAttribute(t,e,i)}serializeValueToAttribute(t,e,i){this._valueToNodeAttribute(i||this,t,e)}extend(t,e){if(!t||!e)return t||e;let i=Object.getOwnPropertyNames(e);for(let s,n=0;n<i.length&&(s=i[n]);n++){let i=Object.getOwnPropertyDescriptor(e,s);i&&Object.defineProperty(t,s,i)}return t}mixin(t,e){for(let i in e)t[i]=e[i];return t}chainObject(t,e){return t&&e&&t!==e&&(t.__proto__=e),t}instanceTemplate(t){let e=this.constructor._contentForTemplate(t);return document.importNode(e,!0)}fire(t,e,i){i=i||{},e=null==e?{}:e;let s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});s.detail=e;let n=i.node||this;return ki(n).dispatchEvent(s),s}listen(t,e,i){t=t||this;let s=this.__boundListeners||(this.__boundListeners=new WeakMap),n=s.get(t);n||(n={},s.set(t,n));let r=e+i;n[r]||(n[r]=this._addMethodEventListenerToNode(t,e,i,this))}unlisten(t,e,i){t=t||this;let s=this.__boundListeners&&this.__boundListeners.get(t),n=e+i,r=s&&s[n];r&&(this._removeEventListenerFromNode(t,e,r),s[n]=null)}setScrollDirection(t,e){Cn(e||this,i[t]||"auto")}$$(t){return this.root.querySelector(t)}get domHost(){let t=ki(this).getRootNode();return t instanceof DocumentFragment?t.host:t}distributeContent(){const t=mr(this);window.ShadyDOM&&t.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return mr(this).getEffectiveChildNodes()}queryDistributedElements(t){return mr(this).queryDistributedElements(t)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let t=this.getEffectiveChildNodes(),e=[];for(let i,s=0;i=t[s];s++)i.nodeType!==Node.COMMENT_NODE&&e.push(i.textContent);return e.join("")}queryEffectiveChildren(t){let e=this.queryDistributedElements(t);return e&&e[0]}queryAllEffectiveChildren(t){return this.queryDistributedElements(t)}getContentChildNodes(t){let e=this.root.querySelector(t||"slot");return e?mr(e).getDistributedNodes():[]}getContentChildren(t){return this.getContentChildNodes(t).filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}isLightDescendant(t){return this!==t&&ki(this).contains(t)&&ki(this).getRootNode()===ki(t).getRootNode()}isLocalDescendant(t){return this.root===ki(t).getRootNode()}scopeSubtree(t,e){}getComputedStyleValue(t){return yr.getComputedStyleValue(this,t)}debounce(t,e,i){return this._debouncers=this._debouncers||{},this._debouncers[t]=$s.debounce(this._debouncers[t],i>0?Vi.after(i):Yi,e.bind(this))}isDebouncerActive(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];return!(!e||!e.isActive())}flushDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.flush()}cancelDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.cancel()}async(t,e){return e>0?Vi.run(t.bind(this),e):~Yi.run(t.bind(this))}cancelAsync(t){t<0?Yi.cancel(~t):Vi.cancel(t)}create(t,e){let i=document.createElement(t);if(e)if(i.setProperties)i.setProperties(e);else for(let t in e)i[t]=e[t];return i}elementMatches(t,e){return cr(e||this,t)}toggleAttribute(t,e){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(e=!i.hasAttribute(t)),e?(ki(i).setAttribute(t,""),!0):(ki(i).removeAttribute(t),!1)}toggleClass(t,e,i){i=i||this,1==arguments.length&&(e=!i.classList.contains(t)),e?i.classList.add(t):i.classList.remove(t)}transform(t,e){(e=e||this).style.webkitTransform=t,e.style.transform=t}translate3d(t,e,i,s){s=s||this,this.transform("translate3d("+t+","+e+","+i+")",s)}arrayDelete(t,e){let i;if(Array.isArray(t)){if((i=t.indexOf(e))>=0)return t.splice(i,1)}else{if((i=Ii(this,t).indexOf(e))>=0)return this.splice(t,i,1)}return null}_logger(t,e){switch(Array.isArray(e)&&1===e.length&&Array.isArray(e[0])&&(e=e[0]),t){case"log":case"warn":case"error":console[t](...e)}}_log(...t){this._logger("log",t)}_warn(...t){this._logger("warn",t)}_error(...t){this._logger("error",t)}_logf(t,...e){return["[%s::%s]",this.is,t,...e]}}return s.prototype.is="",s}),br={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},vr={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},wr=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},vr);function xr(t,e,i,s){!function(t,e,i){const s=t._noAccessors,n=Object.getOwnPropertyNames(t);for(let r=0;r<n.length;r++){let o=n[r];if(!(o in i))if(s)e[o]=t[o];else{let i=Object.getOwnPropertyDescriptor(t,o);i&&(i.configurable=!0,Object.defineProperty(e,o,i))}}}(e,t,s);for(let t in br)e[t]&&(i[t]=i[t]||[],i[t].push(e[t]))}function Sr(t,e){for(const i in e){const s=t[i],n=e[i];t[i]=!("value"in n)&&s&&"value"in s?Object.assign({value:s.value},n):n}}function Cr(t,e,i){let s;const n={};class r extends e{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(s)for(let t,e=0;e<s.length;e++)(t=s[e]).properties&&this.createProperties(t.properties),t.observers&&this.createObservers(t.observers,t.properties);t.properties&&this.createProperties(t.properties),t.observers&&this.createObservers(t.observers,t.properties),this._prepareTemplate()}else super._finalizeClass()}static get properties(){const e={};if(s)for(let t=0;t<s.length;t++)Sr(e,s[t].properties);return Sr(e,t.properties),e}static get observers(){let e=[];if(s)for(let t,i=0;i<s.length;i++)(t=s[i]).observers&&(e=e.concat(t.observers));return t.observers&&(e=e.concat(t.observers)),e}created(){super.created();const t=n.created;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}_registered(){const t=r.prototype;if(!t.hasOwnProperty("__hasRegisterFinished")){t.__hasRegisterFinished=!0,super._registered(),oi&&o(t);const e=Object.getPrototypeOf(this);let i=n.beforeRegister;if(i)for(let t=0;t<i.length;t++)i[t].call(e);if(i=n.registered)for(let t=0;t<i.length;t++)i[t].call(e)}}_applyListeners(){super._applyListeners();const t=n.listeners;if(t)for(let e=0;e<t.length;e++){const i=t[e];if(i)for(let t in i)this._addMethodEventListenerToNode(this,t,i[t])}}_ensureAttributes(){const t=n.hostAttributes;if(t)for(let e=t.length-1;e>=0;e--){const i=t[e];for(let t in i)this._ensureAttribute(t,i[t])}super._ensureAttributes()}ready(){super.ready();let t=n.ready;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}attached(){super.attached();let t=n.attached;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}detached(){super.detached();let t=n.detached;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}attributeChanged(t,e,i){super.attributeChanged();let s=n.attributeChanged;if(s)for(let n=0;n<s.length;n++)s[n].call(this,t,e,i)}}if(i){Array.isArray(i)||(i=[i]);let t=e.prototype.behaviors;s=function t(e,i,s){i=i||[];for(let n=e.length-1;n>=0;n--){let r=e[n];r?Array.isArray(r)?t(r,i):i.indexOf(r)<0&&(!s||s.indexOf(r)<0)&&i.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return i}(i,null,t),r.prototype.behaviors=t?t.concat(i):s}const o=e=>{s&&function(t,e,i){for(let s=0;s<e.length;s++)xr(t,e[s],i,wr)}(e,s,n),xr(e,t,n,vr)};return oi||o(r.prototype),r.generatedFrom=t,r}const kr=function(t){let e;return e="function"==typeof t?t:kr.Class(t),customElements.define(e.is,e),e};function Pr(t,e,i,s,n){let r;n&&(r="object"==typeof i&&null!==i)&&(s=t.__dataTemp[e]);let o=s!==i&&(s==s||i==i);return r&&o&&(t.__dataTemp[e]=i),o}kr.Class=function(t,e){t||console.warn("Polymer.Class requires `info` argument");let i=e?e(gr(HTMLElement)):gr(HTMLElement);return(i=Cr(t,i,t.behaviors)).is=i.prototype.is=t.is,i};const Tr=di(t=>{return class extends t{_shouldPropertyChange(t,e,i){return Pr(this,t,e,i,!0)}}}),Er=di(t=>{return class extends t{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(t,e,i){return Pr(this,t,e,i,this.mutableData)}}});Tr._mutablePropertyChange=Pr;let Or=null;function Nr(){return Or}Nr.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Nr,writable:!0}});const Rr=Ms(Nr),Ar=Tr(Rr);const Ir=Ms(class{});class Lr extends Ir{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=this.children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)e.push(t),t.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(t&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let t in this.__hostProps)this._setPendingProperty(t,this.__dataHost["_host_"+t]);for(let e in t)this._setPendingProperty(e,t[e])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,t=>{t.model=this,i(t)});else{let s=this.__dataHost.__dataHost;s&&s._addEventListenerToNode(t,e,i)}}_showHideChildren(t){let e=this.children;for(let i=0;i<e.length;i++){let s=e[i];if(Boolean(t)!=Boolean(s.__hideTemplateChildren__))if(s.nodeType===Node.TEXT_NODE)t?(s.__polymerTextContent__=s.textContent,s.textContent=""):s.textContent=s.__polymerTextContent__;else if("slot"===s.localName)if(t)s.__polymerReplaced__=document.createComment("hidden-slot"),ki(ki(s).parentNode).replaceChild(s.__polymerReplaced__,s);else{const t=s.__polymerReplaced__;t&&ki(ki(t).parentNode).replaceChild(s,t)}else s.style&&(t?(s.__polymerDisplay__=s.style.display,s.style.display="none"):s.style.display=s.__polymerDisplay__);s.__hideTemplateChildren__=t,s._showHideChildren&&s._showHideChildren(t)}}_setUnmanagedPropertyToNode(t,e,i){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&"textContent"==e?t.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(t,e,i)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do{t=t.__dataHost.__dataHost}while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}Lr.prototype.__dataHost,Lr.prototype.__templatizeOptions,Lr.prototype._methodHost,Lr.prototype.__templatizeOwner,Lr.prototype.__hostProps;const Mr=Tr(Lr);function Dr(t){let e=t.__dataHost;return e&&e._methodHost||e}function zr(t,e,i){let s=i.mutableData?Mr:Lr;$r.mixin&&(s=$r.mixin(s));let n=class extends s{};return n.prototype.__templatizeOptions=i,n.prototype._bindTemplate(t),function(t,e,i,s){let n=i.hostProps||{};for(let e in s.instanceProps){delete n[e];let i=s.notifyInstanceProp;i&&t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:Wr(e,i)})}if(s.forwardHostProp&&e.__dataHost)for(let e in n)t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(t,e,i){t.__dataHost._setPendingPropertyOrPath("_host_"+e,i[e],!0,!0)}})}(n,t,e,i),n}function jr(t,e,i){let s=i.forwardHostProp;if(s){let n=e.templatizeTemplateClass;if(!n){let t=i.mutableData?Ar:Rr;n=e.templatizeTemplateClass=class extends t{};let r=e.hostProps;for(let t in r)n.prototype._addPropertyEffect("_host_"+t,n.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:Hr(t,s)}),n.prototype._createNotifyingProperty("_host_"+t)}!function(t,e){Or=t,Object.setPrototypeOf(t,e.prototype),new e,Or=null}(t,n),t.__dataProto&&Object.assign(t.__data,t.__dataProto),t.__dataTemp={},t.__dataPending=null,t.__dataOld=null,t._enableProperties()}}function Hr(t,e){return function(t,i,s){e.call(t.__templatizeOwner,i.substring("_host_".length),s[i])}}function Wr(t,e){return function(t,i,s){e.call(t.__templatizeOwner,t,i,s[i])}}function $r(t,e,i){if(ni&&!Dr(t))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},t.__templatizeOwner)throw new Error("A <template> can only be templatized once");t.__templatizeOwner=e;let s=(e?e.constructor:Lr)._parseTemplate(t),n=s.templatizeInstanceClass;n||(n=zr(t,s,i),s.templatizeInstanceClass=n),jr(t,s,i);let r=class extends n{};return r.prototype._methodHost=Dr(t),r.prototype.__dataHost=t,r.prototype.__templatizeOwner=e,r.prototype.__hostProps=s.hostProps,r=r}const Fr=Rn(Er(Ms(HTMLElement)));customElements.define("dom-bind",class extends Fr{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),ni)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){ki(ki(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let t=0;t<this.__children.length;t++)this.root.appendChild(this.__children[t])}render(){let t;if(!this.__children){if(!(t=t||this.querySelector("template"))){let e=new MutationObserver(()=>{if(!(t=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");e.disconnect(),this.render()});return void e.observe(this,{childList:!0})}this.root=this._stampTemplate(t),this.$=this.root.$,this.__children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)this.__children[this.__children.length]=t;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});class Br{constructor(t){this.value=t.toString()}toString(){return this.value}}function qr(t){if(t instanceof HTMLTemplateElement)return t.innerHTML;if(t instanceof Br)return function(t){if(t instanceof Br)return t.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)}(t);throw new Error(`non-template value passed to Polymer's html function: ${t}`)}const Vr=function(t,...e){const i=document.createElement("template");return i.innerHTML=e.reduce((e,i,s)=>e+qr(i)+t[s+1],t[0]),i},Ur=Ws(HTMLElement),Yr=Er(Ur);class Xr extends Yr{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let t=ki(ki(this).parentNode);for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t)}}__ensureTemplatized(){if(!this.__ctor){let t=this.template=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}let e={};e[this.as]=!0,e[this.indexAs]=!0,e[this.itemsIndexAs]=!0,this.__ctor=$r(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:e,forwardHostProp:function(t,e){let i=this.__instances;for(let s,n=0;n<i.length&&(s=i[n]);n++)s.forwardHostProp(t,e)},notifyInstanceProp:function(t,e,i){if((s=this.as)===(n=e)||Ei(s,n)||Oi(s,n)){let s=t[this.itemsIndexAs];e==this.as&&(this.items[s]=i);let n=Ni(this.as,`${JSCompiler_renameProperty("items",this)}.${s}`,e);this.notifyPath(n,i)}var s,n}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if("string"==typeof t){let e=t,i=this.__getMethodHost();return function(){return i[e].apply(i,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let t=performance.now(),e=this._targetFrameTime/(t-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*e)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=t,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn)if(t){if(this.__observePaths){let e=this.__observePaths;for(let i=0;i<e.length;i++)0===t.indexOf(e[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(t,e=0){this.__renderDebouncer=$s.debounce(this.__renderDebouncer,e>0?Vi.after(e):Yi,t.bind(this)),Bs(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),lr()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let t=this.items||[],e=new Array(t.length);for(let i=0;i<t.length;i++)e[i]=i;this.__filterFn&&(e=e.filter((e,i,s)=>this.__filterFn(t[e],i,s))),this.__sortFn&&e.sort((e,i)=>this.__sortFn(t[e],t[i]));const i=this.__itemsIdxToInstIdx={};let s=0;const n=Math.min(e.length,this.__limit);for(;s<n;s++){let n=this.__instances[s],r=e[s],o=t[r];i[r]=s,n?(n._setPendingProperty(this.as,o),n._setPendingProperty(this.indexAs,s),n._setPendingProperty(this.itemsIndexAs,r),n._flushProperties()):this.__insertInstance(o,s,r)}for(let t=this.__instances.length-1;t>=s;t--)this.__detachAndRemoveInstance(t)}__detachInstance(t){let e=this.__instances[t];const i=ki(e.root);for(let t=0;t<e.children.length;t++){let s=e.children[t];i.appendChild(s)}return e}__attachInstance(t,e){let i=this.__instances[t];e.insertBefore(i.root,this)}__detachAndRemoveInstance(t){let e=this.__detachInstance(t);e&&this.__pool.push(e),this.__instances.splice(t,1)}__stampInstance(t,e,i){let s={};return s[this.as]=t,s[this.indexAs]=e,s[this.itemsIndexAs]=i,new this.__ctor(s)}__insertInstance(t,e,i){let s=this.__pool.pop();s?(s._setPendingProperty(this.as,t),s._setPendingProperty(this.indexAs,e),s._setPendingProperty(this.itemsIndexAs,i),s._flushProperties()):s=this.__stampInstance(t,e,i);let n=this.__instances[e+1],r=n?n.children[0]:this;return ki(ki(this).parentNode).insertBefore(s.root,r),this.__instances[e]=s,s}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let i=t.slice(6),s=i.indexOf("."),n=s<0?i:i.substring(0,s);if(n==parseInt(n,10)){let t=s<0?"":i.substring(s+1);this.__handleObservedPaths(t);let r=this.__itemsIdxToInstIdx[n],o=this.__instances[r];if(o){let i=this.as+(t?"."+t:"");o._setPendingPropertyOrPath(i,e,!1,!0),o._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return function(t,e){let i;for(;e;)if(i=e.__templatizeInstance){if(i.__dataHost==t)return i;e=i.__dataHost}else e=ki(e).parentNode;return null}(this.template,t)}}customElements.define(Xr.is,Xr);class Gr extends Ur{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=$s.debounce(this.__renderDebouncer,Yi,()=>this.__render()),Bs(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const t=ki(this).parentNode;t&&(t.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||ki(t).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){lr()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let t=ki(this).parentNode;if(t){if(!this.__ctor){let t=ki(this).querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!ki(this).querySelector("template"))throw new Error("dom-if requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}this.__ctor=$r(t,this,{mutableData:!0,forwardHostProp:function(t,e){this.__instance&&(this.if?this.__instance.forwardHostProp(t,e):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Ti(t)]=!0))}})}if(this.__instance){this.__syncHostProperties();let e=this.__instance.children;if(e&&e.length){if(ki(this).previousSibling!==e[e.length-1])for(let i,s=0;s<e.length&&(i=e[s]);s++)ki(t).insertBefore(i,this)}}else this.__instance=new this.__ctor,ki(t).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let t=this.__invalidProps;if(t){for(let e in t)this.__instance._setPendingProperty(e,this.__dataHost[e]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let t=this.__instance.children;if(t&&t.length){let e=ki(t[0]).parentNode;if(e){e=ki(e);for(let i,s=0;s<t.length&&(i=t[s]);s++)e.removeChild(i)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let t=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(t)}}customElements.define(Gr.is,Gr);let Jr=di(t=>{let e=Ws(t);return class extends e{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(t,e){let i=e.path;if(i==JSCompiler_renameProperty("items",this)){let i=e.base||[],s=this.__lastItems;if(t!==this.__lastMulti&&this.clearSelection(),s){let t=nr(i,s);this.__applySplices(t)}this.__lastItems=i,this.__lastMulti=t}else if(e.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(e.value.indexSplices);else{let t=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),e=parseInt(t,10);t.indexOf(".")<0&&t==e&&this.__deselectChangedIdx(e)}}__applySplices(t){let e=this.__selectedMap;for(let i=0;i<t.length;i++){let s=t[i];e.forEach((t,i)=>{t<s.index||(t>=s.index+s.removed.length?e.set(i,t+s.addedCount-s.removed.length):e.set(i,-1))});for(let t=0;t<s.addedCount;t++){let i=s.index+t;e.has(this.items[i])&&e.set(this.items[i],i)}}this.__updateLinks();let i=0;e.forEach((t,s)=>{t<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,e.delete(s)):i++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let t=0;this.__selectedMap.forEach(e=>{e>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${e}`,`${JSCompiler_renameProperty("selected",this)}.${t++}`)})}else this.__selectedMap.forEach(t=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${t}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${t}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(t){return this.__selectedMap.has(t)}isIndexSelected(t){return this.isSelected(this.items[t])}__deselectChangedIdx(t){let e=this.__selectedIndexForItemIndex(t);if(e>=0){let t=0;this.__selectedMap.forEach((i,s)=>{e==t++&&this.deselect(s)})}}__selectedIndexForItemIndex(t){let e=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${t}`];if(e)return parseInt(e.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(t){let e=this.__selectedMap.get(t);if(e>=0){let i;this.__selectedMap.delete(t),this.multi&&(i=this.__selectedIndexForItemIndex(e)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(t){this.deselect(this.items[t])}select(t){this.selectIndex(this.items.indexOf(t))}selectIndex(t){let e=this.items[t];this.isSelected(e)?this.toggle&&this.deselectIndex(t):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(e,t),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),e):this.selected=this.selectedItem=e)}}})(Ur);class Kr extends Jr{static get is(){return"array-selector"}static get template(){return null}}customElements.define(Kr.is,Kr);const Qr=new qe;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(t,e,i){},prepareTemplateDom(t,e){},prepareTemplateStyles(t,e,i){},styleSubtree(t,e){Qr.processStyles(),ve(t,e)},styleElement(t){Qr.processStyles()},styleDocument(t){Qr.processStyles(),ve(document.body,t)},getComputedStyleValue:(t,e)=>we(t,e),flushCustomStyles(){},nativeCss:Jt,nativeShadow:Vt,cssBuild:Yt,disableRuntime:Gt}),window.ShadyCSS.CustomStyleInterface=Qr;const Zr="include",to=window.ShadyCSS.CustomStyleInterface;let eo;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,to.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const t=this.querySelector("style");if(!t)return null;this._style=t;const e=t.getAttribute(Zr);return e&&(t.removeAttribute(Zr),t.textContent=function(t){let e=t.trim().split(/\s+/),i="";for(let t=0;t<e.length;t++)i+=Ci(e[t]);return i}(e)+t.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),eo=Tr._mutablePropertyChange;gr(HTMLElement).prototype;const io={},so=Vr`
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
</custom-style>`;so.setAttribute("style","display: none;"),document.head.appendChild(so.content);var no=document.createElement("style");no.textContent="[hidden] { display: none !important; }",document.head.appendChild(no),kr({_template:Vr`
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
`,is:"app-drawer",properties:{opened:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},persistent:{type:Boolean,value:!1,reflectToAttribute:!0},transitionDuration:{type:Number,value:200},align:{type:String,value:"left"},position:{type:String,readOnly:!0,reflectToAttribute:!0},swipeOpen:{type:Boolean,value:!1,reflectToAttribute:!0},noFocusTrap:{type:Boolean,value:!1},disableSwipe:{type:Boolean,value:!1}},observers:["resetLayout(position, isAttached)","_resetPosition(align, isAttached)","_styleTransitionDuration(transitionDuration)","_openedPersistentChanged(opened, persistent)"],_translateOffset:0,_trackDetails:null,_drawerState:0,_boundEscKeydownHandler:null,_firstTabStop:null,_lastTabStop:null,attached:function(){Jn(this,function(){this._boundEscKeydownHandler=this._escKeydownHandler.bind(this),this.addEventListener("keydown",this._tabKeydownHandler.bind(this)),this.listen(this,"track","_track"),this.setScrollDirection("y")}),this.fire("app-reset-layout")},detached:function(){document.removeEventListener("keydown",this._boundEscKeydownHandler)},open:function(){this.opened=!0},close:function(){this.opened=!1},toggle:function(){this.opened=!this.opened},getWidth:function(){return this._savedWidth||this.$.contentContainer.offsetWidth},_isRTL:function(){return"rtl"===window.getComputedStyle(this).direction},_resetPosition:function(){switch(this.align){case"start":return void this._setPosition(this._isRTL()?"right":"left");case"end":return void this._setPosition(this._isRTL()?"left":"right")}this._setPosition(this.align)},_escKeydownHandler:function(t){27===t.keyCode&&(t.preventDefault(),this.close())},_track:function(t){if(!this.persistent&&!this.disableSwipe)switch(t.preventDefault(),t.detail.state){case"start":this._trackStart(t);break;case"track":this._trackMove(t);break;case"end":this._trackEnd(t)}},_trackStart:function(t){this._drawerState=this._DRAWER_STATE.TRACKING;var e=this.$.contentContainer.getBoundingClientRect();this._savedWidth=e.width,"left"===this.position?this._translateOffset=e.left:this._translateOffset=e.right-window.innerWidth,this._trackDetails=[],this._styleTransitionDuration(0),this.style.visibility="visible"},_trackMove:function(t){this._translateDrawer(t.detail.dx+this._translateOffset),this._trackDetails.push({dx:t.detail.dx,timeStamp:Date.now()})},_trackEnd:function(t){var e=t.detail.dx+this._translateOffset,i=this.getWidth(),s="left"===this.position?e>=0||e<=-i:e<=0||e>=i;if(!s){var n=this._trackDetails;if(this._trackDetails=null,this._flingDrawer(t,n),this._drawerState===this._DRAWER_STATE.FLINGING)return}var r=i/2;t.detail.dx<-r?this.opened="right"===this.position:t.detail.dx>r&&(this.opened="left"===this.position),s?this.debounce("_resetDrawerState",this._resetDrawerState):this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration),this._styleTransitionDuration(this.transitionDuration),this._resetDrawerTranslate(),this.style.visibility=""},_calculateVelocity:function(t,e){for(var i,s=Date.now(),n=s-100,r=0,o=e.length-1;r<=o;){var a=r+o>>1,l=e[a];l.timeStamp>=n?(i=l,o=a-1):r=a+1}return i?(t.detail.dx-i.dx)/(s-i.timeStamp||1):0},_flingDrawer:function(t,e){var i=this._calculateVelocity(t,e);if(!(Math.abs(i)<this._MIN_FLING_THRESHOLD)){this._drawerState=this._DRAWER_STATE.FLINGING;var s,n=t.detail.dx+this._translateOffset,r=this.getWidth(),o="left"===this.position,a=i>0;s=!a&&o?-(n+r):a&&!o?r-n:-n,a?(i=Math.max(i,this._MIN_TRANSITION_VELOCITY),this.opened="left"===this.position):(i=Math.min(i,-this._MIN_TRANSITION_VELOCITY),this.opened="right"===this.position);var l=this._FLING_INITIAL_SLOPE*s/i;this._styleTransitionDuration(l),this._styleTransitionTimingFunction(this._FLING_TIMING_FUNCTION),this._resetDrawerTranslate(),this.debounce("_resetDrawerState",this._resetDrawerState,l)}},_styleTransitionDuration:function(t){this.style.transitionDuration=t+"ms",this.$.contentContainer.style.transitionDuration=t+"ms",this.$.scrim.style.transitionDuration=t+"ms"},_styleTransitionTimingFunction:function(t){this.$.contentContainer.style.transitionTimingFunction=t,this.$.scrim.style.transitionTimingFunction=t},_translateDrawer:function(t){var e=this.getWidth();"left"===this.position?(t=Math.max(-e,Math.min(t,0)),this.$.scrim.style.opacity=1+t/e):(t=Math.max(0,Math.min(t,e)),this.$.scrim.style.opacity=1-t/e),this.translate3d(t+"px","0","0",this.$.contentContainer)},_resetDrawerTranslate:function(){this.$.scrim.style.opacity="",this.transform("",this.$.contentContainer)},_resetDrawerState:function(){var t=this._drawerState;t===this._DRAWER_STATE.FLINGING&&(this._styleTransitionDuration(this.transitionDuration),this._styleTransitionTimingFunction(""),this.style.visibility=""),this._savedWidth=null,this.opened?this._drawerState=this.persistent?this._DRAWER_STATE.OPENED_PERSISTENT:this._DRAWER_STATE.OPENED:this._drawerState=this._DRAWER_STATE.CLOSED,t!==this._drawerState&&(this._drawerState===this._DRAWER_STATE.OPENED?(this._setKeyboardFocusTrap(),document.addEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow="hidden"):(document.removeEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow=""),t!==this._DRAWER_STATE.INIT&&this.fire("app-drawer-transitioned"))},resetLayout:function(){this.fire("app-reset-layout")},_setKeyboardFocusTrap:function(){if(!this.noFocusTrap){var t=['a[href]:not([tabindex="-1"])','area[href]:not([tabindex="-1"])','input:not([disabled]):not([tabindex="-1"])','select:not([disabled]):not([tabindex="-1"])','textarea:not([disabled]):not([tabindex="-1"])','button:not([disabled]):not([tabindex="-1"])','iframe:not([tabindex="-1"])','[tabindex]:not([tabindex="-1"])','[contentEditable=true]:not([tabindex="-1"])'].join(","),e=mr(this).querySelectorAll(t);e.length>0?(this._firstTabStop=e[0],this._lastTabStop=e[e.length-1]):(this._firstTabStop=null,this._lastTabStop=null);var i=this.getAttribute("tabindex");i&&parseInt(i,10)>-1?this.focus():this._firstTabStop&&this._firstTabStop.focus()}},_tabKeydownHandler:function(t){if(!this.noFocusTrap){this._drawerState===this._DRAWER_STATE.OPENED&&9===t.keyCode&&(t.shiftKey?this._firstTabStop&&mr(t).localTarget===this._firstTabStop&&(t.preventDefault(),this._lastTabStop.focus()):this._lastTabStop&&mr(t).localTarget===this._lastTabStop&&(t.preventDefault(),this._firstTabStop.focus()))}},_openedPersistentChanged:function(t,e){this.toggleClass("visible",t&&!e,this.$.scrim),this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration)},_MIN_FLING_THRESHOLD:.2,_MIN_TRANSITION_VELOCITY:1.2,_FLING_TIMING_FUNCTION:"cubic-bezier(0.667, 1, 0.667, 1)",_FLING_INITIAL_SLOPE:1.5,_DRAWER_STATE:{INIT:0,OPENED:1,OPENED_PERSISTENT:2,CLOSED:3,TRACKING:4,FLINGING:5}}),kr({is:"iron-media-query",properties:{queryMatches:{type:Boolean,value:!1,readOnly:!0,notify:!0},query:{type:String,observer:"queryChanged"},full:{type:Boolean,value:!1},_boundMQHandler:{value:function(){return this.queryHandler.bind(this)}},_mq:{value:null}},attached:function(){this.style.display="none",this.queryChanged()},detached:function(){this._remove()},_add:function(){this._mq&&this._mq.addListener(this._boundMQHandler)},_remove:function(){this._mq&&this._mq.removeListener(this._boundMQHandler),this._mq=null},queryChanged:function(){this._remove();var t=this.query;t&&(this.full||"("===t[0]||(t="("+t+")"),this._mq=window.matchMedia(t),this._add(),this.queryHandler(this._mq))},queryHandler:function(t){this._setQueryMatches(t.matches)}});var ro=new Set;const oo={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(ro.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach(function(t){this.resizerShouldNotify(t)&&this._notifyDescendant(t)},this),this._fireResize())},assignParentResizable:function(t){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=t,t&&-1===t._interestedResizables.indexOf(this)&&(t._interestedResizables.push(this),t._subscribeIronResize(this))},stopResizeNotificationsFor:function(t){var e=this._interestedResizables.indexOf(t);e>-1&&(this._interestedResizables.splice(e,1),this._unsubscribeIronResize(t))},_subscribeIronResize:function(t){t.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(t){t.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(t){return!0},_onDescendantIronResize:function(t){this._notifyingDescendant?t.stopPropagation():ti||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(t){var e=mr(t).rootTarget;e!==this&&(e.assignParentResizable(this),this._notifyDescendant(e),t.stopPropagation())},_parentResizableChanged:function(t){t&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(t){this.isAttached&&(this._notifyingDescendant=!0,t.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var t=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",function e(){document.removeEventListener("readystatechange",e),t()})}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach(function(t){t!==this&&t._findParent()},this):(ro.forEach(function(t){t!==this&&t._findParent()},this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?ro.delete(this):ro.add(this)}},ao=[oo,{listeners:{"app-reset-layout":"_appResetLayoutHandler","iron-resize":"resetLayout"},attached:function(){this.fire("app-reset-layout")},_appResetLayoutHandler:function(t){mr(t).path[0]!==this&&(this.resetLayout(),t.stopPropagation())},_updateLayoutStates:function(){console.error("unimplemented")},resetLayout:function(){var t=this._updateLayoutStates.bind(this);this._layoutDebouncer=$s.debounce(this._layoutDebouncer,Ui,t),Bs(this._layoutDebouncer),this._notifyDescendantResize()},_notifyLayoutChanged:function(){var t=this;requestAnimationFrame(function(){t.fire("app-reset-layout")})},_notifyDescendantResize:function(){this.isAttached&&this._interestedResizables.forEach(function(t){this.resizerShouldNotify(t)&&this._notifyDescendant(t)},this)}}];kr({_template:Vr`
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
`,is:"app-drawer-layout",behaviors:[ao],properties:{forceNarrow:{type:Boolean,value:!1},responsiveWidth:{type:String,value:"640px"},narrow:{type:Boolean,reflectToAttribute:!0,readOnly:!0,notify:!0},openedWhenNarrow:{type:Boolean,value:!1},_drawerPosition:{type:String}},listeners:{click:"_clickHandler"},observers:["_narrowChanged(narrow)"],get drawer(){return mr(this.$.drawerSlot).getDistributedNodes()[0]},attached:function(){var t=this.drawer;t&&t.setAttribute("no-transition","")},_clickHandler:function(t){var e=mr(t).localTarget;if(e&&e.hasAttribute("drawer-toggle")){var i=this.drawer;i&&!i.persistent&&i.toggle()}},_updateLayoutStates:function(){var t=this.drawer;this.isAttached&&t&&(this._drawerPosition=this.narrow?null:t.position,this._drawerNeedsReset&&(this.narrow?(t.opened=this.openedWhenNarrow,t.persistent=!1):t.opened=t.persistent=!0,t.hasAttribute("no-transition")&&Jn(this,function(){t.removeAttribute("no-transition")}),this._drawerNeedsReset=!1))},_narrowChanged:function(){this._drawerNeedsReset=!0,this.resetLayout()},_onQueryMatchesChanged:function(t){this._setNarrow(t.detail.value)},_computeMediaQuery:function(t,e){return t?"(min-width: 0px)":"(max-width: "+e+")"}});const lo=document.createElement("template");lo.setAttribute("style","display: none;"),lo.innerHTML='<dom-module id="app-grid-style">\n  <template>\n    <style>\n      :host {\n        /**\n         * The width for the expandible item is:\n         * ((100% - subPixelAdjustment) / columns * itemColumns - gutter\n         *\n         * - subPixelAdjustment: 0.1px (Required for IE 11)\n         * - gutter: var(--app-grid-gutter)\n         * - columns: var(--app-grid-columns)\n         * - itemColumn: var(--app-grid-expandible-item-columns)\n         */\n        --app-grid-expandible-item: {\n          -webkit-flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          max-width: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n        };\n      }\n\n      .app-grid {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n\n        padding-top: var(--app-grid-gutter, 0px);\n        padding-left: var(--app-grid-gutter, 0px);\n        box-sizing: border-box;\n      }\n\n      .app-grid > * {\n        /* Required for IE 10 */\n        -ms-flex: 1 1 100%;\n        -webkit-flex: 1;\n        flex: 1;\n\n        /* The width for an item is: (100% - subPixelAdjustment - gutter * columns) / columns */\n        -webkit-flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n\n        max-width: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        margin-bottom: var(--app-grid-gutter, 0px);\n        margin-right: var(--app-grid-gutter, 0px);\n        height: var(--app-grid-item-height);\n        box-sizing: border-box;\n      }\n\n      .app-grid[has-aspect-ratio] > * {\n        position: relative;\n      }\n\n      .app-grid[has-aspect-ratio] > *::before {\n        display: block;\n        content: "";\n        padding-top: var(--app-grid-item-height, 100%);\n      }\n\n      .app-grid[has-aspect-ratio] > * > * {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(lo.content);const ho=[{properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(t,e){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),e)if("document"===t)this.scrollTarget=this._doc;else if("string"==typeof t){var i=this.domHost;this.scrollTarget=i&&i.$?i.$[t]:mr(this.ownerDocument).querySelector("#"+t)}else this._isValidScrollTarget()&&(this._oldScrollTarget=t,this._toggleScrollListener(this._shouldHaveListener,t))},_scrollHandler:function(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(t){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=t)},set _scrollLeft(t){this.scrollTarget===this._doc?window.scrollTo(t,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=t)},scroll:function(t,e){var i;"object"==typeof t?(i=t.left,e=t.top):i=t,i=i||0,e=e||0,this.scrollTarget===this._doc?window.scrollTo(i,e):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=i,this.scrollTarget.scrollTop=e)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(t,e){var i=e===this._doc?window:e;t?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),i.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(i.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(t){this._shouldHaveListener=t,this._toggleScrollListener(t,this.scrollTarget)}},{properties:{effects:{type:String},effectsConfig:{type:Object,value:function(){return{}}},disabled:{type:Boolean,reflectToAttribute:!0,value:!1},threshold:{type:Number,value:0},thresholdTriggered:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0}},observers:["_effectsChanged(effects, effectsConfig, isAttached)"],_updateScrollState:function(t){},isOnScreen:function(){return!1},isContentBelow:function(){return!1},_effectsRunFn:null,_effects:null,get _clampedScrollTop(){return Math.max(0,this._scrollTop)},attached:function(){this._scrollStateChanged()},detached:function(){this._tearDownEffects()},createEffect:function(t,e){var i=io[t];if(!i)throw new ReferenceError(this._getUndefinedMsg(t));var s=this._boundEffect(i,e||{});return s.setUp(),s},_effectsChanged:function(t,e,i){this._tearDownEffects(),t&&i&&(t.split(" ").forEach(function(t){var i;""!==t&&((i=io[t])?this._effects.push(this._boundEffect(i,e[t])):console.warn(this._getUndefinedMsg(t)))},this),this._setUpEffect())},_layoutIfDirty:function(){return this.offsetWidth},_boundEffect:function(t,e){e=e||{};var i=parseFloat(e.startsAt||0),s=parseFloat(e.endsAt||1),n=s-i,r=function(){},o=0===i&&1===s?t.run:function(e,s){t.run.call(this,Math.max(0,(e-i)/n),s)};return{setUp:t.setUp?t.setUp.bind(this,e):r,run:t.run?o.bind(this):r,tearDown:t.tearDown?t.tearDown.bind(this):r}},_setUpEffect:function(){this.isAttached&&this._effects&&(this._effectsRunFn=[],this._effects.forEach(function(t){!1!==t.setUp()&&this._effectsRunFn.push(t.run)},this))},_tearDownEffects:function(){this._effects&&this._effects.forEach(function(t){t.tearDown()}),this._effectsRunFn=[],this._effects=[]},_runEffects:function(t,e){this._effectsRunFn&&this._effectsRunFn.forEach(function(i){i(t,e)})},_scrollHandler:function(){this._scrollStateChanged()},_scrollStateChanged:function(){if(!this.disabled){var t=this._clampedScrollTop;this._updateScrollState(t),this.threshold>0&&this._setThresholdTriggered(t>=this.threshold)}},_getDOMRef:function(t){console.warn("_getDOMRef","`"+t+"` is undefined")},_getUndefinedMsg:function(t){return"Scroll effect `"+t+"` is undefined. Did you forget to import app-layout/app-scroll-effects/effects/"+t+".html ?"}}];kr({_template:Vr`
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
`,is:"app-header",behaviors:[ho,ao],properties:{condenses:{type:Boolean,value:!1},fixed:{type:Boolean,value:!1},reveals:{type:Boolean,value:!1},shadow:{type:Boolean,reflectToAttribute:!0,value:!1}},observers:["_configChanged(isAttached, condenses, fixed)"],_height:0,_dHeight:0,_stickyElTop:0,_stickyElRef:null,_top:0,_progress:0,_wasScrollingDown:!1,_initScrollTop:0,_initTimestamp:0,_lastTimestamp:0,_lastScrollTop:0,get _maxHeaderTop(){return this.fixed?this._dHeight:this._height+5},get _stickyEl(){if(this._stickyElRef)return this._stickyElRef;for(var t,e=mr(this.$.slot).getDistributedNodes(),i=0;t=e[i];i++)if(t.nodeType===Node.ELEMENT_NODE){if(t.hasAttribute("sticky")){this._stickyElRef=t;break}this._stickyElRef||(this._stickyElRef=t)}return this._stickyElRef},_configChanged:function(){this.resetLayout(),this._notifyLayoutChanged()},_updateLayoutStates:function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var t=this._clampedScrollTop,e=0===this._height||0===t,i=this.disabled;this._height=this.offsetHeight,this._stickyElRef=null,this.disabled=!0,e||this._updateScrollState(0,!0),this._mayMove()?this._dHeight=this._stickyEl?this._height-this._stickyEl.offsetHeight:0:this._dHeight=0,this._stickyElTop=this._stickyEl?this._stickyEl.offsetTop:0,this._setUpEffect(),e?this._updateScrollState(t,!0):(this._updateScrollState(this._lastScrollTop,!0),this._layoutIfDirty()),this.disabled=i}},_updateScrollState:function(t,e){if(0!==this._height){var i=0,s=0,n=this._top,r=(this._lastScrollTop,this._maxHeaderTop),o=t-this._lastScrollTop,a=Math.abs(o),l=t>this._lastScrollTop,d=performance.now();if(this._mayMove()&&(s=this._clamp(this.reveals?n+o:t,0,r)),t>=this._dHeight&&(s=this.condenses&&!this.fixed?Math.max(this._dHeight,s):s,this.style.transitionDuration="0ms"),this.reveals&&!this.disabled&&a<100&&((d-this._initTimestamp>300||this._wasScrollingDown!==l)&&(this._initScrollTop=t,this._initTimestamp=d),t>=r))if(Math.abs(this._initScrollTop-t)>30||a>10){l&&t>=r?s=r:!l&&t>=this._dHeight&&(s=this.condenses&&!this.fixed?this._dHeight:0);var h=o/(d-this._lastTimestamp);this.style.transitionDuration=this._clamp((s-n)/h,0,300)+"ms"}else s=this._top;i=0===this._dHeight?t>0?1:0:s/this._dHeight,e||(this._lastScrollTop=t,this._top=s,this._wasScrollingDown=l,this._lastTimestamp=d),(e||i!==this._progress||n!==s||0===t)&&(this._progress=i,this._runEffects(i,s),this._transformHeader(s))}},_mayMove:function(){return this.condenses||!this.fixed},willCondense:function(){return this._dHeight>0&&this.condenses},isOnScreen:function(){return 0!==this._height&&this._top<this._height},isContentBelow:function(){return 0===this._top?this._clampedScrollTop>0:this._clampedScrollTop-this._maxHeaderTop>=0},_transformHeader:function(t){this.translate3d(0,-t+"px",0),this._stickyEl&&this.translate3d(0,this.condenses&&t>=this._stickyElTop?Math.min(t,this._dHeight)-this._stickyElTop+"px":0,0,this._stickyEl)},_clamp:function(t,e,i){return Math.min(i,Math.max(e,t))},_ensureBgContainers:function(){this._bgContainer||(this._bgContainer=document.createElement("div"),this._bgContainer.id="background",this._bgRear=document.createElement("div"),this._bgRear.id="backgroundRearLayer",this._bgContainer.appendChild(this._bgRear),this._bgFront=document.createElement("div"),this._bgFront.id="backgroundFrontLayer",this._bgContainer.appendChild(this._bgFront),mr(this.root).insertBefore(this._bgContainer,this.$.contentContainer))},_getDOMRef:function(t){switch(t){case"backgroundFrontLayer":return this._ensureBgContainers(),this._bgFront;case"backgroundRearLayer":return this._ensureBgContainers(),this._bgRear;case"background":return this._ensureBgContainers(),this._bgContainer;case"mainTitle":return mr(this).querySelector("[main-title]");case"condensedTitle":return mr(this).querySelector("[condensed-title]")}return null},getScrollState:function(){return{progress:this._progress,top:this._top}}}),kr({_template:Vr`
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
`,is:"app-header-layout",behaviors:[ao],properties:{hasScrollingRegion:{type:Boolean,value:!1,reflectToAttribute:!0}},observers:["resetLayout(isAttached, hasScrollingRegion)"],get header(){return mr(this.$.headerSlot).getDistributedNodes()[0]},_updateLayoutStates:function(){var t=this.header;if(this.isAttached&&t){this.$.wrapper.classList.remove("initializing"),t.scrollTarget=this.hasScrollingRegion?this.$.contentContainer:this.ownerDocument.documentElement;var e=t.offsetHeight;this.hasScrollingRegion?(t.style.left="",t.style.right=""):requestAnimationFrame(function(){var e=this.getBoundingClientRect(),i=document.documentElement.clientWidth-e.right;t.style.left=e.left+"px",t.style.right=i+"px"}.bind(this));var i=this.$.contentContainer.style;t.fixed&&!t.condenses&&this.hasScrollingRegion?(i.marginTop=e+"px",i.paddingTop=""):(i.paddingTop=e+"px",i.marginTop="")}}}),kr({_template:Vr`
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
`,is:"app-toolbar"}),kr({_template:Vr`
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
`,is:"app-box",behaviors:[ho,oo],listeners:{"iron-resize":"_resizeHandler"},_progress:0,attached:function(){this.resetLayout()},_debounceRaf:function(t){var e=this;this._raf&&window.cancelAnimationFrame(this._raf),this._raf=window.requestAnimationFrame(function(){e._raf=null,t.call(e)})},resetLayout:function(){this._debounceRaf(function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var t=this._clampedScrollTop,e=this.disabled;this.disabled=!0,this._elementTop=this._getElementTop(),this._elementHeight=this.offsetHeight,this._cachedScrollTargetHeight=this._scrollTargetHeight,this._setUpEffect(),this._updateScrollState(t),this.disabled=e}})},_getElementTop:function(){for(var t=this,e=0;t&&t!==this.scrollTarget;)e+=t.offsetTop,t=t.offsetParent;return e},_updateScrollState:function(t){if(this.isOnScreen()){var e=this._elementTop-t;this._progress=1-(e+this._elementHeight)/this._cachedScrollTargetHeight,this._runEffects(this._progress,t)}},isOnScreen:function(){return this._elementTop<this._scrollTop+this._cachedScrollTargetHeight&&this._elementTop+this._elementHeight>this._scrollTop},_resizeHandler:function(){this.resetLayout()},_getDOMRef:function(t){return"background"===t?this.$.background:"backgroundFrontLayer"===t?this.$.backgroundFrontLayer:void 0},getScrollState:function(){return{progress:this._progress}}});var co=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredDrawer=class extends ct{render(){return R`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    /*padding: 10px; */
                    /*height: 100%;*/
                }
                :host([hidden]) { display: none; }
              
                app-drawer > div {
                    display: inline-block;
                    padding: 5px;
                    height: 100%; 
                    box-sizing: border-box; 
                    width: 100%; 
                    overflow: auto; 
                }
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
            </style>
            <app-drawer swipe-open>
<!--                <div>-->
                    <wired-card>
                        <slot></slot>
                    </wired-card>
<!--                </div>-->
            </app-drawer>
        `}},t.WiredDrawer=co([Q("wired-drawer")],t.WiredDrawer),window.navigator.userAgent.match("Trident")&&(DOMTokenList.prototype.toggle=function(t,e){return void 0===e||e?this.add(t):this.remove(t),void 0===e||e});const po=lt`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,uo=document.createElement("link");uo.rel="stylesheet",uo.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(uo);var fo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let _o=class extends ht{render(){return R`<slot></slot>`}};_o.styles=po,_o=fo([Q("mwc-icon")],_o);var mo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},yo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredFab=class extends ct{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`);const n=Lt(s/2,s/2,s,s);e.appendChild(n),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},mo([et({type:Boolean,reflect:!0}),yo("design:type",Object)],t.WiredFab.prototype,"disabled",void 0),t.WiredFab=mo([Q("wired-fab")],t.WiredFab);var go=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},bo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredIconButton=class extends ct{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`),Nt(e,s/2,s/2,s,s),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},go([et({type:Boolean,reflect:!0}),bo("design:type",Object)],t.WiredIconButton.prototype,"disabled",void 0),t.WiredIconButton=go([Q("wired-icon-button")],t.WiredIconButton);var vo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},wo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredInput=class extends ct{constructor(){super(...arguments),this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.disabled=!1,this.required=!1,this.autofocus=!1,this.readonly=!1}static get styles(){return lt`
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
    `}render(){return R`
    <input id="txt" name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" @change="${this.onChange}">
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get input(){return this.shadowRoot?this.shadowRoot.getElementById("txt"):null}get value(){const t=this.input;return t&&t.value||""}set value(t){if(this.shadowRoot){const e=this.input;e&&(e.value=t)}else this.pendingValue=t}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=i.height-4-1,n=i.width-4-1;e.setAttribute("width",`${i.width+4}`),e.setAttribute("height",`${i.height+4}`),Et(e,2,2,n,s),void 0!==this.pendingValue&&(this.input.value=this.pendingValue,delete this.pendingValue),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}onChange(t){t.stopPropagation(),this.fireEvent(t.type,{sourceEvent:t})}},vo([et({type:String}),wo("design:type",Object)],t.WiredInput.prototype,"placeholder",void 0),vo([et({type:String}),wo("design:type",String)],t.WiredInput.prototype,"name",void 0),vo([et({type:String}),wo("design:type",String)],t.WiredInput.prototype,"min",void 0),vo([et({type:String}),wo("design:type",String)],t.WiredInput.prototype,"max",void 0),vo([et({type:String}),wo("design:type",String)],t.WiredInput.prototype,"step",void 0),vo([et({type:String}),wo("design:type",Object)],t.WiredInput.prototype,"type",void 0),vo([et({type:String}),wo("design:type",Object)],t.WiredInput.prototype,"autocomplete",void 0),vo([et({type:String}),wo("design:type",Object)],t.WiredInput.prototype,"autocapitalize",void 0),vo([et({type:String}),wo("design:type",Object)],t.WiredInput.prototype,"autocorrect",void 0),vo([et({type:Boolean,reflect:!0}),wo("design:type",Object)],t.WiredInput.prototype,"disabled",void 0),vo([et({type:Boolean}),wo("design:type",Object)],t.WiredInput.prototype,"required",void 0),vo([et({type:Boolean}),wo("design:type",Object)],t.WiredInput.prototype,"autofocus",void 0),vo([et({type:Boolean}),wo("design:type",Object)],t.WiredInput.prototype,"readonly",void 0),vo([et({type:Number}),wo("design:type",Number)],t.WiredInput.prototype,"minlength",void 0),vo([et({type:Number}),wo("design:type",Number)],t.WiredInput.prototype,"maxlength",void 0),vo([et({type:Number}),wo("design:type",Number)],t.WiredInput.prototype,"size",void 0),t.WiredInput=vo([Q("wired-input")],t.WiredInput);var xo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},So=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredListbox=class extends ct{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return lt`
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
    `}render(){return R`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){console.log("LISTBOX Update");const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();if(t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),Et(t,0,0,e.width,e.height),this.classList.add("wired-rendered"),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}},xo([et({type:Object}),So("design:type",Object)],t.WiredListbox.prototype,"value",void 0),xo([et({type:String}),So("design:type",String)],t.WiredListbox.prototype,"selected",void 0),xo([et({type:Boolean}),So("design:type",Object)],t.WiredListbox.prototype,"horizontal",void 0),t.WiredListbox=xo([Q("wired-listbox")],t.WiredListbox);var Co=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ko=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredProgress=class extends ct{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),this.box?t.appendChild(this.box):this.box=Et(t,0,0,e.width,e.height);let i=0;if(this.max>this.min){i=(this.value-this.min)/(this.max-this.min);const s=e.width*Math.max(0,Math.min(i,100)),n=It([[0,0],[s,0],[s,e.height],[0,e.height]]);t.appendChild(n),n.classList.add("progbox")}this.classList.add("wired-rendered")}},Co([et({type:Number}),ko("design:type",Object)],t.WiredProgress.prototype,"value",void 0),Co([et({type:Number}),ko("design:type",Object)],t.WiredProgress.prototype,"min",void 0),Co([et({type:Number}),ko("design:type",Object)],t.WiredProgress.prototype,"max",void 0),Co([et({type:Boolean}),ko("design:type",Object)],t.WiredProgress.prototype,"percentage",void 0),t.WiredProgress=Co([Q("wired-progress")],t.WiredProgress);var Po=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},To=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadio=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return lt`
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
    `}render(){return R`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);this.dot=void 0;const i={width:this.iconsize||24,height:this.iconsize||24};e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Nt(e,i.width/2,i.height/2,i.width,i.height);const s=Math.max(.6*i.width,5),n=Math.max(.6*i.height,5);this.dot=Nt(e,i.width/2,i.height/2,s,n),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}},Po([et({type:Boolean}),To("design:type",Object)],t.WiredRadio.prototype,"checked",void 0),Po([et({type:Boolean,reflect:!0}),To("design:type",Object)],t.WiredRadio.prototype,"disabled",void 0),Po([et({type:String}),To("design:type",String)],t.WiredRadio.prototype,"name",void 0),Po([et({type:Number}),To("design:type",Object)],t.WiredRadio.prototype,"iconsize",void 0),t.WiredRadio=Po([Q("wired-radio")],t.WiredRadio);var Eo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Oo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadioGroup=class extends ct{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return lt`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return R`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(t){const e=t.detail.checked,i=t.target,s=i.name||"";e?(this.selected=e&&s||"",this.fireSelected()):i.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const t=i.name||"";this.selected&&t===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(--i<0&&(i=t.length-1),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}selectNext(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(++i>=t.length&&(i=0),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}},Eo([et({type:String}),Oo("design:type",String)],t.WiredRadioGroup.prototype,"selected",void 0),t.WiredRadioGroup=Eo([Q("wired-radio-group")],t.WiredRadioGroup);var No=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ro=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSlider=class extends ct{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}get value(){return this._value}set value(t){this.setValue(t,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`);const i=this.knobradius||10;this.barWidth=e.width-2*i,this.bar=Tt(t,i,e.height/2,e.width-i,e.height/2),this.bar.classList.add("bar"),this.knobGroup=xt("g"),t.appendChild(this.knobGroup),this.knob=Nt(this.knobGroup,i,e.height/2,2*i,2*i),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),wn(this.knob,"down",t=>{this.disabled||this.knobdown(t)}),wn(this.knob,"up",()=>{this.disabled||this.resetKnob()}),wn(this.knob,"track",t=>{this.disabled||this.onTrack(t)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}updated(t){t.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(t,e=!1){this._value=t,this.setAriaValue(),this.onValueChange(),e||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const t=Math.min(this.max,Math.round(this.value+this.step));t!==this.value&&this.setValue(t)}decrement(){const t=Math.max(this.min,Math.round(this.value-this.step));t!==this.value&&this.setValue(t)}onValueChange(){if(!this.knob)return;let t=0;this.max>this.min&&(t=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=t,t?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const e=t*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(e)}px)`}knobdown(t){this.knobExpand(!0),t.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(t){this.knob&&(t?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(t){switch(t.stopPropagation(),t.detail.state){case"start":this.trackStart();break;case"track":this.trackX(t);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(t){this.dragging||this.trackStart();const e=t.detail.dx||0,i=Math.max(Math.min(this.startx+e,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(i)}px)`;const s=i/this.barWidth;this.intermediateValue=this.min+s*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}},No([et({type:Number}),Ro("design:type",Object)],t.WiredSlider.prototype,"_value",void 0),No([et({type:Number}),Ro("design:type",Object)],t.WiredSlider.prototype,"min",void 0),No([et({type:Number}),Ro("design:type",Object)],t.WiredSlider.prototype,"max",void 0),No([et({type:Number}),Ro("design:type",Object)],t.WiredSlider.prototype,"knobradius",void 0),No([et({type:Boolean,reflect:!0}),Ro("design:type",Object)],t.WiredSlider.prototype,"disabled",void 0),t.WiredSlider=No([Q("wired-slider")],t.WiredSlider);var Ao=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Io=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSpinner=class extends ct{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return lt`
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
    `}render(){return R`
    <svg id="svg"></svg>
    `}firstUpdated(){this.svg&&(Nt(this.svg,38,38,60,60),this.knob=Lt(0,0,20,20),this.knob.classList.add("knob"),this.svg.appendChild(this.knob)),this.updateCursor(),this.classList.add("wired-rendered")}updated(){this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(t=>this.tick(t))}tick(t){this.spinning?(this.timerstart||(this.timerstart=t),this.value=Math.min(1,(t-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}updateCursor(){if(this.knob){const t=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${t[0]}px, ${t[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}},Ao([et({type:Boolean}),Io("design:type",Object)],t.WiredSpinner.prototype,"spinning",void 0),Ao([et({type:Number}),Io("design:type",Object)],t.WiredSpinner.prototype,"duration",void 0),Ao([it("svg"),Io("design:type",SVGSVGElement)],t.WiredSpinner.prototype,"svg",void 0),t.WiredSpinner=Ao([Q("wired-spinner")],t.WiredSpinner);const Lo=(t,e)=>{const i=t.startNode.parentNode,s=void 0===e?t.endNode:e.startNode,n=i.insertBefore(u(),s);i.insertBefore(u(),s);const r=new v(t.options);return r.insertAfterNode(n),r},Mo=(t,e)=>(t.setValue(e),t.commit(),t),Do=(t,e,i)=>{const s=t.startNode.parentNode,n=i?i.startNode:t.endNode,r=e.endNode.nextSibling;r!==n&&((t,e,i=null,s=null)=>{let n=e;for(;n!==i;){const e=n.nextSibling;t.insertBefore(n,s),n=e}})(s,e.startNode,r,n)},zo=t=>{n(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},jo=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},Ho=new WeakMap,Wo=new WeakMap,$o=(t=>(...i)=>{const s=t(...i);return e.set(s,!0),s})((t,e,i)=>{let s;return void 0===i?i=e:void 0!==e&&(s=e),e=>{if(!(e instanceof v))throw new Error("repeat can only be used in text bindings");const n=Ho.get(e)||[],r=Wo.get(e)||[],o=[],a=[],l=[];let d,h,c=0;for(const e of t)l[c]=s?s(e,c):c,a[c]=i(e,c),c++;let p=0,u=n.length-1,f=0,_=a.length-1;for(;p<=u&&f<=_;)if(null===n[p])p++;else if(null===n[u])u--;else if(r[p]===l[f])o[f]=Mo(n[p],a[f]),p++,f++;else if(r[u]===l[_])o[_]=Mo(n[u],a[_]),u--,_--;else if(r[p]===l[_])o[_]=Mo(n[p],a[_]),Do(e,n[p],o[_+1]),p++,_--;else if(r[u]===l[f])o[f]=Mo(n[u],a[f]),Do(e,n[u],n[p]),u--,f++;else if(void 0===d&&(d=jo(l,f,_),h=jo(r,p,u)),d.has(r[p]))if(d.has(r[u])){const t=h.get(l[f]),i=void 0!==t?n[t]:null;if(null===i){const t=Lo(e,n[p]);Mo(t,a[f]),o[f]=t}else o[f]=Mo(i,a[f]),Do(e,i,n[p]),n[t]=null;f++}else zo(n[u]),u--;else zo(n[p]),p++;for(;f<=_;){const t=Lo(e,o[_+1]);Mo(t,a[f]),o[f++]=t}for(;p<=u;){const t=n[p++];null!==t&&zo(t)}Ho.set(e,o),Wo.set(e,l)}});var Fo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Bo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTab=class extends ct{constructor(){super(...arguments),this.name="",this.label=""}static get styles(){return lt`
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
    `}render(){return R`
    <wired-card>
      <slot part="body"></slot>
    </wired-card>
    `}relayout(){setTimeout(()=>{this.card&&this.card.requestUpdate()})}},Fo([et({type:String}),Bo("design:type",Object)],t.WiredTab.prototype,"name",void 0),Fo([et({type:String}),Bo("design:type",Object)],t.WiredTab.prototype,"label",void 0),Fo([it("wired-card"),Bo("design:type",t.WiredCard)],t.WiredTab.prototype,"card",void 0),t.WiredTab=Fo([Q("wired-tab")],t.WiredTab),t.WizardTabs=class extends ct{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return lt`
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

    #bar {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
    }
    
    #bar, #tabs { 
        width: 100%;
       
    } 
    #tabs {
     height: 100%;
     }
    `}render(){return R`
    <div id="bar">
      ${$o(this.pages,t=>t.name,t=>R`
      <wired-item role="tab" .value="${t.name}" .selected="${t.name===this.selected}" ?aria-selected="${t.name===this.selected}"
        @click="${()=>this.selected=t.name}">${t.label||t.name}</wired-item>
      `)}
    </div>
    <div id="tabs">
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const t=this.slotElement.assignedNodes();if(t&&t.length){for(let e=0;e<t.length;e++){const i=t[e];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const t=i;this.pages.push(t);const e=t.getAttribute("name")||"";e&&e.trim().split(" ").forEach(e=>{e&&this.pageMap.set(e,t)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.getElement();for(let e=0;e<this.pages.length;e++){const i=this.pages[e];i===t?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=t||void 0,this.current&&this.current.relayout()}getElement(){let t=void 0;return this.selected&&(t=this.pageMap.get(this.selected)),t||(t=this.pages[0]),t||null}selectPrevious(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].name||""}}selectNext(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].name||""}}},Fo([et({type:String}),Bo("design:type",String)],t.WizardTabs.prototype,"selected",void 0),Fo([it("slot"),Bo("design:type",HTMLSlotElement)],t.WizardTabs.prototype,"slotElement",void 0),t.WizardTabs=Fo([Q("wired-tabs")],t.WizardTabs);var qo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Vo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTextarea=class extends ct{constructor(){super(...arguments),this.rows=1,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.disabled=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1,this.tokens=[],this.prevHeight=0}static get styles(){return lt`
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
    `}render(){return R`
    <div id="mirror" class="mirror-text">&#160;</div>
    <div class="fit">
      <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
        placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
        rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}" @input="${this.onInput}"></textarea>
    </div>
    <div class="fit overlay">
      <svg id="svg"></svg>
    </div>
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get textarea(){return this.shadowRoot?this.shadowRoot.getElementById("textarea"):null}get mirror(){return this.shadowRoot.getElementById("mirror")}get value(){const t=this.textarea;return t&&t.value||""}set value(t){const e=this.textarea;e&&(e.value!==t&&(e.value=t||""),this.mirror.innerHTML=this.valueForMirror(),this.requestUpdate())}valueForMirror(){const t=this.textarea;return t?(this.tokens=t&&t.value?t.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this.constrain(this.tokens)):""}constrain(t){let e;for(t=t||[""],e=this.maxrows>0&&t.length>this.maxrows?t.slice(0,this.maxrows):t.slice(0);this.rows>0&&e.length<this.rows;)e.push("");return e.join("<br/>")+"&#160;"}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg"),i=this.getBoundingClientRect();if(this.prevHeight!==i.height){for(;e.hasChildNodes();)e.removeChild(e.lastChild);e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Et(e,2,2,i.width-2,i.height-2),this.prevHeight=i.height,this.classList.add("wired-rendered"),this.updateCached()}}updateCached(){this.mirror.innerHTML=this.constrain(this.tokens)}onInput(){this.value=this.textarea.value}},qo([et({type:Number}),Vo("design:type",Object)],t.WiredTextarea.prototype,"rows",void 0),qo([et({type:Number}),Vo("design:type",Object)],t.WiredTextarea.prototype,"maxrows",void 0),qo([et({type:String}),Vo("design:type",Object)],t.WiredTextarea.prototype,"autocomplete",void 0),qo([et({type:Boolean}),Vo("design:type",Object)],t.WiredTextarea.prototype,"autofocus",void 0),qo([et({type:Boolean,reflect:!0}),Vo("design:type",Object)],t.WiredTextarea.prototype,"disabled",void 0),qo([et({type:String}),Vo("design:type",Object)],t.WiredTextarea.prototype,"inputmode",void 0),qo([et({type:String}),Vo("design:type",Object)],t.WiredTextarea.prototype,"placeholder",void 0),qo([et({type:Boolean}),Vo("design:type",Object)],t.WiredTextarea.prototype,"required",void 0),qo([et({type:Boolean}),Vo("design:type",Object)],t.WiredTextarea.prototype,"readonly",void 0),qo([et({type:Number}),Vo("design:type",Number)],t.WiredTextarea.prototype,"minlength",void 0),qo([et({type:Number}),Vo("design:type",Number)],t.WiredTextarea.prototype,"maxlength",void 0),t.WiredTextarea=qo([Q("wired-textarea")],t.WiredTextarea);var Uo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredTitle=class extends ct{render(){return R`
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
        `}},t.WiredTitle=Uo([Q("wired-title")],t.WiredTitle);var Yo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Xo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredToggle=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}render(){return R`
    <div @click="${this.toggleCheck}">
      <svg id="svg"></svg>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","switch"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())});const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=80,i=34;t.setAttribute("width",`${e}`),t.setAttribute("height",`${i}`),Et(t,16,8,e-32,18),this.knob=xt("g"),this.knob.classList.add("knob"),t.appendChild(this.knob);const s=Lt(16,16,32,32);s.classList.add("knobfill"),this.knob.appendChild(s),Nt(this.knob,16,16,32,32),this.classList.add("wired-rendered")}updated(t){if(t.has("disabled")&&this.refreshDisabledState(),this.knob){const t=this.knob.classList;this.checked?(t.remove("unchecked"),t.add("checked")):(t.remove("checked"),t.add("unchecked"))}this.setAttribute("aria-checked",`${this.checked}`)}},Yo([et({type:Boolean}),Xo("design:type",Object)],t.WiredToggle.prototype,"checked",void 0),Yo([et({type:Boolean,reflect:!0}),Xo("design:type",Object)],t.WiredToggle.prototype,"disabled",void 0),t.WiredToggle=Yo([Q("wired-toggle")],t.WiredToggle);var Go=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredToolbar=class extends ct{render(){return R`
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
        `}},t.WiredToolbar=Go([Q("wired-toolbar")],t.WiredToolbar);var Jo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ko=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};return t.WiredTooltip=class extends ct{constructor(){super(...arguments),this.offset=14,this.position="bottom",this.dirty=!1,this.showing=!1,this._target=null,this.showHandler=this.show.bind(this),this.hideHandler=this.hide.bind(this)}static get styles(){return lt`
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
    `}render(){return R`
    <div id="container" style="display: none;">
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
      <span style="position: relative;">${this.text}</span>
    </div>
    `}get target(){if(this._target)return this._target;const t=this.parentNode,e=(this.getRootNode?this.getRootNode():null)||document;let i=null;return this.for?i=e.querySelector("#"+this.for):t&&(i=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.host:t),i}detachListeners(){this._target&&(this._target.removeEventListener("mouseenter",this.showHandler),this._target.removeEventListener("focus",this.showHandler),this._target.removeEventListener("mouseleave",this.hideHandler),this._target.removeEventListener("blur",this.hideHandler),this._target.removeEventListener("click",this.hideHandler)),this.removeEventListener("mouseenter",this.hideHandler)}attachListeners(){this._target&&(this._target.addEventListener("mouseenter",this.showHandler),this._target.addEventListener("focus",this.showHandler),this._target.addEventListener("mouseleave",this.hideHandler),this._target.addEventListener("blur",this.hideHandler),this._target.addEventListener("click",this.hideHandler)),this.addEventListener("mouseenter",this.hideHandler)}refreshTarget(){this.detachListeners(),this._target=null,this._target=this.target,this.attachListeners(),this.dirty=!0}layout(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();let i=e.width,s=e.height;switch(this.position){case"left":case"right":i+=this.offset;break;default:s+=this.offset}t.setAttribute("width",`${i}`),t.setAttribute("height",`${s}`);let n=[];switch(this.position){case"top":n=[[2,2],[i-2,2],[i-2,s-this.offset],[i/2+8,s-this.offset],[i/2,s-this.offset+8],[i/2-8,s-this.offset],[0,s-this.offset]];break;case"left":n=[[2,2],[i-this.offset,2],[i-this.offset,s/2-8],[i-this.offset+8,s/2],[i-this.offset,s/2+8],[i-this.offset,s],[2,s-2]];break;case"right":n=[[this.offset,2],[i-2,2],[i-2,s-2],[this.offset,s-2],[this.offset,s/2+8],[this.offset-8,s/2],[this.offset,s/2-8]],t.style.transform=`translateX(${-this.offset}px)`;break;default:n=[[2,this.offset],[0,s-2],[i-2,s-2],[i-2,this.offset],[i/2+8,this.offset],[i/2,this.offset-8],[i/2-8,this.offset]],t.style.transform=`translateY(${-this.offset}px)`}Ot(t,n),this.dirty=!1}firstUpdated(){this.layout()}updated(t){(t.has("position")||t.has("text"))&&(this.dirty=!0),this._target&&!t.has("for")||this.refreshTarget(),this.dirty&&this.layout()}show(){this.showing||(this.showing=!0,this.shadowRoot.getElementById("container").style.display="",this.updatePosition(),setTimeout(()=>{this.layout()},1))}hide(){this.showing&&(this.showing=!1,this.shadowRoot.getElementById("container").style.display="none")}updatePosition(){if(!this._target||!this.offsetParent)return;const t=this.offset,e=this.offsetParent.getBoundingClientRect(),i=this._target.getBoundingClientRect(),s=this.getBoundingClientRect(),n=(i.width-s.width)/2,r=(i.height-s.height)/2,o=i.left-e.left,a=i.top-e.top;let l,d;switch(this.position){case"top":l=o+n,d=a-s.height-t;break;case"bottom":l=o+n,d=a+i.height+t;break;case"left":l=o-s.width-t,d=a+r;break;case"right":l=o+i.width+t,d=a+r}this.style.left=l+"px",this.style.top=d+"px"}},Jo([et({type:String}),Ko("design:type",String)],t.WiredTooltip.prototype,"for",void 0),Jo([et({type:String}),Ko("design:type",String)],t.WiredTooltip.prototype,"text",void 0),Jo([et({type:Number}),Ko("design:type",Object)],t.WiredTooltip.prototype,"offset",void 0),Jo([et({type:String}),Ko("design:type",String)],t.WiredTooltip.prototype,"position",void 0),t.WiredTooltip=Jo([Q("wired-tooltip")],t.WiredTooltip),t}({});
