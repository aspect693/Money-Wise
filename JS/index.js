const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');


menuBtn.addEventListener('click', () => {
    sideMenu.style.left = sideMenu.style.left === '0px' ? '-250px' : '0px';
    overlay.classList.toggle('active');
});


overlay.addEventListener('click', () => {
    sideMenu.style.left = '-250px';
    overlay.classList.remove('active');
});


async function fetchCurrencyRates() {
    const currencyList = document.getElementById("currency-list");
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
        let data = await response.json();
        let rates = data.rates;

        const topCurrencies = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "CNY", "JPY", "INR", "MXN", "BRL", "SEK", "NZD", "SGD", "HKD", "KRW", "TRY", "RUB", "PLN", "ZAR"];

        currencyList.innerHTML = '';
        topCurrencies.forEach(currency => {
            let rate = rates[currency];
            let priceInUAH = (1 / rate).toFixed(2);  
            let listItem = document.createElement('li');
            listItem.innerHTML = `${currency} - ${priceInUAH} UAH`;
            currencyList.appendChild(listItem);
        });
    } catch (error) {
        console.log('Помилка при отриманні курсів валют', error);
    }
}


window.onload = fetchCurrencyRates;

async function fetchCurrencyRates() {
    const currencyList = document.getElementById("currency-list");
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
        let data = await response.json();
        let rates = data.rates;

        const topCurrencies = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "CNY", "JPY", "INR", "MXN", "BRL", "SEK", "NZD", "SGD", "HKD", "KRW", "TRY", "RUB", "PLN", "ZAR"];

        currencyList.innerHTML = '';
        topCurrencies.forEach(currency => {
            let rate = rates[currency];
            let priceInUAH = (1 / rate).toFixed(2); 
            let listItem = document.createElement('li');
            listItem.innerHTML = `${currency} - ${priceInUAH} UAH`;
            currencyList.appendChild(listItem);
        });
    } catch (error) {
        console.log('Помилка при отриманні курсів валют', error);
    }
}


window.onload = fetchCurrencyRates;
const noteWindow = document.getElementById('note-window');
const toggleBtn = document.getElementById('toggle-btn');
const noteContent = document.getElementById('note-content');
const noteText = document.getElementById('note-text');
const resizeHandle = document.getElementById('resize-handle');
const noteHeader = document.getElementById('note-header');

const savedText = localStorage.getItem('note-text');
const isCollapsed = localStorage.getItem('note-collapsed') === 'true';

if (savedText) {
    noteText.value = savedText;
}


if (isCollapsed) {
    noteWindow.classList.add('collapsed'); 
    toggleBtn.textContent = '+'; 
}

toggleBtn.addEventListener('click', () => {
    if (noteWindow.classList.contains('collapsed')) {
        noteWindow.classList.remove('collapsed');
        toggleBtn.textContent = '−';
        localStorage.setItem('note-collapsed', 'false');
    } else {
        noteWindow.classList.add('collapsed');
        toggleBtn.textContent = '+';
        localStorage.setItem('note-collapsed', 'true');
    }
});

noteText.addEventListener('input', () => {
    localStorage.setItem('note-text', noteText.value);
});

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', resizeWindow);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', resizeWindow);
    });
});

function resizeWindow(e) {
    if (isResizing) {
        const width = e.clientX - noteWindow.offsetLeft;
        const height = e.clientY - noteWindow.offsetTop;
        
        if (width > 150) {
            noteWindow.style.width = `${width}px`;
        }
        if (height > 100) {
            noteWindow.style.height = `${height}px`;
        }
    }
}


let isDragging = false;
let offsetX, offsetY;

noteHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - noteWindow.offsetLeft;
    offsetY = e.clientY - noteWindow.offsetTop;

    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.removeEventListener('mousemove', dragWindow);
    });
});

function dragWindow(e) {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        noteWindow.style.left = `${x}px`;
        noteWindow.style.top = `${y}px`;
    }
}
