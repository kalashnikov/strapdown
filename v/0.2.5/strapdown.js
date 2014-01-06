(function(){function t(t){this.tokens=[];this.tokens.links={};this.options=t||l.defaults;this.rules=e.normal;if(this.options.gfm){if(this.options.tables){this.rules=e.tables}else{this.rules=e.gfm}}}function r(e,t){this.options=t||l.defaults;this.links=e;this.rules=n.normal;this.renderer=this.options.renderer||new i;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=n.breaks}else{this.rules=n.gfm}}else if(this.options.pedantic){this.rules=n.pedantic}}function i(){}function s(e){this.tokens=[];this.token=null;this.options=e||l.defaults;this.options.renderer=this.options.renderer||new i;this.renderer=this.options.renderer}function o(e,t){return e.replace(!t?/&(?!#?\w+;)/g:/&/g,"&").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function u(e,t){e=e.source;t=t||"";return function n(r,i){if(!r)return new RegExp(e,t);i=i.source||i;i=i.replace(/(^|[^\[])\^/g,"$1");e=e.replace(r,i);return n}}function a(){}function f(e){var t=1,n,r;for(;t<arguments.length;t++){n=arguments[t];for(r in n){if(Object.prototype.hasOwnProperty.call(n,r)){e[r]=n[r]}}}return e}function l(e,n,r){if(r||typeof n==="function"){if(!r){r=n;n=null}n=f({},l.defaults,n||{});var i=n.highlight,u,a,c=0;try{u=t.lex(e,n)}catch(h){return r(h)}a=u.length;var p=function(){var e,t;try{e=s.parse(u,n)}catch(o){t=o}n.highlight=i;return t?r(t):r(null,e)};if(!i||i.length<3){return p()}delete n.highlight;if(!a)return p();for(;c<u.length;c++){(function(e){if(e.type!=="code"){return--a||p()}return i(e.text,e.lang,function(t,n){if(n==null||n===e.text){return--a||p()}e.text=n;e.escaped=true;--a||p()})})(u[c])}return}try{if(n)n=f({},l.defaults,n);return s.parse(t.lex(e,n),n)}catch(h){h.message+="\nPlease report this to https://github.com/chjj/marked.";if((n||l.defaults).silent){return"<p>An error occured:</p><pre>"+o(h.message+"",true)+"</pre>"}throw h}}var e={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:a,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:a,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:a,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};e.bullet=/(?:[*+-]|\d+\.)/;e.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;e.item=u(e.item,"gm")(/bull/g,e.bullet)();e.list=u(e.list)(/bull/g,e.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)();e._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b";e.html=u(e.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e._tag)();e.paragraph=u(e.paragraph)("hr",e.hr)("heading",e.heading)("lheading",e.lheading)("blockquote",e.blockquote)("tag","<"+e._tag)("def",e.def)();e.normal=f({},e);e.gfm=f({},e.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});e.gfm.paragraph=u(e.paragraph)("(?!","(?!"+e.gfm.fences.source.replace("\\1","\\2")+"|"+e.list.source.replace("\\1","\\3")+"|")();e.tables=f({},e.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});t.rules=e;t.lex=function(e,n){var r=new t(n);return r.lex(e)};t.prototype.lex=function(e){e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(e,true)};t.prototype.token=function(t,n){var t=t.replace(/^ +$/gm,""),r,i,s,o,u,a,f,l,c;while(t){if(s=this.rules.newline.exec(t)){t=t.substring(s[0].length);if(s[0].length>1){this.tokens.push({type:"space"})}}if(s=this.rules.code.exec(t)){t=t.substring(s[0].length);s=s[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?s.replace(/\n+$/,""):s});continue}if(s=this.rules.fences.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"code",lang:s[2],text:s[3]});continue}if(s=this.rules.heading.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});continue}if(n&&(s=this.rules.nptable.exec(t))){t=t.substring(s[0].length);a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/\n$/,"").split("\n")};for(l=0;l<a.align.length;l++){if(/^ *-+: *$/.test(a.align[l])){a.align[l]="right"}else if(/^ *:-+: *$/.test(a.align[l])){a.align[l]="center"}else if(/^ *:-+ *$/.test(a.align[l])){a.align[l]="left"}else{a.align[l]=null}}for(l=0;l<a.cells.length;l++){a.cells[l]=a.cells[l].split(/ *\| */)}this.tokens.push(a);continue}if(s=this.rules.lheading.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"heading",depth:s[2]==="="?1:2,text:s[1]});continue}if(s=this.rules.hr.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"hr"});continue}if(s=this.rules.blockquote.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"blockquote_start"});s=s[0].replace(/^ *> ?/gm,"");this.token(s,n);this.tokens.push({type:"blockquote_end"});continue}if(s=this.rules.list.exec(t)){t=t.substring(s[0].length);o=s[2];this.tokens.push({type:"list_start",ordered:o.length>1});s=s[0].match(this.rules.item);r=false;c=s.length;l=0;for(;l<c;l++){a=s[l];f=a.length;a=a.replace(/^ *([*+-]|\d+\.) +/,"");if(~a.indexOf("\n ")){f-=a.length;a=!this.options.pedantic?a.replace(new RegExp("^ {1,"+f+"}","gm"),""):a.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&l!==c-1){u=e.bullet.exec(s[l+1])[0];if(o!==u&&!(o.length>1&&u.length>1)){t=s.slice(l+1).join("\n")+t;l=c-1}}i=r||/\n\n(?!\s*$)/.test(a);if(l!==c-1){r=a.charAt(a.length-1)==="\n";if(!i)i=r}this.tokens.push({type:i?"loose_item_start":"list_item_start"});this.token(a,false);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(s=this.rules.html.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:s[1]==="pre"||s[1]==="script"||s[1]==="style",text:s[0]});continue}if(n&&(s=this.rules.def.exec(t))){t=t.substring(s[0].length);this.tokens.links[s[1].toLowerCase()]={href:s[2],title:s[3]};continue}if(n&&(s=this.rules.table.exec(t))){t=t.substring(s[0].length);a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(l=0;l<a.align.length;l++){if(/^ *-+: *$/.test(a.align[l])){a.align[l]="right"}else if(/^ *:-+: *$/.test(a.align[l])){a.align[l]="center"}else if(/^ *:-+ *$/.test(a.align[l])){a.align[l]="left"}else{a.align[l]=null}}for(l=0;l<a.cells.length;l++){a.cells[l]=a.cells[l].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(a);continue}if(n&&(s=this.rules.paragraph.exec(t))){t=t.substring(s[0].length);this.tokens.push({type:"paragraph",text:s[1].charAt(s[1].length-1)==="\n"?s[1].slice(0,-1):s[1]});continue}if(s=this.rules.text.exec(t)){t=t.substring(s[0].length);this.tokens.push({type:"text",text:s[0]});continue}if(t){throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}}return this.tokens};var n={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:a,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:a,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};n._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;n._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;n.link=u(n.link)("inside",n._inside)("href",n._href)();n.reflink=u(n.reflink)("inside",n._inside)();n.normal=f({},n);n.pedantic=f({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});n.gfm=f({},n.normal,{escape:u(n.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:u(n.text)("]|","~]|")("|","|https?://|")()});n.breaks=f({},n.gfm,{br:u(n.br)("{2,}","*")(),text:u(n.gfm.text)("{2,}","*")()});r.rules=n;r.output=function(e,t,n){var i=new r(t,n);return i.output(e)};r.prototype.output=function(e){var t="",n,r,i,s;while(e){if(s=this.rules.escape.exec(e)){e=e.substring(s[0].length);t+=s[1];continue}if(s=this.rules.autolink.exec(e)){e=e.substring(s[0].length);if(s[2]==="@"){r=s[1].charAt(6)===":"?this.mangle(s[1].substring(7)):this.mangle(s[1]);i=this.mangle("mailto:")+r}else{r=o(s[1]);i=r}t+=this.renderer.link(i,null,r);continue}if(s=this.rules.url.exec(e)){e=e.substring(s[0].length);r=o(s[1]);i=r;t+=this.renderer.link(i,null,r);continue}if(s=this.rules.tag.exec(e)){e=e.substring(s[0].length);t+=this.options.sanitize?o(s[0]):s[0];continue}if(s=this.rules.link.exec(e)){e=e.substring(s[0].length);t+=this.outputLink(s,{href:s[2],title:s[3]});continue}if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){e=e.substring(s[0].length);n=(s[2]||s[1]).replace(/\s+/g," ");n=this.links[n.toLowerCase()];if(!n||!n.href){t+=s[0].charAt(0);e=s[0].substring(1)+e;continue}t+=this.outputLink(s,n);continue}if(s=this.rules.strong.exec(e)){e=e.substring(s[0].length);t+=this.renderer.strong(this.output(s[2]||s[1]));continue}if(s=this.rules.em.exec(e)){e=e.substring(s[0].length);t+=this.renderer.em(this.output(s[2]||s[1]));continue}if(s=this.rules.code.exec(e)){e=e.substring(s[0].length);t+=this.renderer.codespan(o(s[2],true));continue}if(s=this.rules.br.exec(e)){e=e.substring(s[0].length);t+=this.renderer.br();continue}if(s=this.rules.del.exec(e)){e=e.substring(s[0].length);t+=this.renderer.del(this.output(s[1]));continue}if(s=this.rules.text.exec(e)){e=e.substring(s[0].length);t+=o(this.smartypants(s[0]));continue}if(e){throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}}return t};r.prototype.outputLink=function(e,t){var n=o(t.href),r=t.title?o(t.title):null;return e[0].charAt(0)!=="!"?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,o(e[1]))};r.prototype.smartypants=function(e){if(!this.options.smartypants)return e;return e.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};r.prototype.mangle=function(e){var t="",n=e.length,r=0,i;for(;r<n;r++){i=e.charCodeAt(r);if(Math.random()>.5){i="x"+i.toString(16)}t+="&#"+i+";"}return t};i.prototype.code=function(e,t,n,r){r=r||{};if(r.highlight){var i=r.highlight(e,t);if(i!=null&&i!==e){n=true;e=i}}if(!t){return"<pre><code>"+(n?e:o(e,true))+"\n</code></pre>"}return'<pre><code class="'+r.langPrefix+t+'">'+(n?e:o(e))+"\n</code></pre>\n"};i.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"};i.prototype.html=function(e){return e};i.prototype.heading=function(e,t,n,r){return"<h"+t+' id="'+r.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"};i.prototype.hr=function(){return"<hr>\n"};i.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"};i.prototype.listitem=function(e){return"<li>"+e+"</li>\n"};i.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"};i.prototype.table=function(e,t){return"<table>\n"+"<thead>\n"+e+"</thead>\n"+"<tbody>\n"+t+"</tbody>\n"+"</table>\n"};i.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"};i.prototype.tablecell=function(e,t){var n=t.header?"th":"td";var r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"};i.prototype.strong=function(e){return"<strong>"+e+"</strong>"};i.prototype.em=function(e){return"<em>"+e+"</em>"};i.prototype.codespan=function(e){return"<code>"+e+"</code>"};i.prototype.br=function(){return"<br>"};i.prototype.del=function(e){return"<del>"+e+"</del>"};i.prototype.link=function(e,t,n){var r='<a href="'+e+'"';if(t){r+=' title="'+t+'"'}r+=">"+n+"</a>";return r};i.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';if(t){r+=' title="'+t+'"'}r+=">";return r};s.parse=function(e,t,n){var r=new s(t,n);return r.parse(e)};s.prototype.parse=function(e){this.inline=new r(e.links,this.options,this.renderer);this.tokens=e.reverse();var t="";while(this.next()){t+=this.tok()}return t};s.prototype.next=function(){return this.token=this.tokens.pop()};s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};s.prototype.parseText=function(){var e=this.token.text;while(this.peek().type==="text"){e+="\n"+this.next().text}return this.inline.output(e)};s.prototype.tok=function(){switch(this.token.type){case"space":{return""};case"hr":{return this.renderer.hr()};case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text,this.options)};case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped,this.options)};case"table":{var e="",t="",n,r,i,s,o;i="";for(n=0;n<this.token.header.length;n++){s={header:true,align:this.token.align[n]};i+=this.renderer.tablecell(this.inline.output(this.token.header[n]),{header:true,align:this.token.align[n]})}e+=this.renderer.tablerow(i);for(n=0;n<this.token.cells.length;n++){r=this.token.cells[n];i="";for(o=0;o<r.length;o++){i+=this.renderer.tablecell(this.inline.output(r[o]),{header:false,align:this.token.align[o]})}t+=this.renderer.tablerow(i)}return this.renderer.table(e,t)};case"blockquote_start":{var t="";while(this.next().type!=="blockquote_end"){t+=this.tok()}return this.renderer.blockquote(t)};case"list_start":{var t="",u=this.token.ordered;while(this.next().type!=="list_end"){t+=this.tok()}return this.renderer.list(t,u)};case"list_item_start":{var t="";while(this.next().type!=="list_item_end"){t+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(t)};case"loose_item_start":{var t="";while(this.next().type!=="list_item_end"){t+=this.tok()}return this.renderer.listitem(t)};case"html":{var a=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(a)};case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))};case"text":{return this.renderer.paragraph(this.parseText())}}};a.exec=a;l.options=l.setOptions=function(e){f(l.defaults,e);return l};l.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new i};l.Parser=s;l.parser=s.parse;l.Renderer=i;l.Lexer=t;l.lexer=t.lex;l.InlineLexer=r;l.inlineLexer=r.output;l.parse=l;if(typeof exports==="object"){module.exports=l}else if(typeof define==="function"&&define.amd){define(function(){return l})}else{this.marked=l}}).call(function(){return this||(typeof window!=="undefined"?window:global)}())

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

window['PR_SHOULD_USE_CONTINUATION']=true;var prettyPrintOne;var prettyPrint;(function(){var win=window;var FLOW_CONTROL_KEYWORDS=["break,continue,do,else,for,if,return,while"];var C_KEYWORDS=[FLOW_CONTROL_KEYWORDS,"auto,case,char,const,default,"+"double,enum,extern,float,goto,int,long,register,short,signed,sizeof,"+"static,struct,switch,typedef,union,unsigned,void,volatile"];var COMMON_KEYWORDS=[C_KEYWORDS,"catch,class,delete,false,import,"+"new,operator,private,protected,public,this,throw,true,try,typeof"];var CPP_KEYWORDS=[COMMON_KEYWORDS,"alignof,align_union,asm,axiom,bool,"+"concept,concept_map,const_cast,constexpr,decltype,"+"dynamic_cast,explicit,export,friend,inline,late_check,"+"mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,"+"template,typeid,typename,using,virtual,where"];var JAVA_KEYWORDS=[COMMON_KEYWORDS,"abstract,boolean,byte,extends,final,finally,implements,import,"+"instanceof,null,native,package,strictfp,super,synchronized,throws,"+"transient"];var CSHARP_KEYWORDS=[JAVA_KEYWORDS,"as,base,by,checked,decimal,delegate,descending,dynamic,event,"+"fixed,foreach,from,group,implicit,in,interface,internal,into,is,let,"+"lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,"+"sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,"+"var,virtual,where"];var COFFEE_KEYWORDS="all,and,by,catch,class,else,extends,false,finally,"+"for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,"+"throw,true,try,unless,until,when,while,yes";var JSCRIPT_KEYWORDS=[COMMON_KEYWORDS,"debugger,eval,export,function,get,null,set,undefined,var,with,"+"Infinity,NaN"];var PERL_KEYWORDS="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,"+"goto,if,import,last,local,my,next,no,our,print,package,redo,require,"+"sub,undef,unless,until,use,wantarray,while,BEGIN,END";var PYTHON_KEYWORDS=[FLOW_CONTROL_KEYWORDS,"and,as,assert,class,def,del,"+"elif,except,exec,finally,from,global,import,in,is,lambda,"+"nonlocal,not,or,pass,print,raise,try,with,yield,"+"False,True,None"];var RUBY_KEYWORDS=[FLOW_CONTROL_KEYWORDS,"alias,and,begin,case,class,"+"def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,"+"rescue,retry,self,super,then,true,undef,unless,until,when,yield,"+"BEGIN,END"];var SH_KEYWORDS=[FLOW_CONTROL_KEYWORDS,"case,done,elif,esac,eval,fi,"+"function,in,local,set,then,until"];var ALL_KEYWORDS=[CPP_KEYWORDS,CSHARP_KEYWORDS,JSCRIPT_KEYWORDS,PERL_KEYWORDS+
PYTHON_KEYWORDS,RUBY_KEYWORDS,SH_KEYWORDS];var C_TYPES=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;var PR_STRING='str';var PR_KEYWORD='kwd';var PR_COMMENT='com';var PR_TYPE='typ';var PR_LITERAL='lit';var PR_PUNCTUATION='pun';var PR_PLAIN='pln';var PR_TAG='tag';var PR_DECLARATION='dec';var PR_SOURCE='src';var PR_ATTRIB_NAME='atn';var PR_ATTRIB_VALUE='atv';var PR_NOCODE='nocode';var REGEXP_PRECEDER_PATTERN='(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*';function combinePrefixPatterns(regexs){var capturedGroupIndex=0;var needToFoldCase=false;var ignoreCase=false;for(var i=0,n=regexs.length;i<n;++i){var regex=regexs[i];if(regex.ignoreCase){ignoreCase=true;}else if(/[a-z]/i.test(regex.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,''))){needToFoldCase=true;ignoreCase=false;break;}}
var escapeCharToCodeUnit={'b':8,'t':9,'n':0xa,'v':0xb,'f':0xc,'r':0xd};function decodeEscape(charsetPart){var cc0=charsetPart.charCodeAt(0);if(cc0!==92){return cc0;}
var c1=charsetPart.charAt(1);cc0=escapeCharToCodeUnit[c1];if(cc0){return cc0;}else if('0'<=c1&&c1<='7'){return parseInt(charsetPart.substring(1),8);}else if(c1==='u'||c1==='x'){return parseInt(charsetPart.substring(2),16);}else{return charsetPart.charCodeAt(1);}}
function encodeEscape(charCode){if(charCode<0x20){return(charCode<0x10?'\\x0':'\\x')+charCode.toString(16);}
var ch=String.fromCharCode(charCode);return(ch==='\\'||ch==='-'||ch===']'||ch==='^')?"\\"+ch:ch;}
function caseFoldCharset(charSet){var charsetParts=charSet.substring(1,charSet.length-1).match(new RegExp('\\\\u[0-9A-Fa-f]{4}'
+'|\\\\x[0-9A-Fa-f]{2}'
+'|\\\\[0-3][0-7]{0,2}'
+'|\\\\[0-7]{1,2}'
+'|\\\\[\\s\\S]'
+'|-'
+'|[^-\\\\]','g'));var ranges=[];var inverse=charsetParts[0]==='^';var out=['['];if(inverse){out.push('^');}
for(var i=inverse?1:0,n=charsetParts.length;i<n;++i){var p=charsetParts[i];if(/\\[bdsw]/i.test(p)){out.push(p);}else{var start=decodeEscape(p);var end;if(i+2<n&&'-'===charsetParts[i+1]){end=decodeEscape(charsetParts[i+2]);i+=2;}else{end=start;}
ranges.push([start,end]);if(!(end<65||start>122)){if(!(end<65||start>90)){ranges.push([Math.max(65,start)|32,Math.min(end,90)|32]);}
if(!(end<97||start>122)){ranges.push([Math.max(97,start)&~32,Math.min(end,122)&~32]);}}}}
ranges.sort(function(a,b){return(a[0]-b[0])||(b[1]-a[1]);});var consolidatedRanges=[];var lastRange=[];for(var i=0;i<ranges.length;++i){var range=ranges[i];if(range[0]<=lastRange[1]+1){lastRange[1]=Math.max(lastRange[1],range[1]);}else{consolidatedRanges.push(lastRange=range);}}
for(var i=0;i<consolidatedRanges.length;++i){var range=consolidatedRanges[i];out.push(encodeEscape(range[0]));if(range[1]>range[0]){if(range[1]+1>range[0]){out.push('-');}
out.push(encodeEscape(range[1]));}}
out.push(']');return out.join('');}
function allowAnywhereFoldCaseAndRenumberGroups(regex){var parts=regex.source.match(new RegExp('(?:'
+'\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'
+'|\\\\u[A-Fa-f0-9]{4}'
+'|\\\\x[A-Fa-f0-9]{2}'
+'|\\\\[0-9]+'
+'|\\\\[^ux0-9]'
+'|\\(\\?[:!=]'
+'|[\\(\\)\\^]'
+'|[^\\x5B\\x5C\\(\\)\\^]+'
+')','g'));var n=parts.length;var capturedGroups=[];for(var i=0,groupIndex=0;i<n;++i){var p=parts[i];if(p==='('){++groupIndex;}else if('\\'===p.charAt(0)){var decimalValue=+p.substring(1);if(decimalValue){if(decimalValue<=groupIndex){capturedGroups[decimalValue]=-1;}else{parts[i]=encodeEscape(decimalValue);}}}}
for(var i=1;i<capturedGroups.length;++i){if(-1===capturedGroups[i]){capturedGroups[i]=++capturedGroupIndex;}}
for(var i=0,groupIndex=0;i<n;++i){var p=parts[i];if(p==='('){++groupIndex;if(!capturedGroups[groupIndex]){parts[i]='(?:';}}else if('\\'===p.charAt(0)){var decimalValue=+p.substring(1);if(decimalValue&&decimalValue<=groupIndex){parts[i]='\\'+capturedGroups[decimalValue];}}}
for(var i=0;i<n;++i){if('^'===parts[i]&&'^'!==parts[i+1]){parts[i]='';}}
if(regex.ignoreCase&&needToFoldCase){for(var i=0;i<n;++i){var p=parts[i];var ch0=p.charAt(0);if(p.length>=2&&ch0==='['){parts[i]=caseFoldCharset(p);}else if(ch0!=='\\'){parts[i]=p.replace(/[a-zA-Z]/g,function(ch){var cc=ch.charCodeAt(0);return'['+String.fromCharCode(cc&~32,cc|32)+']';});}}}
return parts.join('');}
var rewritten=[];for(var i=0,n=regexs.length;i<n;++i){var regex=regexs[i];if(regex.global||regex.multiline){throw new Error(''+regex);}
rewritten.push('(?:'+allowAnywhereFoldCaseAndRenumberGroups(regex)+')');}
return new RegExp(rewritten.join('|'),ignoreCase?'gi':'g');}
function extractSourceSpans(node,isPreformatted){var nocode=/(?:^|\s)nocode(?:\s|$)/;var chunks=[];var length=0;var spans=[];var k=0;function walk(node){switch(node.nodeType){case 1:if(nocode.test(node.className)){return;}
for(var child=node.firstChild;child;child=child.nextSibling){walk(child);}
var nodeName=node.nodeName.toLowerCase();if('br'===nodeName||'li'===nodeName){chunks[k]='\n';spans[k<<1]=length++;spans[(k++<<1)|1]=node;}
break;case 3:case 4:var text=node.nodeValue;if(text.length){if(!isPreformatted){text=text.replace(/[ \t\r\n]+/g,' ');}else{text=text.replace(/\r\n?/g,'\n');}
chunks[k]=text;spans[k<<1]=length;length+=text.length;spans[(k++<<1)|1]=node;}
break;}}
walk(node);return{sourceCode:chunks.join('').replace(/\n$/,''),spans:spans};}
function appendDecorations(basePos,sourceCode,langHandler,out){if(!sourceCode){return;}
var job={sourceCode:sourceCode,basePos:basePos};langHandler(job);out.push.apply(out,job.decorations);}
var notWs=/\S/;function childContentWrapper(element){var wrapper=undefined;for(var c=element.firstChild;c;c=c.nextSibling){var type=c.nodeType;wrapper=(type===1)?(wrapper?element:c):(type===3)?(notWs.test(c.nodeValue)?element:wrapper):wrapper;}
return wrapper===element?undefined:wrapper;}
function createSimpleLexer(shortcutStylePatterns,fallthroughStylePatterns){var shortcuts={};var tokenizer;(function(){var allPatterns=shortcutStylePatterns.concat(fallthroughStylePatterns);var allRegexs=[];var regexKeys={};for(var i=0,n=allPatterns.length;i<n;++i){var patternParts=allPatterns[i];var shortcutChars=patternParts[3];if(shortcutChars){for(var c=shortcutChars.length;--c>=0;){shortcuts[shortcutChars.charAt(c)]=patternParts;}}
var regex=patternParts[1];var k=''+regex;if(!regexKeys.hasOwnProperty(k)){allRegexs.push(regex);regexKeys[k]=null;}}
allRegexs.push(/[\0-\uffff]/);tokenizer=combinePrefixPatterns(allRegexs);})();var nPatterns=fallthroughStylePatterns.length;var decorate=function(job){var sourceCode=job.sourceCode,basePos=job.basePos;var decorations=[basePos,PR_PLAIN];var pos=0;var tokens=sourceCode.match(tokenizer)||[];var styleCache={};for(var ti=0,nTokens=tokens.length;ti<nTokens;++ti){var token=tokens[ti];var style=styleCache[token];var match=void 0;var isEmbedded;if(typeof style==='string'){isEmbedded=false;}else{var patternParts=shortcuts[token.charAt(0)];if(patternParts){match=token.match(patternParts[1]);style=patternParts[0];}else{for(var i=0;i<nPatterns;++i){patternParts=fallthroughStylePatterns[i];match=token.match(patternParts[1]);if(match){style=patternParts[0];break;}}
if(!match){style=PR_PLAIN;}}
isEmbedded=style.length>=5&&'lang-'===style.substring(0,5);if(isEmbedded&&!(match&&typeof match[1]==='string')){isEmbedded=false;style=PR_SOURCE;}
if(!isEmbedded){styleCache[token]=style;}}
var tokenStart=pos;pos+=token.length;if(!isEmbedded){decorations.push(basePos+tokenStart,style);}else{var embeddedSource=match[1];var embeddedSourceStart=token.indexOf(embeddedSource);var embeddedSourceEnd=embeddedSourceStart+embeddedSource.length;if(match[2]){embeddedSourceEnd=token.length-match[2].length;embeddedSourceStart=embeddedSourceEnd-embeddedSource.length;}
var lang=style.substring(5);appendDecorations(basePos+tokenStart,token.substring(0,embeddedSourceStart),decorate,decorations);appendDecorations(basePos+tokenStart+embeddedSourceStart,embeddedSource,langHandlerForExtension(lang,embeddedSource),decorations);appendDecorations(basePos+tokenStart+embeddedSourceEnd,token.substring(embeddedSourceEnd),decorate,decorations);}}
job.decorations=decorations;};return decorate;}
function sourceDecorator(options){var shortcutStylePatterns=[],fallthroughStylePatterns=[];if(options['tripleQuotedStrings']){shortcutStylePatterns.push([PR_STRING,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,'\'"']);}else if(options['multiLineStrings']){shortcutStylePatterns.push([PR_STRING,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,'\'"`']);}else{shortcutStylePatterns.push([PR_STRING,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,'"\'']);}
if(options['verbatimStrings']){fallthroughStylePatterns.push([PR_STRING,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);}
var hc=options['hashComments'];if(hc){if(options['cStyleComments']){if(hc>1){shortcutStylePatterns.push([PR_COMMENT,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,'#']);}else{shortcutStylePatterns.push([PR_COMMENT,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,'#']);}
fallthroughStylePatterns.push([PR_STRING,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null]);}else{shortcutStylePatterns.push([PR_COMMENT,/^#[^\r\n]*/,null,'#']);}}
if(options['cStyleComments']){fallthroughStylePatterns.push([PR_COMMENT,/^\/\/[^\r\n]*/,null]);fallthroughStylePatterns.push([PR_COMMENT,/^\/\*[\s\S]*?(?:\*\/|$)/,null]);}
if(options['regexLiterals']){var REGEX_LITERAL=('/(?=[^/*])'
+'(?:[^/\\x5B\\x5C]'
+'|\\x5C[\\s\\S]'
+'|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+'
+'/');fallthroughStylePatterns.push(['lang-regex',new RegExp('^'+REGEXP_PRECEDER_PATTERN+'('+REGEX_LITERAL+')')]);}
var types=options['types'];if(types){fallthroughStylePatterns.push([PR_TYPE,types]);}
var keywords=(""+options['keywords']).replace(/^ | $/g,'');if(keywords.length){fallthroughStylePatterns.push([PR_KEYWORD,new RegExp('^(?:'+keywords.replace(/[\s,]+/g,'|')+')\\b'),null]);}
shortcutStylePatterns.push([PR_PLAIN,/^\s+/,null,' \r\n\t\xA0']);var punctuation=/^.[^\s\w\.$@\'\"\`\/\\]*/;fallthroughStylePatterns.push([PR_LITERAL,/^@[a-z_$][a-z_$@0-9]*/i,null],[PR_TYPE,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[PR_PLAIN,/^[a-z_$][a-z_$@0-9]*/i,null],[PR_LITERAL,new RegExp('^(?:'
+'0x[a-f0-9]+'
+'|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
+'(?:e[+\\-]?\\d+)?'
+')'
+'[a-z]*','i'),null,'0123456789'],[PR_PLAIN,/^\\[\s\S]?/,null],[PR_PUNCTUATION,punctuation,null]);return createSimpleLexer(shortcutStylePatterns,fallthroughStylePatterns);}
var decorateSource=sourceDecorator({'keywords':ALL_KEYWORDS,'hashComments':true,'cStyleComments':true,'multiLineStrings':true,'regexLiterals':true});function numberLines(node,opt_startLineNum,isPreformatted){var nocode=/(?:^|\s)nocode(?:\s|$)/;var lineBreak=/\r\n?|\n/;var document=node.ownerDocument;var li=document.createElement('li');while(node.firstChild){li.appendChild(node.firstChild);}
var listItems=[li];function walk(node){switch(node.nodeType){case 1:if(nocode.test(node.className)){break;}
if('br'===node.nodeName){breakAfter(node);if(node.parentNode){node.parentNode.removeChild(node);}}else{for(var child=node.firstChild;child;child=child.nextSibling){walk(child);}}
break;case 3:case 4:if(isPreformatted){var text=node.nodeValue;var match=text.match(lineBreak);if(match){var firstLine=text.substring(0,match.index);node.nodeValue=firstLine;var tail=text.substring(match.index+match[0].length);if(tail){var parent=node.parentNode;parent.insertBefore(document.createTextNode(tail),node.nextSibling);}
breakAfter(node);if(!firstLine){node.parentNode.removeChild(node);}}}
break;}}
function breakAfter(lineEndNode){while(!lineEndNode.nextSibling){lineEndNode=lineEndNode.parentNode;if(!lineEndNode){return;}}
function breakLeftOf(limit,copy){var rightSide=copy?limit.cloneNode(false):limit;var parent=limit.parentNode;if(parent){var parentClone=breakLeftOf(parent,1);var next=limit.nextSibling;parentClone.appendChild(rightSide);for(var sibling=next;sibling;sibling=next){next=sibling.nextSibling;parentClone.appendChild(sibling);}}
return rightSide;}
var copiedListItem=breakLeftOf(lineEndNode.nextSibling,0);for(var parent;(parent=copiedListItem.parentNode)&&parent.nodeType===1;){copiedListItem=parent;}
listItems.push(copiedListItem);}
for(var i=0;i<listItems.length;++i){walk(listItems[i]);}
if(opt_startLineNum===(opt_startLineNum|0)){listItems[0].setAttribute('value',opt_startLineNum);}
var ol=document.createElement('ol');ol.className='linenums';var offset=Math.max(0,((opt_startLineNum-1))|0)||0;for(var i=0,n=listItems.length;i<n;++i){li=listItems[i];li.className='L'+((i+offset)%10);if(!li.firstChild){li.appendChild(document.createTextNode('\xA0'));}
ol.appendChild(li);}
node.appendChild(ol);}
function recombineTagsAndDecorations(job){var isIE8OrEarlier=/\bMSIE\s(\d+)/.exec(navigator.userAgent);isIE8OrEarlier=isIE8OrEarlier&&+isIE8OrEarlier[1]<=8;var newlineRe=/\n/g;var source=job.sourceCode;var sourceLength=source.length;var sourceIndex=0;var spans=job.spans;var nSpans=spans.length;var spanIndex=0;var decorations=job.decorations;var nDecorations=decorations.length;var decorationIndex=0;decorations[nDecorations]=sourceLength;var decPos,i;for(i=decPos=0;i<nDecorations;){if(decorations[i]!==decorations[i+2]){decorations[decPos++]=decorations[i++];decorations[decPos++]=decorations[i++];}else{i+=2;}}
nDecorations=decPos;for(i=decPos=0;i<nDecorations;){var startPos=decorations[i];var startDec=decorations[i+1];var end=i+2;while(end+2<=nDecorations&&decorations[end+1]===startDec){end+=2;}
decorations[decPos++]=startPos;decorations[decPos++]=startDec;i=end;}
nDecorations=decorations.length=decPos;var sourceNode=job.sourceNode;var oldDisplay;if(sourceNode){oldDisplay=sourceNode.style.display;sourceNode.style.display='none';}
try{var decoration=null;while(spanIndex<nSpans){var spanStart=spans[spanIndex];var spanEnd=spans[spanIndex+2]||sourceLength;var decEnd=decorations[decorationIndex+2]||sourceLength;var end=Math.min(spanEnd,decEnd);var textNode=spans[spanIndex+1];var styledText;if(textNode.nodeType!==1&&(styledText=source.substring(sourceIndex,end))){if(isIE8OrEarlier){styledText=styledText.replace(newlineRe,'\r');}
textNode.nodeValue=styledText;var document=textNode.ownerDocument;var span=document.createElement('span');span.className=decorations[decorationIndex+1];var parentNode=textNode.parentNode;parentNode.replaceChild(span,textNode);span.appendChild(textNode);if(sourceIndex<spanEnd){spans[spanIndex+1]=textNode=document.createTextNode(source.substring(end,spanEnd));parentNode.insertBefore(textNode,span.nextSibling);}}
sourceIndex=end;if(sourceIndex>=spanEnd){spanIndex+=2;}
if(sourceIndex>=decEnd){decorationIndex+=2;}}}finally{if(sourceNode){sourceNode.style.display=oldDisplay;}}}
var langHandlerRegistry={};function registerLangHandler(handler,fileExtensions){for(var i=fileExtensions.length;--i>=0;){var ext=fileExtensions[i];if(!langHandlerRegistry.hasOwnProperty(ext)){langHandlerRegistry[ext]=handler;}else if(win['console']){console['warn']('cannot override language handler %s',ext);}}}
function langHandlerForExtension(extension,source){if(!(extension&&langHandlerRegistry.hasOwnProperty(extension))){extension=/^\s*</.test(source)?'default-markup':'default-code';}
return langHandlerRegistry[extension];}
registerLangHandler(decorateSource,['default-code']);registerLangHandler(createSimpleLexer([],[[PR_PLAIN,/^[^<?]+/],[PR_DECLARATION,/^<!\w[^>]*(?:>|$)/],[PR_COMMENT,/^<\!--[\s\S]*?(?:-\->|$)/],['lang-',/^<\?([\s\S]+?)(?:\?>|$)/],['lang-',/^<%([\s\S]+?)(?:%>|$)/],[PR_PUNCTUATION,/^(?:<[%?]|[%?]>)/],['lang-',/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],['lang-js',/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],['lang-css',/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],['lang-in.tag',/^(<\/?[a-z][^<>]*>)/i]]),['default-markup','htm','html','mxml','xhtml','xml','xsl']);registerLangHandler(createSimpleLexer([[PR_PLAIN,/^[\s]+/,null,' \t\r\n'],[PR_ATTRIB_VALUE,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,'\"\'']],[[PR_TAG,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[PR_ATTRIB_NAME,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],['lang-uq.val',/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[PR_PUNCTUATION,/^[=<>\/]+/],['lang-js',/^on\w+\s*=\s*\"([^\"]+)\"/i],['lang-js',/^on\w+\s*=\s*\'([^\']+)\'/i],['lang-js',/^on\w+\s*=\s*([^\"\'>\s]+)/i],['lang-css',/^style\s*=\s*\"([^\"]+)\"/i],['lang-css',/^style\s*=\s*\'([^\']+)\'/i],['lang-css',/^style\s*=\s*([^\"\'>\s]+)/i]]),['in.tag']);registerLangHandler(createSimpleLexer([],[[PR_ATTRIB_VALUE,/^[\s\S]+/]]),['uq.val']);registerLangHandler(sourceDecorator({'keywords':CPP_KEYWORDS,'hashComments':true,'cStyleComments':true,'types':C_TYPES}),['c','cc','cpp','cxx','cyc','m']);registerLangHandler(sourceDecorator({'keywords':'null,true,false'}),['json']);registerLangHandler(sourceDecorator({'keywords':CSHARP_KEYWORDS,'hashComments':true,'cStyleComments':true,'verbatimStrings':true,'types':C_TYPES}),['cs']);registerLangHandler(sourceDecorator({'keywords':JAVA_KEYWORDS,'cStyleComments':true}),['java']);registerLangHandler(sourceDecorator({'keywords':SH_KEYWORDS,'hashComments':true,'multiLineStrings':true}),['bsh','csh','sh']);registerLangHandler(sourceDecorator({'keywords':PYTHON_KEYWORDS,'hashComments':true,'multiLineStrings':true,'tripleQuotedStrings':true}),['cv','py']);registerLangHandler(sourceDecorator({'keywords':PERL_KEYWORDS,'hashComments':true,'multiLineStrings':true,'regexLiterals':true}),['perl','pl','pm']);registerLangHandler(sourceDecorator({'keywords':RUBY_KEYWORDS,'hashComments':true,'multiLineStrings':true,'regexLiterals':true}),['rb']);registerLangHandler(sourceDecorator({'keywords':JSCRIPT_KEYWORDS,'cStyleComments':true,'regexLiterals':true}),['js']);registerLangHandler(sourceDecorator({'keywords':COFFEE_KEYWORDS,'hashComments':3,'cStyleComments':true,'multilineStrings':true,'tripleQuotedStrings':true,'regexLiterals':true}),['coffee']);registerLangHandler(createSimpleLexer([],[[PR_STRING,/^[\s\S]+/]]),['regex']);function applyDecorator(job){var opt_langExtension=job.langExtension;try{var sourceAndSpans=extractSourceSpans(job.sourceNode,job.pre);var source=sourceAndSpans.sourceCode;job.sourceCode=source;job.spans=sourceAndSpans.spans;job.basePos=0;langHandlerForExtension(opt_langExtension,source)(job);recombineTagsAndDecorations(job);}catch(e){if(win['console']){console['log'](e&&e['stack']?e['stack']:e);}}}
function prettyPrintOne(sourceCodeHtml,opt_langExtension,opt_numberLines){var container=document.createElement('pre');container.innerHTML=sourceCodeHtml;if(opt_numberLines){numberLines(container,opt_numberLines,true);}
var job={langExtension:opt_langExtension,numberLines:opt_numberLines,sourceNode:container,pre:1};applyDecorator(job);return container.innerHTML;}
function prettyPrint(opt_whenDone){function byTagName(tn){return document.getElementsByTagName(tn);}
var codeSegments=[byTagName('pre'),byTagName('code'),byTagName('xmp')];var elements=[];for(var i=0;i<codeSegments.length;++i){for(var j=0,n=codeSegments[i].length;j<n;++j){elements.push(codeSegments[i][j]);}}
codeSegments=null;var clock=Date;if(!clock['now']){clock={'now':function(){return+(new Date);}};}
var k=0;var prettyPrintingJob;var langExtensionRe=/\blang(?:uage)?-([\w.]+)(?!\S)/;var prettyPrintRe=/\bprettyprint\b/;var prettyPrintedRe=/\bprettyprinted\b/;var preformattedTagNameRe=/pre|xmp/i;var codeRe=/^code$/i;var preCodeXmpRe=/^(?:pre|code|xmp)$/i;function doWork(){var endTime=(win['PR_SHOULD_USE_CONTINUATION']?clock['now']()+250:Infinity);for(;k<elements.length&&clock['now']()<endTime;k++){var cs=elements[k];var className=cs.className;if(prettyPrintRe.test(className)&&!prettyPrintedRe.test(className)){var nested=false;for(var p=cs.parentNode;p;p=p.parentNode){var tn=p.tagName;if(preCodeXmpRe.test(tn)&&p.className&&prettyPrintRe.test(p.className)){nested=true;break;}}
if(!nested){cs.className+=' prettyprinted';var langExtension=className.match(langExtensionRe);var wrapper;if(!langExtension&&(wrapper=childContentWrapper(cs))&&codeRe.test(wrapper.tagName)){langExtension=wrapper.className.match(langExtensionRe);}
if(langExtension){langExtension=langExtension[1];}
var preformatted;if(preformattedTagNameRe.test(cs.tagName)){preformatted=1;}else{var currentStyle=cs['currentStyle'];var whitespace=(currentStyle?currentStyle['whiteSpace']:(document.defaultView&&document.defaultView.getComputedStyle)?document.defaultView.getComputedStyle(cs,null).getPropertyValue('white-space'):0);preformatted=whitespace&&'pre'===whitespace.substring(0,3);}
var lineNums=cs.className.match(/\blinenums\b(?::(\d+))?/);lineNums=lineNums?lineNums[1]&&lineNums[1].length?+lineNums[1]:true:false;if(lineNums){numberLines(cs,lineNums,preformatted);}
prettyPrintingJob={langExtension:langExtension,sourceNode:cs,numberLines:lineNums,pre:preformatted};applyDecorator(prettyPrintingJob);}}}
if(k<elements.length){setTimeout(doWork,250);}else if(opt_whenDone){opt_whenDone();}}
doWork();}
var PR=win['PR']={'createSimpleLexer':createSimpleLexer,'registerLangHandler':registerLangHandler,'sourceDecorator':sourceDecorator,'PR_ATTRIB_NAME':PR_ATTRIB_NAME,'PR_ATTRIB_VALUE':PR_ATTRIB_VALUE,'PR_COMMENT':PR_COMMENT,'PR_DECLARATION':PR_DECLARATION,'PR_KEYWORD':PR_KEYWORD,'PR_LITERAL':PR_LITERAL,'PR_NOCODE':PR_NOCODE,'PR_PLAIN':PR_PLAIN,'PR_PUNCTUATION':PR_PUNCTUATION,'PR_SOURCE':PR_SOURCE,'PR_STRING':PR_STRING,'PR_TAG':PR_TAG,'PR_TYPE':PR_TYPE,'prettyPrintOne':win['prettyPrintOne']=prettyPrintOne,'prettyPrint':win['prettyPrint']=prettyPrint};if(typeof define==="function"&&define['amd']){define("google-code-prettify",[],function(){return PR;});}})();
;(function(window, document) {

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // Shims for IE < 9
  //

  document.head = document.getElementsByTagName('head')[0];

  if (!('getElementsByClassName' in document)) {
    document.getElementsByClassName = function(name) {
      function getElementsByClassName(node, classname) {
        var a = [];
        var re = new RegExp('(^| )'+classname+'( |$)');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
        return a;
      }
      return getElementsByClassName(document.body, name);
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Get user elements we need
  //

  var markdownEl = document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0],
      titleEl = document.getElementsByTagName('title')[0],
      scriptEls = document.getElementsByTagName('script'),
      navbarEl = document.getElementsByClassName('navbar')[0];

  //////////////////////////////////////////////////////////////////////
  //
  // <head> stuff
  //

  // Use <meta> viewport so that Bootstrap is actually responsive on mobile
  var metaEl = document.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
  if (document.head.firstChild)
    document.head.insertBefore(metaEl, document.head.firstChild);
  else
    document.head.appendChild(metaEl);

  // Get origin of script
  var origin = '';
  for (var i = 0; i < scriptEls.length; i++) {
    if (scriptEls[i].src.match('strapdown')) {
      origin = scriptEls[i].src;
    }
  }
  var originBase = origin.substr(0, origin.lastIndexOf('/'));

  // Get theme
  var theme = markdownEl.getAttribute('theme') || 'bootstrap';
  theme = theme.toLowerCase();

  // Stylesheets
  var linkEl = document.createElement('link');
  linkEl.href = originBase + '/themes/'+theme+'.min.css';
  linkEl.rel = 'stylesheet';
  document.head.appendChild(linkEl);

  var linkEl = document.createElement('link');
  linkEl.href = originBase + '/strapdown.css';
  linkEl.rel = 'stylesheet';
  document.head.appendChild(linkEl);

  //////////////////////////////////////////////////////////////////////
  //
  // <body> stuff
  //

  var markdown = markdownEl.textContent || markdownEl.innerText;

  var newNode = document.createElement('div');
  newNode.className = 'container';
  newNode.id = 'content';
  document.body.replaceChild(newNode, markdownEl);

  // Insert navbar if there's none
  var newNode = document.createElement('div');
  newNode.className = 'navbar navbar-default navbar-fixed-top';
  if (!navbarEl && titleEl) {
    newNode.innerHTML = '<div class="container"> <div class="navbar-header"> <div id="headline" class="navbar-brand"> </div> </div> </div>';
    document.body.insertBefore(newNode, document.body.firstChild);
    var title = titleEl.innerHTML;
    var headlineEl = document.getElementById('headline');
    if (headlineEl)
      headlineEl.innerHTML = title;
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Markdown!
  //

  // Generate Markdown
  var html = marked(markdown);
  document.getElementById('content').innerHTML = html;

  // Prettify
  var codeEls = document.getElementsByTagName('code');
  for (var i=0, ii=codeEls.length; i<ii; i++) {
    var codeEl = codeEls[i];
    var lang = codeEl.className;
    codeEl.className = 'prettyprint lang-' + lang;
  }
  prettyPrint();

  // Style tables
  var tableEls = document.getElementsByTagName('table');
  for (var i=0, ii=tableEls.length; i<ii; i++) {
    var tableEl = tableEls[i];
    tableEl.className = 'table table-striped table-bordered';
  }

  // All done - show body
  document.body.style.display = '';

})(window, document);

