(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(35)},35:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(10),c=n.n(r),i=n(3),o=n(11),u=n.n(o);var s=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)({msg:""}),o=Object(i.a)(c,2),s=o[0],m=o[1];return l.a.createElement("div",{style:{padding:"50px"}},l.a.createElement("h1",null,"Top Hashtags Finder"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("input",{type:"text",onChange:function(e){return r(e.target.value)},value:n}),l.a.createElement("button",{onClick:function(){m({msg:"loading..."}),u.a.post("api/hashtags",{term:n}).then(function(e){m(e),console.log(s)}).catch(function(e){return console.error(e)})}},"Search"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{style:{verticalAlign:"top"}},l.a.createElement("div",{style:{width:"50%",display:"inline-block",verticalAlign:"top"}},l.a.createElement("h3",null,"best-hashtags.com results"),l.a.createElement("ol",null,s.data?s.data.best.map(function(e){return l.a.createElement("li",null,l.a.createElement("strong",null,e.hashtag),": ",e.percent,"%")}):s.msg)),l.a.createElement("div",{style:{width:"50%",display:"inline-block",verticalAlign:"top"}},l.a.createElement("h3",null,"instagram discovery results"),l.a.createElement("ol",null,s.data?s.data.ig.map(function(e){return l.a.createElement("li",null,l.a.createElement("strong",null,e[0]),": ",e[1],"%")}):s.msg))))};c.a.render(l.a.createElement(s,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.9e3fe921.chunk.js.map