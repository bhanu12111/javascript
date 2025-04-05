const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result");

const apiUrl = "https://api.exchangerate-api.com/v4/latest/";

const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD", "CNY"];

currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.textContent = option2.textContent = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    resultText.textContent = "Enter a valid number";
    return;
  }

  fetch(`${apiUrl}${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const result = (amount * rate).toFixed(2);
      resultText.textContent = `${amount} ${from} = ${result} ${to}`;
    })
    .catch(() => {
      resultText.textContent = "Conversion failed. Try again.";
    });
});
