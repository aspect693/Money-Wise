function calculate() {

    const principal = parseFloat(document.getElementById('principal').value);
    const interest = parseFloat(document.getElementById('interest').value) / 100;
    const years = parseFloat(document.getElementById('years').value);
    const compoundFrequency = parseInt(document.getElementById('compoundFrequency').value);

    if (isNaN(principal) || isNaN(interest) || isNaN(years) || principal <= 0 || interest <= 0 || years <= 0) {
        alert('Будь ласка, введіть коректні значення.');
        return;
    }

    const simpleInterest = principal * interest * years;
    const simpleTotal = principal + simpleInterest;

    const compoundTotal = principal * Math.pow(1 + interest / compoundFrequency, compoundFrequency * years);


    const simpleProfit = simpleTotal - principal;
    const compoundProfit = compoundTotal - principal;

    const simpleInterestAmount = simpleTotal - principal;
    const compoundInterestAmount = compoundTotal - principal;

    document.getElementById('simpleOutput').textContent = `Звичайний процент: ${simpleTotal.toFixed(2)} грн`;
    document.getElementById('compoundOutput').textContent = `Складний процент: ${compoundTotal.toFixed(2)} грн`;

    document.getElementById('simpleInterest').textContent = `Нараховані відсотки (звичайний): ${simpleInterestAmount.toFixed(2)} грн`;
    document.getElementById('compoundInterest').textContent = `Нараховані відсотки (складний): ${compoundInterestAmount.toFixed(2)} грн`;

    document.getElementById('profit').textContent = `Вигода (різниця між кінцевою сумою і вкладеною): 
    Звичайний: ${simpleProfit.toFixed(2)} грн, 
    Складний: ${compoundProfit.toFixed(2)} грн`;

    document.getElementById('totalDeposit').textContent = `Сума початкового депозиту: ${principal.toFixed(2)} грн`;
    document.getElementById('finalAmount').textContent = `Кінцева сума: 
    Звичайний: ${simpleTotal.toFixed(2)} грн, 
    Складний: ${compoundTotal.toFixed(2)} грн`;
}
