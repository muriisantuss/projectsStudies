let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

let dolar = 6

usdInput.addEventListener("keyup", () => {
  convert("usd-to-brl")
})

brlInput.addEventListener("keyup", () => {
  convert("brl-to-usd")
})

usdInput.addEventListener("blur", () => {
  usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
  brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = "1000,00"

function formatCurrency(value) {
  let fixedValue = fixValue(value)
  let options = {
    useGrouping: false,
    minimumFractionDigits: 2,
  }
  let formatter = new Intl.NumberFormat("pt-BR", options)
  return formatter.format(fixedValue)
}

function fixValue(value) {
  let fixedValue = value.replace(",", ".")
  let floatValue = parseFloat(fixedValue)
  if (floatValue == NaN) {
    floatValue = 0
  }

  return floatValue
}

function convert(type) {
  if (type == "usd-to-brl") {
    let value = fixValue(usdInput.value)

    let result = value * dolar
    result = result.toFixed(2)

    brlInput.value = formatCurrency(result)
  }

  if (type == "brl-to-usd") {
    let value = fixValue(brlInput.value)

    let result = value / dolar
    result = result.toFixed(2)

    usdInput.value = formatCurrency(result)
  }
}