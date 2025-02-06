$(document).ready(function () {
  $('#inputCep').mask('00000-000');
});

const inputCep = document.querySelector(`#inputCep`)
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

inputCep.addEventListener("keydown", () => {
  inputCep.classList.add("animate-scale");
  setTimeout(() => inputCep.classList.remove("animate-scale"), 300);
});

inputCep.addEventListener("focus", () => {
  body.style.backgroundColor = '#272727';
  body.style.color = '#b5b5b5';
  textDown.classList.add('hidden');
  inputCep.classList.add('animate-scale');
  msg.textContent = '';
})

inputCep.addEventListener("blur", () => {
  resetUI()
  inputCep.classList.remove("animate-scale");
})

btnSendCep.addEventListener("click", () => {
  if (!inputCep.value) {
    msg.textContent = "Por favor, digite o CEP.";
    return;
  }

  if (inputCep.value.length < 9) {
    msg.textContent = "O CEP deve ter 8 dígitos. Verifique e tente novamente.";
    return;
  }

  fetch(`https://viacep.com.br/ws/${inputCep.value}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        msg.textContent = 'CEP não encontrado!';
        msg.style.color = 'red';
        return;
      }

      document.querySelector('#getCep').innerHTML = `
        <strong>CEP:</strong> ${data.cep} <br>
        <strong>Logradouro:</strong> ${data.logradouro} <br>
        <strong>Bairro:</strong> ${data.bairro} <br>
        <strong>Cidade:</strong> ${data.localidade} <br>
        <strong>Estado:</strong> ${data.uf} <br>
      `;

      header.textContent = 'Parabéns, você o encontrou!';
      header.style.color = 'green';
      inputCep.value = '';
      textDown.classList.add('animate');
      header.classList.add('animate');
      textDown.classList.remove('hidden');
      textUp.classList.add('hidden');
    })
    .catch(() => {
      msg.textContent = 'Erro ao buscar CEP. Tente novamente mais tarde.';
      msg.style.color = 'red';
    });
});
