const apiKey = '-'; 

async function getExchangeRates() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();
    return data.rates;
}

async function populateCurrencies() {
    const rates = await getExchangeRates();
    const currencies = Object.keys(rates);

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Будь ласка, введіть коректну суму');
        return;
    }

    const rates = await getExchangeRates();
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
        alert('Невідомий курс валют');
        return;
    }

    const result = (amount / fromRate) * toRate;
    document.getElementById('conversionResult').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

populateCurrencies();
