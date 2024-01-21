export function addImages(photos) {
    return photos.reduce(
        (html, hit) => html + `
        <li class="gallery-list">
          <a class="gallery-link" href="${hit.largeImageURL}">
            <img class ="gallery-image" src =${hit.webformatURL} alt =${hit.tags} />
          </a>
          <span class="gallery-wrapper">
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Likes</b></span>
              <span class="gallery-sub-title-number">${hit.likes}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Views</b></span>
              <span class="gallery-sub-title-number">${hit.views}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Comments</b></span>
              <span class="gallery-sub-title-number">${hit.comments}</span>
            </span>
            <span class="gallery-tit-wrap">  
              <span class="gallery-subtitle"><b>Downloads</b></span>
              <span class="gallery-sub-title-number">${hit.downloads}</span>
            </span>
          </span>
       </li> 
        `, ""
    );
  }
  