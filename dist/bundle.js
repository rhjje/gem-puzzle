(()=>{"use strict";(()=>{function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n=function(){function n(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.field=document.querySelector(".field"),this.buttonPlay=document.querySelector(".play"),this.buttonSettings=document.querySelector(".settings-button"),this.counter=document.querySelector(".counter"),this.timer=document.querySelector(".timer"),this.endOfGame=document.querySelector(".end-of-game"),this.audio=new Audio("./assets/sounds/move.wav"),this.fieldSize=16,this.text="black",this.image="off",this.moveCounter=0,this.timerOff=!0}var r,i;return r=n,(i=[{key:"shuffleGameField",value:function(e){for(var n=function(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Array(e).keys()).sort((function(){return Math.random()-.5})),r=Math.sqrt(e),i=[],o=0;o<n.length;o+=r)i.push(n.slice(o,r+o));i.map((function(t,e){return e%2?t.reverse():t}));for(var a=i.flat(),c=0,s=0;s<a.length-1;s+=1)if(0!==a[s])for(var l=s+1;l<a.length;l+=1)a[s]>a[l]&&0!==a[l]&&(c+=1);if(c%2==0)if(0!==n[0]&&0!==n[1]){var u=[n[1],n[0]];n[0]=u[0],n[1]=u[1]}else{var f=[n[n.length-2],n[n.length-1]];n[n.length-1]=f[0],n[n.length-2]=f[1]}return n}},{key:"createGameField",value:function(){var t=this;this.shuffleGameField(this.fieldSize).forEach((function(e,n){var r=n%Math.sqrt(t.fieldSize),i=(n-r)/Math.sqrt(t.fieldSize),o=400/Math.sqrt(t.fieldSize);if(0!==e){var a=document.createElement("div");a.classList.add("cell"),a.innerText=e,a.style.width="".concat(400/Math.sqrt(t.fieldSize),"px"),a.style.height="".concat(400/Math.sqrt(t.fieldSize),"px"),a.style.left="".concat(r*o,"px"),a.style.top="".concat(i*o,"px"),"disabled"===t.text?a.style.fontSize="0rem":(a.style.color="".concat(t.text),a.style.fontSize=""),t.field.append(a)}else t.left="".concat(r*o,"px"),t.top="".concat(i*o,"px")})),this.bindTriggers(),"on"===this.image&&this.setImage()}},{key:"clearField",value:function(){document.querySelectorAll(".cell").forEach((function(t){return t.remove()}))}},{key:"getImageUrl",value:function(){var t=Math.floor(149*Math.random()+1);this.field.setAttribute("data-url","url(assets/images/".concat(t,".jpg)"))}},{key:"setImage",value:function(){var t=this,e=document.querySelectorAll(".cell"),n=this.field.getAttribute("data-url");e.forEach((function(r,i){var o="".concat(n," ").concat((+e[i].innerText-1)%Math.sqrt(t.fieldSize)*(100/(Math.sqrt(t.fieldSize)-1)),"% ").concat(Math.trunc((+e[i].innerText-1)/Math.sqrt(t.fieldSize))*(100/(Math.sqrt(t.fieldSize)-1)),"%");"on"===t.field.getAttribute("data-image")?(e[i].style.background=o,e[i].style.backgroundSize="400px"):e[i].style.background=""}))}},{key:"bindTriggers",value:function(){var t=this,e=document.querySelectorAll(".cell");e.forEach((function(n,r){n.addEventListener("click",(function(){var i=Math.abs(t.top.slice(0,-2)-n.style.top.slice(0,-2)),o=Math.abs(t.left.slice(0,-2)-n.style.left.slice(0,-2)),a=400/Math.sqrt(t.fieldSize);if(Math.trunc(i)+Math.trunc(o)===Math.trunc(a)){"on"===t.field.getAttribute("data-sound")&&t.audio.play(),t.moveCounter+=1,t.counter.innerHTML="Moves: ".concat(t.moveCounter),t.timerOff&&(t.setTimer(),t.timerOff=!1);var c=[e[r].style.left,t.left];t.left=c[0],e[r].style.left=c[1];var s=[e[r].style.top,t.top];t.top=s[0],e[r].style.top=s[1],t.checkStatus()}}))}))}},{key:"checkStatus",value:function(){var t=this,e=document.querySelectorAll(".cell"),n=400/Math.sqrt(this.fieldSize),r=0;e.forEach((function(e){"".concat(Math.trunc(e.style.left.slice(0,-2)),"px")==="".concat((+e.innerText-1)%Math.sqrt(t.fieldSize)*Math.trunc(n),"px")&&"".concat(Math.trunc(e.style.top.slice(0,-2)),"px")==="".concat(Math.trunc((+e.innerText-1)/Math.sqrt(t.fieldSize))*Math.trunc(n),"px")&&(r+=1)})),r===e.length&&(this.endOfGame.style.display="flex",this.buttonSettings.setAttribute("disabled","disabled"),this.setRecord(this.moveCounter,this.timer.innerText.slice(6),this.fieldSize),clearInterval(this.timerId))}},{key:"setTimer",value:function(){var t=this,e=0;this.timerId=setInterval((function(){t.field.getAttribute("data-pause")||(e+=1,t.timer.innerHTML="Time: \n        ".concat(Math.trunc(e/60)<10?"0".concat(Math.trunc(e/60)):Math.trunc(e/60),":").concat(e%60<10?"0".concat(e%60):e%60))}),1e3)}},{key:"setRecord",value:function(t,e,n){var r;r=localStorage.getItem("records".concat(n))?JSON.parse(localStorage.getItem("records".concat(n))):[];var i=(new Date).toString(),o={moves:t,time:e,date:"".concat(i.slice(8,10)," ").concat(i.slice(4,7)," ").concat(i.slice(11,15))};r.push(o),r.sort((function(t,e){return t.moves>e.moves?1:-1})),r.length>10?localStorage.setItem("records".concat(n),JSON.stringify(r.slice(0,10))):localStorage.setItem("records".concat(n),JSON.stringify(r))}},{key:"setInitialState",value:function(){clearInterval(this.timerId),this.endOfGame.style.display="none",this.timer.innerText="Time: 00:00",this.counter.innerText="Moves: 0",this.moveCounter=0,this.timerOff=!0,this.fieldSize=+this.field.getAttribute("data-size"),this.text=this.field.getAttribute("data-text"),this.image=this.field.getAttribute("data-image"),this.buttonSettings.removeAttribute("disabled"),this.getImageUrl(),this.clearField()}},{key:"init",value:function(){var t=this;this.getImageUrl(),this.createGameField(),this.buttonPlay.addEventListener("click",(function(){t.setInitialState(),t.createGameField()}))}}])&&e(r.prototype,i),n}();function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var s=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(u,t);var e,n,r,s,l=(r=u,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=c(r);if(s){var n=c(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return a(this,t)});function u(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(t=l.call(this)).settings=document.querySelector(".settings"),t.button=document.querySelector(".settings-button"),t.field=document.querySelector(".field"),t.text=document.getElementById("text"),t.sound=document.getElementById("sound"),t.image=document.getElementById("image"),t.size=document.getElementById("field-size"),t}return e=u,(n=[{key:"changeText",value:function(){var t=this,e=document.querySelectorAll(".cell");e.forEach((function(n,r){"disabled"===t.text.value?e[r].style.fontSize="0rem":(e[r].style.color="".concat(t.text.value),e[r].style.fontSize="")}))}},{key:"init",value:function(){var t=this;this.button.addEventListener("click",(function(e){"Settings"===e.target.innerHTML?(t.field.setAttribute("data-pause",!0),t.button.innerHTML="Resume game",t.settings.style.display="flex"):(t.field.removeAttribute("data-pause"),t.button.innerHTML="Settings",t.settings.style.display="none")})),this.text.addEventListener("change",(function(){t.field.setAttribute("data-text","".concat(t.text.value)),t.changeText()})),this.sound.addEventListener("change",(function(){t.field.setAttribute("data-sound","".concat(t.sound.value))})),this.image.addEventListener("change",(function(){t.field.setAttribute("data-image","".concat(t.image.value)),t.setImage()})),this.size.addEventListener("change",(function(){t.field.setAttribute("data-size","".concat(t.size.value))}))}}])&&i(e.prototype,n),u}(n);function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.button=document.querySelector(".popup-records__open"),this.container=document.querySelector(".popup-records"),this.settings=document.querySelector(".settings"),this.buttonSettings=document.querySelector(".settings-button"),this.fieldSize=document.getElementById("field-size")}var e,n;return e=t,(n=[{key:"buildTable",value:function(){var t=this;this.container.innerHTML="";var e=JSON.parse(localStorage.getItem("records".concat(this.fieldSize.value))),n="";e.forEach((function(t){n+='\n      <tbody class="records__tbody">\n        <tr class="records__row">\n          <th class="records__cell">'.concat(t.moves,'</th>\n          <th class="records__cell">').concat(t.time,'</th>\n          <th class="records__cell">').concat(t.date,"</th>\n        </tr>\n      </tbody>")}));var r='\n      <table class="records">\n      <caption class="records__caption">Best scores '.concat("9"===this.fieldSize.value?"3x3":"4x4",'</caption>\n      <thead class="records__thead">\n        <tr class="records__row">\n          <th class="records__cell">Moves</th>\n          <th class="records__cell">Time</th>\n          <th class="records__cell">Date</th>\n        </tr>\n      </thead>\n      ').concat(n,"\n    </table>");this.container.innerHTML+=r,this.container.innerHTML+='<a href="#" class="popup-records__close">Back</a>',this.container.style.display="flex",document.querySelector(".popup-records__close").addEventListener("click",(function(e){e.preventDefault(),t.container.style.display="none",t.settings.style.display="flex",t.buttonSettings.removeAttribute("disabled")}))}},{key:"init",value:function(){var t=this;this.button.addEventListener("click",(function(){t.buildTable(),t.settings.style.display="none",t.buttonSettings.setAttribute("disabled","disabled")}))}}])&&l(e.prototype,n),t}();document.addEventListener("DOMContentLoaded",(function(){(new n).init(),(new s).init(),(new u).init()}))})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2xlYWRlcmJvYXJkLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOlsiR2VtUHV6emxlIiwidGhpcyIsImZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnV0dG9uUGxheSIsImJ1dHRvblNldHRpbmdzIiwiY291bnRlciIsInRpbWVyIiwiZW5kT2ZHYW1lIiwiYXVkaW8iLCJBdWRpbyIsImZpZWxkU2l6ZSIsInRleHQiLCJpbWFnZSIsIm1vdmVDb3VudGVyIiwidGltZXJPZmYiLCJzaXplIiwiYXJyIiwiQXJyYXkiLCJrZXlzIiwic29ydCIsIk1hdGgiLCJyYW5kb20iLCJzcXJ0IiwidGVtcCIsImkiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJtYXAiLCJpdGVtIiwicmV2ZXJzZSIsInNuYWtlQXJyIiwiZmxhdCIsImoiLCJzaHVmZmxlR2FtZUZpZWxkIiwiZm9yRWFjaCIsImxlZnQiLCJ0b3AiLCJjZWxsU2l6ZSIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImZvbnRTaXplIiwiY29sb3IiLCJhcHBlbmQiLCJiaW5kVHJpZ2dlcnMiLCJzZXRJbWFnZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJyYW5kb21JbWFnZSIsImZsb29yIiwic2V0QXR0cmlidXRlIiwiY2VsbHMiLCJ1cmxJbWciLCJnZXRBdHRyaWJ1dGUiLCJfIiwiYmFja2dyb3VuZCIsInRydW5jIiwiYmFja2dyb3VuZFNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwidmVydGljYWxEaWZmIiwiYWJzIiwiaG9yaXpvbnREaWZmIiwicGxheSIsImlubmVySFRNTCIsInNldFRpbWVyIiwiY2hlY2tTdGF0dXMiLCJjb3VudCIsImRpc3BsYXkiLCJzZXRSZWNvcmQiLCJjbGVhckludGVydmFsIiwidGltZXJJZCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsIm1vdmVzIiwiZGF0YSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJub3ciLCJEYXRlIiwidG9TdHJpbmciLCJjdXJyZW50UmVzdWx0IiwiZGF0ZSIsImEiLCJiIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlbW92ZUF0dHJpYnV0ZSIsImdldEltYWdlVXJsIiwiY2xlYXJGaWVsZCIsImNyZWF0ZUdhbWVGaWVsZCIsInNldEluaXRpYWxTdGF0ZSIsIlNldHRpbmdzIiwic2V0dGluZ3MiLCJidXR0b24iLCJnZXRFbGVtZW50QnlJZCIsInNvdW5kIiwidmFsdWUiLCJldmVudCIsInRhcmdldCIsImNoYW5nZVRleHQiLCJMZWFkZXJib2FyZCIsImNvbnRhaW5lciIsInJvd3MiLCJ0YWJsZSIsInByZXZlbnREZWZhdWx0IiwiYnVpbGRUYWJsZSIsImluaXQiLCJMZWFkZXJCb2FyZCJdLCJtYXBwaW5ncyI6IjZTQUVxQkEsRSxXQUNuQixjLDRGQUFjLFNBQ1pDLEtBQUtDLE1BQVFDLFNBQVNDLGNBQWMsVUFDcENILEtBQUtJLFdBQWFGLFNBQVNDLGNBQWMsU0FDekNILEtBQUtLLGVBQWlCSCxTQUFTQyxjQUFjLG9CQUM3Q0gsS0FBS00sUUFBVUosU0FBU0MsY0FBYyxZQUN0Q0gsS0FBS08sTUFBUUwsU0FBU0MsY0FBYyxVQUNwQ0gsS0FBS1EsVUFBWU4sU0FBU0MsY0FBYyxnQkFDeENILEtBQUtTLE1BQVEsSUFBSUMsTUFBTSw0QkFFdkJWLEtBQUtXLFVBQVksR0FDakJYLEtBQUtZLEtBQU8sUUFDWlosS0FBS2EsTUFBUSxNQUViYixLQUFLYyxZQUFjLEVBQ25CZCxLQUFLZSxVQUFXLEUscURBR2xCLFNBQWlCQyxH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aUIsU0FBUyxTQUFDeUMsR0FDekVBLEVBQU1PLGlCQUNOLEVBQUtILFVBQVVqRSxNQUFNNkIsUUFBVSxPQUMvQixFQUFLMkIsU0FBU3hELE1BQU02QixRQUFVLE9BQzlCLEVBQUtyRSxlQUFlMEYsZ0JBQWdCLGlCLGtCQUl4QyxXQUFPLFdBQ0wvRixLQUFLc0csT0FBT3JDLGlCQUFpQixTQUFTLFdBQ3BDLEVBQUtpRCxhQUNMLEVBQUtiLFNBQVN4RCxNQUFNNkIsUUFBVSxPQUM5QixFQUFLckUsZUFBZW9ELGFBQWEsV0FBWSxvQixzQkMvQ25EdkQsU0FBUytELGlCQUFpQixvQkFBb0IsWUFDNUMsSUFBSWxFLEdBQVlvSCxRQUNoQixJQUFJZixHQUFXZSxRQUNmLElBQUlDLEdBQWNELFciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy5idXR0b25QbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKTtcbiAgICB0aGlzLmJ1dHRvblNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLWJ1dHRvbicpO1xuICAgIHRoaXMuY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyJyk7XG4gICAgdGhpcy50aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lcicpO1xuICAgIHRoaXMuZW5kT2ZHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZC1vZi1nYW1lJyk7XG4gICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygnLi9hc3NldHMvc291bmRzL21vdmUud2F2Jyk7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9IDE2O1xuICAgIHRoaXMudGV4dCA9ICdibGFjayc7XG4gICAgdGhpcy5pbWFnZSA9ICdvZmYnO1xuXG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG4gIH1cblxuICBzaHVmZmxlR2FtZUZpZWxkKHNpemUpIHtcbiAgICBjb25zdCBhcnIgPSBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIGNvbnN0IHNxcnQgPSBNYXRoLnNxcnQoc2l6ZSk7XG4gICAgY29uc3QgdGVtcCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSBzcXJ0KSB7XG4gICAgICB0ZW1wLnB1c2goYXJyLnNsaWNlKGksIHNxcnQgKyBpKSk7XG4gICAgfVxuICAgIHRlbXAubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICBpZiAoaSAlIDIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gICAgY29uc3Qgc25ha2VBcnIgPSB0ZW1wLmZsYXQoKTtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFrZUFyci5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgIGlmIChzbmFrZUFycltpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBzbmFrZUFyci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmIChzbmFrZUFycltpXSA+IHNuYWtlQXJyW2pdICYmIHNuYWtlQXJyW2pdICE9PSAwKSBjb3VudGVyICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ZXIgJSAyID09PSAwKSB7XG4gICAgICBpZiAoYXJyWzBdICE9PSAwICYmIGFyclsxXSAhPT0gMCkge1xuICAgICAgICBbYXJyWzBdLCBhcnJbMV1dID0gW2FyclsxXSwgYXJyWzBdXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFthcnJbYXJyLmxlbmd0aCAtIDFdLCBhcnJbYXJyLmxlbmd0aCAtIDJdXSA9IFthcnJbYXJyLmxlbmd0aCAtIDJdLCBhcnJbYXJyLmxlbmd0aCAtIDFdXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNyZWF0ZUdhbWVGaWVsZCgpIHtcbiAgICBjb25zdCBjZWxscyA9IHRoaXMuc2h1ZmZsZUdhbWVGaWVsZCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgY2VsbHMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgY29uc3QgbGVmdCA9IGkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgdG9wID0gKGkgLSBsZWZ0KSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBpZiAoaXRlbSAhPT0gMCkge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9IGl0ZW07XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dCA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnMHJlbSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IGAke3RoaXMudGV4dH1gO1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpZWxkLmFwcGVuZChjZWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIHRoaXMudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYmluZFRyaWdnZXJzKCk7XG4gICAgaWYgKHRoaXMuaW1hZ2UgPT09ICdvbicpIHRoaXMuc2V0SW1hZ2UoKTtcbiAgfVxuXG4gIGNsZWFyRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwucmVtb3ZlKCkpO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWApO1xuICB9XG5cbiAgc2V0SW1hZ2UoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IHVybEltZyA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGAke3VybEltZ30gJHsoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAlIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JSAke01hdGgudHJ1bmMoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JWA7XG4gICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKSA9PT0gJ29uJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNDAwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFRyaWdnZXJzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbERpZmYgPSBNYXRoLmFicyh0aGlzLnRvcC5zbGljZSgwLCAtMikgLSBjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBob3Jpem9udERpZmYgPSBNYXRoLmFicyh0aGlzLmxlZnQuc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgaWYgKE1hdGgudHJ1bmModmVydGljYWxEaWZmKSArIE1hdGgudHJ1bmMoaG9yaXpvbnREaWZmKSA9PT0gTWF0aC50cnVuYyhjZWxsU2l6ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnKSA9PT0gJ29uJykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICB0aGlzLmNvdW50ZXIuaW5uZXJIVE1MID0gYE1vdmVzOiAke3RoaXMubW92ZUNvdW50ZXJ9YDtcbiAgICAgICAgICBpZiAodGhpcy50aW1lck9mZikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lck9mZiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFt0aGlzLmxlZnQsIGNlbGxzW2ldLnN0eWxlLmxlZnRdID0gW2NlbGxzW2ldLnN0eWxlLmxlZnQsIHRoaXMubGVmdF07XG4gICAgICAgICAgW3RoaXMudG9wLCBjZWxsc1tpXS5zdHlsZS50b3BdID0gW2NlbGxzW2ldLnN0eWxlLnRvcCwgdGhpcy50b3BdO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXR1cygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KCgrY2VsbC5pbm5lclRleHQgLSAxKSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgXG4gICAgICAmJiBgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUudG9wLnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KE1hdGgudHJ1bmMoKCtjZWxsLmlubmVyVGV4dCAtIDEpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnQgPT09IGNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIHRoaXMuYnV0dG9uU2V0dGluZ3Muc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgdGhpcy5zZXRSZWNvcmQodGhpcy5tb3ZlQ291bnRlciwgdGhpcy50aW1lci5pbm5lclRleHQuc2xpY2UoNiksIHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lcigpIHtcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgdGhpcy50aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXVzZScpKSB7XG4gICAgICAgIHRpbWUgKz0gMTtcbiAgICAgICAgdGhpcy50aW1lci5pbm5lckhUTUwgPSBgVGltZTogXG4gICAgICAgICR7TWF0aC50cnVuYyh0aW1lIC8gNjApIDwgMTAgPyBgMCR7TWF0aC50cnVuYyh0aW1lIC8gNjApfWBcbiAgICA6IE1hdGgudHJ1bmModGltZSAvIDYwKX06JHt0aW1lICUgNjAgPCAxMCA/IGAwJHt0aW1lICUgNjB9YCA6IHRpbWUgJSA2MH1gO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgc2V0UmVjb3JkKG1vdmVzLCB0aW1lLCBzaXplKSB7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGByZWNvcmRzJHtzaXplfWApKSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgcmVjb3JkcyR7c2l6ZX1gKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke25vdy5zbGljZSg4LCAxMCl9ICR7bm93LnNsaWNlKDQsIDcpfSAke25vdy5zbGljZSgxMSwgMTUpfWA7XG5cbiAgICBjb25zdCBjdXJyZW50UmVzdWx0ID0geyBtb3ZlcywgdGltZSwgZGF0ZSB9O1xuICAgIGRhdGEucHVzaChjdXJyZW50UmVzdWx0KTtcbiAgICBkYXRhLnNvcnQoKGEsIGIpID0+IChhLm1vdmVzID4gYi5tb3ZlcyA/IDEgOiAtMSkpO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMTApIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGByZWNvcmRzJHtzaXplfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEuc2xpY2UoMCwgMTApKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGByZWNvcmRzJHtzaXplfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySWQpO1xuICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy50aW1lci5pbm5lclRleHQgPSAnVGltZTogMDA6MDAnO1xuICAgIHRoaXMuY291bnRlci5pbm5lclRleHQgPSAnTW92ZXM6IDAnO1xuICAgIHRoaXMubW92ZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMudGltZXJPZmYgPSB0cnVlO1xuXG4gICAgdGhpcy5maWVsZFNpemUgPSArdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpO1xuICAgIHRoaXMudGV4dCA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcbiAgICB0aGlzLmltYWdlID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcbiAgICB0aGlzLmJ1dHRvblNldHRpbmdzLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgICB0aGlzLmNsZWFyRmllbGQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5nZXRJbWFnZVVybCgpO1xuICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG5cbiAgICB0aGlzLmJ1dHRvblBsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgdGhpcy5jcmVhdGVHYW1lRmllbGQoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL2dlbS1wdXp6bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZXR0aW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpO1xuICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLWJ1dHRvbicpO1xuICAgIHRoaXMuZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmllbGQnKTtcbiAgICB0aGlzLnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpO1xuICAgIHRoaXMuc291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQnKTtcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJyk7XG4gICAgdGhpcy5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkLXNpemUnKTtcbiAgfVxuXG4gIGNoYW5nZVRleHQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNlbGxzLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIGlmICh0aGlzLnRleHQudmFsdWUgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnMHJlbSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5jb2xvciA9IGAke3RoaXMudGV4dC52YWx1ZX1gO1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pbm5lckhUTUwgPT09ICdTZXR0aW5ncycpIHtcbiAgICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGF1c2UnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5idXR0b24uaW5uZXJIVE1MID0gJ1Jlc3VtZSBnYW1lJztcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcGF1c2UnKTtcbiAgICAgICAgdGhpcy5idXR0b24uaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy50ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCBgJHt0aGlzLnRleHQudmFsdWV9YCk7XG4gICAgICB0aGlzLmNoYW5nZVRleHQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc291bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnLCBgJHt0aGlzLnNvdW5kLnZhbHVlfWApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScsIGAke3RoaXMuaW1hZ2UudmFsdWV9YCk7XG4gICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNpemUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScsIGAke3RoaXMuc2l6ZS52YWx1ZX1gKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVhZGVyYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1yZWNvcmRzX19vcGVuJyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtcmVjb3JkcycpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcbiAgICB0aGlzLmJ1dHRvblNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLWJ1dHRvbicpO1xuICAgIHRoaXMuZmllbGRTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkLXNpemUnKTtcbiAgfVxuXG4gIGJ1aWxkVGFibGUoKSB7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHJlY29yZHMke3RoaXMuZmllbGRTaXplLnZhbHVlfWApKTtcbiAgICBsZXQgcm93cyA9ICcnO1xuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgcm93cyArPSBgXG4gICAgICA8dGJvZHkgY2xhc3M9XCJyZWNvcmRzX190Ym9keVwiPlxuICAgICAgICA8dHIgY2xhc3M9XCJyZWNvcmRzX19yb3dcIj5cbiAgICAgICAgICA8dGggY2xhc3M9XCJyZWNvcmRzX19jZWxsXCI+JHtpdGVtLm1vdmVzfTwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwicmVjb3Jkc19fY2VsbFwiPiR7aXRlbS50aW1lfTwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwicmVjb3Jkc19fY2VsbFwiPiR7aXRlbS5kYXRlfTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PmA7XG4gICAgfSk7XG4gICAgY29uc3QgdGFibGUgPSBgXG4gICAgICA8dGFibGUgY2xhc3M9XCJyZWNvcmRzXCI+XG4gICAgICA8Y2FwdGlvbiBjbGFzcz1cInJlY29yZHNfX2NhcHRpb25cIj5CZXN0IHNjb3JlcyAke3RoaXMuZmllbGRTaXplLnZhbHVlID09PSAnOScgPyAnM3gzJyA6ICc0eDQnfTwvY2FwdGlvbj5cbiAgICAgIDx0aGVhZCBjbGFzcz1cInJlY29yZHNfX3RoZWFkXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cInJlY29yZHNfX3Jvd1wiPlxuICAgICAgICAgIDx0aCBjbGFzcz1cInJlY29yZHNfX2NlbGxcIj5Nb3ZlczwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwicmVjb3Jkc19fY2VsbFwiPlRpbWU8L3RoPlxuICAgICAgICAgIDx0aCBjbGFzcz1cInJlY29yZHNfX2NlbGxcIj5EYXRlPC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICAke3Jvd3N9XG4gICAgPC90YWJsZT5gO1xuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MICs9IHRhYmxlO1xuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCArPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvcHVwLXJlY29yZHNfX2Nsb3NlXCI+QmFjazwvYT4nO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLXJlY29yZHNfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5zZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgdGhpcy5idXR0b25TZXR0aW5ncy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5idWlsZFRhYmxlKCk7XG4gICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmJ1dHRvblNldHRpbmdzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9tb2R1bGVzL3NldHRpbmdzJztcbmltcG9ydCBMZWFkZXJCb2FyZCBmcm9tICcuL21vZHVsZXMvbGVhZGVyYm9hcmQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBuZXcgR2VtUHV6emxlKCkuaW5pdCgpO1xuICBuZXcgU2V0dGluZ3MoKS5pbml0KCk7XG4gIG5ldyBMZWFkZXJCb2FyZCgpLmluaXQoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==