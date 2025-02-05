const ajax = new XMLHttpRequest()

$(document).ready(function () {
  $('#setCep').mask('00000-000');
});

let typedCep = document.querySelector(`#setCep`)
let sendCep = document.querySelector(`#sendCep`)
let body = document.getElementsByTagName("body")
let header = document.querySelector("#header")
let msg = document.querySelector("#msg")

document.querySelector("#textUp").classList.remove("ocult")
document.querySelector("#textDown").classList.add("ocult")
header.style.color = ""

document.querySelector(".redButton").addEventListener("click", () => {
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector("body").style.color = "";
  header.textContent = "Encontre o seu endereço!";
  document.querySelector("#textDown").classList.add("ocult");
  document.querySelector("#textUp").classList.remove("ocult")
  document.querySelector("#textUp").classList.add("animateUp");
  header.style.color = ""
  header.classList.remove("animate");
  header.classList.add("animateUp");
  msg.textContent = "";
});

typedCep.addEventListener("keydown", () => {
  typedCep.classList.add("animateUp");

  setTimeout(() => {
    typedCep.classList.remove("animateUp");
  }, 300);
});

typedCep.addEventListener("focus", () => {
  document.querySelector("body").style.backgroundColor = "#272727";
  document.querySelector("body").style.color = "#b5b5b5";
  document.querySelector("#textDown").classList.add("ocult")
  typedCep.classList.add("animateUp");
  msg.textContent = ""
})

typedCep.addEventListener("blur", () => {
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector("body").style.color = "";
  typedCep.classList.remove("animateUp");
})

sendCep.addEventListener("click", () => {
  if (typedCep.value == "") {
    msg.textContent = "Por favor, digite o CEP.";
    return;
  }

  if (typedCep.value.length < 9) {
    msg.textContent = "O CEP deve ter 8 dígitos. Verifique e tente novamente.";
    return;
  }

  let ajax = new XMLHttpRequest();
  ajax.open('GET', `https://viacep.com.br/ws/${typedCep.value}/json/`);
  ajax.send();

  // Verifica a resposta da API
  ajax.onload = function () {
    let obj = JSON.parse(this.responseText);

    if (obj.erro) {
      msg.textContent = "CEP não encontrado!";
      msg.style.color = "red";
      return;
    }

    // Caso o CEP seja válido
    let cep = obj.cep;
    let logradouro = obj.logradouro;
    let bairro = obj.bairro;
    let cidade = obj.localidade;
    let estado = obj.uf;

    document.querySelector('#getCep').innerHTML =
      `<strong>CEP:</strong> ${cep} <br> 
       <strong>Logradouro:</strong> ${logradouro} <br> 
       <strong>Bairro:</strong> ${bairro} <br> 
       <strong>Cidade:</strong> ${cidade} <br> 
       <strong>Estado:</strong> ${estado} <br> 
    `;

    header.textContent = "Parabéns, você o encontrou!";
    header.style.color = "green";
    typedCep.value = ""
    document.querySelector("#textDown").classList.add("animate");
    header.classList.add("animate");
    document.querySelector("#textDown").classList.remove("ocult");
    document.querySelector("#textUp").classList.add("ocult");

  };
});
