import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarMostrarVideos() {
  const urlVideos = import.meta.env.PROD? "https://gist.githubusercontent.com/antonio-evaldo/e8a63621b51c883931eb3fa3a3eca990/raw/12f5c46ee6dd00d03c051adadaf341e06452cea0/videos.txt" : "https://localhost:3000/videos"
  
  try {
    const busca = await axios.get(urlVideos);
    // fetch retorna uma promise = promessa que busca dados e quando chegar, ela faz algo
    const videos = busca.data

    console.log(busca)
    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Vídeo não tem Categoria");
      }
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img src="${video.imagem}" alt="Logo do Canal" class="img-canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro o carregar os vídeos: ${error}</p>`;
  }
}
buscarMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", () => {
  const videos = document.querySelectorAll(".videos__item");
  if (barraDePesquisa.value != "") {
    videos.forEach((video) => {
      const title = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      const pesquisa = barraDePesquisa.value.toLowerCase();
      if (!title.includes(pesquisa)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    });
  } else {
    videos.style.display = "block";
  }
});

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  videos.forEach((video) => {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  });
}
