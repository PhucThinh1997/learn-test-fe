/*! For license information please see 25.c2e961e9.chunk.js.LICENSE.txt */
(this["webpackJsonpcrm.dqc"]=this["webpackJsonpcrm.dqc"]||[]).push([[25,5],{1055:function(e,t,n){"use strict";n.r(t);n(367);var a=n(364),r=(n(300),n(299)),i=(n(153),n(91)),o=(n(247),n(248)),c=(n(296),n(302)),l=(n(228),n(227)),u=n(240),s=(n(250),n(251)),d=(n(267),n(94)),f=n(253),m=n(39),p=(n(238),n(239)),h=(n(235),n(237)),v=n(88),b=(n(232),n(233)),E=n(0),g=n.n(E),y=n(142),O=n(38),j=n(1052),S=n(234),w=n(259),x=n(255),T=n(252),C=n(270),N=n(49),k=function(e){return N.c("/api/orders/"+e)},_=n(271),I=n(152),L=(n(914),n(320)),A=n(242),F=n(249),P=n(262);function R(){R=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},r=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",o=a.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(T){c=function(e,t,n){return e[t]=n}}function l(e,t,n,a){var r=t&&t.prototype instanceof d?t:d,i=Object.create(r.prototype),o=new S(a||[]);return i._invoke=function(e,t,n){var a="suspendedStart";return function(r,i){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw i;return x()}for(n.method=r,n.arg=i;;){var o=n.delegate;if(o){var c=y(o,n);if(c){if(c===s)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var l=u(e,t,n);if("normal"===l.type){if(a=n.done?"completed":"suspendedYield",l.arg===s)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a="completed",n.method="throw",n.arg=l.arg)}}}(e,n,o),i}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(T){return{type:"throw",arg:T}}}e.wrap=l;var s={};function d(){}function f(){}function m(){}var p={};c(p,r,(function(){return this}));var h=Object.getPrototypeOf,v=h&&h(h(w([])));v&&v!==t&&n.call(v,r)&&(p=v);var b=m.prototype=d.prototype=Object.create(p);function E(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function g(e,t){var a;this._invoke=function(r,i){function o(){return new t((function(a,o){!function a(r,i,o,c){var l=u(e[r],e,i);if("throw"!==l.type){var s=l.arg,d=s.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){a("next",e,o,c)}),(function(e){a("throw",e,o,c)})):t.resolve(d).then((function(e){s.value=e,o(s)}),(function(e){return a("throw",e,o,c)}))}c(l.arg)}(r,i,a,o)}))}return a=a?a.then(o,o):o()}}function y(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,y(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var a=u(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,s;var r=a.arg;return r?r.done?(t[e.resultName]=r.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):r:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function w(e){if(e){var t=e[r];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:x}}function x(){return{value:void 0,done:!0}}return f.prototype=m,c(b,"constructor",m),c(m,"constructor",f),f.displayName=c(m,o,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,c(e,o,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},E(g.prototype),c(g.prototype,i,(function(){return this})),e.AsyncIterator=g,e.async=function(t,n,a,r,i){void 0===i&&(i=Promise);var o=new g(l(t,n,a,r),i);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},E(b),c(b,o,"Generator"),c(b,r,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var a=t.pop();if(a in e)return n.value=a,n.done=!1,n}return n.done=!0,n}},e.values=w,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return o.type="throw",o.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),j(n),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;j(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:w(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},e}var D=b.a.TextArea;t.default=function(){var e=Object(E.useState)(!1),t=Object(v.a)(e,2),n=t[0],z=t[1],G=Object(E.useState)(""),H=Object(v.a)(G,2),Y=H[0],q=H[1],M=Object(O.d)(),K=Object(E.useState)(!1),U=Object(v.a)(K,2),V=U[0],B=U[1],W=h.a.useForm(),X=Object(v.a)(W,1)[0],J=Object(E.useState)([]),Z=Object(v.a)(J,2),Q=Z[0],$=Z[1],ee=Object(E.useState)([]),te=Object(v.a)(ee,2),ne=te[0],ae=te[1],re=Object(E.useState)([]),ie=Object(v.a)(re,2),oe=ie[0],ce=ie[1],le=Object(E.useState)({isOpen:!1}),ue=Object(v.a)(le,2),se=ue[0],de=ue[1],fe=function(e){M(I.c(e))},me=[{title:"Kh\xe1ch h\xe0ng",dataIndex:["customer","name"],minWidth:"300px"},{title:"Ng\xe0y y\xeau c\u1ea7u",dataIndex:"requestDate",minWidth:"300px",render:function(e,t){return g.a.createElement(p.a.Text,null,e&&Object(A.b)(e))}},{title:"N\u1ed9i dung y\xeau c\u1ea7u",dataIndex:"descriptionRequest",minWidth:"300px"},{title:"D\u1ef1 to\xe1n kinh ph\xed",dataIndex:"sourceBudget",minWidth:"200px"},{title:"Ngu\u1ed3n v\u1ed1n",dataIndex:"capital",minWidth:"200px"},{title:"",dataIndex:"action",width:"30px",render:function(e,t){return g.a.createElement(S.b,{disabled:!Object(F.a)(P.a.YEU_CAU_KHACH_HANG_SUA),onClick:function(){return be(t,"Ch\u1ec9nh s\u1eeda y\xeau c\u1ea7u kh\xe1ch h\xe0ng")}})}}],pe=function(){X.resetFields(),B(!1)},he=function(){var e=Object(f.a)(R().mark((function e(t){var n;return R().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return z(!0),e.next=3,a=t,N.d("/api/orders/",{id:a.id,input:a});case 3:(n=e.sent)&&n.isSuccess?(pe(),fe(!0),d.b.success(C.e)):d.b.error(n.message),z(!1);case 6:case"end":return e.stop()}var a}),e)})));return function(t){return e.apply(this,arguments)}}(),ve=function(e){var t;z(!0),(t=e,N.b("/api/orders/",{data:{ids:t}})).then((function(e){e.isSuccess?(d.b.success(C.c),fe(!0)):d.b.error(e.message)})).catch((function(){d.b.error(C.b)})).finally((function(){z(!0)}))},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;(null===e||void 0===e?void 0:e.id)?k(null===e||void 0===e?void 0:e.id).then((function(e){var n;e.isSuccess&&(q(t),B(!0),ae(e.data.customer.contactPeoples),X.setFieldsValue(Object(m.a)(Object(m.a)({},e.data),{},{requestDate:Object(A.d)(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.requestDate)})))})).finally((function(){z(!1)})):(q(t),B(!0))};Object(E.useEffect)((function(){Ee()}),[V]);var Ee=function(){var e=Object(f.a)(R().mark((function e(){var t;return R().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)();case 2:t=e.sent,$((null===t||void 0===t?void 0:t.data)||[]);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ge={beforeUpload:function(e){return ce([].concat(Object(u.a)(oe),[e])),!1},fileList:oe};return g.a.createElement(g.a.Fragment,null,Object(F.a)(P.a.YEU_CAU_KHACH_HANG_XEM)&&g.a.createElement("div",null,g.a.createElement(x.a,{title:"Y\xcaU C\u1ea6U KH\xc1CH H\xc0NG",actions:"default",onCreate:function(){return be({},"Th\xeam m\u1edbi y\xeau c\u1ea7u kh\xe1ch h\xe0ng")},handleDelete:function(e){s.a.confirm({title:"X\xe1c Nh\u1eadn",icon:g.a.createElement(y.a,null),content:"B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a d\xf2ng d\u1eef li\u1ec7u \u0111\xe3 ch\u1ecdn?",okText:"X\xe1c Nh\u1eadn",cancelText:"H\u1ee7y",onOk:function(){return ve(e)},confirmLoading:n})},isFilter:!0,onFilter:function(){return de({isOpen:!0})},isShowActionAdd:Object(F.a)(P.a.YEU_CAU_KHACH_HANG_THEM),isShowActionDelete:Object(F.a)(P.a.YEU_CAU_KHACH_HANG_XOA)}),g.a.createElement(L.a,{isOpen:se.isOpen,title:"L\u1ecdc y\xeau c\u1ea7u kh\xe1ch h\xe0ng",handleClosed:function(){return de({isOpen:!1})},onApplyFilter:function(e){M(I.b(e))}}),g.a.createElement("div",{className:"main__application"},g.a.createElement(T.a,null,g.a.createElement(w.a,{urlEndpoint:"/api/orders",columns:me}))),g.a.createElement(s.a,{title:Y,open:V,form:X,width:800,onCancel:pe,footer:[g.a.createElement(l.a,{form:"myForm",key:"back",onClick:pe},"H\u1ee7y"),g.a.createElement(l.a,{form:"myForm",key:"submit",type:"primary",htmlType:"submit",loading:n},"L\u01b0u")]},g.a.createElement(h.a,{id:"myForm",layout:"vertical",form:X,labelCol:{span:14},wrapperCol:{span:23},onFinish:function(e){var t,n,a,r,i,o,c,l,u={customerId:null===e||void 0===e?void 0:e.customerId,peopleRepresentId:null===e||void 0===e?void 0:e.peopleRepresentId,phone:null===e||void 0===e||null===(t=e.phone)||void 0===t?void 0:t.trim(),position:null===e||void 0===e||null===(n=e.position)||void 0===n?void 0:n.trim(),address:null===e||void 0===e||null===(a=e.address)||void 0===a?void 0:a.trim(),projectName:null===e||void 0===e||null===(r=e.projectName)||void 0===r?void 0:r.trim(),sourceBudget:null===e||void 0===e||null===(i=e.sourceBudget)||void 0===i?void 0:i.trim(),capital:null===e||void 0===e||null===(o=e.capital)||void 0===o?void 0:o.trim(),descriptionRequest:null===e||void 0===e||null===(c=e.descriptionRequest)||void 0===c?void 0:c.trim(),dataRefer:null===e||void 0===e||null===(l=e.dataRefer)||void 0===l?void 0:l.trim(),requestDate:null===e||void 0===e?void 0:e.requestDate};e.id?(u=Object(m.a)(Object(m.a)({},u),{},{id:null===e||void 0===e?void 0:e.id}),he(u)):he(u)}},g.a.createElement(i.a,null,g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{hidden:!0,label:"id",name:"id"}),g.a.createElement(h.a.Item,{label:"Kh\xe1ch h\xe0ng",name:"customerId",rules:[{required:!0,message:"Kh\xe1ch h\xe0ng kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng!"}]},g.a.createElement(c.a,{allowClear:!0,onChange:function(e){return t=e,void Object(_.c)(t).then((function(e){ae(e.data.contactPeoples),X.setFieldsValue({phone:e.data.phone,address:e.data.address,position:e.data.position})}));var t}},Q&&Q.map((function(e){return g.a.createElement(c.a.Option,{key:e.id,values:e.id},e.name)}))))),g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"Ng\u01b0\u1eddi \u0111\u1ea1i di\u1ec7n",name:"peopleRepresentId",rules:[{required:!0,message:"Ng\u01b0\u1eddi \u0111\u1ea1i di\u1ec7n kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng!"}]},g.a.createElement(c.a,{allowClear:!0},ne&&ne.map((function(e){return g.a.createElement(c.a.Option,{key:e.id,values:e.id},e.name)})))))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",name:"phone"},g.a.createElement(b.a,null))),g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"Ch\u1ee9c v\u1ee5",name:"position"},g.a.createElement(b.a,null)))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:24,className:"custom-width"},g.a.createElement(h.a.Item,{label:"\u0110\u1ecba ch\u1ec9",name:"address"},g.a.createElement(b.a,null)))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"Ng\xe0y y\xeau c\u1ea7u",name:"requestDate"},g.a.createElement(r.a,{placeholder:"Ch\u1ecdn ng\xe0y",format:A.b,defaultValue:Object(A.e)()})))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:24,className:"custom-width"},g.a.createElement(h.a.Item,{label:"T\xean d\u1ef1 \xe1n",name:"projectName",rules:[{required:!0,message:"T\xean d\u1ef1 \xe1n kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng!"}]},g.a.createElement(b.a,null)))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"D\u1ef1 to\xe1n kinh ph\xed",name:"sourceBudget"},g.a.createElement(b.a,null))),g.a.createElement(o.a,{span:12},g.a.createElement(h.a.Item,{label:"Ngu\u1ed3n V\u1ed1n",name:"capital"},g.a.createElement(b.a,null)))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:24,className:"custom-width"},g.a.createElement(h.a.Item,{label:"N\u1ed9i dung y\xeau c\u1ea7u",name:"descriptionRequest"},g.a.createElement(D,{rows:2})))),g.a.createElement(i.a,null,g.a.createElement(h.a.Item,null,g.a.createElement(a.a,ge,g.a.createElement(l.a,{icon:g.a.createElement(j.a,null)},"File \u0111\xednh k\xe8m")))),g.a.createElement(i.a,null,g.a.createElement(o.a,{span:24,className:"custom-width"},g.a.createElement(h.a.Item,{label:"D\u1eef li\u1ec7u tham kh\u1ea3o",name:"dataRefer"},g.a.createElement(D,{rows:2}))))))))}},229:function(e,t,n){"use strict";n(228);var a=n(227),r=n(0),i=n.n(r);t.a=function(e){return i.a.createElement(a.a,Object.assign({type:"primary",size:"small"},e))}},234:function(e,t,n){"use strict";n.d(t,"e",(function(){return a.a})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return h}));var a=n(229),r=(n(228),n(227)),i=n(0),o=n.n(i);var c=function(e){return o.a.createElement(r.a,Object.assign({danger:!0,size:"small"},e))};var l=function(e){return o.a.createElement(r.a,Object.assign({type:"default",size:"small"},e))},u=n(87);n(728);n(729);var s=n(614),d=["title"];var f=function(e){var t=e.title,n=void 0===t?"":t,a=Object(u.a)(e,d);return o.a.createElement(c,Object.assign({icon:o.a.createElement(s.a,null)},a),n)},m=n(1e3),p=["title"];var h=function(e){var t=e.title,n=void 0===t?"":t,a=Object(u.a)(e,p);return o.a.createElement(l,Object.assign({icon:o.a.createElement(m.a,null)},a),n)};n(730);n(155),n(997),n(246)},236:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c}));var a=n(154),r=n.n(a),i=function(e){return!Number.isNaN(e)&&e&&null!==e||(e=0),new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e).replaceAll("\u20ab","")},o=function(e){var t=e.replaceAll(".","");return Number(t)},c=function(e){var t=r()(e);return r.a.isMoment(t)?null===t||void 0===t?void 0:t.format("YYYY-MM-DD"):t}},242:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"a",(function(){return u}));var a=n(154),r=n.n(a),i=function(e){var t=r()(e);return e&&t.isValid()?t:""},o=function(e){return e?r()(e).format("MM/DD/YYYY"):""},c=function(e){return e?r()(e).format("DD/MM/YYYY"):""},l=function(){return r()()},u=function(e){return e?new Date(e).toISOString().split("T")[0]:null}},243:function(e,t,n){"use strict";n.d(t,"b",(function(){return i}));var a=n(61),r=n(244),i={idSelections:[],detailSelections:[]};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;return Object(a.a)(e,(function(e){switch(t.type){case r.b:e.idSelections=t.payload;break;case r.a:e.detailSelections=t.payload}}))}},244:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var a="SET_ITEM_ID_SELECTIONS",r="SET_ITEM_DETAIL_SELECTIONS"},245:function(e,t,n){"use strict";e.exports=function(e,t,n,a,r,i,o,c){if(!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,a,r,i,o,c],s=0;(l=new Error(t.replace(/%s/g,(function(){return u[s++]})))).name="Invariant Violation"}throw l.framesToPop=1,l}}},246:function(e,t,n){"use strict";n(277);var a=n(278),r=(n(276),n(273)),i=n(0),o=n.n(i);t.a=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(a.b,{wrap:!0},o.a.createElement(r.a,{title:null===e||void 0===e?void 0:e.tip,color:"blue",key:"blue"},e.children)))}},249:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var a=function(e){return e.map((function(e){return{value:e.id,label:e.name}}))},r=function(e){if(e){var t=JSON.parse(localStorage.getItem("userInfo")).permissions;return!!(t&&t.length>0)&&t.includes(e)}}},252:function(e,t,n){"use strict";var a=n(87),r=n(0),i=n.n(r),o=n(13),c=n.n(o),l=(n(257),["className","children"]);t.a=function(e){var t=e.className,n=e.children,r=Object(a.a)(e,l);return i.a.createElement("div",Object.assign({className:c()("section-wrapper",t)},r),n)}},255:function(e,t,n){"use strict";n(153);var a=n(91),r=(n(228),n(227)),i=(n(247),n(248)),o=(n(238),n(239)),c=(n(232),n(233)),l=n(0),u=n.n(l),s=n(732),d=n(728),f=n(997),m=n(38),p=n(234),h=n(291),v=n(243),b=function(e){return e&&e.tableView||v.b},E=n(152),g=(n(256),c.a.Search);t.a=function(e){var t=e.title,n=void 0===t?"":t,c=e.actions,l=void 0===c?"default":c,v=e.onCreate,y=e.handleDelete,O=e.labelPrimaryBtn,j=void 0===O?"":O,S=e.onPressPrimaryBtn,w=void 0===S?function(){}:S,x=e.isFilter,T=void 0!==x&&x,C=e.onFilter,N=e.isHideAction,k=void 0!==N&&N,_=e.isShowActionDelete,I=void 0===_||_,L=e.isShowActionAdd,A=void 0===L||L,F=Object(m.d)(),P=Object(m.e)(Object(h.a)(b,(function(e){return e.idSelections})));return u.a.createElement("div",{className:"header-page"},u.a.createElement(a.a,{className:"wrapper",justify:"space-around",align:"center"},u.a.createElement(i.a,{className:"header-page__title"},u.a.createElement(o.a.Title,{level:3},n)),u.a.createElement(i.a,{flex:1,style:{textAlign:"right"}},"default"===l?u.a.createElement(a.a,{style:{display:"flex",flexWrap:"nowrap",gap:"16px",justifyContent:"end"}},u.a.createElement(g,{className:"header-page__search",placeholder:"T\xecm ki\u1ebfm...",onSearch:function(e){F(Object(E.d)(e))},enterButton:!0}),T&&u.a.createElement(r.a,{type:"primary",onClick:function(){return C()},icon:u.a.createElement(s.a,null)}),!1===k&&u.a.createElement(u.a.Fragment,null,A&&u.a.createElement(r.a,{type:"primary",onClick:function(){return v()},icon:u.a.createElement(d.a,null)},"Th\xeam m\u1edbi"),!!j&&u.a.createElement(p.e,{size:"medium",icon:u.a.createElement(f.a,null),onClick:w},j),I&&u.a.createElement(p.a,{size:"medium",onClick:function(){return y&&y(P)},disabled:!P.length},"X\xf3a"))):"function"===typeof l?l():null)))}},256:function(e,t,n){},257:function(e,t,n){},259:function(e,t,n){"use strict";n.d(t,"a",(function(){return P}));n(295);var a=n(294),r=n(88),i=n(87),o=n(0),c=n.n(o),l=n(38),u=n(13),s=n.n(u),d=n(60),f=n(49),m=n(152),p=n(243),h=n(244);function v(e){return{type:h.b,payload:e}}function b(e){return{type:h.a,payload:e}}var E=n(261),g=n(39),y="SET_STATE",O="SET_DATA",j="SET_PAGE",S="SET_TOTAL_PAGE",w="SET_TOTAL_ELEMENT",x="SET_LOADING",T="SET_PAGESIZE",C="SET_SORT",N="SET_SEARCH_TEXT",k={data:[],currentPage:1,totalPage:1,totalElement:0,pageSize:10,loading:!1,searchText:"",sort:[{field:"",order:""}]},_=c.a.createContext({state:k,setState:function(){return null},setPage:function(){return null},setTotalPage:function(){return null},setData:function(){return null},setTotalElement:function(){return null},setLoading:function(){return null},setPageSize:function(){return null}}),I=_.Provider,L=function(e){var t=e.children,n=e.initState,a=Object(o.useReducer)((function(e,t){switch(t.type){case y:return Object(g.a)(Object(g.a)({},e),t.payload);case O:return Object(g.a)(Object(g.a)({},e),{},{data:t.payload.data});case j:return Object(g.a)(Object(g.a)({},e),{},{currentPage:t.payload.currentPage});case S:return Object(g.a)(Object(g.a)({},e),{},{totalPage:t.payload.totalPage});case w:return Object(g.a)(Object(g.a)({},e),{},{totalElement:t.payload.totalElement});case x:return Object(g.a)(Object(g.a)({},e),{},{loading:t.payload.loading});case T:return Object(g.a)(Object(g.a)({},e),{},{pageSize:t.payload.pageSize});case N:return Object(g.a)(Object(g.a)({},e),{},{searchText:t.payload.searchText});case C:return Object(g.a)(Object(g.a)({},e),{},{sort:t.payload.sort});default:return Object(g.a)({},e)}}),Object(g.a)(Object(g.a)({},k),n)),i=Object(r.a)(a,2),l=i[0],u=i[1],s=Object(o.useCallback)((function(e){u({type:y,payload:e})}),[]),d=Object(o.useCallback)((function(e){u({type:j,payload:{currentPage:e}})}),[]),f=Object(o.useCallback)((function(e){u({type:O,payload:{data:e}})}),[]),m=Object(o.useCallback)((function(e){u({type:S,payload:{totalPage:e}})}),[]),p=Object(o.useCallback)((function(e){u({type:x,payload:{loading:e}})}),[]),h=Object(o.useCallback)((function(e){u({type:w,payload:{totalElement:e}})}),[]),v=Object(o.useCallback)((function(e){u({type:T,payload:{pageSize:e}})}),[]),b=Object(o.useCallback)((function(e){u({type:N,payload:{searchText:e}})}),[]),E=Object(o.useCallback)((function(e){u({type:C,payload:{sort:e}})}),[]);return c.a.createElement(I,{value:{state:l,setState:s,setPage:d,setTotalPage:m,setData:f,setLoading:p,setTotalElement:h,setPageSize:v,setSearchText:b,setSort:E}},t)};n(268);var A=n(236),F=["className","columns","data","expandedRowRender","handleGetDetailSelections","handleGetSelections","hasRowSelected","isHidePagination","rowKey","shouldSaveToStore","shouldShowTotal","urlEndpoint","pageSize"],P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k,n=function(n){return c.a.createElement(L,{initState:t},c.a.createElement(e,n))};return n}((function(e){var t=e.className,n=void 0===t?"":t,u=e.columns,h=e.data,g=e.expandedRowRender,y=e.handleGetDetailSelections,O=e.handleGetSelections,j=e.hasRowSelected,S=void 0===j||j,w=e.isHidePagination,x=e.rowKey,T=void 0===x?"id":x,C=e.shouldSaveToStore,N=void 0===C||C,k=e.shouldShowTotal,I=void 0===k||k,L=e.urlEndpoint,P=e.pageSize,R=Object(i.a)(e,F);Object(E.a)({key:"tableView",reducer:p.a});var D=Object(l.d)(),z=Object(l.e)((function(e){return e.global.searchText})),G=Object(l.e)((function(e){return e.global.refreshGrid})),H=Object(l.e)((function(e){return e.global.filters})),Y=Object(o.useState)([]),q=Object(r.a)(Y,2),M=q[0],K=q[1],U=Object(o.useContext)(_),V=U.state,B=U.setState,W=U.setLoading,X=U.setData,J=Object(o.useState)(""),Z=Object(r.a)(J,2),Q=Z[0],$=Z[1],ee=function(e){var t=[];return e.map((function(e){(null===e||void 0===e?void 0:e.field)&&t.push({fieldName:e.field,isAscending:"ascend"===e.order})})),t},te=Object(o.useCallback)((function(){if(L){W(!0);var e={pageSize:V.pageSize,pageIndex:V.currentPage-1,searchText:V.searchText,sort:ee(V.sort),fieldId:null===H||void 0===H?void 0:H.fields,filter:[]};f.c(L,e).then((function(t){if(t&&(null===t||void 0===t?void 0:t.isSuccess)){var n,a=(null===t||void 0===t?void 0:t.data)||{};B({data:null===a||void 0===a?void 0:a.records,currentPage:(null===e||void 0===e?void 0:e.pageIndex)||1,totalElement:(null===a||void 0===a?void 0:a.total)||0,loading:!1}),$(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.totalAmount)}else B({data:[],totalElement:0})})).catch((function(e){console.log("err: ",e)})).finally((function(){W(!1)}))}}),[V.pageSize,V.sort,V.searchText,L,null===H||void 0===H?void 0:H.fields]);Object(o.useEffect)((function(){te()}),[D,te]),Object(o.useEffect)((function(){console.log("filtersfilters",H)}),[H]),Object(o.useEffect)((function(){L&&B({searchText:z,currentPage:1})}),[z,B,L]),Object(o.useEffect)((function(){return G&&(te(),D(m.c(!1))),function(){K([]),D(v([])),D(b([]))}}),[G]),Object(o.useEffect)((function(){h&&Object(d.isArray)(h)&&X(h)}),[JSON.stringify(h)]);var ne={selectedRowKeys:M,onChange:function(e,t){K(e),O&&O(e),y&&y(t),N&&(D(v(e)),D(b(t)))}};return c.a.createElement("div",{className:s()("grid",n&&n)},c.a.createElement(a.a,Object.assign({columns:u,dataSource:V.data,onChange:function(e,t,n){B({currentPage:e.current,pageSize:e.pageSize,sort:n?[n]:[]})},bordered:!0,pagination:!w&&{defaultPageSize:P||V.pageSize,showSizeChanger:!0,pageSizeOptions:["5","10","20","50"],total:V.totalElement,showTotal:I?function(){return"C\xf3 ".concat(V.totalElement," d\u1eef li\u1ec7u")}:null},loading:V.loading,expandable:{expandedRowRender:g},rowKey:T,rowSelection:S?ne:null,scroll:{x:"100%"}},R,{summary:V.data.length>0&&R.summaryNumberCol?function(){return c.a.createElement(a.a.Summary.Row,null,u.map((function(e,t){return c.a.createElement(c.a.Fragment,null,c.a.createElement(a.a.Summary.Cell,null,t===(null===R||void 0===R?void 0:R.summaryNumberCol)?Object(A.a)(Q):""))})),c.a.createElement(a.a.Summary.Cell,null))}:function(){}})))}))},260:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(60),r=n(245),i=n.n(r);function o(e){var t={dispatch:a.isFunction,subscribe:a.isFunction,getState:a.isFunction,replaceReducer:a.isFunction,runSaga:a.isFunction,injectedReducers:a.isObject,injectedSagas:a.isObject};i()(Object(a.conformsTo)(e,t),"(app/utils...) injectors: Expected a valid redux store")}},261:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));n(89),n(90),n(92),n(93);var a=n(0),r=n.n(a),i=(n(50),n(38)),o=n(245),c=n.n(o),l=n(60),u=n(260),s=n(97);function d(e,t){return function(n,a){t||Object(u.a)(e),c()(Object(l.isString)(n)&&!Object(l.isEmpty)(n)&&Object(l.isFunction)(a),"(app/utils...) injectReducer: Expected `reducer` to be a reducer function"),Reflect.has(e.injectedReducers,n)&&e.injectedReducers[n]===a||(e.injectedReducers[n]=a,e.replaceReducer(Object(s.a)(e.injectedReducers)))}}function f(e){return Object(u.a)(e),{injectReducer:d(e,!0)}}var m=function(e){var t=e.key,n=e.reducer,a=r.a.useContext(i.b);r.a.useEffect((function(){f(a.store).injectReducer(t,n)}),[a.store,t,n])}},268:function(e,t,n){},271:function(e,t,n){"use strict";n.d(t,"f",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return u}));var a=n(49),r="/api/customers",i=function(e){return a.c("/api/customers/"+e)},o=function(e){return a.d("/api/customers/",{id:e.id,input:e})},c=function(e){return a.d("/api/customers/",e)},l=function(e){return a.b("/api/customers/",{data:{ids:e}})},u=function(){return a.c("/api/customers/dropdown")}},303:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(49),r=function(){return a.c("/api/fields/dropdown","")}},320:function(e,t,n){"use strict";n(250);var a=n(251),r=(n(228),n(227)),i=(n(153),n(91)),o=(n(247),n(248)),c=(n(296),n(302)),l=(n(235),n(237)),u=n(88),s=n(0),d=n.n(s),f=n(303);t.a=function(e){var t=e.isOpen,n=e.handleClosed,m=e.title,p=e.onApplyFilter,h=l.a.useForm(),v=Object(u.a)(h,1)[0],b=Object(s.useState)([]),E=Object(u.a)(b,2),g=E[0],y=E[1],O=function(e){p(e),n()};Object(s.useEffect)((function(){j()}),[]);var j=function(){Object(f.a)().then((function(e){y((null===e||void 0===e?void 0:e.data)||[])}))};return d.a.createElement(a.a,{title:m,open:t,onCancel:n,width:500,footer:[d.a.createElement(r.a,{type:"link",form:"filterForm",key:"back",onClick:function(){v.resetFields()}},"B\u1ed9 l\u1ecdc m\u1eb7c \u0111\u1ecbnh"),d.a.createElement(r.a,{form:"filterForm",key:"submit",type:"primary",htmlType:"submit"},"L\u1ecdc")]},d.a.createElement(l.a,{id:"filterForm",labelCol:{span:14},wrapperCol:{span:23},form:v,layout:"vertical",onFinish:O},d.a.createElement(i.a,null,d.a.createElement(o.a,{span:24},d.a.createElement(i.a,null,d.a.createElement(o.a,{span:24},d.a.createElement(l.a.Item,{label:"L\u0129nh V\u1ef1c",name:"fields"},d.a.createElement(c.a,null,g&&g.map((function(e){return d.a.createElement(c.a.Option,{key:e.id,value:e.id},e.name)}))))))))))}},914:function(e,t,n){}}]);
//# sourceMappingURL=25.c2e961e9.chunk.js.map