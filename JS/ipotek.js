function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const termUnit = document.getElementById('termUnit').value;

    if (isNaN(loanAmount) || isNaN(annualRate) || isNaN(loanTerm) || loanAmount <= 0 || annualRate <= 0 || loanTerm <= 0) {
        alert('Будь ласка, введіть коректні значення.');
        return;
    }

    const numberOfMonths = (termUnit === 'years') ? loanTerm * 12 : loanTerm;
    const monthlyRate = annualRate / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    const totalPayments = monthlyPayment * numberOfMonths;
    const totalInterest = totalPayments - loanAmount;
    const profit = totalInterest;
    document.getElementById('monthlyPayment').textContent = `Місячний платіж: ${monthlyPayment.toFixed(2)} грн`;
    document.getElementById('totalPayments').textContent = `Загальна сума виплат: ${totalPayments.toFixed(2)} грн`;
    document.getElementById('totalInterest').textContent = `Нараховані відсотки: ${totalInterest.toFixed(2)} грн`;
    document.getElementById('profit').textContent = `Вигода: ${profit.toFixed(2)} грн`;
    document.getElementById('loanAmountOutput').textContent = `Сума кредиту: ${loanAmount.toFixed(2)} грн`;
}
