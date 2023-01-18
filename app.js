// Application collector script for bank, work and laptop + eventlistener. 

// Elements in HTML and global objects
const descbalanceElem = document.getElementById('desc-balance');
const descloanElem = document.getElementById('desc-loan');
const btngetloanElem = document.getElementById('btn-get-loan');
const btnrepayloanElem = document.getElementById('btn-repay');
const btntransferBankElem = document.getElementById('btn-bank');
const btnWorkElem = document.getElementById('btn-work');
const descPayElem =  document.getElementById('desc-paid');

const selectLaptopElem = document.getElementById('sel-pc-option'); // Specific for laptops
const descPriceElem = document.getElementById("hd-laptop-price");
const btnBuyElem = document.getElementById("btn-buy");
const descLapTitleElem= document.getElementById("hd-my-comp-title");
const descLapDescElem= document.getElementById("desc-comp-dd");
const descLapFeatureElem = document.getElementById("desc-comp-features");
const imageLapElem = document.getElementById("hd-my-comp-image");

// Needed parameters: bankValue; loanValue, payValue, tenPercentDeduction;
let payValue = 0; let tenPercentDeduction = 0; let bankValue = 0; let loanValue = 0;

//              ---------------------------------- BANK ------------------------------------
// Functions
function updateBalance(bankValue){
    descbalanceElem.innerHTML = `Balance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(bankValue)}`;
}

function updateLoan(){
    descloanElem.innerHTML = `Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loanValue)}`;
            descloanElem.style.display = "block"  // show loan value in Bank
            btnrepayloanElem.style.display = 'block'; // show optional repay button in Work
}

function checkLoan(){
    if (loanValue == 0){
        descloanElem.innerHTML = `Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loanValue)}`;
            descloanElem.style.display = "none"  // show loan value in Bank
            btnrepayloanElem.style.display = 'none'; // show optional repay button in Work
    }
}

function getLoan(){
    console.log("get loan")
    // Providing information to the user.
    if (loanValue > 0){ 
        alert(`You have yet to repay your current loan!`) 
    } else if (bankValue == 0){
        alert(`You need money in the bank to get a loan`)
    } else { // Get a loan (Max 2x BankValue)
        const prompt = Number(window.prompt(`Enter loan amount in NOK: `));
        if (loanValue> (2*bankvalue)){
            alert(`You cannot loan more than 2x your current balance: ${bankValue} NOK`)
        } else { // Get loan, show loan value and activate loan button
            descloanElem.innerHTML = `Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loanValue)}`;
            descloanElem.style.display = "block"  // show loan value in Bank
            btnrepayloanElem.style.display = 'block'; // show optional repay button in Work
        }
    }
}

//              ---------------------------------- WORK ------------------------------------
// Functions 
function updatePay(payValue){
    descbalanceElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(payValue)}`;
} 

function getPaid(){ // increase by 100 NOK per work (ie. click)
    payValue += 100; // add 100 NOK to pay and update pay description
    descPayElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(payValue)}`;
}

function transferPaytoBank(percentage){ // Transfer money to bank, and reset pay, bankvalue and loanValue and Repay button
    console.log("Transfer pay to bank")
    if (loanValue > 0){
        const deduction =  percentage*payValue;
        // add to bank and reduce loan
        bankValue += payValue - deduction;
        loanValue -= deduction;
        if (loanValue < 0){ // Assuring no negative loan values after payback, give the rest to bank balance
            bankValue -= loanValue; 
        }
        payValue = 0;
        updateBalance(bankValue); updateLoan(); checkLoan(); updatePay(payValue);
    } else {
        payValue = 0;
        bankValue += payValue;
        updatePay(payValue); updateBalance(bankValue);
    }
}

function transferPaytoLoan(){ // Transfer all paid money to repay loany, and reset pay
    console.log("Transfer pay to loan")
    if (loanValue < payValue){ // some MAY be transferred to bank
        loanValue = 0; 
        payValue -= loanValue;
        const promptInput = String(window.prompt(`Transfer surplus to bank (Y/N)?  `));
        if (promptInput == "Y"){
            bankValue += payValue;
            updateBalance();
        } else if (promptInput != "N" && promptInput != "Y"){
            alert(`Wrong input. Options Y (Yes) or  N (No)`)
        }
        updatePay(); checkLoan();
    } else { // all will go to repay loan
        loanValue -= payValue; payValue = 0;
        updatePay(); updateLoan(); checkLoan();
    }
}

//              ---------------------------------- LAPTOP ------------------------------------
// buy laptops
/*
function buyLap(){
    if (bankValue >= selectedLap.price) {
        alert('Congratulations! You are the owner of a laptop!');
        bankValue -= selectedComputer.price;
        updateBalance();
    } else {
        alert("I'm sorry to inform you that your current balance is lower than the price. \n\ Please come back when you have more money ");
    }
}

// load data into an object 
let laptops = [];
const pageData = "https://hickory-quilled-actress.glitch.me/computers";
fetch(pageData)
    .then(response => response.json()) // With promise
    .then(data => laptops = data) // 
    .then(laptops => addLaptopsToSelect(laptops)); // after loading data to laptop object

// Select laptops
function addLaptopsToSelect(laptopsObject){
    selectedLap = laptopsObject[0];
    laptopsObject.forEach(x => addOneToSelect(x));
    descPriceElem.innerText = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(laptopsObject[0].price);
    descLapFeatureElem.innerText =  laptopsObject[0].specs;
    descLapTitleElem.innerText = laptopsObject[0].title;
    descLapDescElem.innerText = laptopsObject[0].description;
    imageLapElem.src = pageData +  laptopsObject[0].image;
}

// function to select a laptop
function addOneToSelect(laptop) {
    const laptopElem = document.createElement("option");
    laptopElem.value = laptop.id;
    laptopElem.appendChild(document.createTextNode(laptop.title));
    selectLaptopElem.appendChild(laptopElem);
}

 const handleLapChange = e => {
    selectedLap = laptops[e.target.selectedIndex];
    descPriceElem.innerText = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(selectedLap.price);
    descLapFeatureElem.innerText = selectedLap.specs;
    descLapTitleElem.innerText = selectedLap.title;
    descLapDescElem.innerText = selectedLap.description;
    imageLapElem.src = "https://hickory-quilled-actress.glitch.me/computers" + selectedLap.image;
} 
*/
//              ---------------------------------- ClICKABLE EVENTS :D ------------------------------------
btntransferBankElem.addEventListener("click", transferPaytoBank); // to the right <-- function
btnrepayloanElem.addEventListener('click', transferPaytoLoan);
btnWorkElem.addEventListener('click', getPaid);
btngetloanElem.addEventListener('click', getLoan);
//btnBuyElem.addEventListener('click',buyLap)
//selectLaptopElem.addEventListener("change", handleLapChange);