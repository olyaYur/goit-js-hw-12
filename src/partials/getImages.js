import axios from 'axios';

export async function getImages(
  name,
  MY_KEY,
  currentPage,
  numberOfResultsPerPage
) {
  let searchParams = new URLSearchParams({
    key: MY_KEY,
    page: currentPage,
    per_page: numberOfResultsPerPage, 
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return await axios
    .get(`/api/?${searchParams}`)
    .then(response => {
      console.log(response.data);  
      return response.data;
    })
    .then(photos => {
      console.log(photos);
      return photos;
    });
}
