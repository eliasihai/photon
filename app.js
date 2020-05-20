/** @format */

// import { createClient } from "pexels";
// const client = createClient(
//   "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70",
// );
const auth = "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(event) {
    // console.log(event.target.value);
    searchValue = event.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach((photo) => {
        // console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;

        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);

    // console.log(data);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    // console.log(`${query} query`);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();