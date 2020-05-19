const auth = '563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
const moreBtn = document.querySelector('.more');
let searchValue;


async function curatedPhotos() {
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=1", {
        method:
    })
}