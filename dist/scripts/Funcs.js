import{Base}from"./Base.js";class NumberFuncs extends Base{constructor(){super()}numberFormater(r={style:"currency",currency:"EUR"},t="fr-FR"){try{if(t&&"string"!=typeof t)throw new Error("Invalid local.");if(!r||r instanceof Object)return new Intl.NumberFormat(t,r);throw new Error("Invalid options.")}catch(r){return this.error(r)}}range(r=100,t=0,e=1,n=0){try{if("number"!=typeof r)throw new Error("Invalid max.");if("number"!=typeof t)throw new Error("Invalid min.");if("number"!=typeof e)throw new Error("Invalid step.");if("number"!=typeof n)throw new Error("Invalid type.");for(var o=[];t<=r;)o.push(t),t+=e;var a=o.join(" ");return[o,a][n]}catch(r){return this.error(r)}}rand(r=101,t=0){try{if("number"!=typeof r)throw new Error("Invalid max.");if("number"!=typeof t)throw new Error("Invalid min.");return Math.floor(Math.random()*(r-t))+t}catch(r){return this.error(r)}}isEven(r){try{if("number"!=typeof r)throw new Error("Invalid num.");return!(1&r)}catch(r){return this.error(r)}}sum(r){try{if(r instanceof Array)return r.reduce((r,t)=>r+t);throw new Error("Invalid nums.")}catch(r){return this.error(r)}}avg(r){try{if(r instanceof Array)return this.sum(r)/r.length;throw new Error("Invalid nums.")}catch(r){return this.error(r)}}median(r){try{var t,e;if(r instanceof Array)return t=r.toSorted((r,t)=>r-t),this.isEven(t.length)?(e=t.length/2,this.avg([t[e-1],t[e]])):t[Math.floor(t.length/2)];throw new Error("Invalid nums.")}catch(r){return this.error(r)}}clamp(r,t,e){try{if("number"!=typeof r)throw new Error("Invalid num.");if("number"!=typeof t)throw new Error("Invalid min.");if("number"!=typeof e)throw new Error("Invalid max.");return Math.min(Math.max(r,t),e)}catch(r){return this.error(r)}}}class StringFuncs extends Base{constructor(){super()}getString(r="letters"){try{if("string"!=typeof r)throw new Error("Invalid type.");var t={letters:"abcdefghijklmnopqrstuvwxyz",numbers:"0123456789",symbols:"$%-/\\+*.&! §:;?,(){}[]@#~¨^²°|`'\"_=¤£µ€"};return"all"===r?t.letters+t.numbers+t.symbols:t[r]}catch(r){return this.error(r)}}formatText(r){try{if("string"!=typeof r)throw new Error("Invalid string.");return(""+r[0].toUpperCase()+r.substring(1).toLowerCase()).replaceAll("-"," ").trim()}catch(r){return this.error(r)}}shuffle(e){try{if("string"!=typeof e)throw new Error("Invalid string.");let t="";for(let r=0;r<e.length;r++){var n=Math.floor(Math.random()*e.length);t+=e[n]}return t}catch(r){return this.error(r)}}strRev(r){try{if("string"!=typeof r)throw new Error("Invalid str.");return r.split("").reverse().join("").toLowerCase()}catch(r){return this.error(r)}}slug(r){try{if("string"!=typeof r)throw new Error("Invalid string.");return r.match(/\w+/)?.[0]}catch(r){return this.error(r)}}validateInput(r,t=100){if(!r)return!1;if("number"!=typeof t)throw new Error("Invalid limit.");return r}}class DateFuncs extends Base{constructor(){super()}dateFormater(r,t="fr-FR"){try{if(t&&"string"!=typeof t)throw new Error("Invalid local.");if(!r||r instanceof Object)return new Intl.DateTimeFormat(t,r);throw new Error("Invalid options.")}catch(r){return this.error(r)}}relativeDateFormater(r={numeric:"auto"},t="fr-FR"){try{if(t&&"string"!=typeof t)throw new Error("Invalid local.");if(!r||r instanceof Object)return new Intl.RelativeTimeFormat(t,r);throw new Error("Invalid options.")}catch(r){return this.error(r)}}dateToUnix(r){try{if(r instanceof Date)return Math.round(Date.parse(r)/1e3);throw new Error("Invalid date.")}catch(r){return this.error(r)}}unixToDate(r){try{if("number"!=typeof r)throw new Error("Invalid unix.");return new Date(1e3*r)}catch(r){return this.error(r)}}dayToSeconds(r=7){try{if("number"!=typeof r)throw new Error("Invalid day.");return 86400*r}catch(r){return this.error(r)}}secondsToDay(r){try{if("number"!=typeof r)throw new Error("Invalid seconds.");return Math.round(r/86400)}catch(r){return this.error(r)}}}class Dom extends Base{constructor(){super()}select(r){try{if("string"!=typeof r)throw new Error("Invalid tag.");return document.querySelector(r)}catch(r){return this.error(r)}}selectAll(r){try{if("string"!=typeof r)throw new Error("Invalid tag.");return Array.from(document.querySelectorAll(r))}catch(r){return this.error(r)}}create(r,t){try{if("string"!=typeof r)throw new Error("Invalid tag.");var e=document.createElement(r);if(t){if(!(t instanceof Object))throw new Error("Invalid attribs.");for(var[n,o]of Object.entries(t))e.setAttribute(n,o)}return e}catch(r){return this.error(r)}}modClass(r,t,e="add"){try{if(!(r instanceof HTMLElement))throw new Error("Invalid elem.");if("string"!=typeof t)throw new Error("Invalid className.");if("string"!=typeof e)throw new Error("Invalid mod.");({add:()=>r.classList.add(t),del:()=>r.classList.remove(t),tog:()=>r.classList.toggle(t)})[e]()}catch(r){return this.error(r)}return!0}go(r,t=window,e=0,n=0){try{if(!(r instanceof HTMLElement))throw new Error("Invalid to elem.");if(!(t instanceof Object))throw new Error("Invalid from elem.");if("number"!=typeof e)throw new Error("Invalid margeX.");if("number"!=typeof n)throw new Error("Invalid margeY.");t.scroll(r.offsetLeft-e,r.offsetTop-n)}catch(r){return this.error(r)}return!0}notify(t,e,n=2){try{if("string"!=typeof t)throw new Error("Invalid content.");if(e&&"string"!=typeof e)throw new Error("Invalid type.");if(n&&"number"!=typeof n)throw new Error("Invalid delay.");var o=this.select("#notifications");if(!o)throw new Error("No root in DOM.");let r=this.create("p");e&&this.modClass(r,e),r.textContent=t,o.append(r),setTimeout(()=>{r.remove()},1e3*n)}catch(r){return this.error(r)}return!0}setNavPage(){try{var r=this.select("#nav-page ul");if(!r)throw new Error("No root in DOM.");this.modClass(r,"flex");var t,e=new StringFuncs;for(t of this.selectAll("main > section")){var n,o,a,i,s=t.id.trim();s&&(n=e.formatText(s),o=this.create("li"),a=this.create("a",{class:"link",href:"#"+s,target:"_self"}),i=this.create("h2"),a.textContent=n,i.textContent=n,o.append(a),r.append(o),t.prepend(i))}}catch(r){return this.error(r)}return!0}setCopyright(r="Par ",t={ref:"https://paypal.me/mohamedSkd",text:"Moh. SD"}){try{if(r&&"string"!=typeof r)throw new Error("Invalid info.");if(t&&!(t instanceof Object))throw new Error("Invalid link.");var e=this.select("#copyright");if(!e)throw new Error("No root in DOM.");var n,o=new Date;r||t?t?((n=this.create("a",{href:t.ref,class:"link"})).textContent=t.text,e.append(r,n," © "+o.getFullYear())):e.append(r," © "+o.getFullYear()):e.textContent="© "+o.getFullYear()}catch(r){return this.error(r)}return!0}canvas(r){try{if(!(r instanceof HTMLCanvasElement))throw new Error("Invalid canvas.");let i=r.getContext("2d");if(i)return{ctxt:i,draw:(r=[0,0],t=10,e="rect",n=!0,o="black")=>{try{if(!(r instanceof Array))throw new Error("Invalid point.");if("number"!=typeof t)throw new Error("Invalid size.");if("string"!=typeof e)throw new Error("Invalid shape.");if("boolean"!=typeof n)throw new Error("Invalid fill.");if("string"!=typeof o)throw new Error("Invalid style.");var a={rect:()=>i.rect(r[0],r[1],t,t),arc:()=>i.arc(r[0],r[1],t/2,0,2*Math.PI)};n?(i.fillStyle=o,i.beginPath(),a[e](),i.fill()):(i.strokeStyle=o,i.beginPath(),a[e](),i.stroke())}catch(r){return this.error(r)}return!0},clear:(r=[0,0],t=i.canvas.width>i.canvas.height?i.canvas.width:i.canvas.height)=>{try{if(!(r instanceof Array))throw new Error("Invalid point.");if("number"!=typeof t)throw new Error("Invalid size.");i.clearRect(r[0],r[1],t,t)}catch(r){return this.error(r)}return!0}};throw new Error("Invalid context")}catch(r){return this.error(r)}}removeChildren(r){for(;r.firstElementChild;)r.firstElementChild.remove();return!0}prependHtml(r,t){return r.insertAdjacentHTML("afterbegin",t),!0}appendHtml(r,t){return r.insertAdjacentHTML("beforeend",t),!0}handleTheme(o=null){try{var a=this.select("#theme");if(!a)throw new Error("Invalid theme.");var i=new Fetch,s=this.create("button",{title:"Theme"});let r=matchMedia("(prefers-color-scheme:dark)"),t=i.local("dark-theme"),e=t.get()??r.matches,n=()=>{if(e){if(document.documentElement.style.colorScheme="dark",o)for(let r=0;r<o.length;r++)this.modClass(o[r],"dark")}else if(document.documentElement.style.colorScheme="light",o)for(let r=0;r<o.length;r++)this.modClass(o[r],"dark","del");t.set(e)};n(),a.append(s),s.addEventListener("click",()=>{e=!e,n()}),r.addEventListener("change",()=>{e=r.matches,n()})}catch(r){return this.error(r)}return!0}}class Fetch extends Base{constructor(){super()}async get(t=location.pathname,e=null,n="json"){try{if(e&&!(e instanceof Object))throw new Error("Invalid value.");if("string"!=typeof t)throw new Error("Invalid target.");if("string"!=typeof n)throw new Error("Invalid rType.");var o=this.objToReq(e),a=await fetch(o?t+"?"+o:t);let r;switch(n){case"json":r=await a.json();break;case"text":r=await a.text()}return r}catch(r){return this.error(r)}}async post(t=location.pathname,e=null,n="json"){try{if(e&&!(e instanceof Object))throw new Error("Invalid value.");if("string"!=typeof t)throw new Error("Invalid target.");if("string"!=typeof n)throw new Error("Invalid rType.");var o=this.objToReq(e),a=await fetch(t,{method:"post",body:o,headers:{"content-type":"application/x-www-form-urlencoded"}});let r;switch(n){case"json":r=await a.json();break;case"text":r=await a.text()}return r}catch(r){return this.error(r)}}objToReq(t){try{if(!t)return null;if(!(t instanceof Object))throw new Error("Invalid value.");let r="";for(var e in t){var n=(""+t[e]).trim();r+=e+`=${n}&`}return r}catch(r){return this.error(r)}}local(t){try{if("string"!=typeof t)throw new Error("Invalid key.");return{get:()=>JSON.parse(localStorage.getItem(t)),set:r=>{localStorage.setItem(t,JSON.stringify(r))}}}catch(r){return this.error(r)}}}export{NumberFuncs,StringFuncs,DateFuncs,Dom,Fetch};