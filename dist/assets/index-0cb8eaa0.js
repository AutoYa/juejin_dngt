(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=s(i);fetch(i.href,l)}})();const y={};function Q(e){y.context=e}const V=(e,t)=>e===t,F={equals:V};let P=j;const w=1,A=2,D={owned:null,cleanups:null,context:null,owner:null};var p=null;let m=null,u=null,h=null,g=null,U=0;function W(e,t){const s=u,n=p,i=e.length===0,l=i?D:{owned:null,cleanups:null,context:null,owner:t||n},r=i?e:()=>e(()=>I(()=>$(l)));p=l,u=null;try{return v(r,!0)}finally{u=s,p=n}}function J(e,t){t=t?Object.assign({},F,t):F;const s={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),R(s,i));return[Y.bind(s),n]}function C(e,t,s){const n=H(e,t,!1,w);T(n)}function X(e,t,s){P=z;const n=H(e,t,!1,w);n.user=!0,g?g.push(n):T(n)}function I(e){const t=u;u=null;try{return e()}finally{u=t}}function Y(){const e=m;if(this.sources&&(this.state||e))if(this.state===w||e)T(this);else{const t=h;h=null,v(()=>E(this),!1),h=t}if(u){const t=this.observers?this.observers.length:0;u.sources?(u.sources.push(this),u.sourceSlots.push(t)):(u.sources=[this],u.sourceSlots=[t]),this.observers?(this.observers.push(u),this.observerSlots.push(u.sources.length-1)):(this.observers=[u],this.observerSlots=[u.sources.length-1])}return this.value}function R(e,t,s){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&v(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=m&&m.running;r&&m.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?h.push(l):g.push(l),l.observers&&q(l)),r||(l.state=w)}if(h.length>1e6)throw h=[],new Error},!1)),t}function T(e){if(!e.fn)return;$(e);const t=p,s=u,n=U;u=p=e,Z(e,e.value,n),u=s,p=t}function Z(e,t,s){let n;try{n=e.fn(t)}catch(i){e.pure&&(e.state=w,e.owned&&e.owned.forEach($),e.owned=null),G(i)}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?R(e,n):e.value=n,e.updatedAt=s)}function H(e,t,s,n=w,i){const l={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:p,context:null,pure:s};return p===null||p!==D&&(p.owned?p.owned.push(l):p.owned=[l]),l}function _(e){const t=m;if(e.state===0||t)return;if(e.state===A||t)return E(e);if(e.suspense&&I(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<U);)(e.state||t)&&s.push(e);for(let n=s.length-1;n>=0;n--)if(e=s[n],e.state===w||t)T(e);else if(e.state===A||t){const i=h;h=null,v(()=>E(e,s[0]),!1),h=i}}function v(e,t){if(h)return e();let s=!1;t||(h=[]),g?s=!0:g=[],U++;try{const n=e();return k(s),n}catch(n){h||(g=null),h=null,G(n)}}function k(e){if(h&&(j(h),h=null),e)return;const t=g;g=null,t.length&&v(()=>P(t),!1)}function j(e){for(let t=0;t<e.length;t++)_(e[t])}function z(e){let t,s=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[s++]=n:_(n)}for(y.context&&Q(),t=0;t<s;t++)_(e[t])}function E(e,t){const s=m;e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];i.sources&&(i.state===w||s?i!==t&&_(i):(i.state===A||s)&&E(i,t))}}function q(e){const t=m;for(let s=0;s<e.observers.length;s+=1){const n=e.observers[s];(!n.state||t)&&(n.state=A,n.pure?h.push(n):g.push(n),n.observers&&q(n))}}function $(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const l=i.pop(),r=s.observerSlots.pop();n<i.length&&(l.sourceSlots[r]=n,i[n]=l,s.observerSlots[n]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)$(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ee(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function G(e){throw e=ee(e),e}function te(e,t){return I(()=>e(t||{}))}function se(e,t,s){let n=s.length,i=t.length,l=n,r=0,o=0,f=t[i-1].nextSibling,a=null;for(;r<i||o<l;){if(t[r]===s[o]){r++,o++;continue}for(;t[i-1]===s[l-1];)i--,l--;if(i===r){const c=l<n?o?s[o-1].nextSibling:s[l-o]:f;for(;o<l;)e.insertBefore(s[o++],c)}else if(l===o)for(;r<i;)(!a||!a.has(t[r]))&&t[r].remove(),r++;else if(t[r]===s[l-1]&&s[o]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(s[o++],t[r++].nextSibling),e.insertBefore(s[--l],c),t[i]=s[l]}else{if(!a){a=new Map;let d=o;for(;d<l;)a.set(s[d],d++)}const c=a.get(t[r]);if(c!=null)if(o<c&&c<l){let d=r,b=1,S;for(;++d<i&&d<l&&!((S=a.get(t[d]))==null||S!==c+b);)b++;if(b>c-o){const K=t[r];for(;o<c;)e.insertBefore(s[o++],K)}else e.replaceChild(s[o++],t[r++])}else r++;else t[r++].remove()}}}function ne(e,t,s,n={}){let i;return W(l=>{i=l,t===document?e():le(t,e(),t.firstChild?null:void 0,s)},n.owner),()=>{i(),t.textContent=""}}function ie(e,t,s){const n=document.createElement("template");n.innerHTML=e;let i=n.content.firstChild;return s&&(i=i.firstChild),i}function L(e,t){t==null?e.removeAttribute("class"):e.className=t}function le(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return N(e,t,n,s);C(i=>N(e,t(),i,s),n)}function N(e,t,s,n,i){for(y.context&&!s&&(s=[...e.childNodes]);typeof s=="function";)s=s();if(t===s)return s;const l=typeof t,r=n!==void 0;if(e=r&&s[0]&&s[0].parentNode||e,l==="string"||l==="number"){if(y.context)return s;if(l==="number"&&(t=t.toString()),r){let o=s[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),s=x(e,s,n,o)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t}else if(t==null||l==="boolean"){if(y.context)return s;s=x(e,s,n)}else{if(l==="function")return C(()=>{let o=t();for(;typeof o=="function";)o=o();s=N(e,o,s,n)}),()=>s;if(Array.isArray(t)){const o=[],f=s&&Array.isArray(s);if(B(o,t,s,i))return C(()=>s=N(e,o,s,n,!0)),()=>s;if(y.context){if(!o.length)return s;for(let a=0;a<o.length;a++)if(o[a].parentNode)return s=o}if(o.length===0){if(s=x(e,s,n),r)return s}else f?s.length===0?M(e,o,n):se(e,s,o):(s&&x(e),M(e,o));s=o}else if(t instanceof Node){if(y.context&&t.parentNode)return s=r?[t]:t;if(Array.isArray(s)){if(r)return s=x(e,s,n,t);x(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function B(e,t,s,n){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],f=s&&s[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))i=B(e,o,f)||i;else if(typeof o=="function")if(n){for(;typeof o=="function";)o=o();i=B(e,Array.isArray(o)?o:[o],Array.isArray(f)?f:[f])||i}else e.push(o),i=!0;else{const a=String(o);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return i}function M(e,t,s=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function x(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const f=o.parentNode===e;!l&&!r?f?e.replaceChild(i,o):e.insertBefore(i,s):f&&o.remove()}else l=!0}}else e.insertBefore(i,s);return[i]}const oe="_main_1r1cv_1",re="_slider_1r1cv_18",O={main:oe,switch:"_switch_1r1cv_9",slider:re},fe=ie('<main><span>狗头屏蔽：</span><label><input type="checkbox"><span></span></label></main>'),ue=()=>{const e=localStorage.getItem("_open"),[t,s]=J(e==="true"),n=t(),i=()=>s(!n);return X(()=>{const l=t();localStorage.setItem("_open",l.toString()),chrome.runtime.sendMessage({type:l?"create":"remove"})}),(()=>{const l=fe.cloneNode(!0),r=l.firstChild,o=r.nextSibling,f=o.firstChild,a=f.nextSibling;return f.addEventListener("change",i),f.checked=n,C(c=>{const d=O.main,b=O.switch,S=O.slider;return d!==c._v$&&L(l,c._v$=d),b!==c._v$2&&L(o,c._v$2=b),S!==c._v$3&&L(a,c._v$3=S),c},{_v$:void 0,_v$2:void 0,_v$3:void 0}),l})()},ce=document.getElementById("root");ne(()=>te(ue,{}),ce);
