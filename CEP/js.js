const ajax = new XMLHttpRequest()

$(document).ready(function () {
  $('#setCep').mask('00000-000');
});

const typedCep = document.querySelector(`#setCep`)
const btnSendCep = document.querySelector(`#btnSendCep`)
const body = document.body
const header = document.querySelector("#header")
const msg = document.querySelector("#msg")
const textUp = document.querySelector('#textUp');
const textDown = document.querySelector('#textDown');
const btnReset = document.querySelector('.redButton');

function resetUI() {
  header.textContent = 'Encontre o seu endereço!';
  body.style.backgroundColor = '';
  body.style.color = '';
  msg.textContent = '';
  textUp.classList.remove('hidden');
  textUp.classList.add('animate-scale');
  textDown.classList.add('hidden');
  header.classList.remove('animate');
  header.classList.add('animate-scale');
  header.style.color = "";
}

btnReset.addEventListener('click', resetUI);


typedCep.addEventListener("keydown", () => {
  typedCep.classList.add("animate-scale");

  setTimeout(() => {
    typedCep.classList.remove("animate-scale");
  }, 300);
});

typedCep.addEventListener("focus", () => {
  document.querySelector("body").style.backgroundColor = "#272727";
  document.querySelector("body").style.color = "#b5b5b5";
  document.querySelector("#textDown").classList.add("hidden")
  typedCep.classList.add("animate-scale");
  msg.textContent = ""
})

typedCep.addEventListener("blur", () => {
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector("body").style.color = "";
  typedCep.classList.remove("animate-scale");
})

btnSendCep.addEventListener("click", () => {
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
    document.querySelector("#textDown").classList.remove("hidden");
    document.querySelector("#textUp").classList.add("hidden");

  };
});
