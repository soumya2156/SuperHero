let charactersContainer = document.getElementById("characters-container");



//function to fetch data
async function fetchData(){
    const response = await fetch(
        "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=6d5cd505551c43a7ed9396ecf3a6330e&hash=61d9a6ef4b1968aec12ddaba182f10f4" 
    );
    const data = await response.json();
    return data;
}

//get local favorite characters from local storage
function getStorage(){
    console.log(localStorage.getItem('favorite'));
    if (typeof window !== 'undefined') {
        let data = JSON.parse(localStorage.getItem("favorite"));
        console.log('Currently on Client side')
    } else {
        console.log('Currently on Server Side');
    }
    
    return data;
}

fetchData()
    .then((data) =>{
        let favoriteData = getStorage();
        let arr = data.data.results;
        charactersContainer.innerHTML = "";

        for (let i = 0 ; i < arr.length ;i++){
            let favorite = "favorite";

            for (let j=0; j < favoriteData.length; j++){
                if(arr[i].id == favoriteData[j].id){
                    favorite = "unFavorite";
                    break;
                }
            }
            const { id, thumbnail, name } = arr[i];
            let div = document.createElement("div");
            div.classList.add("character-card");
            div.setAttribute("id" , id);
            let path = `../pages/characterInfo.html#${id}`;

            div.innerHTML = `
                <img class= "poster" src=${thumbnail.path}.jpg>
                <div class="card-body">
                    <a href=${path}>${name}</a>
                    <input type="button" value=${favorite} id=${id} data-character='{"id" : "${id}", "name": "${name}", "path": "${thumbnail.path}"}'
                    onclick="updateFavorite(this)"/>
                </div>`;
            charactersContainer.appendChild(div);
        }
    })
    .catch((error) => {
        console.error(error);
    });

//search functionality
let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");

searchBtn.addEventListener("click", ()=> {
    let query = searchBox.value;
    searchBox.value = "";

    let url = `http://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=6d5cd505551c43a7ed9396ecf3a6330e&hash=61d9a6ef4b1968aec12ddaba182f10f4`;

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) =>{
        console.log("DATA" + data.data.results);
        let result = data.data.results[0];
        const {id, name, thumbnail} = result;

        let favoriteData = getStorage();
        let favorite = "favorite";

        for ( let j=0; j< favoriteData.length; j++){
            if(result.id == favoriteData[j].id){
                favorite = "unFavorite";
                break;
            }
        }
        searchResult.innerHTML = "";
        let h3 = document.createElement("h3");
        h3.innerText = "Search results"
        searchResult.appendChild(h3);
       
        let div = document.createElement("div");
        div.classList.add("character-card");
        div.setAttribute("id" , id);
        let path = `../pages/characterInfo.html#${id}`;

        div.innerHTML = `
            <img class= "poster" src=${thumbnail.path}.jpg>
            <div class="card-body">
                <a href=${path}>${name}</a>
                <input type="button" value=${favorite} id=${id} data-character='{"id" : "${id}", "name": "${name}", "path": "${thumbnail.path}"}'
                    onclick="updateFavorite(this)"/>
            </div>`;
        searchResult.appendChild(div);
    }).catch((error)  => {
        console.error(error);
    });
});
//Adding click event on search button

// searchBtn.addEventListener("click", () => {
//     let searchQuery = searchBox.value;
//     searchBox.value = "";

//     let searchUrl = `http://gateway.marvel.com/v1/public/characters?name=${searchQuery}&ts=1&apikey=6d5cd505551c43a7ed9396ecf3a6330e&hash=61d9a6ef4b1968aec12ddaba182f10f4`;

//     fetch(searchUrl).then((response) => {
//         return response.json();
//     }).then((data) => {
//         let result = data.data.result[0];
//         const { id, name, thumbnail } = result;
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })
// });
