import{a as b,S,i}from"./assets/vendor-40038228.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();function f(t){return t.reduce((r,a)=>r+`
        <li class="gallery-list">
          <a class="gallery-link" href="${a.largeImageURL}">
            <img class ="gallery-image" src =${a.webformatURL} alt =${a.tags} />
          </a>
          <span class="gallery-wrapper">
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Likes</b></span>
              <span class="gallery-sub-title-number">${a.likes}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Views</b></span>
              <span class="gallery-sub-title-number">${a.views}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Comments</b></span>
              <span class="gallery-sub-title-number">${a.comments}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Downloads</b></span>
              <span class="gallery-sub-title-number">${a.downloads}</span>
            </span>
          </span>
       </li> 
        `,"")}async function L(t,r,a,u){let e=new URLSearchParams({key:r,per_page:u,page:a,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return await b.get(`/api/?${e}`).then(s=>s.data).then(s=>s)}const y=new S(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});y.refresh();function h(){const t=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}const C=document.querySelector(".form"),g=document.querySelector(".input"),m=document.querySelector(".gallery"),v=document.querySelector(".loader"),c=document.querySelector(".loadMore"),F="41835868-9a86cd0490c6a90cb9e6f50a0";b.defaults.baseURL="https://pixabay.com";C.addEventListener("submit",k);n();c.classList.add("invisible");let o=1;const d=40;let l="";async function k(t){t.preventDefault(),o=1,c.classList.add("invisible"),m.innerHTML="",l=g.value.trim(),M(),E(l);try{const r=await L(l,F,o,d);if(r.hits.length===0){n(),g.value="",i.error({title:"Error",timeout:"2000",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}m.insertAdjacentHTML("beforeend",f(r.hits)),y.refresh(),r.totalHits>d&&q()}catch(r){i.error({title:"Error",timeout:"2000",message:r,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{n()}}c.addEventListener("click",A);async function A(){event.preventDefault(),o++,l=g.value.trim();try{const t=await L(l,F,o,d),r=t.totalHits;let a=Math.ceil(r/d);if(o===a){w(),n(),m.innerHTML+=f(t.hits),h(),g.value="",i.info({title:"Info",timeout:"5000",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#00FF00",position:"topRight"});return}o<a&&(m.innerHTML+=f(t.hits),y.refresh())}catch(t){i.error({title:"Error",timeout:"2000",message:t,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{h(),n()}}function E(t){if(t==="")throw n(),w(),i.error({title:"Error",timeout:"1500",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}function M(){v.classList.remove("invisible")}function n(){v.classList.add("invisible")}function q(){c.classList.remove("invisible")}function w(){c.classList.add("invisible")}
//# sourceMappingURL=commonHelpers.js.map
