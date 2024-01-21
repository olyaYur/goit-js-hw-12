import{a as b,S,i}from"./assets/vendor-40038228.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const p of t.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function f(r){return r.reduce((s,a)=>s+`
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
        `,"")}async function L(r,s,a,u){let e=new URLSearchParams({key:s,page:a,per_page:u,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});return await b.get(`/api/?${e}`).then(t=>(console.log(t.data),t.data)).then(t=>(console.log(t),t))}const y=new S(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});y.refresh();function h(){const r=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:r*2,left:0,behavior:"smooth"})}const C=document.querySelector(".form"),g=document.querySelector(".input"),d=document.querySelector(".gallery"),v=document.querySelector(".loader"),c=document.querySelector(".loadMore"),F="41835868-9a86cd0490c6a90cb9e6f50a0";b.defaults.baseURL="https://pixabay.com";C.addEventListener("submit",k);n();c.classList.add("invisible");let o=1;const m=40;let l="";async function k(r){r.preventDefault(),o=1,c.classList.add("invisible"),d.innerHTML="",l=g.value.trim(),M(),E(l);try{const s=await L(l,F,o,m);if(s.hits.length===0){n(),g.value="",i.error({title:"Error",timeout:"2000",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}d.insertAdjacentHTML("beforeend",f(s.hits)),y.refresh(),s.totalHits>m&&R()}catch(s){i.error({title:"Error",timeout:"2000",message:s,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{n()}}c.addEventListener("click",A);async function A(){event.preventDefault(),o++,l=g.value.trim();try{const r=await L(l,F,o,m),s=r.totalHits;let a=Math.ceil(s/m);if(o===a){w(),n(),d.innerHTML+=f(r.hits),h(),g.value="",i.info({title:"Info",timeout:"5000",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#00FF00",position:"topRight"});return}o<a&&(d.innerHTML+=f(r.hits),y.refresh())}catch(r){i.error({title:"Error",timeout:"2000",message:r,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{h(),n()}}function E(r){if(r==="")throw n(),w(),i.error({title:"Error",timeout:"1500",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}function M(){v.classList.remove("invisible")}function n(){v.classList.add("invisible")}function R(){c.classList.remove("invisible")}function w(){c.classList.add("invisible")}
//# sourceMappingURL=commonHelpers.js.map
