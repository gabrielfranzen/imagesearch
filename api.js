const acessKey = "4y3AWwETOXOhROcVMzr0KDQulSZFlNHuzlFDK0mgpvU";

const form = document.querySelector("form");
const inputPesquisa = document.querySelector("#pesquisa");
const divImagens = document.querySelector("#imagens");
const verMais = document.querySelector("#ver-mais");

let pesquisa = "";
let pagina = 1;

async function searchImages(){

    pesquisa = inputPesquisa.value;
    const url = `https://api.unsplash.com/search/photos?page=${pagina}&query=${pesquisa}&client_id=${acessKey}&per_page=12&lang=pt`;

    const response = await fetch(url);
    const data = await response.json();

    if(pagina === 1){
        divImagens.innerHTML = "";
    }

    console.log(data);

    const results = data.results;
    results.map((result)=>{
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        divImagens.appendChild(imageLink);
    })

    verMais.style.display = "block";
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    pagina = 1;
    searchImages();
})


verMais.addEventListener("click", ()=>{
    pagina++;
    searchImages();
})


