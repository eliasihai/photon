/** @format */

// import { createClient } from "pexels";
// const client = createClient(
//   "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70",
// );
const auth = "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search_form");
const subBtn = document.querySelector(".submit-btn");
const more = document.querySelector(".more");
const reload = document.querySelector(".reload");
const errmsg = document.querySelector('.errmsg')
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;
let noSearchResualts = false;
let errMsg = true;
let counter = 0;
reload.style.display = 'none';

//Event Listeners
searchInput.addEventListener("input", updateInput);

subBtn.addEventListener("click", (event) => {
    event.preventDefault();
    currentSearch = searchValue;
    console.log(`currentSearch  ${currentSearch}`);
    searchPhotos(searchValue);

    if (searchValue != null) {
        searchValue = null;
    } else if (searchValue == null || noSearchResualts == false) {

        if (errMsg == true) {
            document.getElementById('errmsg').innerHTML = '*Photos not found'
            errMsg = false;
        }
        more.style.display = 'none';
        reload.style.display = 'block';
        noSearchResualts == false;
    }
    // if (window.innerWidth > 450) {
    //     searchPhotos(searchValue);
    // } else {
    //     const searchInput = document.createElement("div");
    //     searchInput.classList.add("input-mobile");
    //     searchInput.innerHTML = `<input type="text"/>`
    //     form.appendChild(searchInput);

    // }
});

more.addEventListener("click", loadMore);
reload.addEventListener('click', reloadFunc);

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

    console.log(data);
    if (data.total_results === 0) {
        console.log("data results is 0");
    } else {
        console.log(`success`);
        generatePictures(data);
        currentSearch = "";
    }
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function reloadFunc() {
    document.getElementById('errmsg').innerHTML = ''
    clear();
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);

    reload.style.display = 'none';
    more.style.display = 'flex'

    errMsg = true;
}

curatedPhotos();