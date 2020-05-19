/** @format */

// import { createClient } from "pexels";
// const client = createClient(
//   "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70",
// );
const auth = "563492ad6f9170000100000176103c31ed3d49e4ad294c03b6f0ee70";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const moreBtn = document.querySelector(".more");
let searchValue;

async function curatedPhotos() {
    const dataFetch = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/curated?per_page=15&page=1", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },
        },
    );
    const data = await dataFetch.json();
    console.log(data);
}

curatedPhotos();