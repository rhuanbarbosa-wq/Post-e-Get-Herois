const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-jogos"); 
const modelo = document.querySelector("#modelo-jogo"); 
const apiKey = "cv_eWxXKOnVXiiCGuJBGer4Zo0QgmJmNxRz9ZOwZoNAvopf937UMAYKb56DbrsgeK-j";
const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

async function buscarJogos() {
  resposta.textContent = "Carregando jogos...";

  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": apiKey },
    });

    if (!retorno.ok) {
      throw new Error("Não foi possível carregar os jogos.");
    }

    const resultado = await retorno.json();
    resposta.textContent = ""; 

    for (const jogo of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = jogo.title;
      card.querySelector(".genero").textContent = jogo.genero;
      card.querySelector(".plataforma").textContent = jogo.plataforma;
      card.querySelector(".ano_lancamento").textContent = jogo.ano_lancamento;
      card.querySelector(".desenvolvedora").textContent = jogo.desenvolvedora || "N/A";

      const imagem = card.querySelector(".imagem-jogo");

      if (jogo.imageUrl) {
        imagem.src = jogo.imageUrl;
        imagem.alt = jogo.title;
        imagem.onerror = () => imagem.remove();
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }
  } catch (error) {
    console.error(error);
    resposta.textContent = "Não foi possível carregar os jogos. Tente novamente!";
  }
}

buscarJogos();