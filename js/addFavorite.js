//get local storage favorite lits
function getStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
}

//adding data
function setStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("favorite", dataString);
}

//on click for favorite at home page
function updateFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-character"));
    let favoriteList = getStorage();

    //favorite to unfavorite
    for (let character = 0; character < favoriteList.length; character++) {
        if (favoriteList[character].id == data.id) {
            favoriteList.splice(character, 1);
            e.setAttribute("value", "favorite");
            setStorage(favoriteList);
            return;
        }
    }

    //add as favorite
    favoriteList.push(data);
    setStorage(favoriteList);
    e.setAttribute("value", "unFavorite");
}

//render favorite list in favorite page
function renderFavorite(favoriteContainer) {
    let myFavoriteList = getStorage();

    if (myFavoriteList.length > 0) {
        favoriteContainer.innerHTML = "";
    }

    for (let character = 0; character < myFavoriteList.length; character++) {
        const { id, name, path } = myFavoriteList[character];

        //creation of div
        let div = document.createElement("div");
        div.classList.add("character-card");
        div.setAttribute("id", id);

        let detailsPath = `../pages/characterInfo.html#${id}`
        div.innerHTML = `
           <img class="poster" src=${path}.jpg>
           <div class="card-body">
                <a href=${detailsPath}>${name}</a>
                <input type="button" value="UnFavorite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavorite(this)"/>
                </div>`;

        favoriteContainer.appendChild(div);
    }
}

// render favorite page only if user visits on favorite page
let favoriteContainer = document.getElementById('favorite-characters');
if (favoriteContainer != null) {
  renderFavorite(favoriteContainer);
}




