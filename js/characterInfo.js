
    let wrapper = document.getElementById("characterWrapper");


let winurl = window.location.href;
console.log("WINURL =" + winurl);
// let winurl = window.GeolocationPosition.href;
// console.log("WINURL =" + winurl.lastIndexOf("#") + 1);
let id = winurl.substring(winurl.lastIndexOf("#") + 1);
console.log("ID = " + id);

//adding character details
let url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=6d5cd505551c43a7ed9396ecf3a6330e&hash=61d9a6ef4b1968aec12ddaba182f10f4`;
fetch(url).then((response) => {
    return response.json();
}).then((data) => {
    console.log(data.data.results);
    let character = data.data.results[0];

    const { name, id, thumbnail, description } = character;
    let div = document.createElement("div");
    div.classList.add("character-info-container");

    div.innerHTML =
        `<div class="character-poster"">
            <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="character-info">
            <h3>${name}</h3>
            <p>${description}</p>
        </div>`;
    wrapper.innerHTML = "";
    wrapper.appendChild(div);
}).catch((error) => {
    console.log(error);
});

