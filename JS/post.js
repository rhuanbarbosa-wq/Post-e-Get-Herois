const form = document.querySelector("#form-jogo"); 
const resposta = document.querySelector("#resposta");

const apiKey = "cv_eWxXKOnVXiiCGuJBGer4Zo0QgmJmNxRz9ZOwZoNAvopf937UMAYKb56DbrsgeK-j";
const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dados = new FormData(form);

  const jogo = {
    title: dados.get("title"),
    genero: dados.get("genero"),
    plataforma: dados.get("plataforma"),
    ano_lancamento: Number(dados.get("ano_lancamento")),
    desenvolvedora: dados.get("desenvolvedora"),
    imageUrl: dados.get("imageUrl") || null,
  };

  resposta.textContent = "Enviando jogo para a API....";

  try {
    const respostaApi = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(jogo), 
    });

    const texto = await respostaApi.text();
    let resultado;

    try {
      resultado = texto ? JSON.parse(texto) : {};
    } catch (error) {
      resultado = {};
    }

    if (respostaApi.ok) {
      resposta.textContent = `${jogo.title} foi cadastrado com sucesso.`;
      form.reset();
    } else {
      resposta.textContent = "Erro ao cadastrar o jogo.";
    }
  } catch (error) {
    console.error(error);
    resposta.textContent = "Erro na conexão com a API.";
  }
});