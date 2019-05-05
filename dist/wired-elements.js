var WiredElements=function(t){"use strict";const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${l}`),h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],r=e=>{const o=e.content,l=document.createTreeWalker(o,133,null,!1);let c=0;for(;l.nextNode();){i++;const e=l.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(a)>=0&&r++;for(;r-- >0;){const n=t.strings[s],r=f.exec(n)[2],o=r.toLowerCase()+h,a=e.getAttribute(o).split(d);this.parts.push({type:"attribute",index:i,name:r,strings:a}),e.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const r=e.parentNode,o=t.split(d),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?u():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++i});""===o[a]?(r.insertBefore(u(),e),n.push(e)):e.data=o[a],s+=a}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&i!==c||(i++,t.insertBefore(u(),e)),c=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const p=t=>-1!==t.index,u=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const r=t=>{const s=document.createTreeWalker(t,133,null,!1);let o=s.nextNode();for(;i<e.length&&null!==o;){const t=e[i];if(p(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=s.nextNode();else this._parts.push(void 0),i++}};return r(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class m{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=f.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+h+s[3]+a:t+l}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const g=t=>null===t||!("object"==typeof t||"function"==typeof t);class y{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||g(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class v{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=u()),t._insert(this.endNode=u())}insertAfterPart(t){t._insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}const t=this._pendingValue;t!==r&&(g(t)?t!==this.value&&this._commitText(t):t instanceof m?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===o?(this.value=o,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new v(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class w{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=r}}class x extends y{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends b{}let C=!1;try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class k{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=P(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const P=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const E=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new x(t,e.slice(1),i).parts:"@"===n?[new k(t,e.slice(1),s.eventContext)]:"?"===n?[new w(t,e.slice(1),i)]:new y(t,e,i).parts}handleTextExpression(t){return new v(t)}};function T(t){let e=R.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},R.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(a);return void 0===(i=e.keyString.get(s))&&(i=new c(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const R=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const N=(t,...e)=>new m(t,e,"html",E),A=133;function I(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,A,null,!1);let r=M(s),o=s[r],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,o=s[r=M(s,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const L=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,A,null,!1);for(;i.nextNode();)e++;return e},M=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};const D=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1);const j=t=>e=>{const i=D(e.type,t);let s=R.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},R.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(a);if(void 0===(n=s.keyString.get(r))){const i=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(i,t),n=new c(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},W=["html","svg"],H=new Set,$=(t,e,i)=>{H.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{W.forEach(e=>{const i=R.get(D(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),I(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,A,null,!1);let o=M(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=L(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=M(n,o);return}o=M(n,o)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),I(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:B},V=Promise.resolve(!0),U=1,Y=4,G=8,X=16,J=32;class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=V,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||F,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||F.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|J,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=q){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|G,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~G}}_attributeToProperty(t,e){if(this._updateState&G)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||q;this._updateState=this._updateState|X,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||q;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Y;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&J}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&U}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&U||(this._updateState=this._updateState|U,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}K.finalized=!0;const Q=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),Z=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),tt=(t,e,i)=>{e.constructor.createProperty(i,t)};function et(t){return(e,i)=>void 0!==i?tt(t,e,i):Z(t,e)}function it(t){return(e,i)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==i?st(s,e,i):nt(s,e)}}const st=(t,e,i)=>{Object.defineProperty(e,i,t)},nt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof at)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new at(i,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const dt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class ht extends K{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){dt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof m&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ht.finalized=!0,ht.render=((t,e,i)=>{const s=i.scopeName,r=O.has(e),o=e instanceof ShadowRoot&&z&&t instanceof m,a=o&&!H.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=O.get(e);void 0===s&&(n(e,e.firstChild),O.set(e,s=new v(Object.assign({templateFactory:T},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:j(s)},i)),a){const t=O.get(l);O.delete(l),t.value instanceof _&&$(l,t.value.template,s),n(e,e.firstChild),e.appendChild(l),O.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var ct=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};class pt extends ht{constructor(){super(...arguments),this.debug=!1}fireEvent(t,e,i=!0,s=!0){if(t){const n={bubbles:"boolean"!=typeof i||i,composed:"boolean"!=typeof s||s};e&&(n.detail=e);const r=window.SlickCustomEvent||CustomEvent;this.dispatchEvent(new r(t,n))}}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.resizeListener||(this.resizeListener=this.delayCall(this.refreshAfterResize.bind(this),200,!1,this),window.addEventListener("resize",this.resizeListener)),setTimeout(()=>this.refreshAfterResize(),10)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),delete this.resizeListener)}delayCall(t,e,i,s){let n=0;return()=>{const r=arguments,o=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||t.apply(s,r)},e),o&&t.apply(s,r)}}refreshAfterResize(){this.refreshElement&&(this.debug&&console.log("Refreshing wired-element: ",this),this.refreshElement())}}(function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);r>3&&o&&Object.defineProperty(e,i,o)})([et({type:Boolean}),ct("design:type",Object)],pt.prototype,"debug",void 0);const ut=!(window.ShadyDOM&&window.ShadyDOM.inUse);let ft,_t;function mt(t){ft=(!t||!t.shimcssproperties)&&(ut||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(_t=window.ShadyCSS.cssBuild);const gt=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?ft=window.ShadyCSS.nativeCss:window.ShadyCSS?(mt(window.ShadyCSS),window.ShadyCSS=void 0):mt(window.WebComponents&&window.WebComponents.flags);const yt=ft;class bt{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function vt(t){return function t(e,i){let s=i.substring(e.start,e.end-1);e.parsedCssText=e.cssText=s.trim();if(e.parent){let t=e.previous?e.previous.end:e.parent.start;s=(s=(s=function(t){return t.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let t=arguments[1],e=6-t.length;for(;e--;)t="0"+t;return"\\"+t})}(s=i.substring(t,e.start-1))).replace(kt.multipleSpaces," ")).substring(s.lastIndexOf(";")+1);let n=e.parsedSelector=e.selector=s.trim();e.atRule=0===n.indexOf(Tt),e.atRule?0===n.indexOf(Et)?e.type=xt.MEDIA_RULE:n.match(kt.keyframesRule)&&(e.type=xt.KEYFRAMES_RULE,e.keyframesName=e.selector.split(kt.multipleSpaces).pop()):0===n.indexOf(Pt)?e.type=xt.MIXIN_RULE:e.type=xt.STYLE_RULE}let n=e.rules;if(n)for(let e,s=0,r=n.length;s<r&&(e=n[s]);s++)t(e,i);return e}(function(t){let e=new bt;e.start=0,e.end=t.length;let i=e;for(let s=0,n=t.length;s<n;s++)if(t[s]===St){i.rules||(i.rules=[]);let t=i,e=t.rules[t.rules.length-1]||null;(i=new bt).start=s+1,i.parent=t,i.previous=e,t.rules.push(i)}else t[s]===Ct&&(i.end=s+1,i=i.parent||e);return e}(t=t.replace(kt.comments,"").replace(kt.port,"")),t)}function wt(t,e,i=""){let s="";if(t.cssText||t.rules){let i=t.rules;if(i&&!function(t){let e=t[0];return Boolean(e)&&Boolean(e.selector)&&0===e.selector.indexOf(Pt)}(i))for(let t,n=0,r=i.length;n<r&&(t=i[n]);n++)s=wt(t,e,s);else(s=(s=e?t.cssText:function(t){return function(t){return t.replace(kt.mixinApply,"").replace(kt.varApply,"")}(t=function(t){return t.replace(kt.customProp,"").replace(kt.mixinProp,"")}(t))}(t.cssText)).trim())&&(s="  "+s+"\n")}return s&&(t.selector&&(i+=t.selector+" "+St+"\n"),i+=s,t.selector&&(i+=Ct+"\n\n")),i}const xt={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},St="{",Ct="}",kt={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},Pt="--",Et="@media",Tt="@",Rt=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,Ot=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,Nt=/@media\s(.*)/,At=new Set,It="shady-unscoped";function Lt(t){const e=t.textContent;if(!At.has(e)){At.add(e);const i=t.cloneNode(!0);document.head.appendChild(i)}}function Mt(t){return t.hasAttribute(It)}function Dt(t,e){return t?("string"==typeof t&&(t=vt(t)),e&&jt(t,e),wt(t,yt)):""}function zt(t){return!t.__cssRules&&t.textContent&&(t.__cssRules=vt(t.textContent)),t.__cssRules||null}function jt(t,e,i,s){if(!t)return;let n=!1,r=t.type;if(s&&r===xt.MEDIA_RULE){let e=t.selector.match(Nt);e&&(window.matchMedia(e[1]).matches||(n=!0))}r===xt.STYLE_RULE?e(t):i&&r===xt.KEYFRAMES_RULE?i(t):r===xt.MIXIN_RULE&&(n=!0);let o=t.rules;if(o&&!n)for(let t,n=0,r=o.length;n<r&&(t=o[n]);n++)jt(t,e,i,s)}window.ShadyDOM&&window.ShadyDOM.wrap;const Wt="css-build";function Ht(t){if(void 0!==_t)return _t;if(void 0===t.__cssBuild){const e=t.getAttribute(Wt);if(e)t.__cssBuild=e;else{const e=function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;if(e instanceof Comment){const t=e.textContent.trim().split(":");if(t[0]===Wt)return t[1]}return""}(t);""!==e&&function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;e.parentNode.removeChild(e)}(t),t.__cssBuild=e}}return t.__cssBuild||""}function $t(t){return""!==Ht(t)}function Ft(t,e){for(let i in e)null===i?t.style.removeProperty(i):t.style.setProperty(i,e[i])}function Bt(t,e){const i=window.getComputedStyle(t).getPropertyValue(e);return i?i.trim():""}const qt=/;\s*/m,Vt=/^\s*(initial)|(inherit)\s*$/,Ut=/\s*!important/,Yt="_-_";class Gt{constructor(){this._map={}}set(t,e){t=t.trim(),this._map[t]={properties:e,dependants:{}}}get(t){return t=t.trim(),this._map[t]||null}}let Xt=null;class Jt{constructor(){this._currentElement=null,this._measureElement=null,this._map=new Gt}detectMixin(t){return function(t){const e=Ot.test(t)||Rt.test(t);return Ot.lastIndex=0,Rt.lastIndex=0,e}(t)}gatherStyles(t){const e=function(t){const e=[],i=t.querySelectorAll("style");for(let t=0;t<i.length;t++){const s=i[t];Mt(s)?ut||(Lt(s),s.parentNode.removeChild(s)):(e.push(s.textContent),s.parentNode.removeChild(s))}return e.join("").trim()}(t.content);if(e){const i=document.createElement("style");return i.textContent=e,t.content.insertBefore(i,t.content.firstChild),i}return null}transformTemplate(t,e){void 0===t._gatheredStyle&&(t._gatheredStyle=this.gatherStyles(t));const i=t._gatheredStyle;return i?this.transformStyle(i,e):null}transformStyle(t,e=""){let i=zt(t);return this.transformRules(i,e),t.textContent=Dt(i),i}transformCustomStyle(t){let e=zt(t);return jt(e,t=>{":root"===t.selector&&(t.selector="html"),this.transformRule(t)}),t.textContent=Dt(e),e}transformRules(t,e){this._currentElement=e,jt(t,t=>{this.transformRule(t)}),this._currentElement=null}transformRule(t){t.cssText=this.transformCssText(t.parsedCssText,t),":root"===t.selector&&(t.selector=":host > *")}transformCssText(t,e){return t=t.replace(Rt,(t,i,s,n)=>this._produceCssProperties(t,i,s,n,e)),this._consumeCssProperties(t,e)}_getInitialValueForProperty(t){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(t)}_fallbacksFromPreviousRules(t){let e=t;for(;e.parent;)e=e.parent;const i={};let s=!1;return jt(e,e=>{(s=s||e===t)||e.selector===t.selector&&Object.assign(i,this._cssTextToMap(e.parsedCssText))}),i}_consumeCssProperties(t,e){let i=null;for(;i=Ot.exec(t);){let s=i[0],n=i[1],r=i.index,o=r+s.indexOf("@apply"),a=r+s.length,l=t.slice(0,o),d=t.slice(a),h=e?this._fallbacksFromPreviousRules(e):{};Object.assign(h,this._cssTextToMap(l));let c=this._atApplyToCssProperties(n,h);t=`${l}${c}${d}`,Ot.lastIndex=r+c.length}return t}_atApplyToCssProperties(t,e){t=t.replace(qt,"");let i=[],s=this._map.get(t);if(s||(this._map.set(t,{}),s=this._map.get(t)),s){let n,r,o;this._currentElement&&(s.dependants[this._currentElement]=!0);const a=s.properties;for(n in a)o=e&&e[n],r=[n,": var(",t,Yt,n],o&&r.push(",",o.replace(Ut,"")),r.push(")"),Ut.test(a[n])&&r.push(" !important"),i.push(r.join(""))}return i.join("; ")}_replaceInitialOrInherit(t,e){let i=Vt.exec(e);return i&&(e=i[1]?this._getInitialValueForProperty(t):"apply-shim-inherit"),e}_cssTextToMap(t,e=!1){let i,s,n=t.split(";"),r={};for(let t,o,a=0;a<n.length;a++)(t=n[a])&&(o=t.split(":")).length>1&&(i=o[0].trim(),s=o.slice(1).join(":"),e&&(s=this._replaceInitialOrInherit(i,s)),r[i]=s);return r}_invalidateMixinEntry(t){if(Xt)for(let e in t.dependants)e!==this._currentElement&&Xt(e)}_produceCssProperties(t,e,i,s,n){if(i&&function t(e,i){let s=e.indexOf("var(");if(-1===s)return i(e,"","","");let n=function(t,e){let i=0;for(let s=e,n=t.length;s<n;s++)if("("===t[s])i++;else if(")"===t[s]&&0==--i)return s;return-1}(e,s+3),r=e.substring(s+4,n),o=e.substring(0,s),a=t(e.substring(n+1),i),l=r.indexOf(",");return-1===l?i(o,r.trim(),"",a):i(o,r.substring(0,l).trim(),r.substring(l+1).trim(),a)}(i,(t,e)=>{e&&this._map.get(e)&&(s=`@apply ${e};`)}),!s)return t;let r=this._consumeCssProperties(""+s,n),o=t.slice(0,t.indexOf("--")),a=this._cssTextToMap(r,!0),l=a,d=this._map.get(e),h=d&&d.properties;h?l=Object.assign(Object.create(h),a):this._map.set(e,l);let c,p,u=[],f=!1;for(c in l)void 0===(p=a[c])&&(p="initial"),!h||c in h||(f=!0),u.push(`${e}${Yt}${c}: ${p}`);return f&&this._invalidateMixinEntry(d),d&&(d.properties=l),i&&(o=`${t};${o}`),`${o}${u.join("; ")};`}}Jt.prototype.detectMixin=Jt.prototype.detectMixin,Jt.prototype.transformStyle=Jt.prototype.transformStyle,Jt.prototype.transformCustomStyle=Jt.prototype.transformCustomStyle,Jt.prototype.transformRules=Jt.prototype.transformRules,Jt.prototype.transformRule=Jt.prototype.transformRule,Jt.prototype.transformTemplate=Jt.prototype.transformTemplate,Jt.prototype._separator=Yt,Object.defineProperty(Jt.prototype,"invalidCallback",{get:()=>Xt,set(t){Xt=t}});const Kt={},Qt="_applyShimCurrentVersion",Zt="_applyShimNextVersion",te="_applyShimValidatingVersion",ee=Promise.resolve();function ie(t){let e=Kt[t];e&&function(t){t[Qt]=t[Qt]||0,t[te]=t[te]||0,t[Zt]=(t[Zt]||0)+1}(e)}function se(t){return t[Qt]===t[Zt]}let ne,re=null,oe=window.HTMLImports&&window.HTMLImports.whenReady||null;function ae(t){requestAnimationFrame(function(){oe?oe(t):(re||(re=new Promise(t=>{ne=t}),"complete"===document.readyState?ne():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&ne()})),re.then(function(){t&&t()}))})}const le="__seenByShadyCSS",de="__shadyCSSCachedStyle";let he=null,ce=null;class pe{constructor(){this.customStyles=[],this.enqueued=!1,ae(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&ce&&(this.enqueued=!0,ae(ce))}addCustomStyle(t){t[le]||(t[le]=!0,this.customStyles.push(t),this.enqueueDocumentValidation())}getStyleForCustomStyle(t){if(t[de])return t[de];let e;return e=t.getStyle?t.getStyle():t}processStyles(){const t=this.customStyles;for(let e=0;e<t.length;e++){const i=t[e];if(i[de])continue;const s=this.getStyleForCustomStyle(i);if(s){const t=s.__appliedElement||s;he&&he(t),i[de]=t}}return t}}pe.prototype.addCustomStyle=pe.prototype.addCustomStyle,pe.prototype.getStyleForCustomStyle=pe.prototype.getStyleForCustomStyle,pe.prototype.processStyles=pe.prototype.processStyles,Object.defineProperties(pe.prototype,{transformCallback:{get:()=>he,set(t){he=t}},validateCallback:{get:()=>ce,set(t){let e=!1;ce||(e=!0),ce=t,e&&this.enqueueDocumentValidation()}}});const ue=new Jt;class fe{constructor(){this.customStyleInterface=null,ue.invalidCallback=ie}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=(t=>{ue.transformCustomStyle(t)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})}))}prepareTemplate(t,e){if(this.ensure(),$t(t))return;Kt[e]=t;let i=ue.transformTemplate(t,e);t._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let t=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let e=0;e<t.length;e++){let i=t[e],s=this.customStyleInterface.getStyleForCustomStyle(i);s&&ue.transformCustomStyle(s)}this.customStyleInterface.enqueued=!1}}styleSubtree(t,e){if(this.ensure(),e&&Ft(t,e),t.shadowRoot){this.styleElement(t);let e=t.shadowRoot.children||t.shadowRoot.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}else{let e=t.children||t.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}}styleElement(t){this.ensure();let{is:e}=function(t){let e=t.localName,i="",s="";return e?e.indexOf("-")>-1?i=e:(s=e,i=t.getAttribute&&t.getAttribute("is")||""):(i=t.is,s=t.extends),{is:i,typeExtension:s}}(t),i=Kt[e];if((!i||!$t(i))&&i&&!se(i)){(function(t){return!se(t)&&t[te]===t[Zt]})(i)||(this.prepareTemplate(i,e),function(t){t[te]=t[Zt],t._validating||(t._validating=!0,ee.then(function(){t[Qt]=t[Zt],t._validating=!1}))}(i));let s=t.shadowRoot;if(s){let t=s.querySelector("style");t&&(t.__cssRules=i._styleAst,t.textContent=Dt(i._styleAst))}}}styleDocument(t){this.ensure(),this.styleSubtree(document.body,t)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const t=new fe;let e=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(e,i,s){t.flushCustomStyles(),t.prepareTemplate(e,i)},prepareTemplateStyles(t,e,i){window.ShadyCSS.prepareTemplate(t,e,i)},prepareTemplateDom(t,e){},styleSubtree(e,i){t.flushCustomStyles(),t.styleSubtree(e,i)},styleElement(e){t.flushCustomStyles(),t.styleElement(e)},styleDocument(e){t.flushCustomStyles(),t.styleDocument(e)},getComputedStyleValue:(t,e)=>Bt(t,e),flushCustomStyles(){t.flushCustomStyles()},nativeCss:yt,nativeShadow:ut,cssBuild:_t,disableRuntime:gt},e&&(window.ShadyCSS.CustomStyleInterface=e)}window.ShadyCSS.ApplyShim=ue,window.JSCompiler_renameProperty=function(t,e){return t};let _e,me,ge=/(url\()([^)]*)(\))/g,ye=/(^\/)|(^#)|(^[\w-\d]*:)/;function be(t,e){if(t&&ye.test(t))return t;if(void 0===_e){_e=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",_e="http://a/c%20d"===t.href}catch(t){}}return e||(e=document.baseURI||window.location.href),_e?new URL(t,e).href:(me||((me=document.implementation.createHTMLDocument("temp")).base=me.createElement("base"),me.head.appendChild(me.base),me.anchor=me.createElement("a"),me.body.appendChild(me.anchor)),me.base.href=e,me.anchor.href=t,me.anchor.href||t)}function ve(t,e){return t.replace(ge,function(t,i,s,n){return i+"'"+be(s.replace(/["']/g,""),e)+"'"+n})}function we(t){return t.substring(0,t.lastIndexOf("/")+1)}const xe=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let Se=we(document.baseURI||window.location.href),Ce=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,ke=!1,Pe=!1,Ee=!1,Te=!1,Re=!1,Oe=0;const Ne=function(t){let e=t.__mixinApplications;e||(e=new WeakMap,t.__mixinApplications=e);let i=Oe++;return function(s){let n=s.__mixinSet;if(n&&n[i])return s;let r=e,o=r.get(s);o||(o=t(s),r.set(s,o));let a=Object.create(o.__mixinSet||n||null);return a[i]=!0,o.__mixinSet=a,o}};let Ae={},Ie={};function Le(t,e){Ae[t]=Ie[t.toLowerCase()]=e}function Me(t){return Ae[t]||Ie[t.toLowerCase()]}class De extends HTMLElement{static get observedAttributes(){return["id"]}static import(t,e){if(t){let i=Me(t);return i&&e?i.querySelector(e):i}return null}attributeChangedCallback(t,e,i,s){e!==i&&this.register()}get assetpath(){if(!this.__assetpath){const t=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,e=be(this.getAttribute("assetpath")||"",t.baseURI);this.__assetpath=we(e)}return this.__assetpath}register(t){if(t=t||this.id){if(Pe&&void 0!==Me(t))throw Le(t,null),new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);this.id=t,Le(t,this),(e=this).querySelector("style")&&console.warn("dom-module %s has style outside template",e.id)}var e}}De.prototype.modules=Ae,customElements.define("dom-module",De);const ze="link[rel=import][type~=css]",je="include",We="shady-unscoped";function He(t){return De.import(t)}function $e(t){const e=ve((t.body?t.body:t).textContent,t.baseURI),i=document.createElement("style");return i.textContent=e,i}function Fe(t){const e=t.trim().split(/\s+/),i=[];for(let t=0;t<e.length;t++)i.push(...Be(e[t]));return i}function Be(t){const e=He(t);if(!e)return console.warn("Could not find style data in module named",t),[];if(void 0===e._styles){const t=[];t.push(...Ve(e));const i=e.querySelector("template");i&&t.push(...qe(i,e.assetpath)),e._styles=t}return e._styles}function qe(t,e){if(!t._styles){const i=[],s=t.content.querySelectorAll("style");for(let t=0;t<s.length;t++){let n=s[t],r=n.getAttribute(je);r&&i.push(...Fe(r).filter(function(t,e,i){return i.indexOf(t)===e})),e&&(n.textContent=ve(n.textContent,e)),i.push(n)}t._styles=i}return t._styles}function Ve(t){const e=[],i=t.querySelectorAll(ze);for(let t=0;t<i.length;t++){let s=i[t];if(s.import){const t=s.import,i=s.hasAttribute(We);if(i&&!t._unscopedStyle){const e=$e(t);e.setAttribute(We,""),t._unscopedStyle=e}else t._style||(t._style=$e(t));e.push(i?t._unscopedStyle:t._style)}}return e}function Ue(t){let e=He(t);if(e&&void 0===e._cssText){let t=function(t){let e="",i=Ve(t);for(let t=0;t<i.length;t++)e+=i[t].textContent;return e}(e),i=e.querySelector("template");i&&(t+=function(t,e){let i="";const s=qe(t,e);for(let t=0;t<s.length;t++){let e=s[t];e.parentNode&&e.parentNode.removeChild(e),i+=e.textContent}return i}(i,e.assetpath)),e._cssText=t||null}return e||console.warn("Could not find style data in module named",t),e&&e._cssText||""}const Ye=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:t=>t;function Ge(t){return t.indexOf(".")>=0}function Xe(t){let e=t.indexOf(".");return-1===e?t:t.slice(0,e)}function Je(t,e){return 0===t.indexOf(e+".")}function Ke(t,e){return 0===e.indexOf(t+".")}function Qe(t,e,i){return e+i.slice(t.length)}function Ze(t){if(Array.isArray(t)){let e=[];for(let i=0;i<t.length;i++){let s=t[i].toString().split(".");for(let t=0;t<s.length;t++)e.push(s[t])}return e.join(".")}return t}function ti(t){return Array.isArray(t)?Ze(t).split("."):t.toString().split(".")}function ei(t,e,i){let s=t,n=ti(e);for(let t=0;t<n.length;t++){if(!s)return;s=s[n[t]]}return i&&(i.path=n.join(".")),s}function ii(t,e,i){let s=t,n=ti(e),r=n[n.length-1];if(n.length>1){for(let t=0;t<n.length-1;t++){if(!(s=s[n[t]]))return}s[r]=i}else s[e]=i;return n.join(".")}const si={},ni=/-[a-z]/g,ri=/([A-Z])/g;function oi(t){return si[t]||(si[t]=t.indexOf("-")<0?t:t.replace(ni,t=>t[1].toUpperCase()))}function ai(t){return si[t]||(si[t]=t.replace(ri,"-$1").toLowerCase())}let li=0,di=0,hi=[],ci=0,pi=document.createTextNode("");new window.MutationObserver(function(){const t=hi.length;for(let e=0;e<t;e++){let t=hi[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}hi.splice(0,t),di+=t}).observe(pi,{characterData:!0});const ui={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},fi={run:t=>window.requestAnimationFrame(t),cancel(t){window.cancelAnimationFrame(t)}},_i={run:t=>(pi.textContent=ci++,hi.push(t),li++),cancel(t){const e=t-di;if(e>=0){if(!hi[e])throw new Error("invalid async handle: "+t);hi[e]=null}}},mi=_i,gi=Ne(t=>{return class extends t{static createProperties(t){const e=this.prototype;for(let i in t)i in e||e._createPropertyAccessor(i)}static attributeNameForProperty(t){return t.toLowerCase()}static typeForProperty(t){}_createPropertyAccessor(t,e){this._addPropertyToAttributeMap(t),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[t]||(this.__dataHasAccessor[t]=!0,this._definePropertyAccessor(t,e))}_addPropertyToAttributeMap(t){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[t]){const e=this.constructor.attributeNameForProperty(t);this.__dataAttributes[e]=t}}_definePropertyAccessor(t,e){Object.defineProperty(this,t,{get(){return this._getProperty(t)},set:e?function(){}:function(e){this._setProperty(t,e)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let t in this.__dataHasAccessor)this.hasOwnProperty(t)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[t]=this[t],delete this[t])}_initializeInstanceProperties(t){Object.assign(this,t)}_setProperty(t,e){this._setPendingProperty(t,e)&&this._invalidateProperties()}_getProperty(t){return this.__data[t]}_setPendingProperty(t,e,i){let s=this.__data[t],n=this._shouldPropertyChange(t,e,s);return n&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||t in this.__dataOld||(this.__dataOld[t]=s),this.__data[t]=e,this.__dataPending[t]=e),n}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,mi.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const t=this.__data,e=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(t,e,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(t,e,i))}_shouldPropertiesChange(t,e,i){return Boolean(e)}_propertiesChanged(t,e,i){}_shouldPropertyChange(t,e,i){return i!==e&&(i==i||e==e)}attributeChangedCallback(t,e,i,s){e!==i&&this._attributeToProperty(t,i),super.attributeChangedCallback&&super.attributeChangedCallback(t,e,i,s)}_attributeToProperty(t,e,i){if(!this.__serializing){const s=this.__dataAttributes,n=s&&s[t]||t;this[n]=this._deserializeValue(e,i||this.constructor.typeForProperty(n))}}_propertyToAttribute(t,e,i){this.__serializing=!0,i=arguments.length<3?this[t]:i,this._valueToNodeAttribute(this,i,e||this.constructor.attributeNameForProperty(t)),this.__serializing=!1}_valueToNodeAttribute(t,e,i){const s=this._serializeValue(e);void 0===s?t.removeAttribute(i):("class"!==i&&"name"!==i&&"slot"!==i||(t=Ye(t)),t.setAttribute(i,s))}_serializeValue(t){switch(typeof t){case"boolean":return t?"":void 0;default:return null!=t?t.toString():void 0}}_deserializeValue(t,e){switch(e){case Boolean:return null!==t;case Number:return Number(t);default:return t}}}}),yi={};let bi=HTMLElement.prototype;for(;bi;){let t=Object.getOwnPropertyNames(bi);for(let e=0;e<t.length;e++)yi[t[e]]=!0;bi=Object.getPrototypeOf(bi)}const vi=Ne(t=>{const e=gi(t);return class extends e{static createPropertiesForAttributes(){let t=this.observedAttributes;for(let e=0;e<t.length;e++)this.prototype._createPropertyAccessor(oi(t[e]))}static attributeNameForProperty(t){return ai(t)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(t){for(let e in t)this._setProperty(e,t[e])}_ensureAttribute(t,e){const i=this;i.hasAttribute(t)||this._valueToNodeAttribute(i,e,t)}_serializeValue(t){switch(typeof t){case"object":if(t instanceof Date)return t.toString();if(t)try{return JSON.stringify(t)}catch(t){return""}default:return super._serializeValue(t)}}_deserializeValue(t,e){let i;switch(e){case Object:try{i=JSON.parse(t)}catch(e){i=t}break;case Array:try{i=JSON.parse(t)}catch(e){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)}break;case Date:i=isNaN(t)?String(t):Number(t),i=new Date(i);break;default:i=super._deserializeValue(t,e)}return i}_definePropertyAccessor(t,e){!function(t,e){if(!yi[e]){let i=t[e];void 0!==i&&(t.__data?t._setPendingProperty(e,i):(t.__dataProto?t.hasOwnProperty(JSCompiler_renameProperty("__dataProto",t))||(t.__dataProto=Object.create(t.__dataProto)):t.__dataProto={},t.__dataProto[e]=i))}}(this,t),super._definePropertyAccessor(t,e)}_hasAccessor(t){return this.__dataHasAccessor&&this.__dataHasAccessor[t]}_isPropertyPending(t){return Boolean(this.__dataPending&&t in this.__dataPending)}}}),wi=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),xi={"dom-if":!0,"dom-repeat":!0};function Si(t){let e=t.getAttribute("is");if(e&&xi[e]){let i=t;for(i.removeAttribute("is"),t=i.ownerDocument.createElement(e),i.parentNode.replaceChild(t,i),t.appendChild(i);i.attributes.length;)t.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return t}function Ci(t,e){let i=e.parentInfo&&Ci(t,e.parentInfo);if(!i)return t;wi.currentNode=i;for(let t=wi.firstChild(),i=0;t;t=wi.nextSibling())if(e.parentIndex===i++)return t}function ki(t,e,i,s){s.id&&(e[s.id]=i)}function Pi(t,e,i){if(i.events&&i.events.length)for(let s,n=0,r=i.events;n<r.length&&(s=r[n]);n++)t._addMethodEventListenerToNode(e,s.name,s.value,t)}function Ei(t,e,i){i.templateInfo&&(e._templateInfo=i.templateInfo)}const Ti=Ne(t=>{return class extends t{static _parseTemplate(t,e){if(!t._templateInfo){let i=t._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=e&&e.stripWhiteSpace||t.hasAttribute("strip-whitespace"),this._parseTemplateContent(t,i,{parent:null})}return t._templateInfo}static _parseTemplateContent(t,e,i){return this._parseTemplateNode(t.content,e,i)}static _parseTemplateNode(t,e,i){let s,n=t;return"template"!=n.localName||n.hasAttribute("preserve-content")?"slot"===n.localName&&(e.hasInsertionPoint=!0):s=this._parseTemplateNestedTemplate(n,e,i)||s,wi.currentNode=n,wi.firstChild()&&(s=this._parseTemplateChildNodes(n,e,i)||s),n.hasAttributes&&n.hasAttributes()&&(s=this._parseTemplateNodeAttributes(n,e,i)||s),s}static _parseTemplateChildNodes(t,e,i){if("script"!==t.localName&&"style"!==t.localName){wi.currentNode=t;for(let s,n=wi.firstChild(),r=0;n;n=s){if("template"==n.localName&&(n=Si(n)),wi.currentNode=n,s=wi.nextSibling(),n.nodeType===Node.TEXT_NODE){let i=s;for(;i&&i.nodeType===Node.TEXT_NODE;)n.textContent+=i.textContent,s=wi.nextSibling(),t.removeChild(i),i=s;if(e.stripWhiteSpace&&!n.textContent.trim()){t.removeChild(n);continue}}let o={parentIndex:r,parentInfo:i};this._parseTemplateNode(n,e,o)&&(o.infoIndex=e.nodeInfoList.push(o)-1),wi.currentNode=n,wi.parentNode()&&r++}}}static _parseTemplateNestedTemplate(t,e,i){let s=this._parseTemplate(t,e);return(s.content=t.content.ownerDocument.createDocumentFragment()).appendChild(t.content),i.templateInfo=s,!0}static _parseTemplateNodeAttributes(t,e,i){let s=!1,n=Array.from(t.attributes);for(let r,o=n.length-1;r=n[o];o--)s=this._parseTemplateNodeAttribute(t,e,i,r.name,r.value)||s;return s}static _parseTemplateNodeAttribute(t,e,i,s,n){return"on-"===s.slice(0,3)?(t.removeAttribute(s),i.events=i.events||[],i.events.push({name:s.slice(3),value:n}),!0):"id"===s&&(i.id=n,!0)}static _contentForTemplate(t){let e=t._templateInfo;return e&&e.content||t.content}_stampTemplate(t){t&&!t.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(t);let e=this.constructor._parseTemplate(t),i=e.nodeInfoList,s=e.content||t.content,n=document.importNode(s,!0);n.__noInsertionPoint=!e.hasInsertionPoint;let r=n.nodeList=new Array(i.length);n.$={};for(let t,e=0,s=i.length;e<s&&(t=i[e]);e++){let i=r[e]=Ci(n,t);ki(0,n.$,i,t),Ei(0,i,t),Pi(this,i,t)}return n=n}_addMethodEventListenerToNode(t,e,i,s){let n=function(t,e,i){return t=t._methodHost||t,function(e){t[i]?t[i](e,e.detail):console.warn("listener method `"+i+"` not defined")}}(s=s||t,0,i);return this._addEventListenerToNode(t,e,n),n}_addEventListenerToNode(t,e,i){t.addEventListener(e,i)}_removeEventListenerFromNode(t,e,i){t.removeEventListener(e,i)}}});let Ri=0;const Oi={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Ni=/[A-Z]/;function Ai(t,e){let i=t[e];if(i){if(!t.hasOwnProperty(e)){i=t[e]=Object.create(t[e]);for(let t in i){let e=i[t],s=i[t]=Array(e.length);for(let t=0;t<e.length;t++)s[t]=e[t]}}}else i=t[e]={};return i}function Ii(t,e,i,s,n,r){if(e){let o=!1,a=Ri++;for(let l in i)Li(t,e,a,l,i,s,n,r)&&(o=!0);return o}return!1}function Li(t,e,i,s,n,r,o,a){let l=!1,d=e[o?Xe(s):s];if(d)for(let e,h=0,c=d.length;h<c&&(e=d[h]);h++)e.info&&e.info.lastRun===i||o&&!Mi(s,e.trigger)||(e.info&&(e.info.lastRun=i),e.fn(t,s,n,r,e.info,o,a),l=!0);return l}function Mi(t,e){if(e){let i=e.name;return i==t||!(!e.structured||!Je(i,t))||!(!e.wildcard||!Ke(i,t))}return!0}function Di(t,e,i,s,n){let r="string"==typeof n.method?t[n.method]:n.method,o=n.property;r?r.call(t,t.__data[o],s[o]):n.dynamicFn||console.warn("observer method `"+n.method+"` not defined")}function zi(t,e,i){let s=Xe(e);if(s!==e){return ji(t,ai(s)+"-changed",i[e],e),!0}return!1}function ji(t,e,i,s){let n={value:i,queueProperty:!0};s&&(n.path=s),Ye(t).dispatchEvent(new CustomEvent(e,{detail:n}))}function Wi(t,e,i,s,n,r){let o=(r?Xe(e):e)!=e?e:null,a=o?ei(t,o):t.__data[e];o&&void 0===a&&(a=i[e]),ji(t,n.eventName,a,o)}function Hi(t,e,i,s,n){let r=t.__data[e];Ce&&(r=Ce(r,n.attrName,"attribute",t)),t._propertyToAttribute(e,n.attrName,r)}function $i(t,e,i,s,n){let r=Gi(t,e,i,s,n),o=n.methodInfo;t.__dataHasAccessor&&t.__dataHasAccessor[o]?t._setPendingProperty(o,r,!0):t[o]=r}function Fi(t,e,i,s,n,r,o){i.bindings=i.bindings||[];let a={kind:s,target:n,parts:r,literal:o,isCompound:1!==r.length};if(i.bindings.push(a),function(t){return Boolean(t.target)&&"attribute"!=t.kind&&"text"!=t.kind&&!t.isCompound&&"{"===t.parts[0].mode}(a)){let{event:t,negate:e}=a.parts[0];a.listenerEvent=t||ai(n)+"-changed",a.listenerNegate=e}let l=e.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let s=a.parts[i];s.compoundIndex=i,Bi(t,e,a,s,l)}}function Bi(t,e,i,s,n){if(!s.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let r=s.dependencies,o={index:n,binding:i,part:s,evaluator:t};for(let i=0;i<r.length;i++){let s=r[i];"string"==typeof s&&((s=Zi(s)).wildcard=!0),t._addTemplatePropertyEffect(e,s.rootProperty,{fn:qi,info:o,trigger:s})}}}function qi(t,e,i,s,n,r,o){let a=o[n.index],l=n.binding,d=n.part;if(r&&d.source&&e.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let s=i[e];e=Qe(d.source,l.target,e),a._setPendingPropertyOrPath(e,s,!1,!0)&&t._enqueueClient(a)}else{!function(t,e,i,s,n){n=function(t,e,i,s){if(i.isCompound){let n=t.__dataCompoundStorage[i.target];n[s.compoundIndex]=e,e=n.join("")}return"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==t.localName&&"textarea"!==t.localName)||(e=null==e?"":e)),e}(e,n,i,s),Ce&&(n=Ce(n,i.target,i.kind,e));if("attribute"==i.kind)t._valueToNodeAttribute(e,n,i.target);else{let s=i.target;e.__isPropertyEffectsClient&&e.__dataHasAccessor&&e.__dataHasAccessor[s]?e[Oi.READ_ONLY]&&e[Oi.READ_ONLY][s]||e._setPendingProperty(s,n)&&t._enqueueClient(e):t._setUnmanagedPropertyToNode(e,s,n)}}(t,a,l,d,n.evaluator._evaluateBinding(t,d,e,i,s,r))}}function Vi(t,e){if(e.isCompound){let i=t.__dataCompoundStorage||(t.__dataCompoundStorage={}),s=e.parts,n=new Array(s.length);for(let t=0;t<s.length;t++)n[t]=s[t].literal;let r=e.target;i[r]=n,e.literal&&"property"==e.kind&&(t[r]=e.literal)}}function Ui(t,e,i){if(i.listenerEvent){let s=i.parts[0];t.addEventListener(i.listenerEvent,function(t){!function(t,e,i,s,n){let r,o=t.detail,a=o&&o.path;a?(s=Qe(i,s,a),r=o&&o.value):r=t.currentTarget[i],r=n?!r:r,e[Oi.READ_ONLY]&&e[Oi.READ_ONLY][s]||!e._setPendingPropertyOrPath(s,r,!0,Boolean(a))||o&&o.queueProperty||e._invalidateProperties()}(t,e,i.target,s.source,s.negate)})}}function Yi(t,e,i,s,n,r){r=e.static||r&&("object"!=typeof r||r[e.methodName]);let o={methodName:e.methodName,args:e.args,methodInfo:n,dynamicFn:r};for(let n,r=0;r<e.args.length&&(n=e.args[r]);r++)n.literal||t._addPropertyEffect(n.rootProperty,i,{fn:s,info:o,trigger:n});r&&t._addPropertyEffect(e.methodName,i,{fn:s,info:o})}function Gi(t,e,i,s,n){let r=t._methodHost||t,o=r[n.methodName];if(o){let s=t._marshalArgs(n.args,e,i);return o.apply(r,s)}n.dynamicFn||console.warn("method `"+n.methodName+"` not defined")}const Xi=[],Ji=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function Ki(t){let e="";for(let i=0;i<t.length;i++){e+=t[i].literal||""}return e}function Qi(t){let e=t.match(/([^\s]+?)\(([\s\S]*)\)/);if(e){let t={methodName:e[1],static:!0,args:Xi};if(e[2].trim()){return function(t,e){return e.args=t.map(function(t){let i=Zi(t);return i.literal||(e.static=!1),i},this),e}(e[2].replace(/\\,/g,"&comma;").split(","),t)}return t}return null}function Zi(t){let e=t.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:e,value:"",literal:!1},s=e[0];switch("-"===s&&(s=e[1]),s>="0"&&s<="9"&&(s="#"),s){case"'":case'"':i.value=e.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(e),i.literal=!0}return i.literal||(i.rootProperty=Xe(e),i.structured=Ge(e),i.structured&&(i.wildcard=".*"==e.slice(-2),i.wildcard&&(i.name=e.slice(0,-2)))),i}function ts(t,e,i){let s=ei(t,i);return void 0===s&&(s=e[i]),s}function es(t,e,i,s){t.notifyPath(i+".splices",{indexSplices:s}),t.notifyPath(i+".length",e.length)}function is(t,e,i,s,n,r){es(t,e,i,[{index:s,addedCount:n,removed:r,object:e,type:"splice"}])}const ss=Ne(t=>{const e=Ti(vi(t));return class extends e{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return Oi}_initializeProperties(){super._initializeProperties(),ns.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(t){this.__data=Object.create(t),this.__dataPending=Object.create(t),this.__dataOld={}}_initializeInstanceProperties(t){let e=this[Oi.READ_ONLY];for(let i in t)e&&e[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=t[i])}_addPropertyEffect(t,e,i){this._createPropertyAccessor(t,e==Oi.READ_ONLY);let s=Ai(this,e)[t];s||(s=this[e][t]=[]),s.push(i)}_removePropertyEffect(t,e,i){let s=Ai(this,e)[t],n=s.indexOf(i);n>=0&&s.splice(n,1)}_hasPropertyEffect(t,e){let i=this[e];return Boolean(i&&i[t])}_hasReadOnlyEffect(t){return this._hasPropertyEffect(t,Oi.READ_ONLY)}_hasNotifyEffect(t){return this._hasPropertyEffect(t,Oi.NOTIFY)}_hasReflectEffect(t){return this._hasPropertyEffect(t,Oi.REFLECT)}_hasComputedEffect(t){return this._hasPropertyEffect(t,Oi.COMPUTE)}_setPendingPropertyOrPath(t,e,i,s){if(s||Xe(Array.isArray(t)?t[0]:t)!==t){if(!s){let i=ei(this,t);if(!(t=ii(this,t,e))||!super._shouldPropertyChange(t,e,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(t,e,i))return function(t,e,i){let s=t.__dataLinkedPaths;if(s){let n;for(let r in s){let o=s[r];Ke(r,e)?(n=Qe(r,o,e),t._setPendingPropertyOrPath(n,i,!0,!0)):Ke(o,e)&&(n=Qe(o,r,e),t._setPendingPropertyOrPath(n,i,!0,!0))}}}(this,t,e),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[t])return this._setPendingProperty(t,e,i);this[t]=e}return!1}_setUnmanagedPropertyToNode(t,e,i){i===t[e]&&"object"!=typeof i||(t[e]=i)}_setPendingProperty(t,e,i){let s=this.__dataHasPaths&&Ge(t),n=s?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(t,e,n[t])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),t in this.__dataOld||(this.__dataOld[t]=this.__data[t]),s?this.__dataTemp[t]=e:this.__data[t]=e,this.__dataPending[t]=e,(s||this[Oi.NOTIFY]&&this[Oi.NOTIFY][t])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[t]=i),!0)}_setProperty(t,e){this._setPendingProperty(t,e,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(t){this.__dataPendingClients=this.__dataPendingClients||[],t!==this&&this.__dataPendingClients.push(t)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let t=this.__dataPendingClients;if(t){this.__dataPendingClients=null;for(let e=0;e<t.length;e++){let i=t[e];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(t,e){for(let i in t)!e&&this[Oi.READ_ONLY]&&this[Oi.READ_ONLY][i]||this._setPendingPropertyOrPath(i,t[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(t,e,i){let s=this.__dataHasPaths;this.__dataHasPaths=!1,function(t,e,i,s){let n=t[Oi.COMPUTE];if(n){let r=e;for(;Ii(t,n,r,i,s);)Object.assign(i,t.__dataOld),Object.assign(e,t.__dataPending),r=t.__dataPending,t.__dataPending=null}}(this,e,i,s);let n=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(e,i,s),this._flushClients(),Ii(this,this[Oi.REFLECT],e,i,s),Ii(this,this[Oi.OBSERVE],e,i,s),n&&function(t,e,i,s,n){let r,o,a=t[Oi.NOTIFY],l=Ri++;for(let o in e)e[o]&&(a&&Li(t,a,l,o,i,s,n)?r=!0:n&&zi(t,o,i)&&(r=!0));r&&(o=t.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,n,e,i,s),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(t,e,i){this[Oi.PROPAGATE]&&Ii(this,this[Oi.PROPAGATE],t,e,i);let s=this.__templateInfo;for(;s;)Ii(this,s.propertyEffects,t,e,i,s.nodeList),s=s.nextTemplateInfo}linkPaths(t,e){t=Ze(t),e=Ze(e),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[t]=e}unlinkPaths(t){t=Ze(t),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[t]}notifySplices(t,e){let i={path:""};es(this,ei(this,t,i),i.path,e)}get(t,e){return ei(e||this,t)}set(t,e,i){i?ii(i,t,e):this[Oi.READ_ONLY]&&this[Oi.READ_ONLY][t]||this._setPendingPropertyOrPath(t,e,!0)&&this._invalidateProperties()}push(t,...e){let i={path:""},s=ei(this,t,i),n=s.length,r=s.push(...e);return e.length&&is(this,s,i.path,n,e.length,[]),r}pop(t){let e={path:""},i=ei(this,t,e),s=Boolean(i.length),n=i.pop();return s&&is(this,i,e.path,i.length,0,[n]),n}splice(t,e,i,...s){let n,r={path:""},o=ei(this,t,r);return e<0?e=o.length-Math.floor(-e):e&&(e=Math.floor(e)),n=2===arguments.length?o.splice(e):o.splice(e,i,...s),(s.length||n.length)&&is(this,o,r.path,e,s.length,n),n}shift(t){let e={path:""},i=ei(this,t,e),s=Boolean(i.length),n=i.shift();return s&&is(this,i,e.path,0,0,[n]),n}unshift(t,...e){let i={path:""},s=ei(this,t,i),n=s.unshift(...e);return e.length&&is(this,s,i.path,0,e.length,[]),n}notifyPath(t,e){let i;if(1==arguments.length){let s={path:""};e=ei(this,t,s),i=s.path}else i=Array.isArray(t)?Ze(t):t;this._setPendingPropertyOrPath(i,e,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(t,e){var i;this._addPropertyEffect(t,Oi.READ_ONLY),e&&(this["_set"+(i=t,i[0].toUpperCase()+i.substring(1))]=function(e){this._setProperty(t,e)})}_createPropertyObserver(t,e,i){let s={property:t,method:e,dynamicFn:Boolean(i)};this._addPropertyEffect(t,Oi.OBSERVE,{fn:Di,info:s,trigger:{name:t}}),i&&this._addPropertyEffect(e,Oi.OBSERVE,{fn:Di,info:s,trigger:{name:e}})}_createMethodObserver(t,e){let i=Qi(t);if(!i)throw new Error("Malformed observer expression '"+t+"'");Yi(this,i,Oi.OBSERVE,Gi,null,e)}_createNotifyingProperty(t){this._addPropertyEffect(t,Oi.NOTIFY,{fn:Wi,info:{eventName:ai(t)+"-changed",property:t}})}_createReflectedProperty(t){let e=this.constructor.attributeNameForProperty(t);"-"===e[0]?console.warn("Property "+t+" cannot be reflected to attribute "+e+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(t,Oi.REFLECT,{fn:Hi,info:{attrName:e}})}_createComputedProperty(t,e,i){let s=Qi(e);if(!s)throw new Error("Malformed computed expression '"+e+"'");Yi(this,s,Oi.COMPUTE,$i,t,i)}_marshalArgs(t,e,i){const s=this.__data,n=[];for(let r=0,o=t.length;r<o;r++){let{name:o,structured:a,wildcard:l,value:d,literal:h}=t[r];if(!h)if(l){const t=Ke(o,e),n=ts(s,i,t?e:o);d={path:t?e:o,value:n,base:t?ei(s,o):n}}else d=a?ts(s,i,o):s[o];n[r]=d}return n}static addPropertyEffect(t,e,i){this.prototype._addPropertyEffect(t,e,i)}static createPropertyObserver(t,e,i){this.prototype._createPropertyObserver(t,e,i)}static createMethodObserver(t,e){this.prototype._createMethodObserver(t,e)}static createNotifyingProperty(t){this.prototype._createNotifyingProperty(t)}static createReadOnlyProperty(t,e){this.prototype._createReadOnlyProperty(t,e)}static createReflectedProperty(t){this.prototype._createReflectedProperty(t)}static createComputedProperty(t,e,i){this.prototype._createComputedProperty(t,e,i)}static bindTemplate(t){return this.prototype._bindTemplate(t)}_bindTemplate(t,e){let i=this.constructor._parseTemplate(t),s=this.__templateInfo==i;if(!s)for(let t in i.propertyEffects)this._createPropertyAccessor(t);if(e&&((i=Object.create(i)).wasPreBound=s,!s&&this.__templateInfo)){let t=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=t.nextTemplateInfo=i,i.previousTemplateInfo=t,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(t,e,i){(t.hostProps=t.hostProps||{})[e]=!0;let s=t.propertyEffects=t.propertyEffects||{};(s[e]=s[e]||[]).push(i)}_stampTemplate(t){ns.beginHosting(this);let e=super._stampTemplate(t);ns.endHosting(this);let i=this._bindTemplate(t,!0);if(i.nodeList=e.nodeList,!i.wasPreBound){let t=i.childNodes=[];for(let i=e.firstChild;i;i=i.nextSibling)t.push(i)}return e.templateInfo=i,function(t,e){let{nodeList:i,nodeInfoList:s}=e;if(s.length)for(let e=0;e<s.length;e++){let n=s[e],r=i[e],o=n.bindings;if(o)for(let e=0;e<o.length;e++){let i=o[e];Vi(r,i),Ui(r,t,i)}r.__dataHost=t}}(this,i),this.__dataReady&&Ii(this,i.propertyEffects,this.__data,null,!1,i.nodeList),e}_removeBoundDom(t){let e=t.templateInfo;e.previousTemplateInfo&&(e.previousTemplateInfo.nextTemplateInfo=e.nextTemplateInfo),e.nextTemplateInfo&&(e.nextTemplateInfo.previousTemplateInfo=e.previousTemplateInfo),this.__templateInfoLast==e&&(this.__templateInfoLast=e.previousTemplateInfo),e.previousTemplateInfo=e.nextTemplateInfo=null;let i=e.childNodes;for(let t=0;t<i.length;t++){let e=i[t];e.parentNode.removeChild(e)}}static _parseTemplateNode(t,e,i){let s=super._parseTemplateNode(t,e,i);if(t.nodeType===Node.TEXT_NODE){let n=this._parseBindings(t.textContent,e);n&&(t.textContent=Ki(n)||" ",Fi(this,e,i,"text","textContent",n),s=!0)}return s}static _parseTemplateNodeAttribute(t,e,i,s,n){let r=this._parseBindings(n,e);if(r){let n=s,o="property";Ni.test(s)?o="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),o="attribute");let a=Ki(r);return a&&"attribute"==o&&("class"==s&&t.hasAttribute("class")&&(a+=" "+t.getAttribute(s)),t.setAttribute(s,a)),"input"===t.localName&&"value"===n&&t.setAttribute(n,""),t.removeAttribute(n),"property"===o&&(s=oi(s)),Fi(this,e,i,o,s,r,a),!0}return super._parseTemplateNodeAttribute(t,e,i,s,n)}static _parseTemplateNestedTemplate(t,e,i){let s=super._parseTemplateNestedTemplate(t,e,i),n=i.templateInfo.hostProps;for(let t in n)Fi(this,e,i,"property","_host_"+t,[{mode:"{",source:t,dependencies:[t]}]);return s}static _parseBindings(t,e){let i,s=[],n=0;for(;null!==(i=Ji.exec(t));){i.index>n&&s.push({literal:t.slice(n,i.index)});let r=i[1][0],o=Boolean(i[2]),a=i[3].trim(),l=!1,d="",h=-1;"{"==r&&(h=a.indexOf("::"))>0&&(d=a.substring(h+2),a=a.substring(0,h),l=!0);let c=Qi(a),p=[];if(c){let{args:t,methodName:i}=c;for(let e=0;e<t.length;e++){let i=t[e];i.literal||p.push(i)}let s=e.dynamicFns;(s&&s[i]||c.static)&&(p.push(i),c.dynamicFn=!0)}else p.push(a);s.push({source:a,mode:r,negate:o,customEvent:l,signature:c,dependencies:p,event:d}),n=Ji.lastIndex}if(n&&n<t.length){let e=t.substring(n);e&&s.push({literal:e})}return s.length?s:null}static _evaluateBinding(t,e,i,s,n,r){let o;return o=e.signature?Gi(t,i,s,0,e.signature):i!=e.source?ei(t,e.source):r&&Ge(i)?ei(t,i):t.__data[i],e.negate&&(o=!o),o}}});const ns=new class{constructor(){this.stack=[]}registerHost(t){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(t)}beginHosting(t){this.stack.push(t)}endHosting(t){let e=this.stack.length;e&&this.stack[e-1]==t&&this.stack.pop()}};const rs=Ne(t=>{const e=gi(t);function i(t){const e=Object.getPrototypeOf(t);return e.prototype instanceof n?e:null}function s(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",t))){let e=null;if(t.hasOwnProperty(JSCompiler_renameProperty("properties",t))){const i=t.properties;i&&(e=function(t){const e={};for(let i in t){const s=t[i];e[i]="function"==typeof s?{type:s}:s}return e}(i))}t.__ownProperties=e}return t.__ownProperties}class n extends e{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){this.prototype;const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(t=>this.attributeNameForProperty(t)):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const t=i(this);t&&t.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const t=s(this);t&&this.createProperties(t)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const t=i(this);this.__properties=Object.assign({},t&&t._properties,s(this))}return this.__properties}static typeForProperty(t){const e=this._properties[t];return e&&e.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return n}),os="3.2.0",as=window.ShadyCSS&&window.ShadyCSS.cssBuild,ls=Ne(t=>{const e=rs(ss(t));function i(t,e,i,s){if(!as){const n=e.content.querySelectorAll("style"),r=qe(e),o=function(t){let e=He(t);return e?Ve(e):[]}(i),a=e.content.firstElementChild;for(let i=0;i<o.length;i++){let n=o[i];n.textContent=t._processStyleText(n.textContent,s),e.content.insertBefore(n,a)}let l=0;for(let e=0;e<r.length;e++){let i=r[e],o=n[l];o!==i?(i=i.cloneNode(!0),o.parentNode.insertBefore(i,o)):l++,i.textContent=t._processStyleText(i.textContent,s)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(e,i)}return class extends e{static get polymerElementVersion(){return os}static _finalizeClass(){super._finalizeClass();const t=((e=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",e))||(e.__ownObservers=e.hasOwnProperty(JSCompiler_renameProperty("observers",e))?e.observers:null),e.__ownObservers);var e;t&&this.createObservers(t,this._properties),this._prepareTemplate()}static _prepareTemplate(){let t=this.template;t&&("string"==typeof t?(console.error("template getter must return HTMLTemplateElement"),t=null):Te||(t=t.cloneNode(!0))),this.prototype._template=t}static createProperties(t){for(let r in t)e=this.prototype,i=r,s=t[r],n=t,s.computed&&(s.readOnly=!0),s.computed&&(e._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):e._createComputedProperty(i,s.computed,n)),s.readOnly&&!e._hasReadOnlyEffect(i)?e._createReadOnlyProperty(i,!s.computed):!1===s.readOnly&&e._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),s.reflectToAttribute&&!e._hasReflectEffect(i)?e._createReflectedProperty(i):!1===s.reflectToAttribute&&e._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),s.notify&&!e._hasNotifyEffect(i)?e._createNotifyingProperty(i):!1===s.notify&&e._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),s.observer&&e._createPropertyObserver(i,s.observer,n[s.observer]),e._addPropertyToAttributeMap(i);var e,i,s,n}static createObservers(t,e){const i=this.prototype;for(let s=0;s<t.length;s++)i._createMethodObserver(t[s],e)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(t){let e=null;if(t&&(!Pe||Ee)&&(e=De.import(t,"template"),Pe&&!e))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);return e}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(t){this._template=t}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const t=this.importMeta;if(t)this._importPath=we(t.url);else{const t=De.import(this.is);this._importPath=t&&t.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=Se,this.importPath=this.constructor.importPath;let t=function(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",t))){t.__propertyDefaults=null;let e=t._properties;for(let i in e){let s=e[i];"value"in s&&(t.__propertyDefaults=t.__propertyDefaults||{},t.__propertyDefaults[i]=s)}}return t.__propertyDefaults}(this.constructor);if(t)for(let e in t){let i=t[e];if(!this.hasOwnProperty(e)){let t="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(e)?this._setPendingProperty(e,t,!0):this[e]=t}}}static _processStyleText(t,e){return ve(t,e)}static _finalizeTemplate(t){const e=this.prototype._template;if(e&&!e.__polymerFinalized){e.__polymerFinalized=!0;const s=this.importPath;i(this,e,t,s?be(s):""),this.prototype._bindTemplate(e)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(t){const e=Ye(this);if(e.attachShadow)return t?(e.shadowRoot||e.attachShadow({mode:"open"}),e.shadowRoot.appendChild(t),Re&&window.ShadyDOM&&ShadyDOM.flushInitial(e.shadowRoot),e.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(t){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,t)}resolveUrl(t,e){return!e&&this.importPath&&(e=be(this.importPath)),be(t,e)}static _parseTemplateContent(t,e,i){return e.dynamicFns=e.dynamicFns||this._properties,super._parseTemplateContent(t,e,i)}static _addTemplatePropertyEffect(t,e,i){return!Te||e in this._properties||console.warn(`Property '${e}' used in template but not declared in 'properties'; `+"attribute will not be observed."),super._addTemplatePropertyEffect(t,e,i)}}});class ds{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,hs.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),hs.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,i){return t instanceof ds?t._cancelAsync():t=new ds,t.setConfig(e,i),t}}let hs=new Set;const cs=function(t){hs.add(t)},ps=function(){const t=Boolean(hs.size);return hs.forEach(t=>{try{t.flush()}catch(t){setTimeout(()=>{throw t})}}),t};let us="string"==typeof document.head.style.touchAction,fs="__polymerGestures",_s="__polymerGesturesHandled",ms="__polymerGesturesTouchAction",gs=25,ys=5,bs=2500,vs=["mousedown","mousemove","mouseup","click"],ws=[0,1,4,2],xs=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function Ss(t){return vs.indexOf(t)>-1}let Cs=!1;function ks(t){if(!Ss(t)&&"touchend"!==t)return us&&Cs&&ke?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){Cs=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let Ps=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Es=[],Ts={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Rs={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Os(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let i=t.getRootNode();if(t.id){let s=i.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<s.length;t++)e.push(s[t])}}return e}let Ns=function(t){let e=t.sourceCapabilities;var i;if((!e||e.firesTouchEvents)&&(t[_s]={skip:!0},"click"===t.type)){let e=!1,s=zs(t);for(let t=0;t<s.length;t++){if(s[t].nodeType===Node.ELEMENT_NODE)if("label"===s[t].localName)Es.push(s[t]);else if(i=s[t],Ts[i.localName]){let i=Os(s[t]);for(let t=0;t<i.length;t++)e=e||Es.indexOf(i[t])>-1}if(s[t]===Ls.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function As(t){let e=Ps?["click"]:vs;for(let i,s=0;s<e.length;s++)i=e[s],t?(Es.length=0,document.addEventListener(i,Ns,!0)):document.removeEventListener(i,Ns,!0)}function Is(t){let e=t.type;if(!Ss(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!xs&&(e=ws[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let Ls={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Ms(t,e,i){t.movefn=e,t.upfn=i,document.addEventListener("mousemove",e),document.addEventListener("mouseup",i)}function Ds(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){Ls.mouse.mouseIgnoreJob||As(!0),Ls.mouse.target=zs(t)[0],Ls.mouse.mouseIgnoreJob=ds.debounce(Ls.mouse.mouseIgnoreJob,ui.after(bs),function(){As(),Ls.mouse.target=null,Ls.mouse.mouseIgnoreJob=null})},!!Cs&&{passive:!0});const zs=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],js={},Ws=[];function Hs(t){const e=zs(t);return e.length>0?e[0]:t.target}function $s(t){let e,i=t.type,s=t.currentTarget[fs];if(!s)return;let n=s[i];if(n){if(!t[_s]&&(t[_s]={},"touch"===i.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===i&&1===t.touches.length&&(Ls.touch.id=e.identifier),Ls.touch.id!==e.identifier)return;us||"touchstart"!==i&&"touchmove"!==i||function(t){let e=t.changedTouches[0],i=t.type;if("touchstart"===i)Ls.touch.x=e.clientX,Ls.touch.y=e.clientY,Ls.touch.scrollDecided=!1;else if("touchmove"===i){if(Ls.touch.scrollDecided)return;Ls.touch.scrollDecided=!0;let i=function(t){let e="auto",i=zs(t);for(let t,s=0;s<i.length;s++)if((t=i[s])[ms]){e=t[ms];break}return e}(t),s=!1,n=Math.abs(Ls.touch.x-e.clientX),r=Math.abs(Ls.touch.y-e.clientY);t.cancelable&&("none"===i?s=!0:"pan-x"===i?s=r>n:"pan-y"===i&&(s=n>r)),s?t.preventDefault():Ys("track")}}(t)}if(!(e=t[_s]).skip){for(let i,s=0;s<Ws.length;s++)n[(i=Ws[s]).name]&&!e[i.name]&&i.flow&&i.flow.start.indexOf(t.type)>-1&&i.reset&&i.reset();for(let s,r=0;r<Ws.length;r++)n[(s=Ws[r]).name]&&!e[s.name]&&(e[s.name]=!0,s[i](t))}}}function Fs(t,e,i){return!!js[e]&&(function(t,e,i){let s=js[e],n=s.deps,r=s.name,o=t[fs];o||(t[fs]=o={});for(let e,i,s=0;s<n.length;s++)e=n[s],Ps&&Ss(e)&&"click"!==e||((i=o[e])||(o[e]=i={_count:0}),0===i._count&&t.addEventListener(e,$s,ks(e)),i[r]=(i[r]||0)+1,i._count=(i._count||0)+1);t.addEventListener(e,i),s.touchAction&&Vs(t,s.touchAction)}(t,e,i),!0)}function Bs(t,e,i){return!!js[e]&&(function(t,e,i){let s=js[e],n=s.deps,r=s.name,o=t[fs];if(o)for(let e,i,s=0;s<n.length;s++)e=n[s],(i=o[e])&&i[r]&&(i[r]=(i[r]||1)-1,i._count=(i._count||1)-1,0===i._count&&t.removeEventListener(e,$s,ks(e)));t.removeEventListener(e,i)}(t,e,i),!0)}function qs(t){Ws.push(t);for(let e=0;e<t.emits.length;e++)js[t.emits[e]]=t}function Vs(t,e){us&&t instanceof HTMLElement&&_i.run(()=>{t.style.touchAction=e}),t[ms]=e}function Us(t,e,i){let s=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=i,Ye(t).dispatchEvent(s),s.defaultPrevented){let t=i.preventer||i.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function Ys(t){let e=function(t){for(let e,i=0;i<Ws.length;i++){e=Ws[i];for(let i,s=0;s<e.emits.length;s++)if((i=e.emits[s])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function Gs(t,e,i,s){e&&Us(e,t,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:s,prevent:function(t){return Ys(t)}})}function Xs(t,e,i){if(t.prevent)return!1;if(t.started)return!0;let s=Math.abs(t.x-e),n=Math.abs(t.y-i);return s>=ys||n>=ys}function Js(t,e,i){if(!e)return;let s,n=t.moves[t.moves.length-2],r=t.moves[t.moves.length-1],o=r.x-t.x,a=r.y-t.y,l=0;n&&(s=r.x-n.x,l=r.y-n.y),Us(e,"track",{state:t.state,x:i.clientX,y:i.clientY,dx:o,dy:a,ddx:s,ddy:l,sourceEvent:i,hover:function(){return function(t,e){let i=document.elementFromPoint(t,e),s=i;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(t,e));)s&&(i=s);return i}(i.clientX,i.clientY)}})}function Ks(t,e,i){let s=Math.abs(e.clientX-t.x),n=Math.abs(e.clientY-t.y),r=Hs(i||e);!r||Rs[r.localName]&&r.hasAttribute("disabled")||(isNaN(s)||isNaN(n)||s<=gs&&n<=gs||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=Hs(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let i=e.getBoundingClientRect(),s=t.pageX,n=t.pageY;return!(s>=i.left&&s<=i.right&&n>=i.top&&n<=i.bottom)}return!1}(e))&&(t.prevent||Us(r,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i}))}qs({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Ds(this.info)},mousedown:function(t){if(!Is(t))return;let e=Hs(t),i=this;Ms(this.info,function(t){Is(t)||(Gs("up",e,t),Ds(i.info))},function(t){Is(t)&&Gs("up",e,t),Ds(i.info)}),Gs("down",e,t)},touchstart:function(t){Gs("down",Hs(t),t.changedTouches[0],t)},touchend:function(t){Gs("up",Hs(t),t.changedTouches[0],t)}}),qs({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Ds(this.info)},mousedown:function(t){if(!Is(t))return;let e=Hs(t),i=this,s=function(t){let s=t.clientX,n=t.clientY;Xs(i.info,s,n)&&(i.info.state=i.info.started?"mouseup"===t.type?"end":"track":"start","start"===i.info.state&&Ys("tap"),i.info.addMove({x:s,y:n}),Is(t)||(i.info.state="end",Ds(i.info)),e&&Js(i.info,e,t),i.info.started=!0)};Ms(this.info,s,function(t){i.info.started&&s(t),Ds(i.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=Hs(t),i=t.changedTouches[0],s=i.clientX,n=i.clientY;Xs(this.info,s,n)&&("start"===this.info.state&&Ys("tap"),this.info.addMove({x:s,y:n}),Js(this.info,e,i),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=Hs(t),i=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),Js(this.info,e,i))}}),qs({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){Is(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){Is(t)&&Ks(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){Ks(this.info,t.changedTouches[0],t)}});const Qs=Ne(t=>{return class extends t{_addEventListenerToNode(t,e,i){Fs(t,e,i)||super._addEventListenerToNode(t,e,i)}_removeEventListenerFromNode(t,e,i){Bs(t,e,i)||super._removeEventListenerFromNode(t,e,i)}}}),Zs=/:host\(:dir\((ltr|rtl)\)\)/g,tn=':host([dir="$1"])',en=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,sn=':host([dir="$2"]) $1',nn=/:dir\((?:ltr|rtl)\)/,rn=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),on=[];let an=null,ln="";function dn(){ln=document.documentElement.getAttribute("dir")}function hn(t){if(!t.__autoDirOptOut){t.setAttribute("dir",ln)}}function cn(){dn(),ln=document.documentElement.getAttribute("dir");for(let t=0;t<on.length;t++)hn(on[t])}const pn=Ne(t=>{rn||an||(dn(),(an=new MutationObserver(cn)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const e=vi(t);class i extends e{static _processStyleText(t,e){return t=super._processStyleText(t,e),!rn&&nn.test(t)&&(t=this._replaceDirInCssText(t),this.__activateDir=!0),t}static _replaceDirInCssText(t){let e=t;return e=(e=e.replace(Zs,tn)).replace(en,sn)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){e.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(an&&an.takeRecords().length&&cn(),on.push(this),hn(this))}disconnectedCallback(){if(e.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const t=on.indexOf(this);t>-1&&on.splice(t,1)}}}return i.__activateDir=!1,i});let un=!1,fn=[],_n=[];function mn(){un=!0,requestAnimationFrame(function(){un=!1,function(t){for(;t.length;)gn(t.shift())}(fn),setTimeout(function(){!function(t){for(let e=0,i=t.length;e<i;e++)gn(t.shift())}(_n)})})}function gn(t){const e=t[0],i=t[1],s=t[2];try{i.apply(e,s)}catch(t){setTimeout(()=>{throw t})}}function yn(t,e,i){un||mn(),_n.push([t,e,i])}function bn(){document.body.removeAttribute("unresolved")}function vn(t,e,i){return{index:t,removed:e,addedCount:i}}"interactive"===document.readyState||"complete"===document.readyState?bn():window.addEventListener("DOMContentLoaded",bn);const wn=0,xn=1,Sn=2,Cn=3;function kn(t,e,i,s,n,r){let o,a=0,l=0,d=Math.min(i-e,r-n);if(0==e&&0==n&&(a=function(t,e,i){for(let s=0;s<i;s++)if(!En(t[s],e[s]))return s;return i}(t,s,d)),i==t.length&&r==s.length&&(l=function(t,e,i){let s=t.length,n=e.length,r=0;for(;r<i&&En(t[--s],e[--n]);)r++;return r}(t,s,d-a)),n+=a,r-=l,(i-=l)-(e+=a)==0&&r-n==0)return[];if(e==i){for(o=vn(e,[],0);n<r;)o.removed.push(s[n++]);return[o]}if(n==r)return[vn(e,[],i-e)];let h=function(t){let e=t.length-1,i=t[0].length-1,s=t[e][i],n=[];for(;e>0||i>0;){if(0==e){n.push(Sn),i--;continue}if(0==i){n.push(Cn),e--;continue}let r,o=t[e-1][i-1],a=t[e-1][i],l=t[e][i-1];(r=a<l?a<o?a:o:l<o?l:o)==o?(o==s?n.push(wn):(n.push(xn),s=o),e--,i--):r==a?(n.push(Cn),e--,s=a):(n.push(Sn),i--,s=l)}return n.reverse(),n}(function(t,e,i,s,n,r){let o=r-n+1,a=i-e+1,l=new Array(o);for(let t=0;t<o;t++)l[t]=new Array(a),l[t][0]=t;for(let t=0;t<a;t++)l[0][t]=t;for(let i=1;i<o;i++)for(let r=1;r<a;r++)if(En(t[e+r-1],s[n+i-1]))l[i][r]=l[i-1][r-1];else{let t=l[i-1][r]+1,e=l[i][r-1]+1;l[i][r]=t<e?t:e}return l}(t,e,i,s,n,r));o=void 0;let c=[],p=e,u=n;for(let t=0;t<h.length;t++)switch(h[t]){case wn:o&&(c.push(o),o=void 0),p++,u++;break;case xn:o||(o=vn(p,[],0)),o.addedCount++,p++,o.removed.push(s[u]),u++;break;case Sn:o||(o=vn(p,[],0)),o.addedCount++,p++;break;case Cn:o||(o=vn(p,[],0)),o.removed.push(s[u]),u++}return o&&c.push(o),c}function Pn(t,e){return kn(t,0,t.length,e,0,e.length)}function En(t,e){return t===e}function Tn(t){return"slot"===t.localName}let Rn=class{static getFlattenedNodes(t){const e=Ye(t);return Tn(t)?(t=t,e.assignedNodes({flatten:!0})):Array.from(e.childNodes).map(t=>Tn(t)?Ye(t=t).assignedNodes({flatten:!0}):[t]).reduce((t,e)=>t.concat(e),[])}constructor(t,e){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=t,this.callback=e,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){Tn(this._target)?this._listenSlots([this._target]):Ye(this._target).children&&(this._listenSlots(Ye(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,t=>{this._processMutations(t)}):(this._nativeChildrenObserver=new MutationObserver(t=>{this._processMutations(t)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){Tn(this._target)?this._unlistenSlots([this._target]):Ye(this._target).children&&(this._unlistenSlots(Ye(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,_i.run(()=>this.flush()))}_processMutations(t){this._processSlotMutations(t),this.flush()}_processSlotMutations(t){if(t)for(let e=0;e<t.length;e++){let i=t[e];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let t={target:this._target,addedNodes:[],removedNodes:[]},e=this.constructor.getFlattenedNodes(this._target),i=Pn(e,this._effectiveNodes);for(let e,s=0;s<i.length&&(e=i[s]);s++)for(let i,s=0;s<e.removed.length&&(i=e.removed[s]);s++)t.removedNodes.push(i);for(let s,n=0;n<i.length&&(s=i[n]);n++)for(let i=s.index;i<s.index+s.addedCount;i++)t.addedNodes.push(e[i]);this._effectiveNodes=e;let s=!1;return(t.addedNodes.length||t.removedNodes.length)&&(s=!0,this.callback.call(this._target,t)),s}_listenSlots(t){for(let e=0;e<t.length;e++){let i=t[e];Tn(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(t){for(let e=0;e<t.length;e++){let i=t[e];Tn(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};const On=function(){let t,e;do{t=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),e=ps()}while(t||e)},Nn=Element.prototype,An=Nn.matches||Nn.matchesSelector||Nn.mozMatchesSelector||Nn.msMatchesSelector||Nn.oMatchesSelector||Nn.webkitMatchesSelector,In=function(t,e){return An.call(t,e)};class Ln{constructor(t){this.node=t}observeNodes(t){return new Rn(this.node,t)}unobserveNodes(t){t.disconnect()}notifyObserver(){}deepContains(t){if(Ye(this.node).contains(t))return!0;let e=t,i=t.ownerDocument;for(;e&&e!==i&&e!==this.node;)e=Ye(e).parentNode||Ye(e).host;return e===this.node}getOwnerRoot(){return Ye(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?Ye(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let t=[],e=Ye(this.node).assignedSlot;for(;e;)t.push(e),e=Ye(e).assignedSlot;return t}importNode(t,e){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return Ye(i).importNode(t,e)}getEffectiveChildNodes(){return Rn.getFlattenedNodes(this.node)}queryDistributedElements(t){let e=this.getEffectiveChildNodes(),i=[];for(let s,n=0,r=e.length;n<r&&(s=e[n]);n++)s.nodeType===Node.ELEMENT_NODE&&In(s,t)&&i.push(s);return i}get activeElement(){let t=this.node;return void 0!==t._activeElement?t._activeElement:t.activeElement}}function Mn(t,e){for(let i=0;i<e.length;i++){let s=e[i];Object.defineProperty(t,s,{get:function(){return this.node[s]},configurable:!0})}}class Dn{constructor(t){this.event=t}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}Ln.prototype.cloneNode,Ln.prototype.appendChild,Ln.prototype.insertBefore,Ln.prototype.removeChild,Ln.prototype.replaceChild,Ln.prototype.setAttribute,Ln.prototype.removeAttribute,Ln.prototype.querySelector,Ln.prototype.querySelectorAll,Ln.prototype.parentNode,Ln.prototype.firstChild,Ln.prototype.lastChild,Ln.prototype.nextSibling,Ln.prototype.previousSibling,Ln.prototype.firstElementChild,Ln.prototype.lastElementChild,Ln.prototype.nextElementSibling,Ln.prototype.previousElementSibling,Ln.prototype.childNodes,Ln.prototype.children,Ln.prototype.classList,Ln.prototype.textContent,Ln.prototype.innerHTML;let zn=Ln;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class t extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(Ln.prototype).forEach(e=>{"activeElement"!=e&&(t.prototype[e]=Ln.prototype[e])}),Mn(t.prototype,["classList"]),zn=t,Object.defineProperties(Dn.prototype,{localTarget:{get(){return this.event.currentTarget},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(t,e){for(let i=0;i<e.length;i++){let s=e[i];t[s]=function(){return this.node[s].apply(this.node,arguments)}}}(Ln.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),Mn(Ln.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(t,e){for(let i=0;i<e.length;i++){let s=e[i];Object.defineProperty(t,s,{get:function(){return this.node[s]},set:function(t){this.node[s]=t},configurable:!0})}}(Ln.prototype,["textContent","innerHTML"]);const jn=function(t){if((t=t||document)instanceof zn)return t;if(t instanceof Dn)return t;let e=t.__domApi;return e||(e=t instanceof Event?new Dn(t):new zn(t),t.__domApi=e),e};let Wn=window.ShadyCSS;const Hn=Ne(t=>{const e=pn(Qs(ls(t))),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends e{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(t,e,i,s){e!==i&&(super.attributeChangedCallback(t,e,i,s),this.attributeChanged(t,e,i))}attributeChanged(t,e,i){}_initializeProperties(){let t=Object.getPrototypeOf(this);t.hasOwnProperty("__hasRegisterFinished")||(this._registered(),t.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(t){return this._serializeValue(t)}deserialize(t,e){return this._deserializeValue(t,e)}reflectPropertyToAttribute(t,e,i){this._propertyToAttribute(t,e,i)}serializeValueToAttribute(t,e,i){this._valueToNodeAttribute(i||this,t,e)}extend(t,e){if(!t||!e)return t||e;let i=Object.getOwnPropertyNames(e);for(let s,n=0;n<i.length&&(s=i[n]);n++){let i=Object.getOwnPropertyDescriptor(e,s);i&&Object.defineProperty(t,s,i)}return t}mixin(t,e){for(let i in e)t[i]=e[i];return t}chainObject(t,e){return t&&e&&t!==e&&(t.__proto__=e),t}instanceTemplate(t){let e=this.constructor._contentForTemplate(t);return document.importNode(e,!0)}fire(t,e,i){i=i||{},e=null==e?{}:e;let s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});s.detail=e;let n=i.node||this;return Ye(n).dispatchEvent(s),s}listen(t,e,i){t=t||this;let s=this.__boundListeners||(this.__boundListeners=new WeakMap),n=s.get(t);n||(n={},s.set(t,n));let r=e+i;n[r]||(n[r]=this._addMethodEventListenerToNode(t,e,i,this))}unlisten(t,e,i){t=t||this;let s=this.__boundListeners&&this.__boundListeners.get(t),n=e+i,r=s&&s[n];r&&(this._removeEventListenerFromNode(t,e,r),s[n]=null)}setScrollDirection(t,e){Vs(e||this,i[t]||"auto")}$$(t){return this.root.querySelector(t)}get domHost(){let t=Ye(this).getRootNode();return t instanceof DocumentFragment?t.host:t}distributeContent(){const t=jn(this);window.ShadyDOM&&t.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return jn(this).getEffectiveChildNodes()}queryDistributedElements(t){return jn(this).queryDistributedElements(t)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let t=this.getEffectiveChildNodes(),e=[];for(let i,s=0;i=t[s];s++)i.nodeType!==Node.COMMENT_NODE&&e.push(i.textContent);return e.join("")}queryEffectiveChildren(t){let e=this.queryDistributedElements(t);return e&&e[0]}queryAllEffectiveChildren(t){return this.queryDistributedElements(t)}getContentChildNodes(t){let e=this.root.querySelector(t||"slot");return e?jn(e).getDistributedNodes():[]}getContentChildren(t){return this.getContentChildNodes(t).filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}isLightDescendant(t){return this!==t&&Ye(this).contains(t)&&Ye(this).getRootNode()===Ye(t).getRootNode()}isLocalDescendant(t){return this.root===Ye(t).getRootNode()}scopeSubtree(t,e){}getComputedStyleValue(t){return Wn.getComputedStyleValue(this,t)}debounce(t,e,i){return this._debouncers=this._debouncers||{},this._debouncers[t]=ds.debounce(this._debouncers[t],i>0?ui.after(i):_i,e.bind(this))}isDebouncerActive(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];return!(!e||!e.isActive())}flushDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.flush()}cancelDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.cancel()}async(t,e){return e>0?ui.run(t.bind(this),e):~_i.run(t.bind(this))}cancelAsync(t){t<0?_i.cancel(~t):ui.cancel(t)}create(t,e){let i=document.createElement(t);if(e)if(i.setProperties)i.setProperties(e);else for(let t in e)i[t]=e[t];return i}elementMatches(t,e){return In(e||this,t)}toggleAttribute(t,e){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(e=!i.hasAttribute(t)),e?(Ye(i).setAttribute(t,""),!0):(Ye(i).removeAttribute(t),!1)}toggleClass(t,e,i){i=i||this,1==arguments.length&&(e=!i.classList.contains(t)),e?i.classList.add(t):i.classList.remove(t)}transform(t,e){(e=e||this).style.webkitTransform=t,e.style.transform=t}translate3d(t,e,i,s){s=s||this,this.transform("translate3d("+t+","+e+","+i+")",s)}arrayDelete(t,e){let i;if(Array.isArray(t)){if((i=t.indexOf(e))>=0)return t.splice(i,1)}else{if((i=ei(this,t).indexOf(e))>=0)return this.splice(t,i,1)}return null}_logger(t,e){switch(Array.isArray(e)&&1===e.length&&Array.isArray(e[0])&&(e=e[0]),t){case"log":case"warn":case"error":console[t](...e)}}_log(...t){this._logger("log",t)}_warn(...t){this._logger("warn",t)}_error(...t){this._logger("error",t)}_logf(t,...e){return["[%s::%s]",this.is,t,...e]}}return s.prototype.is="",s}),$n={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},Fn={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},Bn=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},Fn);function qn(t,e,i,s){!function(t,e,i){const s=t._noAccessors,n=Object.getOwnPropertyNames(t);for(let r=0;r<n.length;r++){let o=n[r];if(!(o in i))if(s)e[o]=t[o];else{let i=Object.getOwnPropertyDescriptor(t,o);i&&(i.configurable=!0,Object.defineProperty(e,o,i))}}}(e,t,s);for(let t in $n)e[t]&&(i[t]=i[t]||[],i[t].push(e[t]))}function Vn(t,e){for(const i in e){const s=t[i],n=e[i];t[i]=!("value"in n)&&s&&"value"in s?Object.assign({value:s.value},n):n}}function Un(t,e,i){let s;const n={};class r extends e{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(s)for(let t,e=0;e<s.length;e++)(t=s[e]).properties&&this.createProperties(t.properties),t.observers&&this.createObservers(t.observers,t.properties);t.properties&&this.createProperties(t.properties),t.observers&&this.createObservers(t.observers,t.properties),this._prepareTemplate()}else super._finalizeClass()}static get properties(){const e={};if(s)for(let t=0;t<s.length;t++)Vn(e,s[t].properties);return Vn(e,t.properties),e}static get observers(){let e=[];if(s)for(let t,i=0;i<s.length;i++)(t=s[i]).observers&&(e=e.concat(t.observers));return t.observers&&(e=e.concat(t.observers)),e}created(){super.created();const t=n.created;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}_registered(){const t=r.prototype;if(!t.hasOwnProperty("__hasRegisterFinished")){t.__hasRegisterFinished=!0,super._registered(),Te&&o(t);const e=Object.getPrototypeOf(this);let i=n.beforeRegister;if(i)for(let t=0;t<i.length;t++)i[t].call(e);if(i=n.registered)for(let t=0;t<i.length;t++)i[t].call(e)}}_applyListeners(){super._applyListeners();const t=n.listeners;if(t)for(let e=0;e<t.length;e++){const i=t[e];if(i)for(let t in i)this._addMethodEventListenerToNode(this,t,i[t])}}_ensureAttributes(){const t=n.hostAttributes;if(t)for(let e=t.length-1;e>=0;e--){const i=t[e];for(let t in i)this._ensureAttribute(t,i[t])}super._ensureAttributes()}ready(){super.ready();let t=n.ready;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}attached(){super.attached();let t=n.attached;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}detached(){super.detached();let t=n.detached;if(t)for(let e=0;e<t.length;e++)t[e].call(this)}attributeChanged(t,e,i){super.attributeChanged();let s=n.attributeChanged;if(s)for(let n=0;n<s.length;n++)s[n].call(this,t,e,i)}}if(i){Array.isArray(i)||(i=[i]);let t=e.prototype.behaviors;s=function t(e,i,s){i=i||[];for(let n=e.length-1;n>=0;n--){let r=e[n];r?Array.isArray(r)?t(r,i):i.indexOf(r)<0&&(!s||s.indexOf(r)<0)&&i.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return i}(i,null,t),r.prototype.behaviors=t?t.concat(i):s}const o=e=>{s&&function(t,e,i){for(let s=0;s<e.length;s++)qn(t,e[s],i,Bn)}(e,s,n),qn(e,t,n,Fn)};return Te||o(r.prototype),r.generatedFrom=t,r}const Yn=function(t){let e;return e="function"==typeof t?t:Yn.Class(t),customElements.define(e.is,e),e};function Gn(t,e,i,s,n){let r;n&&(r="object"==typeof i&&null!==i)&&(s=t.__dataTemp[e]);let o=s!==i&&(s==s||i==i);return r&&o&&(t.__dataTemp[e]=i),o}Yn.Class=function(t,e){t||console.warn("Polymer.Class requires `info` argument");let i=e?e(Hn(HTMLElement)):Hn(HTMLElement);return(i=Un(t,i,t.behaviors)).is=i.prototype.is=t.is,i};const Xn=Ne(t=>{return class extends t{_shouldPropertyChange(t,e,i){return Gn(this,t,e,i,!0)}}}),Jn=Ne(t=>{return class extends t{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(t,e,i){return Gn(this,t,e,i,this.mutableData)}}});Xn._mutablePropertyChange=Gn;let Kn=null;function Qn(){return Kn}Qn.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Qn,writable:!0}});const Zn=ss(Qn),tr=Xn(Zn);const er=ss(class{});class ir extends er{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=this.children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)e.push(t),t.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(t&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let t in this.__hostProps)this._setPendingProperty(t,this.__dataHost["_host_"+t]);for(let e in t)this._setPendingProperty(e,t[e])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,t=>{t.model=this,i(t)});else{let s=this.__dataHost.__dataHost;s&&s._addEventListenerToNode(t,e,i)}}_showHideChildren(t){let e=this.children;for(let i=0;i<e.length;i++){let s=e[i];if(Boolean(t)!=Boolean(s.__hideTemplateChildren__))if(s.nodeType===Node.TEXT_NODE)t?(s.__polymerTextContent__=s.textContent,s.textContent=""):s.textContent=s.__polymerTextContent__;else if("slot"===s.localName)if(t)s.__polymerReplaced__=document.createComment("hidden-slot"),Ye(Ye(s).parentNode).replaceChild(s.__polymerReplaced__,s);else{const t=s.__polymerReplaced__;t&&Ye(Ye(t).parentNode).replaceChild(s,t)}else s.style&&(t?(s.__polymerDisplay__=s.style.display,s.style.display="none"):s.style.display=s.__polymerDisplay__);s.__hideTemplateChildren__=t,s._showHideChildren&&s._showHideChildren(t)}}_setUnmanagedPropertyToNode(t,e,i){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&"textContent"==e?t.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(t,e,i)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do{t=t.__dataHost.__dataHost}while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}ir.prototype.__dataHost,ir.prototype.__templatizeOptions,ir.prototype._methodHost,ir.prototype.__templatizeOwner,ir.prototype.__hostProps;const sr=Xn(ir);function nr(t){let e=t.__dataHost;return e&&e._methodHost||e}function rr(t,e,i){let s=i.mutableData?sr:ir;dr.mixin&&(s=dr.mixin(s));let n=class extends s{};return n.prototype.__templatizeOptions=i,n.prototype._bindTemplate(t),function(t,e,i,s){let n=i.hostProps||{};for(let e in s.instanceProps){delete n[e];let i=s.notifyInstanceProp;i&&t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:lr(e,i)})}if(s.forwardHostProp&&e.__dataHost)for(let e in n)t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(t,e,i){t.__dataHost._setPendingPropertyOrPath("_host_"+e,i[e],!0,!0)}})}(n,t,e,i),n}function or(t,e,i){let s=i.forwardHostProp;if(s){let n=e.templatizeTemplateClass;if(!n){let t=i.mutableData?tr:Zn;n=e.templatizeTemplateClass=class extends t{};let r=e.hostProps;for(let t in r)n.prototype._addPropertyEffect("_host_"+t,n.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:ar(t,s)}),n.prototype._createNotifyingProperty("_host_"+t)}!function(t,e){Kn=t,Object.setPrototypeOf(t,e.prototype),new e,Kn=null}(t,n),t.__dataProto&&Object.assign(t.__data,t.__dataProto),t.__dataTemp={},t.__dataPending=null,t.__dataOld=null,t._enableProperties()}}function ar(t,e){return function(t,i,s){e.call(t.__templatizeOwner,i.substring("_host_".length),s[i])}}function lr(t,e){return function(t,i,s){e.call(t.__templatizeOwner,t,i,s[i])}}function dr(t,e,i){if(Pe&&!nr(t))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},t.__templatizeOwner)throw new Error("A <template> can only be templatized once");t.__templatizeOwner=e;let s=(e?e.constructor:ir)._parseTemplate(t),n=s.templatizeInstanceClass;n||(n=rr(t,s,i),s.templatizeInstanceClass=n),or(t,s,i);let r=class extends n{};return r.prototype._methodHost=nr(t),r.prototype.__dataHost=t,r.prototype.__templatizeOwner=e,r.prototype.__hostProps=s.hostProps,r=r}const hr=Qs(Jn(ss(HTMLElement)));customElements.define("dom-bind",class extends hr{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),Pe)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){Ye(Ye(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let t=0;t<this.__children.length;t++)this.root.appendChild(this.__children[t])}render(){let t;if(!this.__children){if(!(t=t||this.querySelector("template"))){let e=new MutationObserver(()=>{if(!(t=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");e.disconnect(),this.render()});return void e.observe(this,{childList:!0})}this.root=this._stampTemplate(t),this.$=this.root.$,this.__children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)this.__children[this.__children.length]=t;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});class cr{constructor(t){this.value=t.toString()}toString(){return this.value}}function pr(t){if(t instanceof HTMLTemplateElement)return t.innerHTML;if(t instanceof cr)return function(t){if(t instanceof cr)return t.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)}(t);throw new Error(`non-template value passed to Polymer's html function: ${t}`)}const ur=function(t,...e){const i=document.createElement("template");return i.innerHTML=e.reduce((e,i,s)=>e+pr(i)+t[s+1],t[0]),i},fr=ls(HTMLElement),_r=Jn(fr);class mr extends _r{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let t=Ye(Ye(this).parentNode);for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t)}}__ensureTemplatized(){if(!this.__ctor){let t=this.template=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}let e={};e[this.as]=!0,e[this.indexAs]=!0,e[this.itemsIndexAs]=!0,this.__ctor=dr(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:e,forwardHostProp:function(t,e){let i=this.__instances;for(let s,n=0;n<i.length&&(s=i[n]);n++)s.forwardHostProp(t,e)},notifyInstanceProp:function(t,e,i){if((s=this.as)===(n=e)||Je(s,n)||Ke(s,n)){let s=t[this.itemsIndexAs];e==this.as&&(this.items[s]=i);let n=Qe(this.as,`${JSCompiler_renameProperty("items",this)}.${s}`,e);this.notifyPath(n,i)}var s,n}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if("string"==typeof t){let e=t,i=this.__getMethodHost();return function(){return i[e].apply(i,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let t=performance.now(),e=this._targetFrameTime/(t-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*e)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=t,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn)if(t){if(this.__observePaths){let e=this.__observePaths;for(let i=0;i<e.length;i++)0===t.indexOf(e[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(t,e=0){this.__renderDebouncer=ds.debounce(this.__renderDebouncer,e>0?ui.after(e):_i,t.bind(this)),cs(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),On()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let t=this.items||[],e=new Array(t.length);for(let i=0;i<t.length;i++)e[i]=i;this.__filterFn&&(e=e.filter((e,i,s)=>this.__filterFn(t[e],i,s))),this.__sortFn&&e.sort((e,i)=>this.__sortFn(t[e],t[i]));const i=this.__itemsIdxToInstIdx={};let s=0;const n=Math.min(e.length,this.__limit);for(;s<n;s++){let n=this.__instances[s],r=e[s],o=t[r];i[r]=s,n?(n._setPendingProperty(this.as,o),n._setPendingProperty(this.indexAs,s),n._setPendingProperty(this.itemsIndexAs,r),n._flushProperties()):this.__insertInstance(o,s,r)}for(let t=this.__instances.length-1;t>=s;t--)this.__detachAndRemoveInstance(t)}__detachInstance(t){let e=this.__instances[t];const i=Ye(e.root);for(let t=0;t<e.children.length;t++){let s=e.children[t];i.appendChild(s)}return e}__attachInstance(t,e){let i=this.__instances[t];e.insertBefore(i.root,this)}__detachAndRemoveInstance(t){let e=this.__detachInstance(t);e&&this.__pool.push(e),this.__instances.splice(t,1)}__stampInstance(t,e,i){let s={};return s[this.as]=t,s[this.indexAs]=e,s[this.itemsIndexAs]=i,new this.__ctor(s)}__insertInstance(t,e,i){let s=this.__pool.pop();s?(s._setPendingProperty(this.as,t),s._setPendingProperty(this.indexAs,e),s._setPendingProperty(this.itemsIndexAs,i),s._flushProperties()):s=this.__stampInstance(t,e,i);let n=this.__instances[e+1],r=n?n.children[0]:this;return Ye(Ye(this).parentNode).insertBefore(s.root,r),this.__instances[e]=s,s}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let i=t.slice(6),s=i.indexOf("."),n=s<0?i:i.substring(0,s);if(n==parseInt(n,10)){let t=s<0?"":i.substring(s+1);this.__handleObservedPaths(t);let r=this.__itemsIdxToInstIdx[n],o=this.__instances[r];if(o){let i=this.as+(t?"."+t:"");o._setPendingPropertyOrPath(i,e,!1,!0),o._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return function(t,e){let i;for(;e;)if(i=e.__templatizeInstance){if(i.__dataHost==t)return i;e=i.__dataHost}else e=Ye(e).parentNode;return null}(this.template,t)}}customElements.define(mr.is,mr);class gr extends fr{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=ds.debounce(this.__renderDebouncer,_i,()=>this.__render()),cs(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const t=Ye(this).parentNode;t&&(t.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||Ye(t).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){On()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let t=Ye(this).parentNode;if(t){if(!this.__ctor){let t=Ye(this).querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!Ye(this).querySelector("template"))throw new Error("dom-if requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}this.__ctor=dr(t,this,{mutableData:!0,forwardHostProp:function(t,e){this.__instance&&(this.if?this.__instance.forwardHostProp(t,e):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Xe(t)]=!0))}})}if(this.__instance){this.__syncHostProperties();let e=this.__instance.children;if(e&&e.length){if(Ye(this).previousSibling!==e[e.length-1])for(let i,s=0;s<e.length&&(i=e[s]);s++)Ye(t).insertBefore(i,this)}}else this.__instance=new this.__ctor,Ye(t).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let t=this.__invalidProps;if(t){for(let e in t)this.__instance._setPendingProperty(e,this.__dataHost[e]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let t=this.__instance.children;if(t&&t.length){let e=Ye(t[0]).parentNode;if(e){e=Ye(e);for(let i,s=0;s<t.length&&(i=t[s]);s++)e.removeChild(i)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let t=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(t)}}customElements.define(gr.is,gr);let yr=Ne(t=>{let e=ls(t);return class extends e{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(t,e){let i=e.path;if(i==JSCompiler_renameProperty("items",this)){let i=e.base||[],s=this.__lastItems;if(t!==this.__lastMulti&&this.clearSelection(),s){let t=Pn(i,s);this.__applySplices(t)}this.__lastItems=i,this.__lastMulti=t}else if(e.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(e.value.indexSplices);else{let t=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),e=parseInt(t,10);t.indexOf(".")<0&&t==e&&this.__deselectChangedIdx(e)}}__applySplices(t){let e=this.__selectedMap;for(let i=0;i<t.length;i++){let s=t[i];e.forEach((t,i)=>{t<s.index||(t>=s.index+s.removed.length?e.set(i,t+s.addedCount-s.removed.length):e.set(i,-1))});for(let t=0;t<s.addedCount;t++){let i=s.index+t;e.has(this.items[i])&&e.set(this.items[i],i)}}this.__updateLinks();let i=0;e.forEach((t,s)=>{t<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,e.delete(s)):i++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let t=0;this.__selectedMap.forEach(e=>{e>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${e}`,`${JSCompiler_renameProperty("selected",this)}.${t++}`)})}else this.__selectedMap.forEach(t=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${t}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${t}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(t){return this.__selectedMap.has(t)}isIndexSelected(t){return this.isSelected(this.items[t])}__deselectChangedIdx(t){let e=this.__selectedIndexForItemIndex(t);if(e>=0){let t=0;this.__selectedMap.forEach((i,s)=>{e==t++&&this.deselect(s)})}}__selectedIndexForItemIndex(t){let e=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${t}`];if(e)return parseInt(e.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(t){let e=this.__selectedMap.get(t);if(e>=0){let i;this.__selectedMap.delete(t),this.multi&&(i=this.__selectedIndexForItemIndex(e)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(t){this.deselect(this.items[t])}select(t){this.selectIndex(this.items.indexOf(t))}selectIndex(t){let e=this.items[t];this.isSelected(e)?this.toggle&&this.deselectIndex(t):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(e,t),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),e):this.selected=this.selectedItem=e)}}})(fr);class br extends yr{static get is(){return"array-selector"}static get template(){return null}}customElements.define(br.is,br);const vr=new pe;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(t,e,i){},prepareTemplateDom(t,e){},prepareTemplateStyles(t,e,i){},styleSubtree(t,e){vr.processStyles(),Ft(t,e)},styleElement(t){vr.processStyles()},styleDocument(t){vr.processStyles(),Ft(document.body,t)},getComputedStyleValue:(t,e)=>Bt(t,e),flushCustomStyles(){},nativeCss:yt,nativeShadow:ut,cssBuild:_t,disableRuntime:gt}),window.ShadyCSS.CustomStyleInterface=vr;const wr="include",xr=window.ShadyCSS.CustomStyleInterface;let Sr;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,xr.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const t=this.querySelector("style");if(!t)return null;this._style=t;const e=t.getAttribute(wr);return e&&(t.removeAttribute(wr),t.textContent=function(t){let e=t.trim().split(/\s+/),i="";for(let t=0;t<e.length;t++)i+=Ue(e[t]);return i}(e)+t.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),Sr=Xn._mutablePropertyChange;Hn(HTMLElement).prototype;var Cr=new Set;const kr={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(Cr.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach(function(t){this.resizerShouldNotify(t)&&this._notifyDescendant(t)},this),this._fireResize())},assignParentResizable:function(t){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=t,t&&-1===t._interestedResizables.indexOf(this)&&(t._interestedResizables.push(this),t._subscribeIronResize(this))},stopResizeNotificationsFor:function(t){var e=this._interestedResizables.indexOf(t);e>-1&&(this._interestedResizables.splice(e,1),this._unsubscribeIronResize(t))},_subscribeIronResize:function(t){t.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(t){t.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(t){return!0},_onDescendantIronResize:function(t){this._notifyingDescendant?t.stopPropagation():xe||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(t){var e=jn(t).rootTarget;e!==this&&(e.assignParentResizable(this),this._notifyDescendant(e),t.stopPropagation())},_parentResizableChanged:function(t){t&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(t){this.isAttached&&(this._notifyingDescendant=!0,t.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var t=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",function e(){document.removeEventListener("readystatechange",e),t()})}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach(function(t){t!==this&&t._findParent()},this):(Cr.forEach(function(t){t!==this&&t._findParent()},this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?Cr.delete(this):Cr.add(this)}};class Pr{constructor(t){this.selection=[],this.selectCallback=t}get(){return this.multi?this.selection.slice():this.selection[0]}clear(t){this.selection.slice().forEach(function(e){(!t||t.indexOf(e)<0)&&this.setItemSelected(e,!1)},this)}isSelected(t){return this.selection.indexOf(t)>=0}setItemSelected(t,e){if(null!=t&&e!==this.isSelected(t)){if(e)this.selection.push(t);else{var i=this.selection.indexOf(t);i>=0&&this.selection.splice(i,1)}this.selectCallback&&this.selectCallback(t,e)}}select(t){this.multi?this.toggle(t):this.get()!==t&&(this.setItemSelected(this.get(),!1),this.setItemSelected(t,!0))}toggle(t){this.setItemSelected(t,!this.isSelected(t))}}const Er={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new Pr(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&jn(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(t){return this.items?this.items.indexOf(t):-1},select:function(t){this.selected=t},selectPrevious:function(){var t=this.items.length,e=t-1;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))-1+t)%t),this.selected=this._indexToValue(e)},selectNext:function(){var t=0;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(t)},selectIndex:function(t){this.select(this._indexToValue(t))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(t){this.listen(this,t,"_activateHandler")},_removeListener:function(t){this.unlisten(this,t,"_activateHandler")},_activateEventChanged:function(t,e){this._removeListener(e),this._addListener(t)},_updateItems:function(){var t=jn(this).queryDistributedElements(this.selectable||"*");t=Array.prototype.filter.call(t,this._bindFilterItem),this._setItems(t)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(t){if(this.items){var e=this._valueToItem(this.selected);e?this._selection.select(e):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(t){return!this._excludedLocalNames[t.localName]},_valueToItem:function(t){return null==t?null:this.items[this._valueToIndex(t)]},_valueToIndex:function(t){if(!this.attrForSelected)return Number(t);for(var e,i=0;e=this.items[i];i++)if(this._valueForItem(e)==t)return i},_indexToValue:function(t){if(!this.attrForSelected)return t;var e=this.items[t];return e?this._valueForItem(e):void 0},_valueForItem:function(t){if(!t)return null;if(!this.attrForSelected){var e=this.indexOf(t);return-1===e?null:e}var i=t[oi(this.attrForSelected)];return null!=i?i:t.getAttribute(this.attrForSelected)},_applySelection:function(t,e){this.selectedClass&&this.toggleClass(this.selectedClass,e,t),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,e,t),this._selectionChange(),this.fire("iron-"+(e?"select":"deselect"),{item:t})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(t){return jn(t).observeNodes(function(t){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",t,{bubbles:!1,cancelable:!1})})},_activateHandler:function(t){for(var e=t.target,i=this.items;e&&e!=this;){var s=i.indexOf(e);if(s>=0){var n=this._indexToValue(s);return void this._itemActivate(n,e)}e=e.parentNode}},_itemActivate:function(t,e){this.fire("iron-activate",{selected:t,item:e},{cancelable:!0}).defaultPrevented||this.select(t)}};Yn({_template:ur`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
`,is:"iron-pages",behaviors:[kr,Er],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(t,e){this.async(this.notifyResize)}});class Tr{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,n=0;const r=this.a,o=this.b,a=this.c;return Math.abs(o)>1e-5&&(e=-r/o,s=-a/o),Math.abs(t.b)>1e-5&&(i=-t.a/t.b,n=-t.c/t.b),e===Number.MAX_VALUE?i===Number.MAX_VALUE?-a/r==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+s,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(r)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===i?s===n&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-s)/(e-i),this.yi=e*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}class Rr{constructor(t,e,i,s,n,r,o,a){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=i,this.right=s,this.gap=n,this.sinAngle=r,this.tanAngle=a,Math.abs(r)<1e-4?this.pos=i+n:Math.abs(r)>.9999?this.pos=t+n:(this.deltaX=(e-t)*Math.abs(a),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(n/o),this.sLeft=new Tr([i,e],[i,t]),this.sRight=new Tr([s,e],[s,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,i=this.bottom,s=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new Tr([t,i],[e,s]);this.sLeft&&n.intersects(this.sLeft)&&(t=n.xi,i=n.yi),this.sRight&&n.intersects(this.sRight)&&(e=n.xi,s=n.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const r=[t,i,e,s];return this.pos+=this.hGap,r}}return null}}function Or(t,e){const i=[],s=new Tr([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const n=new Tr(e[t],e[(t+1)%e.length]);s.intersects(n)&&i.push([s.xi,s.yi])}return i}function Nr(t,e,i,s,n,r,o){return[-i*r-s*n+i+r*t+n*e,o*(i*n-s*r)+s+-o*n*t+o*r*e]}const Ar=2,Ir=1,Lr=.85,Mr=0,Dr=9;class zr{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(t,e){this.p=`${this.p}M ${t} ${e} `}bcurveTo(t,e,i,s,n,r){this.p=`${this.p}C ${t} ${e}, ${i} ${s}, ${n} ${r} `}}function jr(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg",t);if(e)for(const t in e)i.setAttributeNS(null,t,e[t]);return i}function Wr(t,e){return Ir*(Math.random()*(e-t)+t)}function Hr(t,e,i,s,n){const r=Math.pow(t-i,2)+Math.pow(e-s,2);let o=Ar;o*o*100>r&&(o=Math.sqrt(r)/10);const a=o/2,l=.2+.2*Math.random();let d=Lr*Ar*(s-e)/200,h=Lr*Ar*(t-i)/200;d=Wr(-d,d),h=Wr(-h,h);const c=n||new zr;return c.moveTo(t+Wr(-o,o),e+Wr(-o,o)),c.bcurveTo(d+t+(i-t)*l+Wr(-o,o),h+e+(s-e)*l+Wr(-o,o),d+t+2*(i-t)*l+Wr(-o,o),h+e+2*(s-e)*l+Wr(-o,o),i+Wr(-o,o),s+Wr(-o,o)),c.moveTo(t+Wr(-a,a),e+Wr(-a,a)),c.bcurveTo(d+t+(i-t)*l+Wr(-a,a),h+e+(s-e)*l+Wr(-a,a),d+t+2*(i-t)*l+Wr(-a,a),h+e+2*(s-e)*l+Wr(-a,a),i+Wr(-a,a),s+Wr(-a,a)),c}function $r(t,e,i,s,n=!1,r=!1,o){o=o||new zr;const a=Math.pow(t-i,2)+Math.pow(e-s,2);let l=Ar;l*l*100>a&&(l=Math.sqrt(a)/10);const d=l/2,h=.2+.2*Math.random();let c=Lr*Ar*(s-e)/200,p=Lr*Ar*(t-i)/200;return c=Wr(-c,c),p=Wr(-p,p),n&&o.moveTo(t+Wr(-l,l),e+Wr(-l,l)),r?o.bcurveTo(c+t+(i-t)*h+Wr(-d,d),p+e+(s-e)*h+Wr(-d,d),c+t+2*(i-t)*h+Wr(-d,d),p+e+2*(s-e)*h+Wr(-d,d),i+Wr(-d,d),s+Wr(-d,d)):o.bcurveTo(c+t+(i-t)*h+Wr(-l,l),p+e+(s-e)*h+Wr(-l,l),c+t+2*(i-t)*h+Wr(-l,l),p+e+2*(s-e)*h+Wr(-l,l),i+Wr(-l,l),s+Wr(-l,l)),o}function Fr(t,e,i,s,n,r,o,a){const l=Wr(-.5,.5)-Math.PI/2,d=[];d.push([Wr(-r,r)+e+.9*s*Math.cos(l-t),Wr(-r,r)+i+.9*n*Math.sin(l-t)]);for(let o=l;o<2*Math.PI+l-.01;o+=t)d.push([Wr(-r,r)+e+s*Math.cos(o),Wr(-r,r)+i+n*Math.sin(o)]);return d.push([Wr(-r,r)+e+s*Math.cos(l+2*Math.PI+.5*o),Wr(-r,r)+i+n*Math.sin(l+2*Math.PI+.5*o)]),d.push([Wr(-r,r)+e+.98*s*Math.cos(l+o),Wr(-r,r)+i+.98*n*Math.sin(l+o)]),d.push([Wr(-r,r)+e+.9*s*Math.cos(l+.5*o),Wr(-r,r)+i+.9*n*Math.sin(l+.5*o)]),function(t,e){const i=t.length;let s=e||new zr;if(i>3){const e=[],n=1-Mr;s.moveTo(t[1][0],t[1][1]);for(let r=1;r+2<i;r++){const i=t[r];e[0]=[i[0],i[1]],e[1]=[i[0]+(n*t[r+1][0]-n*t[r-1][0])/6,i[1]+(n*t[r+1][1]-n*t[r-1][1])/6],e[2]=[t[r+1][0]+(n*t[r][0]-n*t[r+2][0])/6,t[r+1][1]+(n*t[r][1]-n*t[r+2][1])/6],e[3]=[t[r+1][0],t[r+1][1]],s.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[3][0],e[3][1])}}else 3===i?(s.moveTo(t[0][0],t[0][1]),s.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1])):2===i&&(s=Hr(t[0][0],t[0][1],t[1][0],t[1][1],s));return s}(d,a)}function Br(t,e,i,s,n){const r=jr("path",{d:Hr(e,i,s,n).value});return t.appendChild(r),r}function qr(t,e,i,s,n){n-=4;let r=Hr(e+=2,i+=2,e+(s-=4),i);r=Hr(e+s,i,e+s,i+n,r),r=Hr(e+s,i+n,e,i+n,r);const o=jr("path",{d:(r=Hr(e,i+n,e,i,r)).value});return t.appendChild(o),o}function Vr(t,e){let i;const s=e.length;if(s>2)for(let t=0;t<2;t++){let n=!0;for(let t=1;t<s;t++)i=$r(e[t-1][0],e[t-1][1],e[t][0],e[t][1],n,t>0,i),n=!1;i=$r(e[s-1][0],e[s-1][1],e[0][0],e[0][1],n,t>0,i)}else i=2===s?Hr(e[0][0],e[0][1],e[1][0],e[1][1]):new zr;const n=jr("path",{d:i.value});return t.appendChild(n),n}function Ur(t,e,i,s,n){s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1);const r=2*Math.PI/Dr;let o=Math.abs(s/2),a=Math.abs(n/2),l=Fr(r,e,i,o+=Wr(.05*-o,.05*o),a+=Wr(.05*-a,.05*a),1,r*Wr(.1,Wr(.4,1)));const d=jr("path",{d:(l=Fr(r,e,i,o,a,1.5,0,l)).value});return t.appendChild(d),d}function Yr(t){const e=jr("g");let i=null;return t.forEach(t=>{Br(e,t[0][0],t[0][1],t[1][0],t[1][1]),i&&Br(e,i[0],i[1],t[0][0],t[0][1]),i=t[1]}),e}const Gr={bowing:Lr,curveStepCount:Dr,curveTightness:Mr,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:Ar,roughness:Ir,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function Xr(t){return Yr(function(t,e){const i=[];if(t&&t.length){let s=t[0][0],n=t[0][0],r=t[0][1],o=t[0][1];for(let e=1;e<t.length;e++)s=Math.min(s,t[e][0]),n=Math.max(n,t[e][0]),r=Math.min(r,t[e][1]),o=Math.max(o,t[e][1]);const a=e.hachureAngle;let l=e.hachureGap;l<0&&(l=4*e.strokeWidth),l=Math.max(l,.1);const d=a%180*(Math.PI/180),h=Math.cos(d),c=Math.sin(d),p=Math.tan(d),u=new Rr(r-1,o+1,s-1,n+1,l,c,h,p);let f;for(;null!=(f=u.nextLine());){const e=Or(f,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const s=e[t],n=e[t+1];i.push([s,n])}}}return i}(t,Gr))}function Jr(t,e,i,s){return Yr(function(t,e,i,s,n,r){const o=[];let a=Math.abs(s/2),l=Math.abs(n/2);a+=t.randOffset(.05*a,r),l+=t.randOffset(.05*l,r);const d=r.hachureAngle;let h=r.hachureGap;h<=0&&(h=4*r.strokeWidth);let c=r.fillWeight;c<0&&(c=r.strokeWidth/2);const p=d%180*(Math.PI/180),u=Math.tan(p),f=l/a,_=Math.sqrt(f*u*f*u+1),m=f*u/_,g=1/_,y=h/(a*l/Math.sqrt(l*g*(l*g)+a*m*(a*m))/a);let b=Math.sqrt(a*a-(e-a+y)*(e-a+y));for(let t=e-a+y;t<e+a;t+=y){const s=Nr(t,i-(b=Math.sqrt(a*a-(e-t)*(e-t))),e,i,m,g,f),n=Nr(t,i+b,e,i,m,g,f);o.push([s,n])}return o}({randOffset:(t,e)=>Wr(-t,t)},t,e,i,s,Gr))}var Kr=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Qr=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCard=class extends pt{constructor(){super(...arguments),this.elevation=1,this.padding=10}render(){return N`
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
        `}slotChanged(){console.log("slot changed"),super.requestUpdate()}updated(){this.refreshElement()}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();this.padding=(e.width+e.height)/100;const i=this.padding,s=2*i,n=i,r=e.width-s,o=e.height-s,a=Math.min(Math.max(1,this.elevation),5),l=r+(a-1)*n+s,d=o+(a-1)*n+s;t.setAttribute("width",`${l}`),t.setAttribute("height",`${d}`),qr(t,i,i,r,o);for(let e=1;e<a;e++)Br(t,e*n,o+e*n,r+e*n,o+e*n).style.opacity=`${(85-10*e)/100}`,Br(t,r+e*n,o+e*n,r+e*n,e*n).style.opacity=`${(85-10*e)/100}`,Br(t,e*n,o+e*n,r+e*n,o+e*n).style.opacity=`${(85-10*e)/100}`,Br(t,r+e*n,o+e*n,r+e*n,e*n).style.opacity=`${(85-10*e)/100}`;this.classList.add("wired-rendered")}},Kr([et({type:Number}),Qr("design:type",Object)],t.WiredCard.prototype,"elevation",void 0),Kr([et({type:Number}),Qr("design:type",Object)],t.WiredCard.prototype,"padding",void 0),t.WiredCard=Kr([Q("wired-card")],t.WiredCard);var Zr=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},to=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredPages=class extends pt{constructor(){super(),this.page=""}connectedCallback(){super.connectedCallback()}render(){return N`
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
        `}refreshElement(){}pagesHaveChanged(){console.log("-------- PAGES HAVE CHANGED."),!this.slotElement&&this.shadowRoot}updated(t){t.has("page")&&(console.log("Page has changed."),this.pageChanged())}pageChanged(){window.dispatchEvent(new Event("resize"))}},Zr([et({type:String}),to("design:type",Object)],t.WiredPages.prototype,"page",void 0),Zr([it("slot"),to("design:type",HTMLSlotElement)],t.WiredPages.prototype,"slotElement",void 0),t.WiredPages=Zr([Q("wired-pages"),to("design:paramtypes",[])],t.WiredPages),t.WiredPage=class extends pt{constructor(){super()}connectedCallback(){super.connectedCallback()}render(){return N`
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
        `}refreshElement(){}},t.WiredPage=Zr([Q("wired-page"),to("design:paramtypes",[])],t.WiredPage);var eo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredApp=class extends pt{render(){return N`
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
        `}refreshElement(){}},t.WiredApp=eo([Q("wired-app")],t.WiredApp);var io=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},so=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredButton=class extends pt{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return lt`

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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),r=i.height+2*(s-1);e.setAttribute("width",`${n}`),e.setAttribute("height",`${r}`),qr(e,0,0,i.width,i.height);for(let t=1;t<s;t++)Br(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Br(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`,Br(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Br(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){this.requestUpdate()}},io([et({type:Number}),so("design:type",Object)],t.WiredButton.prototype,"elevation",void 0),io([et({type:Boolean,reflect:!0}),so("design:type",Object)],t.WiredButton.prototype,"disabled",void 0),t.WiredButton=io([Q("wired-button")],t.WiredButton);var no=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ro=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCheckbox=class extends pt{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=24,s=24;e.setAttribute("width",`${i}`),e.setAttribute("height",`${s}`),qr(e,0,0,i,s);const n=[];n.push(Br(e,.3*i,.4*s,.5*i,.7*s)),n.push(Br(e,.5*i,.7*s,i+5,-5)),n.forEach(t=>{t.style.strokeWidth="2.5"}),this.checked?n.forEach(t=>{t.style.display=""}):n.forEach(t=>{t.style.display="none"}),this.classList.add("wired-rendered")}refreshElement(){}},no([et({type:Boolean}),ro("design:type",Object)],t.WiredCheckbox.prototype,"checked",void 0),no([et({type:Boolean,reflect:!0}),ro("design:type",Object)],t.WiredCheckbox.prototype,"disabled",void 0),t.WiredCheckbox=no([Q("wired-checkbox")],t.WiredCheckbox);var oo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ao=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredItem=class extends pt{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}render(){return N`
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
        `}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){this.refreshElement()}refreshElement(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const t=this.getBoundingClientRect();this.svg.setAttribute("width",`${t.width}`),this.svg.setAttribute("height",`${t.height}`);const e=Xr([[0,0],[t.width,0],[t.width,t.height],[0,t.height]]);this.svg.appendChild(e)}}},oo([et(),ao("design:type",Object)],t.WiredItem.prototype,"value",void 0),oo([et(),ao("design:type",Object)],t.WiredItem.prototype,"name",void 0),oo([et({type:Boolean}),ao("design:type",Object)],t.WiredItem.prototype,"selected",void 0),oo([it("svg"),ao("design:type",SVGSVGElement)],t.WiredItem.prototype,"svg",void 0),t.WiredItem=oo([Q("wired-item")],t.WiredItem);var lo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ho=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCombo=class extends pt{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext();break;case 27:t.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:t.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:t.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",qr(e,0,0,s.width,s.height);const n=s.width-4;qr(e,n,0,34,s.height);const r=Math.max(0,Math.abs((s.height-24)/2)),o=Vr(e,[[n+8,5+r],[n+26,5+r],[n+17,r+Math.min(s.height,18)]]);if(o.style.fill="currentColor",o.style.pointerEvents=this.disabled?"none":"auto",o.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}setCardShowing(t){this.cardShowing=t;const e=this.shadowRoot.getElementById("card");e.style.display=t?"":"none",t&&setTimeout(()=>{e.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach(t=>{const e=t;e.requestUpdate&&e.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(t){t.stopPropagation(),this.setCardShowing(!this.cardShowing)}refreshElement(){}},lo([et({type:Object}),ho("design:type",Object)],t.WiredCombo.prototype,"value",void 0),lo([et({type:String}),ho("design:type",String)],t.WiredCombo.prototype,"selected",void 0),lo([et({type:Boolean,reflect:!0}),ho("design:type",Object)],t.WiredCombo.prototype,"disabled",void 0),t.WiredCombo=lo([Q("wired-combo")],t.WiredCombo);const co={},po=ur`
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
</custom-style>`;po.setAttribute("style","display: none;"),document.head.appendChild(po.content);var uo=document.createElement("style");uo.textContent="[hidden] { display: none !important; }",document.head.appendChild(uo),Yn({_template:ur`
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
`,is:"app-drawer",properties:{opened:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},persistent:{type:Boolean,value:!1,reflectToAttribute:!0},transitionDuration:{type:Number,value:200},align:{type:String,value:"left"},position:{type:String,readOnly:!0,reflectToAttribute:!0},swipeOpen:{type:Boolean,value:!1,reflectToAttribute:!0},noFocusTrap:{type:Boolean,value:!1},disableSwipe:{type:Boolean,value:!1}},observers:["resetLayout(position, isAttached)","_resetPosition(align, isAttached)","_styleTransitionDuration(transitionDuration)","_openedPersistentChanged(opened, persistent)"],_translateOffset:0,_trackDetails:null,_drawerState:0,_boundEscKeydownHandler:null,_firstTabStop:null,_lastTabStop:null,attached:function(){yn(this,function(){this._boundEscKeydownHandler=this._escKeydownHandler.bind(this),this.addEventListener("keydown",this._tabKeydownHandler.bind(this)),this.listen(this,"track","_track"),this.setScrollDirection("y")}),this.fire("app-reset-layout")},detached:function(){document.removeEventListener("keydown",this._boundEscKeydownHandler)},open:function(){this.opened=!0},close:function(){this.opened=!1},toggle:function(){this.opened=!this.opened},getWidth:function(){return this._savedWidth||this.$.contentContainer.offsetWidth},_isRTL:function(){return"rtl"===window.getComputedStyle(this).direction},_resetPosition:function(){switch(this.align){case"start":return void this._setPosition(this._isRTL()?"right":"left");case"end":return void this._setPosition(this._isRTL()?"left":"right")}this._setPosition(this.align)},_escKeydownHandler:function(t){27===t.keyCode&&(t.preventDefault(),this.close())},_track:function(t){if(!this.persistent&&!this.disableSwipe)switch(t.preventDefault(),t.detail.state){case"start":this._trackStart(t);break;case"track":this._trackMove(t);break;case"end":this._trackEnd(t)}},_trackStart:function(t){this._drawerState=this._DRAWER_STATE.TRACKING;var e=this.$.contentContainer.getBoundingClientRect();this._savedWidth=e.width,"left"===this.position?this._translateOffset=e.left:this._translateOffset=e.right-window.innerWidth,this._trackDetails=[],this._styleTransitionDuration(0),this.style.visibility="visible"},_trackMove:function(t){this._translateDrawer(t.detail.dx+this._translateOffset),this._trackDetails.push({dx:t.detail.dx,timeStamp:Date.now()})},_trackEnd:function(t){var e=t.detail.dx+this._translateOffset,i=this.getWidth(),s="left"===this.position?e>=0||e<=-i:e<=0||e>=i;if(!s){var n=this._trackDetails;if(this._trackDetails=null,this._flingDrawer(t,n),this._drawerState===this._DRAWER_STATE.FLINGING)return}var r=i/2;t.detail.dx<-r?this.opened="right"===this.position:t.detail.dx>r&&(this.opened="left"===this.position),s?this.debounce("_resetDrawerState",this._resetDrawerState):this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration),this._styleTransitionDuration(this.transitionDuration),this._resetDrawerTranslate(),this.style.visibility=""},_calculateVelocity:function(t,e){for(var i,s=Date.now(),n=s-100,r=0,o=e.length-1;r<=o;){var a=r+o>>1,l=e[a];l.timeStamp>=n?(i=l,o=a-1):r=a+1}return i?(t.detail.dx-i.dx)/(s-i.timeStamp||1):0},_flingDrawer:function(t,e){var i=this._calculateVelocity(t,e);if(!(Math.abs(i)<this._MIN_FLING_THRESHOLD)){this._drawerState=this._DRAWER_STATE.FLINGING;var s,n=t.detail.dx+this._translateOffset,r=this.getWidth(),o="left"===this.position,a=i>0;s=!a&&o?-(n+r):a&&!o?r-n:-n,a?(i=Math.max(i,this._MIN_TRANSITION_VELOCITY),this.opened="left"===this.position):(i=Math.min(i,-this._MIN_TRANSITION_VELOCITY),this.opened="right"===this.position);var l=this._FLING_INITIAL_SLOPE*s/i;this._styleTransitionDuration(l),this._styleTransitionTimingFunction(this._FLING_TIMING_FUNCTION),this._resetDrawerTranslate(),this.debounce("_resetDrawerState",this._resetDrawerState,l)}},_styleTransitionDuration:function(t){this.style.transitionDuration=t+"ms",this.$.contentContainer.style.transitionDuration=t+"ms",this.$.scrim.style.transitionDuration=t+"ms"},_styleTransitionTimingFunction:function(t){this.$.contentContainer.style.transitionTimingFunction=t,this.$.scrim.style.transitionTimingFunction=t},_translateDrawer:function(t){var e=this.getWidth();"left"===this.position?(t=Math.max(-e,Math.min(t,0)),this.$.scrim.style.opacity=1+t/e):(t=Math.max(0,Math.min(t,e)),this.$.scrim.style.opacity=1-t/e),this.translate3d(t+"px","0","0",this.$.contentContainer)},_resetDrawerTranslate:function(){this.$.scrim.style.opacity="",this.transform("",this.$.contentContainer)},_resetDrawerState:function(){var t=this._drawerState;t===this._DRAWER_STATE.FLINGING&&(this._styleTransitionDuration(this.transitionDuration),this._styleTransitionTimingFunction(""),this.style.visibility=""),this._savedWidth=null,this.opened?this._drawerState=this.persistent?this._DRAWER_STATE.OPENED_PERSISTENT:this._DRAWER_STATE.OPENED:this._drawerState=this._DRAWER_STATE.CLOSED,t!==this._drawerState&&(this._drawerState===this._DRAWER_STATE.OPENED?(this._setKeyboardFocusTrap(),document.addEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow="hidden"):(document.removeEventListener("keydown",this._boundEscKeydownHandler),document.body.style.overflow=""),t!==this._DRAWER_STATE.INIT&&this.fire("app-drawer-transitioned"))},resetLayout:function(){this.fire("app-reset-layout")},_setKeyboardFocusTrap:function(){if(!this.noFocusTrap){var t=['a[href]:not([tabindex="-1"])','area[href]:not([tabindex="-1"])','input:not([disabled]):not([tabindex="-1"])','select:not([disabled]):not([tabindex="-1"])','textarea:not([disabled]):not([tabindex="-1"])','button:not([disabled]):not([tabindex="-1"])','iframe:not([tabindex="-1"])','[tabindex]:not([tabindex="-1"])','[contentEditable=true]:not([tabindex="-1"])'].join(","),e=jn(this).querySelectorAll(t);e.length>0?(this._firstTabStop=e[0],this._lastTabStop=e[e.length-1]):(this._firstTabStop=null,this._lastTabStop=null);var i=this.getAttribute("tabindex");i&&parseInt(i,10)>-1?this.focus():this._firstTabStop&&this._firstTabStop.focus()}},_tabKeydownHandler:function(t){if(!this.noFocusTrap){this._drawerState===this._DRAWER_STATE.OPENED&&9===t.keyCode&&(t.shiftKey?this._firstTabStop&&jn(t).localTarget===this._firstTabStop&&(t.preventDefault(),this._lastTabStop.focus()):this._lastTabStop&&jn(t).localTarget===this._lastTabStop&&(t.preventDefault(),this._firstTabStop.focus()))}},_openedPersistentChanged:function(t,e){this.toggleClass("visible",t&&!e,this.$.scrim),this.debounce("_resetDrawerState",this._resetDrawerState,this.transitionDuration)},_MIN_FLING_THRESHOLD:.2,_MIN_TRANSITION_VELOCITY:1.2,_FLING_TIMING_FUNCTION:"cubic-bezier(0.667, 1, 0.667, 1)",_FLING_INITIAL_SLOPE:1.5,_DRAWER_STATE:{INIT:0,OPENED:1,OPENED_PERSISTENT:2,CLOSED:3,TRACKING:4,FLINGING:5}}),Yn({is:"iron-media-query",properties:{queryMatches:{type:Boolean,value:!1,readOnly:!0,notify:!0},query:{type:String,observer:"queryChanged"},full:{type:Boolean,value:!1},_boundMQHandler:{value:function(){return this.queryHandler.bind(this)}},_mq:{value:null}},attached:function(){this.style.display="none",this.queryChanged()},detached:function(){this._remove()},_add:function(){this._mq&&this._mq.addListener(this._boundMQHandler)},_remove:function(){this._mq&&this._mq.removeListener(this._boundMQHandler),this._mq=null},queryChanged:function(){this._remove();var t=this.query;t&&(this.full||"("===t[0]||(t="("+t+")"),this._mq=window.matchMedia(t),this._add(),this.queryHandler(this._mq))},queryHandler:function(t){this._setQueryMatches(t.matches)}});const fo=[kr,{listeners:{"app-reset-layout":"_appResetLayoutHandler","iron-resize":"resetLayout"},attached:function(){this.fire("app-reset-layout")},_appResetLayoutHandler:function(t){jn(t).path[0]!==this&&(this.resetLayout(),t.stopPropagation())},_updateLayoutStates:function(){console.error("unimplemented")},resetLayout:function(){var t=this._updateLayoutStates.bind(this);this._layoutDebouncer=ds.debounce(this._layoutDebouncer,fi,t),cs(this._layoutDebouncer),this._notifyDescendantResize()},_notifyLayoutChanged:function(){var t=this;requestAnimationFrame(function(){t.fire("app-reset-layout")})},_notifyDescendantResize:function(){this.isAttached&&this._interestedResizables.forEach(function(t){this.resizerShouldNotify(t)&&this._notifyDescendant(t)},this)}}];Yn({_template:ur`
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
`,is:"app-drawer-layout",behaviors:[fo],properties:{forceNarrow:{type:Boolean,value:!1},responsiveWidth:{type:String,value:"640px"},narrow:{type:Boolean,reflectToAttribute:!0,readOnly:!0,notify:!0},openedWhenNarrow:{type:Boolean,value:!1},_drawerPosition:{type:String}},listeners:{click:"_clickHandler"},observers:["_narrowChanged(narrow)"],get drawer(){return jn(this.$.drawerSlot).getDistributedNodes()[0]},attached:function(){var t=this.drawer;t&&t.setAttribute("no-transition","")},_clickHandler:function(t){var e=jn(t).localTarget;if(e&&e.hasAttribute("drawer-toggle")){var i=this.drawer;i&&!i.persistent&&i.toggle()}},_updateLayoutStates:function(){var t=this.drawer;this.isAttached&&t&&(this._drawerPosition=this.narrow?null:t.position,this._drawerNeedsReset&&(this.narrow?(t.opened=this.openedWhenNarrow,t.persistent=!1):t.opened=t.persistent=!0,t.hasAttribute("no-transition")&&yn(this,function(){t.removeAttribute("no-transition")}),this._drawerNeedsReset=!1))},_narrowChanged:function(){this._drawerNeedsReset=!0,this.resetLayout()},_onQueryMatchesChanged:function(t){this._setNarrow(t.detail.value)},_computeMediaQuery:function(t,e){return t?"(min-width: 0px)":"(max-width: "+e+")"}});const _o=document.createElement("template");_o.setAttribute("style","display: none;"),_o.innerHTML='<dom-module id="app-grid-style">\n  <template>\n    <style>\n      :host {\n        /**\n         * The width for the expandible item is:\n         * ((100% - subPixelAdjustment) / columns * itemColumns - gutter\n         *\n         * - subPixelAdjustment: 0.1px (Required for IE 11)\n         * - gutter: var(--app-grid-gutter)\n         * - columns: var(--app-grid-columns)\n         * - itemColumn: var(--app-grid-expandible-item-columns)\n         */\n        --app-grid-expandible-item: {\n          -webkit-flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          flex-basis: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n          max-width: calc((100% - 0.1px) / var(--app-grid-columns, 1) * var(--app-grid-expandible-item-columns, 1) - var(--app-grid-gutter, 0px)) !important;\n        };\n      }\n\n      .app-grid {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n\n        padding-top: var(--app-grid-gutter, 0px);\n        padding-left: var(--app-grid-gutter, 0px);\n        box-sizing: border-box;\n      }\n\n      .app-grid > * {\n        /* Required for IE 10 */\n        -ms-flex: 1 1 100%;\n        -webkit-flex: 1;\n        flex: 1;\n\n        /* The width for an item is: (100% - subPixelAdjustment - gutter * columns) / columns */\n        -webkit-flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        flex-basis: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n\n        max-width: calc((100% - 0.1px - (var(--app-grid-gutter, 0px) * var(--app-grid-columns, 1))) / var(--app-grid-columns, 1));\n        margin-bottom: var(--app-grid-gutter, 0px);\n        margin-right: var(--app-grid-gutter, 0px);\n        height: var(--app-grid-item-height);\n        box-sizing: border-box;\n      }\n\n      .app-grid[has-aspect-ratio] > * {\n        position: relative;\n      }\n\n      .app-grid[has-aspect-ratio] > *::before {\n        display: block;\n        content: "";\n        padding-top: var(--app-grid-item-height, 100%);\n      }\n\n      .app-grid[has-aspect-ratio] > * > * {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(_o.content);const mo=[{properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(t,e){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),e)if("document"===t)this.scrollTarget=this._doc;else if("string"==typeof t){var i=this.domHost;this.scrollTarget=i&&i.$?i.$[t]:jn(this.ownerDocument).querySelector("#"+t)}else this._isValidScrollTarget()&&(this._oldScrollTarget=t,this._toggleScrollListener(this._shouldHaveListener,t))},_scrollHandler:function(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(t){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=t)},set _scrollLeft(t){this.scrollTarget===this._doc?window.scrollTo(t,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=t)},scroll:function(t,e){var i;"object"==typeof t?(i=t.left,e=t.top):i=t,i=i||0,e=e||0,this.scrollTarget===this._doc?window.scrollTo(i,e):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=i,this.scrollTarget.scrollTop=e)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(t,e){var i=e===this._doc?window:e;t?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),i.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(i.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(t){this._shouldHaveListener=t,this._toggleScrollListener(t,this.scrollTarget)}},{properties:{effects:{type:String},effectsConfig:{type:Object,value:function(){return{}}},disabled:{type:Boolean,reflectToAttribute:!0,value:!1},threshold:{type:Number,value:0},thresholdTriggered:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0}},observers:["_effectsChanged(effects, effectsConfig, isAttached)"],_updateScrollState:function(t){},isOnScreen:function(){return!1},isContentBelow:function(){return!1},_effectsRunFn:null,_effects:null,get _clampedScrollTop(){return Math.max(0,this._scrollTop)},attached:function(){this._scrollStateChanged()},detached:function(){this._tearDownEffects()},createEffect:function(t,e){var i=co[t];if(!i)throw new ReferenceError(this._getUndefinedMsg(t));var s=this._boundEffect(i,e||{});return s.setUp(),s},_effectsChanged:function(t,e,i){this._tearDownEffects(),t&&i&&(t.split(" ").forEach(function(t){var i;""!==t&&((i=co[t])?this._effects.push(this._boundEffect(i,e[t])):console.warn(this._getUndefinedMsg(t)))},this),this._setUpEffect())},_layoutIfDirty:function(){return this.offsetWidth},_boundEffect:function(t,e){e=e||{};var i=parseFloat(e.startsAt||0),s=parseFloat(e.endsAt||1),n=s-i,r=function(){},o=0===i&&1===s?t.run:function(e,s){t.run.call(this,Math.max(0,(e-i)/n),s)};return{setUp:t.setUp?t.setUp.bind(this,e):r,run:t.run?o.bind(this):r,tearDown:t.tearDown?t.tearDown.bind(this):r}},_setUpEffect:function(){this.isAttached&&this._effects&&(this._effectsRunFn=[],this._effects.forEach(function(t){!1!==t.setUp()&&this._effectsRunFn.push(t.run)},this))},_tearDownEffects:function(){this._effects&&this._effects.forEach(function(t){t.tearDown()}),this._effectsRunFn=[],this._effects=[]},_runEffects:function(t,e){this._effectsRunFn&&this._effectsRunFn.forEach(function(i){i(t,e)})},_scrollHandler:function(){this._scrollStateChanged()},_scrollStateChanged:function(){if(!this.disabled){var t=this._clampedScrollTop;this._updateScrollState(t),this.threshold>0&&this._setThresholdTriggered(t>=this.threshold)}},_getDOMRef:function(t){console.warn("_getDOMRef","`"+t+"` is undefined")},_getUndefinedMsg:function(t){return"Scroll effect `"+t+"` is undefined. Did you forget to import app-layout/app-scroll-effects/effects/"+t+".html ?"}}];Yn({_template:ur`
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
`,is:"app-header",behaviors:[mo,fo],properties:{condenses:{type:Boolean,value:!1},fixed:{type:Boolean,value:!1},reveals:{type:Boolean,value:!1},shadow:{type:Boolean,reflectToAttribute:!0,value:!1}},observers:["_configChanged(isAttached, condenses, fixed)"],_height:0,_dHeight:0,_stickyElTop:0,_stickyElRef:null,_top:0,_progress:0,_wasScrollingDown:!1,_initScrollTop:0,_initTimestamp:0,_lastTimestamp:0,_lastScrollTop:0,get _maxHeaderTop(){return this.fixed?this._dHeight:this._height+5},get _stickyEl(){if(this._stickyElRef)return this._stickyElRef;for(var t,e=jn(this.$.slot).getDistributedNodes(),i=0;t=e[i];i++)if(t.nodeType===Node.ELEMENT_NODE){if(t.hasAttribute("sticky")){this._stickyElRef=t;break}this._stickyElRef||(this._stickyElRef=t)}return this._stickyElRef},_configChanged:function(){this.resetLayout(),this._notifyLayoutChanged()},_updateLayoutStates:function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var t=this._clampedScrollTop,e=0===this._height||0===t,i=this.disabled;this._height=this.offsetHeight,this._stickyElRef=null,this.disabled=!0,e||this._updateScrollState(0,!0),this._mayMove()?this._dHeight=this._stickyEl?this._height-this._stickyEl.offsetHeight:0:this._dHeight=0,this._stickyElTop=this._stickyEl?this._stickyEl.offsetTop:0,this._setUpEffect(),e?this._updateScrollState(t,!0):(this._updateScrollState(this._lastScrollTop,!0),this._layoutIfDirty()),this.disabled=i}},_updateScrollState:function(t,e){if(0!==this._height){var i=0,s=0,n=this._top,r=(this._lastScrollTop,this._maxHeaderTop),o=t-this._lastScrollTop,a=Math.abs(o),l=t>this._lastScrollTop,d=performance.now();if(this._mayMove()&&(s=this._clamp(this.reveals?n+o:t,0,r)),t>=this._dHeight&&(s=this.condenses&&!this.fixed?Math.max(this._dHeight,s):s,this.style.transitionDuration="0ms"),this.reveals&&!this.disabled&&a<100&&((d-this._initTimestamp>300||this._wasScrollingDown!==l)&&(this._initScrollTop=t,this._initTimestamp=d),t>=r))if(Math.abs(this._initScrollTop-t)>30||a>10){l&&t>=r?s=r:!l&&t>=this._dHeight&&(s=this.condenses&&!this.fixed?this._dHeight:0);var h=o/(d-this._lastTimestamp);this.style.transitionDuration=this._clamp((s-n)/h,0,300)+"ms"}else s=this._top;i=0===this._dHeight?t>0?1:0:s/this._dHeight,e||(this._lastScrollTop=t,this._top=s,this._wasScrollingDown=l,this._lastTimestamp=d),(e||i!==this._progress||n!==s||0===t)&&(this._progress=i,this._runEffects(i,s),this._transformHeader(s))}},_mayMove:function(){return this.condenses||!this.fixed},willCondense:function(){return this._dHeight>0&&this.condenses},isOnScreen:function(){return 0!==this._height&&this._top<this._height},isContentBelow:function(){return 0===this._top?this._clampedScrollTop>0:this._clampedScrollTop-this._maxHeaderTop>=0},_transformHeader:function(t){this.translate3d(0,-t+"px",0),this._stickyEl&&this.translate3d(0,this.condenses&&t>=this._stickyElTop?Math.min(t,this._dHeight)-this._stickyElTop+"px":0,0,this._stickyEl)},_clamp:function(t,e,i){return Math.min(i,Math.max(e,t))},_ensureBgContainers:function(){this._bgContainer||(this._bgContainer=document.createElement("div"),this._bgContainer.id="background",this._bgRear=document.createElement("div"),this._bgRear.id="backgroundRearLayer",this._bgContainer.appendChild(this._bgRear),this._bgFront=document.createElement("div"),this._bgFront.id="backgroundFrontLayer",this._bgContainer.appendChild(this._bgFront),jn(this.root).insertBefore(this._bgContainer,this.$.contentContainer))},_getDOMRef:function(t){switch(t){case"backgroundFrontLayer":return this._ensureBgContainers(),this._bgFront;case"backgroundRearLayer":return this._ensureBgContainers(),this._bgRear;case"background":return this._ensureBgContainers(),this._bgContainer;case"mainTitle":return jn(this).querySelector("[main-title]");case"condensedTitle":return jn(this).querySelector("[condensed-title]")}return null},getScrollState:function(){return{progress:this._progress,top:this._top}}}),Yn({_template:ur`
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
`,is:"app-header-layout",behaviors:[fo],properties:{hasScrollingRegion:{type:Boolean,value:!1,reflectToAttribute:!0}},observers:["resetLayout(isAttached, hasScrollingRegion)"],get header(){return jn(this.$.headerSlot).getDistributedNodes()[0]},_updateLayoutStates:function(){var t=this.header;if(this.isAttached&&t){this.$.wrapper.classList.remove("initializing"),t.scrollTarget=this.hasScrollingRegion?this.$.contentContainer:this.ownerDocument.documentElement;var e=t.offsetHeight;this.hasScrollingRegion?(t.style.left="",t.style.right=""):requestAnimationFrame(function(){var e=this.getBoundingClientRect(),i=document.documentElement.clientWidth-e.right;t.style.left=e.left+"px",t.style.right=i+"px"}.bind(this));var i=this.$.contentContainer.style;t.fixed&&!t.condenses&&this.hasScrollingRegion?(i.marginTop=e+"px",i.paddingTop=""):(i.paddingTop=e+"px",i.marginTop="")}}}),Yn({_template:ur`
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
`,is:"app-toolbar"}),Yn({_template:ur`
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
`,is:"app-box",behaviors:[mo,kr],listeners:{"iron-resize":"_resizeHandler"},_progress:0,attached:function(){this.resetLayout()},_debounceRaf:function(t){var e=this;this._raf&&window.cancelAnimationFrame(this._raf),this._raf=window.requestAnimationFrame(function(){e._raf=null,t.call(e)})},resetLayout:function(){this._debounceRaf(function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var t=this._clampedScrollTop,e=this.disabled;this.disabled=!0,this._elementTop=this._getElementTop(),this._elementHeight=this.offsetHeight,this._cachedScrollTargetHeight=this._scrollTargetHeight,this._setUpEffect(),this._updateScrollState(t),this.disabled=e}})},_getElementTop:function(){for(var t=this,e=0;t&&t!==this.scrollTarget;)e+=t.offsetTop,t=t.offsetParent;return e},_updateScrollState:function(t){if(this.isOnScreen()){var e=this._elementTop-t;this._progress=1-(e+this._elementHeight)/this._cachedScrollTargetHeight,this._runEffects(this._progress,t)}},isOnScreen:function(){return this._elementTop<this._scrollTop+this._cachedScrollTargetHeight&&this._elementTop+this._elementHeight>this._scrollTop},_resizeHandler:function(){this.resetLayout()},_getDOMRef:function(t){return"background"===t?this.$.background:"backgroundFrontLayer"===t?this.$.backgroundFrontLayer:void 0},getScrollState:function(){return{progress:this._progress}}});var go=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},yo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredDrawer=class extends pt{constructor(){super(),this.align="left",console.log("Constructing the drawer.")}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.shadowRoot?(this.drawer=this.shadowRoot.getElementById("drawer"),console.log("DRAWER: ",this.drawer),this.drawer||console.log("Could not find the drawer.")):console.log("There is no shadow root.")},2e3)}open(){this.drawer?this.drawer.open():console.log("There is no drawer.")}render(){return N`
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
        `}refreshElement(){}},go([et({type:String}),yo("design:type",Object)],t.WiredDrawer.prototype,"align",void 0),t.WiredDrawer=go([Q("wired-drawer"),yo("design:paramtypes",[])],t.WiredDrawer),window.navigator.userAgent.match("Trident")&&(DOMTokenList.prototype.toggle=function(t,e){return void 0===e||e?this.add(t):this.remove(t),void 0===e||e});const bo=lt`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,vo=document.createElement("link");vo.rel="stylesheet",vo.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(vo);var wo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let xo=class extends ht{render(){return N`<slot></slot>`}};xo.styles=bo,xo=wo([Q("mwc-icon")],xo);var So=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Co=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredFab=class extends pt{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),i=Math.min(e.width,e.height);t.setAttribute("width",`${i}`),t.setAttribute("height",`${i}`);const s=Jr(i/2,i/2,i,i);t.appendChild(s),this.classList.add("wired-rendered")}},So([et({type:Boolean,reflect:!0}),Co("design:type",Object)],t.WiredFab.prototype,"disabled",void 0),t.WiredFab=So([Q("wired-fab")],t.WiredFab);var ko=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredHelper=class extends pt{render(){return N`
            <style>
                :host {
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }

            </style>
            ${this.debug?N`<wired-button @click="${()=>this.refresh()}">Refresh</wired-button>`:""}
        `}setupOnloadRefresh(){window.onload=(()=>{setTimeout(()=>{this.refresh()},5e3)})}refresh(){console.log("refreshing element render"),window.dispatchEvent(new Event("resize"))}refreshElement(){}},t.WiredHelper=ko([Q("wired-helper")],t.WiredHelper);var Po=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Eo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredIconButton=class extends pt{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`),Ur(e,s/2,s/2,s,s),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}refreshElement(){}},Po([et({type:Boolean,reflect:!0}),Eo("design:type",Object)],t.WiredIconButton.prototype,"disabled",void 0),t.WiredIconButton=Po([Q("wired-icon-button")],t.WiredIconButton);var To=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ro=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredInput=class extends pt{constructor(){super(...arguments),this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.disabled=!1,this.required=!1,this.autofocus=!1,this.readonly=!1}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.refreshElement.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.refreshElement())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(t,e,i,s){let n=0;return()=>{const r=arguments,o=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||t.apply(s,r)},e),o&&t.apply(s,r)}}render(){return N`
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
        `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get input(){return this.shadowRoot?this.shadowRoot.getElementById("txt"):null}get value(){const t=this.input;return t&&t.value||""}set value(t){if(this.shadowRoot){const e=this.input;e&&(e.value=t)}else this.pendingValue=t}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),i=e.height-4-1,s=e.width-4-1;t.setAttribute("width",`${e.width+4}`),t.setAttribute("height",`${e.height+4}`),qr(t,2,2,s,i),void 0!==this.pendingValue&&(this.input.value=this.pendingValue,delete this.pendingValue),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}onChange(t){t.stopPropagation(),this.fireEvent(t.type,{sourceEvent:t})}},To([et({type:String}),Ro("design:type",Object)],t.WiredInput.prototype,"placeholder",void 0),To([et({type:String}),Ro("design:type",String)],t.WiredInput.prototype,"name",void 0),To([et({type:String}),Ro("design:type",String)],t.WiredInput.prototype,"min",void 0),To([et({type:String}),Ro("design:type",String)],t.WiredInput.prototype,"max",void 0),To([et({type:String}),Ro("design:type",String)],t.WiredInput.prototype,"step",void 0),To([et({type:String}),Ro("design:type",Object)],t.WiredInput.prototype,"type",void 0),To([et({type:String}),Ro("design:type",Object)],t.WiredInput.prototype,"autocomplete",void 0),To([et({type:String}),Ro("design:type",Object)],t.WiredInput.prototype,"autocapitalize",void 0),To([et({type:String}),Ro("design:type",Object)],t.WiredInput.prototype,"autocorrect",void 0),To([et({type:Boolean,reflect:!0}),Ro("design:type",Object)],t.WiredInput.prototype,"disabled",void 0),To([et({type:Boolean}),Ro("design:type",Object)],t.WiredInput.prototype,"required",void 0),To([et({type:Boolean}),Ro("design:type",Object)],t.WiredInput.prototype,"autofocus",void 0),To([et({type:Boolean}),Ro("design:type",Object)],t.WiredInput.prototype,"readonly",void 0),To([et({type:Number}),Ro("design:type",Number)],t.WiredInput.prototype,"minlength",void 0),To([et({type:Number}),Ro("design:type",Number)],t.WiredInput.prototype,"maxlength",void 0),To([et({type:Number}),Ro("design:type",Number)],t.WiredInput.prototype,"size",void 0),t.WiredInput=To([Q("wired-input")],t.WiredInput);var Oo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredLayout=class extends pt{render(){return N`
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
        `}},t.WiredLayout=Oo([Q("wired-layout")],t.WiredLayout);var No=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ao=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredListbox=class extends pt{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}render(){return N`
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
        `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){this.refreshElement()}addNodes(t){if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];if("WIRED-ITEM"===i.tagName)i.setAttribute("role","option"),this.itemNodes.push(i),console.log("Added WiredItem: ",i);else if("SLOT"===i.tagName){console.log("found slot: ",i);const t=i.assignedNodes();this.addNodes(t)}}}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();if(t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),qr(t,0,0,e.width,e.height),this.classList.add("wired-rendered"),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();this.addNodes(t)}}},No([et({type:Object}),Ao("design:type",Object)],t.WiredListbox.prototype,"value",void 0),No([et({type:String}),Ao("design:type",String)],t.WiredListbox.prototype,"selected",void 0),No([et({type:Boolean}),Ao("design:type",Object)],t.WiredListbox.prototype,"horizontal",void 0),t.WiredListbox=No([Q("wired-listbox")],t.WiredListbox);var Io=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Lo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredMenu=class extends pt{constructor(){super(),this.hide()}render(){return N`
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
        `}menuItemAdded(){console.log("Menu items changed."),setTimeout(()=>{if(this.shadowRoot){const t=this.shadowRoot.getElementById("menu-items");if(t){t.assignedNodes().forEach(t=>{t.addEventListener("click",()=>{const e=t;console.log("selected: ",e.value),this.fireEvent("selected",{selected:e.value}),e.selected=!0,setTimeout(()=>{e.selected=!1,this.hide()},300)})})}}},1e3)}hide(){console.log("hiding menu"),this.style.display="none"}show(){console.log("showing menu"),this.style.display="block"}refreshElement(){}},t.WiredMenu=Io([Q("wired-menu"),Lo("design:paramtypes",[])],t.WiredMenu);var Mo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Do=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredProgress=class extends pt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}render(){return N`
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
        `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}updated(){this.refreshElement()}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),this.box?t.appendChild(this.box):this.box=qr(t,0,0,e.width,e.height);let i=0;if(this.max>this.min){i=(this.value-this.min)/(this.max-this.min);const s=e.width*Math.max(0,Math.min(i,100)),n=Xr([[0,0],[s,0],[s,e.height],[0,e.height]]);t.appendChild(n),n.classList.add("progbox")}this.classList.add("wired-rendered")}},Mo([et({type:Number}),Do("design:type",Object)],t.WiredProgress.prototype,"value",void 0),Mo([et({type:Number}),Do("design:type",Object)],t.WiredProgress.prototype,"min",void 0),Mo([et({type:Number}),Do("design:type",Object)],t.WiredProgress.prototype,"max",void 0),Mo([et({type:Boolean}),Do("design:type",Object)],t.WiredProgress.prototype,"percentage",void 0),t.WiredProgress=Mo([Q("wired-progress")],t.WiredProgress);var zo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},jo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadio=class extends pt{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);this.dot=void 0;const i={width:this.iconsize||24,height:this.iconsize||24};e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Ur(e,i.width/2,i.height/2,i.width,i.height);const s=Math.max(.6*i.width,5),n=Math.max(.6*i.height,5);this.dot=Ur(e,i.width/2,i.height/2,s,n),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}refreshElement(){}},zo([et({type:Boolean}),jo("design:type",Object)],t.WiredRadio.prototype,"checked",void 0),zo([et({type:Boolean,reflect:!0}),jo("design:type",Object)],t.WiredRadio.prototype,"disabled",void 0),zo([et({type:String}),jo("design:type",String)],t.WiredRadio.prototype,"name",void 0),zo([et({type:Number}),jo("design:type",Object)],t.WiredRadio.prototype,"iconsize",void 0),t.WiredRadio=zo([Q("wired-radio")],t.WiredRadio);var Wo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Ho=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadioGroup=class extends pt{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return lt`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return N`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(t){const e=t.detail.checked,i=t.target,s=i.name||"";e?(this.selected=e&&s||"",this.fireSelected()):i.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const t=i.name||"";this.selected&&t===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(--i<0&&(i=t.length-1),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}selectNext(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(++i>=t.length&&(i=0),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}refreshElement(){}},Wo([et({type:String}),Ho("design:type",String)],t.WiredRadioGroup.prototype,"selected",void 0),t.WiredRadioGroup=Wo([Q("wired-radio-group")],t.WiredRadioGroup);var $o=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},Fo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSlider=class extends pt{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return lt`
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
    `}get value(){return this._value}set value(t){this.setValue(t,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.refreshElement()}updated(t){t.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(t,e=!1){this._value=t,this.setAriaValue(),this.onValueChange(),e||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const t=Math.min(this.max,Math.round(this.value+this.step));t!==this.value&&this.setValue(t)}decrement(){const t=Math.max(this.min,Math.round(this.value-this.step));t!==this.value&&this.setValue(t)}onValueChange(){if(!this.knob)return;let t=0;this.max>this.min&&(t=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=t,t?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const e=t*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(e)}px)`}knobdown(t){this.knobExpand(!0),t.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(t){this.knob&&(t?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(t){switch(t.stopPropagation(),t.detail.state){case"start":this.trackStart();break;case"track":this.trackX(t);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(t){this.dragging||this.trackStart();const e=t.detail.dx||0,i=Math.max(Math.min(this.startx+e,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(i)}px)`;const s=i/this.barWidth;this.intermediateValue=this.min+s*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}refreshElement(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`);const i=this.knobradius||10;this.barWidth=e.width-2*i,this.bar=Br(t,i,e.height/2,e.width-i,e.height/2),this.bar.classList.add("bar"),this.knobGroup=jr("g"),t.appendChild(this.knobGroup),this.knob=Ur(this.knobGroup,i,e.height/2,2*i,2*i),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),Fs(this.knob,"down",t=>{this.disabled||this.knobdown(t)}),Fs(this.knob,"up",()=>{this.disabled||this.resetKnob()}),Fs(this.knob,"track",t=>{this.disabled||this.onTrack(t)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}},$o([et({type:Number}),Fo("design:type",Object)],t.WiredSlider.prototype,"_value",void 0),$o([et({type:Number}),Fo("design:type",Object)],t.WiredSlider.prototype,"min",void 0),$o([et({type:Number}),Fo("design:type",Object)],t.WiredSlider.prototype,"max",void 0),$o([et({type:Number}),Fo("design:type",Object)],t.WiredSlider.prototype,"knobradius",void 0),$o([et({type:Boolean,reflect:!0}),Fo("design:type",Object)],t.WiredSlider.prototype,"disabled",void 0),t.WiredSlider=$o([Q("wired-slider")],t.WiredSlider);var Bo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},qo=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSpinner=class extends pt{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return lt`
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
    `}firstUpdated(){this.svg&&(Ur(this.svg,38,38,60,60),this.knob=Jr(0,0,20,20),this.knob.classList.add("knob"),this.svg.appendChild(this.knob)),this.updateCursor(),this.classList.add("wired-rendered")}updated(){this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(t=>this.tick(t))}tick(t){this.spinning?(this.timerstart||(this.timerstart=t),this.value=Math.min(1,(t-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}updateCursor(){if(this.knob){const t=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${t[0]}px, ${t[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}refreshElement(){}},Bo([et({type:Boolean}),qo("design:type",Object)],t.WiredSpinner.prototype,"spinning",void 0),Bo([et({type:Number}),qo("design:type",Object)],t.WiredSpinner.prototype,"duration",void 0),Bo([it("svg"),qo("design:type",SVGSVGElement)],t.WiredSpinner.prototype,"svg",void 0),t.WiredSpinner=Bo([Q("wired-spinner")],t.WiredSpinner);const Vo=(t,e)=>{const i=t.startNode.parentNode,s=void 0===e?t.endNode:e.startNode,n=i.insertBefore(u(),s);i.insertBefore(u(),s);const r=new v(t.options);return r.insertAfterNode(n),r},Uo=(t,e)=>(t.setValue(e),t.commit(),t),Yo=(t,e,i)=>{const s=t.startNode.parentNode,n=i?i.startNode:t.endNode,r=e.endNode.nextSibling;r!==n&&((t,e,i=null,s=null)=>{let n=e;for(;n!==i;){const e=n.nextSibling;t.insertBefore(n,s),n=e}})(s,e.startNode,r,n)},Go=t=>{n(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},Xo=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},Jo=new WeakMap,Ko=new WeakMap,Qo=(t=>(...i)=>{const s=t(...i);return e.set(s,!0),s})((t,e,i)=>{let s;return void 0===i?i=e:void 0!==e&&(s=e),e=>{if(!(e instanceof v))throw new Error("repeat can only be used in text bindings");const n=Jo.get(e)||[],r=Ko.get(e)||[],o=[],a=[],l=[];let d,h,c=0;for(const e of t)l[c]=s?s(e,c):c,a[c]=i(e,c),c++;let p=0,u=n.length-1,f=0,_=a.length-1;for(;p<=u&&f<=_;)if(null===n[p])p++;else if(null===n[u])u--;else if(r[p]===l[f])o[f]=Uo(n[p],a[f]),p++,f++;else if(r[u]===l[_])o[_]=Uo(n[u],a[_]),u--,_--;else if(r[p]===l[_])o[_]=Uo(n[p],a[_]),Yo(e,n[p],o[_+1]),p++,_--;else if(r[u]===l[f])o[f]=Uo(n[u],a[f]),Yo(e,n[u],n[p]),u--,f++;else if(void 0===d&&(d=Xo(l,f,_),h=Xo(r,p,u)),d.has(r[p]))if(d.has(r[u])){const t=h.get(l[f]),i=void 0!==t?n[t]:null;if(null===i){const t=Vo(e,n[p]);Uo(t,a[f]),o[f]=t}else o[f]=Uo(i,a[f]),Yo(e,i,n[p]),n[t]=null;f++}else Go(n[u]),u--;else Go(n[p]),p++;for(;f<=_;){const t=Vo(e,o[_+1]);Uo(t,a[f]),o[f++]=t}for(;p<=u;){const t=n[p++];null!==t&&Go(t)}Jo.set(e,o),Ko.set(e,l)}});var Zo=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ta=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTab=class extends pt{constructor(){super(...arguments),this.name="",this.label=""}static get styles(){return lt`
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
    `}relayout(){setTimeout(()=>{this.card&&this.card.requestUpdate()})}refreshElement(){}},Zo([et({type:String}),ta("design:type",Object)],t.WiredTab.prototype,"name",void 0),Zo([et({type:String}),ta("design:type",Object)],t.WiredTab.prototype,"label",void 0),Zo([it("wired-card"),ta("design:type",t.WiredCard)],t.WiredTab.prototype,"card",void 0),t.WiredTab=Zo([Q("wired-tab")],t.WiredTab),t.WizardTabs=class extends pt{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return lt`
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
    #bar {
      margin-left: 15px;
    }
    #tabs {
     height: 100%;
     }
    `}render(){return N`
    <div id="bar">
      ${Qo(this.pages,t=>t.name,t=>N`
      <wired-item role="tab" .value="${t.name}" .selected="${t.name===this.selected}" ?aria-selected="${t.name===this.selected}"
        @click="${()=>this.selected=t.name}">${t.label||t.name}</wired-item>
      `)}
    </div>
    <div id="tabs">
      <slot @slotchange="${this.mapPages()}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const t=this.slotElement.assignedNodes();if(t&&t.length){for(let e=0;e<t.length;e++){const i=t[e];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const t=i;this.pages.push(t);const e=t.getAttribute("name")||"";e&&e.trim().split(" ").forEach(e=>{e&&this.pageMap.set(e,t)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.getElement();for(let e=0;e<this.pages.length;e++){const i=this.pages[e];i===t?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=t||void 0,this.current&&this.current.relayout()}getElement(){let t=void 0;return this.selected&&(t=this.pageMap.get(this.selected)),t||(t=this.pages[0]),t||null}selectPrevious(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].name||""}}selectNext(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].name||""}}refreshElement(){}},Zo([et({type:String}),ta("design:type",String)],t.WizardTabs.prototype,"selected",void 0),Zo([it("slot"),ta("design:type",HTMLSlotElement)],t.WizardTabs.prototype,"slotElement",void 0),t.WizardTabs=Zo([Q("wired-tabs")],t.WizardTabs);var ea=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ia=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTextarea=class extends pt{constructor(){super(...arguments),this.rows=1,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.disabled=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1,this.tokens=[],this.prevHeight=0}static get styles(){return lt`
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
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get textarea(){return this.shadowRoot?this.shadowRoot.getElementById("textarea"):null}get mirror(){return this.shadowRoot.getElementById("mirror")}get value(){const t=this.textarea;return t&&t.value||""}set value(t){const e=this.textarea;e&&(e.value!==t&&(e.value=t||""),this.mirror.innerHTML=this.valueForMirror(),this.requestUpdate())}valueForMirror(){const t=this.textarea;return t?(this.tokens=t&&t.value?t.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this.constrain(this.tokens)):""}constrain(t){let e;for(t=t||[""],e=this.maxrows>0&&t.length>this.maxrows?t.slice(0,this.maxrows):t.slice(0);this.rows>0&&e.length<this.rows;)e.push("");return e.join("<br/>")+"&#160;"}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState(),this.refreshElement()}updateCached(){this.mirror.innerHTML=this.constrain(this.tokens)}onInput(){this.value=this.textarea.value}refreshElement(){const t=this.shadowRoot.getElementById("svg"),e=this.getBoundingClientRect();if(this.prevHeight!==e.height){for(;t.hasChildNodes();)t.removeChild(t.lastChild);t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),qr(t,2,2,e.width-2,e.height-2),this.prevHeight=e.height,this.classList.add("wired-rendered"),this.updateCached()}}},ea([et({type:Number}),ia("design:type",Object)],t.WiredTextarea.prototype,"rows",void 0),ea([et({type:Number}),ia("design:type",Object)],t.WiredTextarea.prototype,"maxrows",void 0),ea([et({type:String}),ia("design:type",Object)],t.WiredTextarea.prototype,"autocomplete",void 0),ea([et({type:Boolean}),ia("design:type",Object)],t.WiredTextarea.prototype,"autofocus",void 0),ea([et({type:Boolean,reflect:!0}),ia("design:type",Object)],t.WiredTextarea.prototype,"disabled",void 0),ea([et({type:String}),ia("design:type",Object)],t.WiredTextarea.prototype,"inputmode",void 0),ea([et({type:String}),ia("design:type",Object)],t.WiredTextarea.prototype,"placeholder",void 0),ea([et({type:Boolean}),ia("design:type",Object)],t.WiredTextarea.prototype,"required",void 0),ea([et({type:Boolean}),ia("design:type",Object)],t.WiredTextarea.prototype,"readonly",void 0),ea([et({type:Number}),ia("design:type",Number)],t.WiredTextarea.prototype,"minlength",void 0),ea([et({type:Number}),ia("design:type",Number)],t.WiredTextarea.prototype,"maxlength",void 0),t.WiredTextarea=ea([Q("wired-textarea")],t.WiredTextarea);var sa=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredTitle=class extends pt{render(){return N`
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
        `}refreshElement(){}},t.WiredTitle=sa([Q("wired-title")],t.WiredTitle);var na=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},ra=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredToggle=class extends pt{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","switch"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())});const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=80,i=34;t.setAttribute("width",`${e}`),t.setAttribute("height",`${i}`),qr(t,16,8,e-32,18),this.knob=jr("g"),this.knob.classList.add("knob"),t.appendChild(this.knob);const s=Jr(16,16,32,32);s.classList.add("knobfill"),this.knob.appendChild(s),Ur(this.knob,16,16,32,32),this.classList.add("wired-rendered")}updated(t){if(t.has("disabled")&&this.refreshDisabledState(),this.knob){const t=this.knob.classList;this.checked?(t.remove("unchecked"),t.add("checked")):(t.remove("checked"),t.add("unchecked"))}this.setAttribute("aria-checked",`${this.checked}`)}refreshElement(){}},na([et({type:Boolean}),ra("design:type",Object)],t.WiredToggle.prototype,"checked",void 0),na([et({type:Boolean,reflect:!0}),ra("design:type",Object)],t.WiredToggle.prototype,"disabled",void 0),t.WiredToggle=na([Q("wired-toggle")],t.WiredToggle);var oa=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};t.WiredToolbar=class extends pt{render(){return N`
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
        `}refreshElement(){}},t.WiredToolbar=oa([Q("wired-toolbar")],t.WiredToolbar);var aa=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o},la=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};return t.WiredTooltip=class extends pt{constructor(){super(...arguments),this.offset=14,this.position="bottom",this.dirty=!1,this.showing=!1,this._target=null,this.showHandler=this.show.bind(this),this.hideHandler=this.hide.bind(this)}static get styles(){return lt`
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
    `}get target(){if(this._target)return this._target;const t=this.parentNode,e=(this.getRootNode?this.getRootNode():null)||document;let i=null;return this.for?i=e.querySelector("#"+this.for):t&&(i=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.host:t),i}detachListeners(){this._target&&(this._target.removeEventListener("mouseenter",this.showHandler),this._target.removeEventListener("focus",this.showHandler),this._target.removeEventListener("mouseleave",this.hideHandler),this._target.removeEventListener("blur",this.hideHandler),this._target.removeEventListener("click",this.hideHandler)),this.removeEventListener("mouseenter",this.hideHandler)}attachListeners(){this._target&&(this._target.addEventListener("mouseenter",this.showHandler),this._target.addEventListener("focus",this.showHandler),this._target.addEventListener("mouseleave",this.hideHandler),this._target.addEventListener("blur",this.hideHandler),this._target.addEventListener("click",this.hideHandler)),this.addEventListener("mouseenter",this.hideHandler)}refreshTarget(){this.detachListeners(),this._target=null,this._target=this.target,this.attachListeners(),this.dirty=!0}layout(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();let i=e.width,s=e.height;switch(this.position){case"left":case"right":i+=this.offset;break;default:s+=this.offset}t.setAttribute("width",`${i}`),t.setAttribute("height",`${s}`);let n=[];switch(this.position){case"top":n=[[2,2],[i-2,2],[i-2,s-this.offset],[i/2+8,s-this.offset],[i/2,s-this.offset+8],[i/2-8,s-this.offset],[0,s-this.offset]];break;case"left":n=[[2,2],[i-this.offset,2],[i-this.offset,s/2-8],[i-this.offset+8,s/2],[i-this.offset,s/2+8],[i-this.offset,s],[2,s-2]];break;case"right":n=[[this.offset,2],[i-2,2],[i-2,s-2],[this.offset,s-2],[this.offset,s/2+8],[this.offset-8,s/2],[this.offset,s/2-8]],t.style.transform=`translateX(${-this.offset}px)`;break;default:n=[[2,this.offset],[0,s-2],[i-2,s-2],[i-2,this.offset],[i/2+8,this.offset],[i/2,this.offset-8],[i/2-8,this.offset]],t.style.transform=`translateY(${-this.offset}px)`}Vr(t,n),this.dirty=!1}firstUpdated(){this.layout()}updated(t){(t.has("position")||t.has("text"))&&(this.dirty=!0),this._target&&!t.has("for")||this.refreshTarget(),this.dirty&&this.layout()}show(){this.showing||(this.showing=!0,this.shadowRoot.getElementById("container").style.display="",this.updatePosition(),setTimeout(()=>{this.layout()},1))}hide(){this.showing&&(this.showing=!1,this.shadowRoot.getElementById("container").style.display="none")}updatePosition(){if(!this._target||!this.offsetParent)return;const t=this.offset,e=this.offsetParent.getBoundingClientRect(),i=this._target.getBoundingClientRect(),s=this.getBoundingClientRect(),n=(i.width-s.width)/2,r=(i.height-s.height)/2,o=i.left-e.left,a=i.top-e.top;let l,d;switch(this.position){case"top":l=o+n,d=a-s.height-t;break;case"bottom":l=o+n,d=a+i.height+t;break;case"left":l=o-s.width-t,d=a+r;break;case"right":l=o+i.width+t,d=a+r}this.style.left=l+"px",this.style.top=d+"px"}refreshElement(){}},aa([et({type:String}),la("design:type",String)],t.WiredTooltip.prototype,"for",void 0),aa([et({type:String}),la("design:type",String)],t.WiredTooltip.prototype,"text",void 0),aa([et({type:Number}),la("design:type",Object)],t.WiredTooltip.prototype,"offset",void 0),aa([et({type:String}),la("design:type",String)],t.WiredTooltip.prototype,"position",void 0),t.WiredTooltip=aa([Q("wired-tooltip")],t.WiredTooltip),t}({});
