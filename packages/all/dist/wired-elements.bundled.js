var WiredElements=function(t){"use strict";const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},o={},r={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${l}`),h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],o=e=>{const r=e.content,l=document.createTreeWalker(r,133,null,!1);let c=0;for(;l.nextNode();){i++;const e=l.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let o=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(a)>=0&&o++;for(;o-- >0;){const n=t.strings[s],o=f.exec(n)[2],r=o.toLowerCase()+h,a=e.getAttribute(r).split(d);this.parts.push({type:"attribute",index:i,name:o,strings:a}),e.removeAttribute(r),s+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const o=e.parentNode,r=t.split(d),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?u():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++i});""===r[a]?(o.insertBefore(u(),e),n.push(e)):e.data=r[a],s+=a}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&i!==c||(i++,t.insertBefore(u(),e)),c=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of n)t.parentNode.removeChild(t)}}const p=t=>-1!==t.index,u=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const o=t=>{const s=document.createTreeWalker(t,133,null,!1);let r=s.nextNode();for(;i<e.length&&null!==r;){const t=e[i];if(p(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===r.nodeName&&o(r.content),r=s.nextNode();else this._parts.push(void 0),i++}};return o(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class m{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=f.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+h+s[3]+a:t+l}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t);class v{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o||y(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=o,t(this)}this.value!==o&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=u()),t._insert(this.endNode=u())}insertAfterPart(t){t._insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}const t=this._pendingValue;t!==o&&(y(t)?t!==this.value&&this._commitText(t):t instanceof m?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const i=new g(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new w(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}if(this._pendingValue===o)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=o}}class S extends v{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends b{}let k=!1;try{const t={get capture(){return k=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class C{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}if(this._pendingValue===o)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=N(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=o}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(k?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const P=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new S(t,e.slice(1),i).parts:"@"===n?[new C(t,e.slice(1),s.eventContext)]:"?"===n?[new x(t,e.slice(1),i)]:new v(t,e,i).parts}handleTextExpression(t){return new w(t)}};function E(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(a);return void 0===(i=e.keyString.get(s))&&(i=new c(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const A=new Map,T=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const R=(t,...e)=>new m(t,e,"html",P),M=133;function O(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,M,null,!1);let o=j(s),r=s[o],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,r=s[o=j(s,o)]}d.forEach(t=>t.parentNode.removeChild(t))}const W=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,M,null,!1);for(;i.nextNode();)e++;return e},j=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};const V=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),L=!1);const I=t=>e=>{const i=V(e.type,t);let s=A.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},A.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const o=e.strings.join(a);if(void 0===(n=s.keyString.get(o))){const i=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,t),n=new c(e,i),s.keyString.set(o,n)}return s.stringsArray.set(e.strings,n),n},$=["html","svg"],z=new Set,B=(t,e,i)=>{z.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{$.forEach(e=>{const i=A.get(V(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),O(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,M,null,!1);let r=j(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=W(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=j(n,r);return}r=j(n,r)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),O(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const U={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},D=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:D},H=Promise.resolve(!0),F=1,X=4,J=8,G=16,Y=32;class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=H,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=D){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||U,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||U.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Y,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=q){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|J,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~J}}_attributeToProperty(t,e){if(this._updateState&J)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||q;this._updateState=this._updateState|G,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~G}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||q;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&G||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|X;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Y}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&F}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&F||(this._updateState=this._updateState|F,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}K.finalized=!0;const Z=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),Q=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),tt=(t,e,i)=>{e.constructor.createProperty(i,t)};function et(t){return(e,i)=>void 0!==i?tt(t,e,i):Q(t,e)}function it(t){return(e,i)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==i?st(s,e,i):nt(s,e)}}const st=(t,e,i)=>{Object.defineProperty(e,i,t)},nt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),ot="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class at{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(ot?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof at)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new at(i,rt)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const dt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class ht extends K{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){dt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ot?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof m&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ht.finalized=!0,ht.render=((t,e,i)=>{const s=i.scopeName,o=T.has(e),r=e instanceof ShadowRoot&&L&&t instanceof m,a=r&&!z.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=T.get(e);void 0===s&&(n(e,e.firstChild),T.set(e,s=new w(Object.assign({templateFactory:E},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:I(s)},i)),a){const t=T.get(l);T.delete(l),t.value instanceof g&&B(l,t.value.template,s),n(e,e.firstChild),e.appendChild(l),T.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)});class ct extends ht{fireEvent(t,e,i=!0,s=!0){if(t){const n={bubbles:"boolean"!=typeof i||i,composed:"boolean"!=typeof s||s};e&&(n.detail=e);const o=window.SlickCustomEvent||CustomEvent;this.dispatchEvent(new o(t,n))}}}class pt{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,n=0;const o=this.a,r=this.b,a=this.c;return Math.abs(r)>1e-5&&(e=-o/r,s=-a/r),Math.abs(t.b)>1e-5&&(i=-t.a/t.b,n=-t.c/t.b),e===Number.MAX_VALUE?i===Number.MAX_VALUE?-a/o==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+s,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(o)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===i?s===n&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-s)/(e-i),this.yi=e*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}class ut{constructor(t,e,i,s,n,o,r,a){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=i,this.right=s,this.gap=n,this.sinAngle=o,this.tanAngle=a,Math.abs(o)<1e-4?this.pos=i+n:Math.abs(o)>.9999?this.pos=t+n:(this.deltaX=(e-t)*Math.abs(a),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(n/r),this.sLeft=new pt([i,e],[i,t]),this.sRight=new pt([s,e],[s,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,i=this.bottom,s=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new pt([t,i],[e,s]);this.sLeft&&n.intersects(this.sLeft)&&(t=n.xi,i=n.yi),this.sRight&&n.intersects(this.sRight)&&(e=n.xi,s=n.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const o=[t,i,e,s];return this.pos+=this.hGap,o}}return null}}function ft(t,e){const i=[],s=new pt([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const n=new pt(e[t],e[(t+1)%e.length]);s.intersects(n)&&i.push([s.xi,s.yi])}return i}function gt(t,e,i,s,n,o,r){return[-i*o-s*n+i+o*t+n*e,r*(i*n-s*o)+s+-r*n*t+r*o*e]}const mt=2,yt=1,vt=.85,bt=0,wt=9;class xt{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(t,e){this.p=`${this.p}M ${t} ${e} `}bcurveTo(t,e,i,s,n,o){this.p=`${this.p}C ${t} ${e}, ${i} ${s}, ${n} ${o} `}}function St(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg",t);if(e)for(const t in e)i.setAttributeNS(null,t,e[t]);return i}function _t(t,e){return yt*(Math.random()*(e-t)+t)}function kt(t,e,i,s,n){const o=Math.pow(t-i,2)+Math.pow(e-s,2);let r=mt;r*r*100>o&&(r=Math.sqrt(o)/10);const a=r/2,l=.2+.2*Math.random();let d=vt*mt*(s-e)/200,h=vt*mt*(t-i)/200;d=_t(-d,d),h=_t(-h,h);const c=n||new xt;return c.moveTo(t+_t(-r,r),e+_t(-r,r)),c.bcurveTo(d+t+(i-t)*l+_t(-r,r),h+e+(s-e)*l+_t(-r,r),d+t+2*(i-t)*l+_t(-r,r),h+e+2*(s-e)*l+_t(-r,r),i+_t(-r,r),s+_t(-r,r)),c.moveTo(t+_t(-a,a),e+_t(-a,a)),c.bcurveTo(d+t+(i-t)*l+_t(-a,a),h+e+(s-e)*l+_t(-a,a),d+t+2*(i-t)*l+_t(-a,a),h+e+2*(s-e)*l+_t(-a,a),i+_t(-a,a),s+_t(-a,a)),c}function Ct(t,e,i,s,n=!1,o=!1,r){r=r||new xt;const a=Math.pow(t-i,2)+Math.pow(e-s,2);let l=mt;l*l*100>a&&(l=Math.sqrt(a)/10);const d=l/2,h=.2+.2*Math.random();let c=vt*mt*(s-e)/200,p=vt*mt*(t-i)/200;return c=_t(-c,c),p=_t(-p,p),n&&r.moveTo(t+_t(-l,l),e+_t(-l,l)),o?r.bcurveTo(c+t+(i-t)*h+_t(-d,d),p+e+(s-e)*h+_t(-d,d),c+t+2*(i-t)*h+_t(-d,d),p+e+2*(s-e)*h+_t(-d,d),i+_t(-d,d),s+_t(-d,d)):r.bcurveTo(c+t+(i-t)*h+_t(-l,l),p+e+(s-e)*h+_t(-l,l),c+t+2*(i-t)*h+_t(-l,l),p+e+2*(s-e)*h+_t(-l,l),i+_t(-l,l),s+_t(-l,l)),r}function Nt(t,e,i,s,n,o,r,a){const l=_t(-.5,.5)-Math.PI/2,d=[];d.push([_t(-o,o)+e+.9*s*Math.cos(l-t),_t(-o,o)+i+.9*n*Math.sin(l-t)]);for(let r=l;r<2*Math.PI+l-.01;r+=t)d.push([_t(-o,o)+e+s*Math.cos(r),_t(-o,o)+i+n*Math.sin(r)]);return d.push([_t(-o,o)+e+s*Math.cos(l+2*Math.PI+.5*r),_t(-o,o)+i+n*Math.sin(l+2*Math.PI+.5*r)]),d.push([_t(-o,o)+e+.98*s*Math.cos(l+r),_t(-o,o)+i+.98*n*Math.sin(l+r)]),d.push([_t(-o,o)+e+.9*s*Math.cos(l+.5*r),_t(-o,o)+i+.9*n*Math.sin(l+.5*r)]),function(t,e){const i=t.length;let s=e||new xt;if(i>3){const e=[],n=1-bt;s.moveTo(t[1][0],t[1][1]);for(let o=1;o+2<i;o++){const i=t[o];e[0]=[i[0],i[1]],e[1]=[i[0]+(n*t[o+1][0]-n*t[o-1][0])/6,i[1]+(n*t[o+1][1]-n*t[o-1][1])/6],e[2]=[t[o+1][0]+(n*t[o][0]-n*t[o+2][0])/6,t[o+1][1]+(n*t[o][1]-n*t[o+2][1])/6],e[3]=[t[o+1][0],t[o+1][1]],s.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[3][0],e[3][1])}}else 3===i?(s.moveTo(t[0][0],t[0][1]),s.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1])):2===i&&(s=kt(t[0][0],t[0][1],t[1][0],t[1][1],s));return s}(d,a)}function Pt(t,e,i,s,n){const o=St("path",{d:kt(e,i,s,n).value});return t.appendChild(o),o}function Et(t,e,i,s,n){n-=4;let o=kt(e+=2,i+=2,e+(s-=4),i);o=kt(e+s,i,e+s,i+n,o),o=kt(e+s,i+n,e,i+n,o);const r=St("path",{d:(o=kt(e,i+n,e,i,o)).value});return t.appendChild(r),r}function At(t,e){let i;const s=e.length;if(s>2)for(let t=0;t<2;t++){let n=!0;for(let t=1;t<s;t++)i=Ct(e[t-1][0],e[t-1][1],e[t][0],e[t][1],n,t>0,i),n=!1;i=Ct(e[s-1][0],e[s-1][1],e[0][0],e[0][1],n,t>0,i)}else i=2===s?kt(e[0][0],e[0][1],e[1][0],e[1][1]):new xt;const n=St("path",{d:i.value});return t.appendChild(n),n}function Tt(t,e,i,s,n){s=Math.max(s>10?s-4:s-1,1),n=Math.max(n>10?n-4:n-1,1);const o=2*Math.PI/wt;let r=Math.abs(s/2),a=Math.abs(n/2),l=Nt(o,e,i,r+=_t(.05*-r,.05*r),a+=_t(.05*-a,.05*a),1,o*_t(.1,_t(.4,1)));const d=St("path",{d:(l=Nt(o,e,i,r,a,1.5,0,l)).value});return t.appendChild(d),d}function Rt(t){const e=St("g");let i=null;return t.forEach(t=>{Pt(e,t[0][0],t[0][1],t[1][0],t[1][1]),i&&Pt(e,i[0],i[1],t[0][0],t[0][1]),i=t[1]}),e}const Mt={bowing:vt,curveStepCount:wt,curveTightness:bt,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:mt,roughness:yt,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function Ot(t){return Rt(function(t,e){const i=[];if(t&&t.length){let s=t[0][0],n=t[0][0],o=t[0][1],r=t[0][1];for(let e=1;e<t.length;e++)s=Math.min(s,t[e][0]),n=Math.max(n,t[e][0]),o=Math.min(o,t[e][1]),r=Math.max(r,t[e][1]);const a=e.hachureAngle;let l=e.hachureGap;l<0&&(l=4*e.strokeWidth),l=Math.max(l,.1);const d=a%180*(Math.PI/180),h=Math.cos(d),c=Math.sin(d),p=Math.tan(d),u=new ut(o-1,r+1,s-1,n+1,l,c,h,p);let f;for(;null!=(f=u.nextLine());){const e=ft(f,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const s=e[t],n=e[t+1];i.push([s,n])}}}return i}(t,Mt))}function Wt(t,e,i,s){return Rt(function(t,e,i,s,n,o){const r=[];let a=Math.abs(s/2),l=Math.abs(n/2);a+=t.randOffset(.05*a,o),l+=t.randOffset(.05*l,o);const d=o.hachureAngle;let h=o.hachureGap;h<=0&&(h=4*o.strokeWidth);let c=o.fillWeight;c<0&&(c=o.strokeWidth/2);const p=d%180*(Math.PI/180),u=Math.tan(p),f=l/a,g=Math.sqrt(f*u*f*u+1),m=f*u/g,y=1/g,v=h/(a*l/Math.sqrt(l*y*(l*y)+a*m*(a*m))/a);let b=Math.sqrt(a*a-(e-a+v)*(e-a+v));for(let t=e-a+v;t<e+a;t+=v){const s=gt(t,i-(b=Math.sqrt(a*a-(e-t)*(e-t))),e,i,m,y,f),n=gt(t,i+b,e,i,m,y,f);r.push([s,n])}return r}({randOffset:(t,e)=>_t(-t,t)},t,e,i,s,Mt))}var jt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Vt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredButton=class extends ct{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return lt`
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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),n=i.width+2*(s-1),o=i.height+2*(s-1);e.setAttribute("width",`${n}`),e.setAttribute("height",`${o}`),Et(e,0,0,i.width,i.height);for(let t=1;t<s;t++)Pt(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Pt(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`,Pt(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Pt(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},jt([et({type:Number}),Vt("design:type",Object)],t.WiredButton.prototype,"elevation",void 0),jt([et({type:Boolean,reflect:!0}),Vt("design:type",Object)],t.WiredButton.prototype,"disabled",void 0),t.WiredButton=jt([Z("wired-button")],t.WiredButton);var Lt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},It=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCard=class extends ct{constructor(){super(...arguments),this.elevation=1}static get styles(){return lt`
    :host {
      display: inline-block;
      position: relative;
      padding: 10px;
      opacity: 0;
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
    `}render(){return R`
    <div>
      <slot @slotchange="${()=>this.requestUpdate()}"></slot>
    </div>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.updated.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(t,e,i,s){let n=0;return()=>{const o=arguments,r=i&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,i||t.apply(s,o)},e),r&&t.apply(s,o)}}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),i=Math.min(Math.max(1,this.elevation),5),s=e.width+6*(i-1)+6,n=e.height+6*(i-1)+6;t.setAttribute("width",`${s}`),t.setAttribute("height",`${n}`),Et(t,6,6,e.width-12,e.height-12);for(let s=1;s<i;s++)Pt(t,6*s,e.height-12+6*s,e.width-12+6*s,e.height-12+6*s).style.opacity=`${(85-10*s)/100}`,Pt(t,e.width-12+6*s,e.height-12+6*s,e.width-12+6*s,6*s).style.opacity=`${(85-10*s)/100}`,Pt(t,6*s,e.height-12+6*s,e.width-12+6*s,e.height-12+6*s).style.opacity=`${(85-10*s)/100}`,Pt(t,e.width-12+6*s,e.height-12+6*s,e.width-12+6*s,6*s).style.opacity=`${(85-10*s)/100}`;this.classList.add("wired-rendered")}},Lt([et({type:Number}),It("design:type",Object)],t.WiredCard.prototype,"elevation",void 0),t.WiredCard=Lt([Z("wired-card")],t.WiredCard);var $t=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},zt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCheckbox=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=24,s=24;e.setAttribute("width",`${i}`),e.setAttribute("height",`${s}`),Et(e,0,0,i,s);const n=[];n.push(Pt(e,.3*i,.4*s,.5*i,.7*s)),n.push(Pt(e,.5*i,.7*s,i+5,-5)),n.forEach(t=>{t.style.strokeWidth="2.5"}),this.checked?n.forEach(t=>{t.style.display=""}):n.forEach(t=>{t.style.display="none"}),this.classList.add("wired-rendered")}},$t([et({type:Boolean}),zt("design:type",Object)],t.WiredCheckbox.prototype,"checked",void 0),$t([et({type:Boolean,reflect:!0}),zt("design:type",Object)],t.WiredCheckbox.prototype,"disabled",void 0),t.WiredCheckbox=$t([Z("wired-checkbox")],t.WiredCheckbox);var Bt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Ut=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredItem=class extends ct{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return lt`
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
    </button>`}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const t=this.getBoundingClientRect();this.svg.setAttribute("width",`${t.width}`),this.svg.setAttribute("height",`${t.height}`);const e=Ot([[0,0],[t.width,0],[t.width,t.height],[0,t.height]]);this.svg.appendChild(e)}}},Bt([et(),Ut("design:type",Object)],t.WiredItem.prototype,"value",void 0),Bt([et(),Ut("design:type",Object)],t.WiredItem.prototype,"name",void 0),Bt([et({type:Boolean}),Ut("design:type",Object)],t.WiredItem.prototype,"selected",void 0),Bt([it("svg"),Ut("design:type",SVGSVGElement)],t.WiredItem.prototype,"svg",void 0),t.WiredItem=Bt([Z("wired-item")],t.WiredItem);var Dt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},qt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCombo=class extends ct{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext();break;case 27:t.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:t.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:t.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Et(e,0,0,s.width,s.height);const n=s.width-4;Et(e,n,0,34,s.height);const o=Math.max(0,Math.abs((s.height-24)/2)),r=At(e,[[n+8,5+o],[n+26,5+o],[n+17,o+Math.min(s.height,18)]]);if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}setCardShowing(t){this.cardShowing=t;const e=this.shadowRoot.getElementById("card");e.style.display=t?"":"none",t&&setTimeout(()=>{e.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach(t=>{const e=t;e.requestUpdate&&e.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(t){t.stopPropagation(),this.setCardShowing(!this.cardShowing)}},Dt([et({type:Object}),qt("design:type",Object)],t.WiredCombo.prototype,"value",void 0),Dt([et({type:String}),qt("design:type",String)],t.WiredCombo.prototype,"selected",void 0),Dt([et({type:Boolean,reflect:!0}),qt("design:type",Object)],t.WiredCombo.prototype,"disabled",void 0),t.WiredCombo=Dt([Z("wired-combo")],t.WiredCombo);const Ht=new WeakMap,Ft=t=>"function"==typeof t&&Ht.has(t),Xt=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,Jt=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},Gt={},Yt={},Kt=`{{lit-${String(Math.random()).slice(2)}}}`,Zt=`\x3c!--${Kt}--\x3e`,Qt=new RegExp(`${Kt}|${Zt}`),te="$lit$";class ee{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],o=e=>{const r=e.content,a=document.createTreeWalker(r,133,null,!1);let l=0;for(;a.nextNode();){i++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let o=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(Kt)>=0&&o++;for(;o-- >0;){const n=t.strings[s],o=ne.exec(n)[2],r=o.toLowerCase()+te,a=e.getAttribute(r).split(Qt);this.parts.push({type:"attribute",index:i,name:o,strings:a}),e.removeAttribute(r),s+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(Kt)>=0){const o=e.parentNode,r=t.split(Qt),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?se():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++i});""===r[a]?(o.insertBefore(se(),e),n.push(e)):e.data=r[a],s+=a}}else if(8===e.nodeType)if(e.data===Kt){const t=e.parentNode;null!==e.previousSibling&&i!==l||(i++,t.insertBefore(se(),e)),l=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(Kt,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of n)t.parentNode.removeChild(t)}}const ie=t=>-1!==t.index,se=()=>document.createComment(""),ne=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class oe{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=Xt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,s=0;const n=t=>{const o=document.createTreeWalker(t,133,null,!1);let r=o.nextNode();for(;i<e.length&&null!==r;){const t=e[i];if(ie(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));i++}else s++,"TEMPLATE"===r.nodeName&&n(r.content),r=o.nextNode();else this._parts.push(void 0),i++}};return n(t),Xt&&(document.adoptNode(t),customElements.upgrade(t)),t}}class re{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=ne.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+te+s[3]+Kt:t+Zt}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const ae=t=>null===t||!("object"==typeof t||"function"==typeof t);class le{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new de(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class de{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===Gt||ae(t)&&t===this.value||(this.value=t,Ft(t)||(this.committer.dirty=!0))}commit(){for(;Ft(this.value);){const t=this.value;this.value=Gt,t(this)}this.value!==Gt&&this.committer.commit()}}class he{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(se()),this.endNode=t.appendChild(se())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=se()),t._insert(this.endNode=se())}insertAfterPart(t){t._insert(this.startNode=se()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;Ft(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Gt,t(this)}const t=this._pendingValue;t!==Gt&&(ae(t)?t!==this.value&&this._commitText(t):t instanceof re?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===Yt?(this.value=Yt,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof oe&&this.value.template===e)this.value.update(t.values);else{const i=new oe(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new he(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){Jt(this.startNode.parentNode,t.nextSibling,this.endNode)}}class ce{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;Ft(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Gt,t(this)}if(this._pendingValue===Gt)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=Gt}}class pe extends le{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new ue(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class ue extends de{}let fe=!1;try{const t={get capture(){return fe=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class ge{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;Ft(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Gt,t(this)}if(this._pendingValue===Gt)return;const t=this._pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=me(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=Gt}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const me=t=>t&&(fe?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const ye=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new pe(t,e.slice(1),i).parts:"@"===n?[new ge(t,e.slice(1),s.eventContext)]:"?"===n?[new ce(t,e.slice(1),i)]:new le(t,e,i).parts}handleTextExpression(t){return new he(t)}};function ve(t){let e=be.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},be.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(Kt);return void 0===(i=e.keyString.get(s))&&(i=new ee(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const be=new Map,we=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const xe=133;function Se(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,xe,null,!1);let o=ke(s),r=s[o],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,r=s[o=ke(s,o)]}d.forEach(t=>t.parentNode.removeChild(t))}const _e=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,xe,null,!1);for(;i.nextNode();)e++;return e},ke=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(ie(e))return i}return-1};const Ce=(t,e)=>`${t}--${e}`;let Ne=!0;void 0===window.ShadyCSS?Ne=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),Ne=!1);const Pe=t=>e=>{const i=Ce(e.type,t);let s=be.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},be.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const o=e.strings.join(Kt);if(void 0===(n=s.keyString.get(o))){const i=e.getTemplateElement();Ne&&window.ShadyCSS.prepareTemplateDom(i,t),n=new ee(e,i),s.keyString.set(o,n)}return s.stringsArray.set(e.strings,n),n},Ee=["html","svg"],Ae=new Set,Te=(t,e,i)=>{Ae.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{Ee.forEach(e=>{const i=be.get(Ce(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),Se(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,xe,null,!1);let r=ke(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=_e(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=ke(n,r);return}r=ke(n,r)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),Se(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const Re={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Me=(t,e)=>e!==t&&(e==e||t==t),Oe={attribute:!0,type:String,converter:Re,reflect:!1,hasChanged:Me},We=Promise.resolve(!0),je=1,Ve=4,Le=8,Ie=16,$e=32;class ze extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=We,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Oe){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=Me){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||Re,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||Re.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|$e,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Oe){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|Le,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~Le}}_attributeToProperty(t,e){if(this._updateState&Le)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||Oe;this._updateState=this._updateState|Ie,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Ie}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||Oe;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Ie||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Ve;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&$e}get _hasRequestedUpdate(){return this._updateState&Ve}get hasUpdated(){return this._updateState&je}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&je||(this._updateState=this._updateState|je,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Ve}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}ze.finalized=!0;const Be="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol();class De{constructor(t,e){if(e!==Ue)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Be?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const qe=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class He extends ze{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){qe(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Be?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof re&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}He.finalized=!0,He.render=((t,e,i)=>{const s=i.scopeName,n=we.has(e),o=e instanceof ShadowRoot&&Ne&&t instanceof re,r=o&&!Ae.has(s),a=r?document.createDocumentFragment():e;if(((t,e,i)=>{let s=we.get(e);void 0===s&&(Jt(e,e.firstChild),we.set(e,s=new he(Object.assign({templateFactory:ve},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:Pe(s)},i)),r){const t=we.get(a);we.delete(a),t.value instanceof oe&&Te(a,t.value.template,s),Jt(e,e.firstChild),e.appendChild(a),we.set(e,t)}!n&&o&&window.ShadyCSS.styleElement(e.host)}),window.navigator.userAgent.match("Trident")&&(DOMTokenList.prototype.toggle=function(t,e){return void 0===e||e?this.add(t):this.remove(t),void 0===e||e});const Fe=((t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof De)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new De(i,Ue)})`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,Xe=document.createElement("link");Xe.rel="stylesheet",Xe.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(Xe);var Je=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let Ge=class extends He{render(){return((t,...e)=>new re(t,e,"html",ye))`<slot></slot>`}};Ge.styles=Fe,Ge=Je([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e))("mwc-icon")],Ge);var Ye=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Ke=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredIconButton=class extends ct{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`),Tt(e,s/2,s/2,s,s),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},Ye([et({type:Boolean,reflect:!0}),Ke("design:type",Object)],t.WiredIconButton.prototype,"disabled",void 0),t.WiredIconButton=Ye([Z("wired-icon-button")],t.WiredIconButton);var Ze=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Qe=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredInput=class extends ct{constructor(){super(...arguments),this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.disabled=!1,this.required=!1,this.autofocus=!1,this.readonly=!1}static get styles(){return lt`
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
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get input(){return this.shadowRoot?this.shadowRoot.getElementById("txt"):null}get value(){const t=this.input;return t&&t.value||""}set value(t){if(this.shadowRoot){const e=this.input;e&&(e.value=t)}else this.pendingValue=t}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=i.height-4-1,n=i.width-4-1;e.setAttribute("width",`${i.width+4}`),e.setAttribute("height",`${i.height+4}`),Et(e,2,2,n,s),void 0!==this.pendingValue&&(this.input.value=this.pendingValue,delete this.pendingValue),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}onChange(t){t.stopPropagation(),this.fireEvent(t.type,{sourceEvent:t})}},Ze([et({type:String}),Qe("design:type",Object)],t.WiredInput.prototype,"placeholder",void 0),Ze([et({type:String}),Qe("design:type",String)],t.WiredInput.prototype,"name",void 0),Ze([et({type:String}),Qe("design:type",String)],t.WiredInput.prototype,"min",void 0),Ze([et({type:String}),Qe("design:type",String)],t.WiredInput.prototype,"max",void 0),Ze([et({type:String}),Qe("design:type",String)],t.WiredInput.prototype,"step",void 0),Ze([et({type:String}),Qe("design:type",Object)],t.WiredInput.prototype,"type",void 0),Ze([et({type:String}),Qe("design:type",Object)],t.WiredInput.prototype,"autocomplete",void 0),Ze([et({type:String}),Qe("design:type",Object)],t.WiredInput.prototype,"autocapitalize",void 0),Ze([et({type:String}),Qe("design:type",Object)],t.WiredInput.prototype,"autocorrect",void 0),Ze([et({type:Boolean,reflect:!0}),Qe("design:type",Object)],t.WiredInput.prototype,"disabled",void 0),Ze([et({type:Boolean}),Qe("design:type",Object)],t.WiredInput.prototype,"required",void 0),Ze([et({type:Boolean}),Qe("design:type",Object)],t.WiredInput.prototype,"autofocus",void 0),Ze([et({type:Boolean}),Qe("design:type",Object)],t.WiredInput.prototype,"readonly",void 0),Ze([et({type:Number}),Qe("design:type",Number)],t.WiredInput.prototype,"minlength",void 0),Ze([et({type:Number}),Qe("design:type",Number)],t.WiredInput.prototype,"maxlength",void 0),Ze([et({type:Number}),Qe("design:type",Number)],t.WiredInput.prototype,"size",void 0),t.WiredInput=Ze([Z("wired-input")],t.WiredInput);var ti=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},ei=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredListbox=class extends ct{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return lt`
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
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();if(t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),Et(t,0,0,e.width,e.height),this.classList.add("wired-rendered"),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}},ti([et({type:Object}),ei("design:type",Object)],t.WiredListbox.prototype,"value",void 0),ti([et({type:String}),ei("design:type",String)],t.WiredListbox.prototype,"selected",void 0),ti([et({type:Boolean}),ei("design:type",Object)],t.WiredListbox.prototype,"horizontal",void 0),t.WiredListbox=ti([Z("wired-listbox")],t.WiredListbox);var ii=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},si=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredProgress=class extends ct{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return lt`
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
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),this.box?t.appendChild(this.box):this.box=Et(t,0,0,e.width,e.height);let i=0;if(this.max>this.min){i=(this.value-this.min)/(this.max-this.min);const s=e.width*Math.max(0,Math.min(i,100)),n=Ot([[0,0],[s,0],[s,e.height],[0,e.height]]);t.appendChild(n),n.classList.add("progbox")}this.classList.add("wired-rendered")}},ii([et({type:Number}),si("design:type",Object)],t.WiredProgress.prototype,"value",void 0),ii([et({type:Number}),si("design:type",Object)],t.WiredProgress.prototype,"min",void 0),ii([et({type:Number}),si("design:type",Object)],t.WiredProgress.prototype,"max",void 0),ii([et({type:Boolean}),si("design:type",Object)],t.WiredProgress.prototype,"percentage",void 0),t.WiredProgress=ii([Z("wired-progress")],t.WiredProgress);var ni=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},oi=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadio=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);this.dot=void 0;const i={width:this.iconsize||24,height:this.iconsize||24};e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Tt(e,i.width/2,i.height/2,i.width,i.height);const s=Math.max(.6*i.width,5),n=Math.max(.6*i.height,5);this.dot=Tt(e,i.width/2,i.height/2,s,n),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}},ni([et({type:Boolean}),oi("design:type",Object)],t.WiredRadio.prototype,"checked",void 0),ni([et({type:Boolean,reflect:!0}),oi("design:type",Object)],t.WiredRadio.prototype,"disabled",void 0),ni([et({type:String}),oi("design:type",String)],t.WiredRadio.prototype,"name",void 0),ni([et({type:Number}),oi("design:type",Object)],t.WiredRadio.prototype,"iconsize",void 0),t.WiredRadio=ni([Z("wired-radio")],t.WiredRadio);var ri=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},ai=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadioGroup=class extends ct{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return lt`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return R`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(t){const e=t.detail.checked,i=t.target,s=i.name||"";e?(this.selected=e&&s||"",this.fireSelected()):i.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const t=i.name||"";this.selected&&t===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(--i<0&&(i=t.length-1),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}selectNext(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(++i>=t.length&&(i=0),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}},ri([et({type:String}),ai("design:type",String)],t.WiredRadioGroup.prototype,"selected",void 0),t.WiredRadioGroup=ri([Z("wired-radio-group")],t.WiredRadioGroup),window.JSCompiler_renameProperty=function(t,e){return t};let li=0,di=0,hi=[],ci=0,pi=document.createTextNode("");new window.MutationObserver(function(){const t=hi.length;for(let e=0;e<t;e++){let t=hi[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}hi.splice(0,t),di+=t}).observe(pi,{characterData:!0});const ui={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},fi={run:t=>(pi.textContent=ci++,hi.push(t),li++),cancel(t){const e=t-di;if(e>=0){if(!hi[e])throw new Error("invalid async handle: "+t);hi[e]=null}}};class gi{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,mi.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),mi.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,i){return t instanceof gi?t._cancelAsync():t=new gi,t.setConfig(e,i),t}}let mi=new Set;window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;(yi=document.baseURI||window.location.href).substring(0,yi.lastIndexOf("/")+1);var yi;window.Polymer&&window.Polymer.sanitizeDOMValue;let vi=!1;const bi=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:t=>t;let wi="string"==typeof document.head.style.touchAction,xi="__polymerGestures",Si="__polymerGesturesHandled",_i="__polymerGesturesTouchAction",ki=25,Ci=5,Ni=2500,Pi=["mousedown","mousemove","mouseup","click"],Ei=[0,1,4,2],Ai=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function Ti(t){return Pi.indexOf(t)>-1}let Ri=!1;function Mi(t){if(!Ti(t)&&"touchend"!==t)return wi&&Ri&&vi?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){Ri=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let Oi=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Wi=[],ji={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Vi={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Li(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let i=t.getRootNode();if(t.id){let s=i.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<s.length;t++)e.push(s[t])}}return e}let Ii=function(t){let e=t.sourceCapabilities;var i;if((!e||e.firesTouchEvents)&&(t[Si]={skip:!0},"click"===t.type)){let e=!1,s=qi(t);for(let t=0;t<s.length;t++){if(s[t].nodeType===Node.ELEMENT_NODE)if("label"===s[t].localName)Wi.push(s[t]);else if(i=s[t],ji[i.localName]){let i=Li(s[t]);for(let t=0;t<i.length;t++)e=e||Wi.indexOf(i[t])>-1}if(s[t]===Bi.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function $i(t){let e=Oi?["click"]:Pi;for(let i,s=0;s<e.length;s++)i=e[s],t?(Wi.length=0,document.addEventListener(i,Ii,!0)):document.removeEventListener(i,Ii,!0)}function zi(t){let e=t.type;if(!Ti(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!Ai&&(e=Ei[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let Bi={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Ui(t,e,i){t.movefn=e,t.upfn=i,document.addEventListener("mousemove",e),document.addEventListener("mouseup",i)}function Di(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){Bi.mouse.mouseIgnoreJob||$i(!0),Bi.mouse.target=qi(t)[0],Bi.mouse.mouseIgnoreJob=gi.debounce(Bi.mouse.mouseIgnoreJob,ui.after(Ni),function(){$i(),Bi.mouse.target=null,Bi.mouse.mouseIgnoreJob=null})},!!Ri&&{passive:!0});const qi=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],Hi={},Fi=[];function Xi(t){const e=qi(t);return e.length>0?e[0]:t.target}function Ji(t){let e,i=t.type,s=t.currentTarget[xi];if(!s)return;let n=s[i];if(n){if(!t[Si]&&(t[Si]={},"touch"===i.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===i&&1===t.touches.length&&(Bi.touch.id=e.identifier),Bi.touch.id!==e.identifier)return;wi||"touchstart"!==i&&"touchmove"!==i||function(t){let e=t.changedTouches[0],i=t.type;if("touchstart"===i)Bi.touch.x=e.clientX,Bi.touch.y=e.clientY,Bi.touch.scrollDecided=!1;else if("touchmove"===i){if(Bi.touch.scrollDecided)return;Bi.touch.scrollDecided=!0;let i=function(t){let e="auto",i=qi(t);for(let t,s=0;s<i.length;s++)if((t=i[s])[_i]){e=t[_i];break}return e}(t),s=!1,n=Math.abs(Bi.touch.x-e.clientX),o=Math.abs(Bi.touch.y-e.clientY);t.cancelable&&("none"===i?s=!0:"pan-x"===i?s=o>n:"pan-y"===i&&(s=n>o)),s?t.preventDefault():Zi("track")}}(t)}if(!(e=t[Si]).skip){for(let i,s=0;s<Fi.length;s++)n[(i=Fi[s]).name]&&!e[i.name]&&i.flow&&i.flow.start.indexOf(t.type)>-1&&i.reset&&i.reset();for(let s,o=0;o<Fi.length;o++)n[(s=Fi[o]).name]&&!e[s.name]&&(e[s.name]=!0,s[i](t))}}}function Gi(t,e,i){return!!Hi[e]&&(function(t,e,i){let s=Hi[e],n=s.deps,o=s.name,r=t[xi];r||(t[xi]=r={});for(let e,i,s=0;s<n.length;s++)e=n[s],Oi&&Ti(e)&&"click"!==e||((i=r[e])||(r[e]=i={_count:0}),0===i._count&&t.addEventListener(e,Ji,Mi(e)),i[o]=(i[o]||0)+1,i._count=(i._count||0)+1);t.addEventListener(e,i),s.touchAction&&function(t,e){wi&&t instanceof HTMLElement&&fi.run(()=>{t.style.touchAction=e});t[_i]=e}(t,s.touchAction)}(t,e,i),!0)}function Yi(t){Fi.push(t);for(let e=0;e<t.emits.length;e++)Hi[t.emits[e]]=t}function Ki(t,e,i){let s=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=i,bi(t).dispatchEvent(s),s.defaultPrevented){let t=i.preventer||i.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function Zi(t){let e=function(t){for(let e,i=0;i<Fi.length;i++){e=Fi[i];for(let i,s=0;s<e.emits.length;s++)if((i=e.emits[s])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function Qi(t,e,i,s){e&&Ki(e,t,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:s,prevent:function(t){return Zi(t)}})}function ts(t,e,i){if(t.prevent)return!1;if(t.started)return!0;let s=Math.abs(t.x-e),n=Math.abs(t.y-i);return s>=Ci||n>=Ci}function es(t,e,i){if(!e)return;let s,n=t.moves[t.moves.length-2],o=t.moves[t.moves.length-1],r=o.x-t.x,a=o.y-t.y,l=0;n&&(s=o.x-n.x,l=o.y-n.y),Ki(e,"track",{state:t.state,x:i.clientX,y:i.clientY,dx:r,dy:a,ddx:s,ddy:l,sourceEvent:i,hover:function(){return function(t,e){let i=document.elementFromPoint(t,e),s=i;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(t,e));)s&&(i=s);return i}(i.clientX,i.clientY)}})}function is(t,e,i){let s=Math.abs(e.clientX-t.x),n=Math.abs(e.clientY-t.y),o=Xi(i||e);!o||Vi[o.localName]&&o.hasAttribute("disabled")||(isNaN(s)||isNaN(n)||s<=ki&&n<=ki||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=Xi(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let i=e.getBoundingClientRect(),s=t.pageX,n=t.pageY;return!(s>=i.left&&s<=i.right&&n>=i.top&&n<=i.bottom)}return!1}(e))&&(t.prevent||Ki(o,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i}))}Yi({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Di(this.info)},mousedown:function(t){if(!zi(t))return;let e=Xi(t),i=this;Ui(this.info,function(t){zi(t)||(Qi("up",e,t),Di(i.info))},function(t){zi(t)&&Qi("up",e,t),Di(i.info)}),Qi("down",e,t)},touchstart:function(t){Qi("down",Xi(t),t.changedTouches[0],t)},touchend:function(t){Qi("up",Xi(t),t.changedTouches[0],t)}}),Yi({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Di(this.info)},mousedown:function(t){if(!zi(t))return;let e=Xi(t),i=this,s=function(t){let s=t.clientX,n=t.clientY;ts(i.info,s,n)&&(i.info.state=i.info.started?"mouseup"===t.type?"end":"track":"start","start"===i.info.state&&Zi("tap"),i.info.addMove({x:s,y:n}),zi(t)||(i.info.state="end",Di(i.info)),e&&es(i.info,e,t),i.info.started=!0)};Ui(this.info,s,function(t){i.info.started&&s(t),Di(i.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=Xi(t),i=t.changedTouches[0],s=i.clientX,n=i.clientY;ts(this.info,s,n)&&("start"===this.info.state&&Zi("tap"),this.info.addMove({x:s,y:n}),es(this.info,e,i),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=Xi(t),i=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),es(this.info,e,i))}}),Yi({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){zi(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){zi(t)&&is(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){is(this.info,t.changedTouches[0],t)}});var ss=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},ns=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSlider=class extends ct{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return lt`
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
    `}get value(){return this._value}set value(t){this.setValue(t,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`);const i=this.knobradius||10;this.barWidth=e.width-2*i,this.bar=Pt(t,i,e.height/2,e.width-i,e.height/2),this.bar.classList.add("bar"),this.knobGroup=St("g"),t.appendChild(this.knobGroup),this.knob=Tt(this.knobGroup,i,e.height/2,2*i,2*i),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),Gi(this.knob,"down",t=>{this.disabled||this.knobdown(t)}),Gi(this.knob,"up",()=>{this.disabled||this.resetKnob()}),Gi(this.knob,"track",t=>{this.disabled||this.onTrack(t)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}updated(t){t.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(t,e=!1){this._value=t,this.setAriaValue(),this.onValueChange(),e||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const t=Math.min(this.max,Math.round(this.value+this.step));t!==this.value&&this.setValue(t)}decrement(){const t=Math.max(this.min,Math.round(this.value-this.step));t!==this.value&&this.setValue(t)}onValueChange(){if(!this.knob)return;let t=0;this.max>this.min&&(t=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=t,t?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const e=t*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(e)}px)`}knobdown(t){this.knobExpand(!0),t.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(t){this.knob&&(t?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(t){switch(t.stopPropagation(),t.detail.state){case"start":this.trackStart();break;case"track":this.trackX(t);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(t){this.dragging||this.trackStart();const e=t.detail.dx||0,i=Math.max(Math.min(this.startx+e,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(i)}px)`;const s=i/this.barWidth;this.intermediateValue=this.min+s*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}},ss([et({type:Number}),ns("design:type",Object)],t.WiredSlider.prototype,"_value",void 0),ss([et({type:Number}),ns("design:type",Object)],t.WiredSlider.prototype,"min",void 0),ss([et({type:Number}),ns("design:type",Object)],t.WiredSlider.prototype,"max",void 0),ss([et({type:Number}),ns("design:type",Object)],t.WiredSlider.prototype,"knobradius",void 0),ss([et({type:Boolean,reflect:!0}),ns("design:type",Object)],t.WiredSlider.prototype,"disabled",void 0),t.WiredSlider=ss([Z("wired-slider")],t.WiredSlider);var os=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},rs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTextarea=class extends ct{constructor(){super(...arguments),this.rows=1,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.disabled=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1,this.tokens=[],this.prevHeight=0}static get styles(){return lt`
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
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get textarea(){return this.shadowRoot?this.shadowRoot.getElementById("textarea"):null}get mirror(){return this.shadowRoot.getElementById("mirror")}get value(){const t=this.textarea;return t&&t.value||""}set value(t){const e=this.textarea;e&&(e.value!==t&&(e.value=t||""),this.mirror.innerHTML=this.valueForMirror(),this.requestUpdate())}valueForMirror(){const t=this.textarea;return t?(this.tokens=t&&t.value?t.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this.constrain(this.tokens)):""}constrain(t){let e;for(t=t||[""],e=this.maxrows>0&&t.length>this.maxrows?t.slice(0,this.maxrows):t.slice(0);this.rows>0&&e.length<this.rows;)e.push("");return e.join("<br/>")+"&#160;"}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg"),i=this.getBoundingClientRect();if(this.prevHeight!==i.height){for(;e.hasChildNodes();)e.removeChild(e.lastChild);e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Et(e,2,2,i.width-2,i.height-2),this.prevHeight=i.height,this.classList.add("wired-rendered"),this.updateCached()}}updateCached(){this.mirror.innerHTML=this.constrain(this.tokens)}onInput(){this.value=this.textarea.value}},os([et({type:Number}),rs("design:type",Object)],t.WiredTextarea.prototype,"rows",void 0),os([et({type:Number}),rs("design:type",Object)],t.WiredTextarea.prototype,"maxrows",void 0),os([et({type:String}),rs("design:type",Object)],t.WiredTextarea.prototype,"autocomplete",void 0),os([et({type:Boolean}),rs("design:type",Object)],t.WiredTextarea.prototype,"autofocus",void 0),os([et({type:Boolean,reflect:!0}),rs("design:type",Object)],t.WiredTextarea.prototype,"disabled",void 0),os([et({type:String}),rs("design:type",Object)],t.WiredTextarea.prototype,"inputmode",void 0),os([et({type:String}),rs("design:type",Object)],t.WiredTextarea.prototype,"placeholder",void 0),os([et({type:Boolean}),rs("design:type",Object)],t.WiredTextarea.prototype,"required",void 0),os([et({type:Boolean}),rs("design:type",Object)],t.WiredTextarea.prototype,"readonly",void 0),os([et({type:Number}),rs("design:type",Number)],t.WiredTextarea.prototype,"minlength",void 0),os([et({type:Number}),rs("design:type",Number)],t.WiredTextarea.prototype,"maxlength",void 0),t.WiredTextarea=os([Z("wired-textarea")],t.WiredTextarea);var as=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},ls=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredToggle=class extends ct{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return lt`
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
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","switch"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())});const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=80,i=34;t.setAttribute("width",`${e}`),t.setAttribute("height",`${i}`),Et(t,16,8,e-32,18),this.knob=St("g"),this.knob.classList.add("knob"),t.appendChild(this.knob);const s=Wt(16,16,32,32);s.classList.add("knobfill"),this.knob.appendChild(s),Tt(this.knob,16,16,32,32),this.classList.add("wired-rendered")}updated(t){if(t.has("disabled")&&this.refreshDisabledState(),this.knob){const t=this.knob.classList;this.checked?(t.remove("unchecked"),t.add("checked")):(t.remove("checked"),t.add("unchecked"))}this.setAttribute("aria-checked",`${this.checked}`)}},as([et({type:Boolean}),ls("design:type",Object)],t.WiredToggle.prototype,"checked",void 0),as([et({type:Boolean,reflect:!0}),ls("design:type",Object)],t.WiredToggle.prototype,"disabled",void 0),t.WiredToggle=as([Z("wired-toggle")],t.WiredToggle);var ds=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},hs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTooltip=class extends ct{constructor(){super(...arguments),this.offset=14,this.position="bottom",this.dirty=!1,this.showing=!1,this._target=null,this.showHandler=this.show.bind(this),this.hideHandler=this.hide.bind(this)}static get styles(){return lt`
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
    `}get target(){if(this._target)return this._target;const t=this.parentNode,e=(this.getRootNode?this.getRootNode():null)||document;let i=null;return this.for?i=e.querySelector("#"+this.for):t&&(i=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.host:t),i}detachListeners(){this._target&&(this._target.removeEventListener("mouseenter",this.showHandler),this._target.removeEventListener("focus",this.showHandler),this._target.removeEventListener("mouseleave",this.hideHandler),this._target.removeEventListener("blur",this.hideHandler),this._target.removeEventListener("click",this.hideHandler)),this.removeEventListener("mouseenter",this.hideHandler)}attachListeners(){this._target&&(this._target.addEventListener("mouseenter",this.showHandler),this._target.addEventListener("focus",this.showHandler),this._target.addEventListener("mouseleave",this.hideHandler),this._target.addEventListener("blur",this.hideHandler),this._target.addEventListener("click",this.hideHandler)),this.addEventListener("mouseenter",this.hideHandler)}refreshTarget(){this.detachListeners(),this._target=null,this._target=this.target,this.attachListeners(),this.dirty=!0}layout(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();let i=e.width,s=e.height;switch(this.position){case"left":case"right":i+=this.offset;break;default:s+=this.offset}t.setAttribute("width",`${i}`),t.setAttribute("height",`${s}`);let n=[];switch(this.position){case"top":n=[[2,2],[i-2,2],[i-2,s-this.offset],[i/2+8,s-this.offset],[i/2,s-this.offset+8],[i/2-8,s-this.offset],[0,s-this.offset]];break;case"left":n=[[2,2],[i-this.offset,2],[i-this.offset,s/2-8],[i-this.offset+8,s/2],[i-this.offset,s/2+8],[i-this.offset,s],[2,s-2]];break;case"right":n=[[this.offset,2],[i-2,2],[i-2,s-2],[this.offset,s-2],[this.offset,s/2+8],[this.offset-8,s/2],[this.offset,s/2-8]],t.style.transform=`translateX(${-this.offset}px)`;break;default:n=[[2,this.offset],[0,s-2],[i-2,s-2],[i-2,this.offset],[i/2+8,this.offset],[i/2,this.offset-8],[i/2-8,this.offset]],t.style.transform=`translateY(${-this.offset}px)`}At(t,n),this.dirty=!1}firstUpdated(){this.layout()}updated(t){(t.has("position")||t.has("text"))&&(this.dirty=!0),this._target&&!t.has("for")||this.refreshTarget(),this.dirty&&this.layout()}show(){this.showing||(this.showing=!0,this.shadowRoot.getElementById("container").style.display="",this.updatePosition(),setTimeout(()=>{this.layout()},1))}hide(){this.showing&&(this.showing=!1,this.shadowRoot.getElementById("container").style.display="none")}updatePosition(){if(!this._target||!this.offsetParent)return;const t=this.offset,e=this.offsetParent.getBoundingClientRect(),i=this._target.getBoundingClientRect(),s=this.getBoundingClientRect(),n=(i.width-s.width)/2,o=(i.height-s.height)/2,r=i.left-e.left,a=i.top-e.top;let l,d;switch(this.position){case"top":l=r+n,d=a-s.height-t;break;case"bottom":l=r+n,d=a+i.height+t;break;case"left":l=r-s.width-t,d=a+o;break;case"right":l=r+i.width+t,d=a+o}this.style.left=l+"px",this.style.top=d+"px"}},ds([et({type:String}),hs("design:type",String)],t.WiredTooltip.prototype,"for",void 0),ds([et({type:String}),hs("design:type",String)],t.WiredTooltip.prototype,"text",void 0),ds([et({type:Number}),hs("design:type",Object)],t.WiredTooltip.prototype,"offset",void 0),ds([et({type:String}),hs("design:type",String)],t.WiredTooltip.prototype,"position",void 0),t.WiredTooltip=ds([Z("wired-tooltip")],t.WiredTooltip);const cs=new WeakMap,ps=t=>"function"==typeof t&&cs.has(t),us=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,fs=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},gs={},ms={},ys=`{{lit-${String(Math.random()).slice(2)}}}`,vs=`\x3c!--${ys}--\x3e`,bs="$lit$",ws=t=>-1!==t.index,xs=()=>document.createComment(""),Ss=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _s{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=us?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,s=0;const n=t=>{const o=document.createTreeWalker(t,133,null,!1);let r=o.nextNode();for(;i<e.length&&null!==r;){const t=e[i];if(ws(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));i++}else s++,"TEMPLATE"===r.nodeName&&n(r.content),r=o.nextNode();else this._parts.push(void 0),i++}};return n(t),us&&(document.adoptNode(t),customElements.upgrade(t)),t}}class ks{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=Ss.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+bs+s[3]+ys:t+vs}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const Cs=t=>null===t||!("object"==typeof t||"function"==typeof t);class Ns{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(xs()),this.endNode=t.appendChild(xs())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=xs()),t._insert(this.endNode=xs())}insertAfterPart(t){t._insert(this.startNode=xs()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;ps(this._pendingValue);){const t=this._pendingValue;this._pendingValue=gs,t(this)}const t=this._pendingValue;t!==gs&&(Cs(t)?t!==this.value&&this._commitText(t):t instanceof ks?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===ms?(this.value=ms,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _s&&this.value.template===e)this.value.update(t.values);else{const i=new _s(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new Ns(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){fs(this.startNode.parentNode,t.nextSibling,this.endNode)}}try{const t={get capture(){return!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const Ps=(t,e)=>{const i=t.startNode.parentNode,s=void 0===e?t.endNode:e.startNode,n=i.insertBefore(xs(),s);i.insertBefore(xs(),s);const o=new Ns(t.options);return o.insertAfterNode(n),o},Es=(t,e)=>(t.setValue(e),t.commit(),t),As=(t,e,i)=>{const s=t.startNode.parentNode,n=i?i.startNode:t.endNode,o=e.endNode.nextSibling;o!==n&&((t,e,i=null,s=null)=>{let n=e;for(;n!==i;){const e=n.nextSibling;t.insertBefore(n,s),n=e}})(s,e.startNode,o,n)},Ts=t=>{fs(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},Rs=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},Ms=new WeakMap,Os=new WeakMap,Ws=(t=>(...e)=>{const i=t(...e);return cs.set(i,!0),i})((t,e,i)=>{let s;return void 0===i?i=e:void 0!==e&&(s=e),e=>{if(!(e instanceof Ns))throw new Error("repeat can only be used in text bindings");const n=Ms.get(e)||[],o=Os.get(e)||[],r=[],a=[],l=[];let d,h,c=0;for(const e of t)l[c]=s?s(e,c):c,a[c]=i(e,c),c++;let p=0,u=n.length-1,f=0,g=a.length-1;for(;p<=u&&f<=g;)if(null===n[p])p++;else if(null===n[u])u--;else if(o[p]===l[f])r[f]=Es(n[p],a[f]),p++,f++;else if(o[u]===l[g])r[g]=Es(n[u],a[g]),u--,g--;else if(o[p]===l[g])r[g]=Es(n[p],a[g]),As(e,n[p],r[g+1]),p++,g--;else if(o[u]===l[f])r[f]=Es(n[u],a[f]),As(e,n[u],n[p]),u--,f++;else if(void 0===d&&(d=Rs(l,f,g),h=Rs(o,p,u)),d.has(o[p]))if(d.has(o[u])){const t=h.get(l[f]),i=void 0!==t?n[t]:null;if(null===i){const t=Ps(e,n[p]);Es(t,a[f]),r[f]=t}else r[f]=Es(i,a[f]),As(e,i,n[p]),n[t]=null;f++}else Ts(n[u]),u--;else Ts(n[p]),p++;for(;f<=g;){const t=Ps(e,r[g+1]);Es(t,a[f]),r[f++]=t}for(;p<=u;){const t=n[p++];null!==t&&Ts(t)}Ms.set(e,r),Os.set(e,l)}});var js=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Vs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTab=class extends ct{constructor(){super(...arguments),this.name="",this.label=""}static get styles(){return lt`
    :host {
      display: block;
    }
    wired-card > slot {
      display: block;
      padding: 10px;
    }
    `}render(){return R`
    <wired-card>
      <slot part="body"></slot>
    </wired-card>
    `}relayout(){setTimeout(()=>{this.card&&this.card.requestUpdate()})}},js([et({type:String}),Vs("design:type",Object)],t.WiredTab.prototype,"name",void 0),js([et({type:String}),Vs("design:type",Object)],t.WiredTab.prototype,"label",void 0),js([it("wired-card"),Vs("design:type",t.WiredCard)],t.WiredTab.prototype,"card",void 0),t.WiredTab=js([Z("wired-tab")],t.WiredTab),t.WizardTabs=class extends ct{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return lt`
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
    `}render(){return R`
    <div id="bar">
      ${Ws(this.pages,t=>t.name,t=>R`
      <wired-item role="tab" .value="${t.name}" .selected="${t.name===this.selected}" ?aria-selected="${t.name===this.selected}"
        @click="${()=>this.selected=t.name}">${t.label||t.name}</wired-item>
      `)}
    </div>
    <div>
      <slot id="slot" @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const t=this.slotElement.assignedNodes();if(t&&t.length){for(let e=0;e<t.length;e++){const i=t[e];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const t=i;this.pages.push(t);const e=t.getAttribute("name")||"";e&&e.trim().split(" ").forEach(e=>{e&&this.pageMap.set(e,t)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.getElement();for(let e=0;e<this.pages.length;e++){const i=this.pages[e];i===t?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=t||void 0,this.current&&this.current.relayout()}getElement(){let t=void 0;return this.selected&&(t=this.pageMap.get(this.selected)),t||(t=this.pages[0]),t||null}selectPrevious(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].name||""}}selectNext(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].name||""}}},js([et({type:String}),Vs("design:type",String)],t.WizardTabs.prototype,"selected",void 0),js([it("slot"),Vs("design:type",HTMLSlotElement)],t.WizardTabs.prototype,"slotElement",void 0),t.WizardTabs=js([Z("wired-tabs")],t.WizardTabs);const Ls=new WeakMap,Is=t=>"function"==typeof t&&Ls.has(t),$s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,zs=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},Bs={},Us={},Ds=`{{lit-${String(Math.random()).slice(2)}}}`,qs=`\x3c!--${Ds}--\x3e`,Hs=new RegExp(`${Ds}|${qs}`),Fs="$lit$";class Xs{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],o=e=>{const r=e.content,a=document.createTreeWalker(r,133,null,!1);let l=0;for(;a.nextNode();){i++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let o=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(Ds)>=0&&o++;for(;o-- >0;){const n=t.strings[s],o=Ys.exec(n)[2],r=o.toLowerCase()+Fs,a=e.getAttribute(r).split(Hs);this.parts.push({type:"attribute",index:i,name:o,strings:a}),e.removeAttribute(r),s+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(Ds)>=0){const o=e.parentNode,r=t.split(Hs),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?Gs():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++i});""===r[a]?(o.insertBefore(Gs(),e),n.push(e)):e.data=r[a],s+=a}}else if(8===e.nodeType)if(e.data===Ds){const t=e.parentNode;null!==e.previousSibling&&i!==l||(i++,t.insertBefore(Gs(),e)),l=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(Ds,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of n)t.parentNode.removeChild(t)}}const Js=t=>-1!==t.index,Gs=()=>document.createComment(""),Ys=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class Ks{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=$s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,s=0;const n=t=>{const o=document.createTreeWalker(t,133,null,!1);let r=o.nextNode();for(;i<e.length&&null!==r;){const t=e[i];if(Js(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));i++}else s++,"TEMPLATE"===r.nodeName&&n(r.content),r=o.nextNode();else this._parts.push(void 0),i++}};return n(t),$s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class Zs{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=Ys.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+Fs+s[3]+Ds:t+qs}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const Qs=t=>null===t||!("object"==typeof t||"function"==typeof t);class tn{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new en(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class en{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===Bs||Qs(t)&&t===this.value||(this.value=t,Is(t)||(this.committer.dirty=!0))}commit(){for(;Is(this.value);){const t=this.value;this.value=Bs,t(this)}this.value!==Bs&&this.committer.commit()}}class sn{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(Gs()),this.endNode=t.appendChild(Gs())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=Gs()),t._insert(this.endNode=Gs())}insertAfterPart(t){t._insert(this.startNode=Gs()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;Is(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Bs,t(this)}const t=this._pendingValue;t!==Bs&&(Qs(t)?t!==this.value&&this._commitText(t):t instanceof Zs?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===Us?(this.value=Us,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof Ks&&this.value.template===e)this.value.update(t.values);else{const i=new Ks(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new sn(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){zs(this.startNode.parentNode,t.nextSibling,this.endNode)}}class nn{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;Is(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Bs,t(this)}if(this._pendingValue===Bs)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=Bs}}class on extends tn{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new rn(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class rn extends en{}let an=!1;try{const t={get capture(){return an=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class ln{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;Is(this._pendingValue);){const t=this._pendingValue;this._pendingValue=Bs,t(this)}if(this._pendingValue===Bs)return;const t=this._pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=dn(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=Bs}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const dn=t=>t&&(an?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const hn=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new on(t,e.slice(1),i).parts:"@"===n?[new ln(t,e.slice(1),s.eventContext)]:"?"===n?[new nn(t,e.slice(1),i)]:new tn(t,e,i).parts}handleTextExpression(t){return new sn(t)}};function cn(t){let e=pn.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},pn.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(Ds);return void 0===(i=e.keyString.get(s))&&(i=new Xs(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const pn=new Map,un=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const fn=133;function gn(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,fn,null,!1);let o=yn(s),r=s[o],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,r=s[o=yn(s,o)]}d.forEach(t=>t.parentNode.removeChild(t))}const mn=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,fn,null,!1);for(;i.nextNode();)e++;return e},yn=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(Js(e))return i}return-1};const vn=(t,e)=>`${t}--${e}`;let bn=!0;void 0===window.ShadyCSS?bn=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),bn=!1);const wn=t=>e=>{const i=vn(e.type,t);let s=pn.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},pn.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const o=e.strings.join(Ds);if(void 0===(n=s.keyString.get(o))){const i=e.getTemplateElement();bn&&window.ShadyCSS.prepareTemplateDom(i,t),n=new Xs(e,i),s.keyString.set(o,n)}return s.stringsArray.set(e.strings,n),n},xn=["html","svg"],Sn=new Set,_n=(t,e,i)=>{Sn.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{xn.forEach(e=>{const i=pn.get(vn(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),gn(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,fn,null,!1);let r=yn(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=mn(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=yn(n,r);return}r=yn(n,r)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),gn(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const kn={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Cn=(t,e)=>e!==t&&(e==e||t==t),Nn={attribute:!0,type:String,converter:kn,reflect:!1,hasChanged:Cn},Pn=Promise.resolve(!0),En=1,An=4,Tn=8,Rn=16,Mn=32;class On extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Pn,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Nn){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=Cn){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||kn,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||kn.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Mn,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Nn){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|Tn,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~Tn}}_attributeToProperty(t,e){if(this._updateState&Tn)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||Nn;this._updateState=this._updateState|Rn,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Rn}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||Nn;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Rn||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|An;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Mn}get _hasRequestedUpdate(){return this._updateState&An}get hasUpdated(){return this._updateState&En}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&En||(this._updateState=this._updateState|En,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~An}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}On.finalized=!0;const Wn="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,jn=Symbol();class Vn{constructor(t,e){if(e!==jn)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Wn?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const Ln=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class In extends On{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){Ln(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Wn?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof Zs&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}In.finalized=!0,In.render=((t,e,i)=>{const s=i.scopeName,n=un.has(e),o=e instanceof ShadowRoot&&bn&&t instanceof Zs,r=o&&!Sn.has(s),a=r?document.createDocumentFragment():e;if(((t,e,i)=>{let s=un.get(e);void 0===s&&(zs(e,e.firstChild),un.set(e,s=new sn(Object.assign({templateFactory:cn},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:wn(s)},i)),r){const t=un.get(a);un.delete(a),t.value instanceof Ks&&_n(a,t.value.template,s),zs(e,e.firstChild),e.appendChild(a),un.set(e,t)}!n&&o&&window.ShadyCSS.styleElement(e.host)}),window.navigator.userAgent.match("Trident")&&(DOMTokenList.prototype.toggle=function(t,e){return void 0===e||e?this.add(t):this.remove(t),void 0===e||e});const $n=((t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof Vn)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new Vn(i,jn)})`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,zn=document.createElement("link");zn.rel="stylesheet",zn.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(zn);var Bn=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let Un=class extends In{render(){return((t,...e)=>new Zs(t,e,"html",hn))`<slot></slot>`}};Un.styles=$n,Un=Bn([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e))("mwc-icon")],Un);var Dn=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},qn=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredFab=class extends ct{constructor(){super(...arguments),this.disabled=!1}static get styles(){return lt`
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
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`);const n=Wt(s/2,s/2,s,s);e.appendChild(n),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},Dn([et({type:Boolean,reflect:!0}),qn("design:type",Object)],t.WiredFab.prototype,"disabled",void 0),t.WiredFab=Dn([Z("wired-fab")],t.WiredFab);var Hn=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},Fn=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};return t.WiredSpinner=class extends ct{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return lt`
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
    `}firstUpdated(){this.svg&&(Tt(this.svg,38,38,60,60),this.knob=Wt(0,0,20,20),this.knob.classList.add("knob"),this.svg.appendChild(this.knob)),this.updateCursor(),this.classList.add("wired-rendered")}updated(){this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(t=>this.tick(t))}tick(t){this.spinning?(this.timerstart||(this.timerstart=t),this.value=Math.min(1,(t-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}updateCursor(){if(this.knob){const t=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${t[0]}px, ${t[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}},Hn([et({type:Boolean}),Fn("design:type",Object)],t.WiredSpinner.prototype,"spinning",void 0),Hn([et({type:Number}),Fn("design:type",Object)],t.WiredSpinner.prototype,"duration",void 0),Hn([it("svg"),Fn("design:type",SVGSVGElement)],t.WiredSpinner.prototype,"svg",void 0),t.WiredSpinner=Hn([Z("wired-spinner")],t.WiredSpinner),t}({});
