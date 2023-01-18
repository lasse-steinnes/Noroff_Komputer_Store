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
const imageLapElem = document.getElementById("computerImage");

// Needed parameters: bankValue; loanValue, payValue, tenPercentDeduction;
let payValue = 0; let tenPercentDeduction = 0; let bankValue = 0; let loanValue = 0; percentage = 0.10;

//              ---------------------------------- BANK ------------------------------------
// Functions
function updateBalance(){
    console.log("Balance to HTML - balance", bankValue)
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
        console.log("bankvalue ", bankValue);
        if (prompt > (2*bankValue)){
            alert(`You cannot loan more than 2x your current balance: ${bankValue} NOK`)
        } else { // Get loan, show loan value and activate loan button
            loanValue = prompt;
            descloanElem.innerHTML = `Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loanValue)}`;
            descloanElem.style.display = "block"  // show loan value in Bank
            btnrepayloanElem.style.display = 'block'; // show optional repay button in Work
        }
    }
}

//              ---------------------------------- WORK ------------------------------------
// Functions 
function updatePay(){
    descPayElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(payValue)}`;
} 

function getPaid(){ // increase by 100 NOK per work (ie. click)
    payValue += 100; // add 100 NOK to pay and update pay description
    descPayElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(payValue)}`;
}

function transferPaytoBank(){ // Transfer money to bank, and reset pay, bankvalue and loanValue and Repay button
    console.log("Transfer pay to bank")
    if (loanValue > 0){
        const deduction =  percentage*payValue;
        // add to bank and reduce loan
        console.log("percentage", deduction);
        bankValue = bankValue + payValue - deduction;
        loanValue -= deduction;
        if (loanValue < 0){ // Assuring no negative loan values after payback, give the rest to bank balance
            console.log("percentage - neg. loan, give to balance")
            bankValue = bankValue - loanValue; 
            loanValue = 0;
        }
        payValue = 0;
        updateBalance(); updateLoan(); checkLoan(); updatePay();
    } else {
        bankValue += payValue;
        console.log("get pay")
        payValue = 0;
        updatePay(); updateBalance();
    }
}

function transferPaytoLoan(){ // Transfer all paid money to repay loany, and reset pay
    console.log("Transfer pay to loan");
    if (loanValue < payValue){ // some MAY be transferred to bank
        payValue -= loanValue;
        loanValue = 0; 
        const promptInput = String(window.prompt(`Transfer surplus to bank (Y/N)?  `));
        if (promptInput == "Y"){
            bankValue += payValue; payValue = 0;
            //updateBalance(); updatePay(); updateLoan(); checkLoan();
        } else if (promptInput == "N"){
            //updateBalance(); updatePay(); 
        } else if (promptInput != "N" && promptInput != "Y") {
            alert(`Wrong input. Options Y (Yes) or  N (No)`);
        }
        updateBalance(); updatePay(); updateLoan(); checkLoan();
    } else { // all will go to repay loan
        loanValue -= payValue; payValue = 0;
        updatePay(); updateLoan(); checkLoan();
    }
}

//              ---------------------------------- LAPTOP ------------------------------------
// buy laptops
function buyLap(){
    if (bankValue >= selectedLap.price) {
        alert('Congratulations! You are the owner of a laptop!');
        bankValue -= selectedLap.price;
        updateBalance();
    } else {
        alert("I'm sorry to inform you that your current balance is lower than the price. \n\ Please come back when you have more money ");
    }
}

// load data into an object 
let laptops = [];
const pageData = "https://hickory-quilled-actress.glitch.me/computers/";
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
    console.log("image-elem ", laptopsObject[0].image)
    let text =  "https://hickory-quilled-actress.glitch.me/" + laptopsObject[0].image;
    if (laptopsObject[0].id != 5){
        imageLapElem.src = text;
    } else {
        imageLapElem.src = text.replace("jpg","png");
    }
    //imageLapElem.src =  "https://hickory-quilled-actress.glitch.me/" + laptopsObject[0].image; //pageData +  String(laptopsObject[0].image);
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
    descLapDescElem.innerTex    t = selectedLap.description;
    let text = `https://hickory-quilled-actress.glitch.me/${selectedLap.image}`;
    if (selectedLap.id != 5){
        imageLapElem.src = text;
    } else {
        imageLapElem.src = text.replace("jpg","png");
    }
} 
//              ---------------------------------- ClICKABLE EVENTS :D ------------------------------------
btntransferBankElem.addEventListener("click", transferPaytoBank); // to the right <-- function
btnrepayloanElem.addEventListener('click', transferPaytoLoan);
btnWorkElem.addEventListener('click', getPaid);
btngetloanElem.addEventListener('click', getLoan);
btnBuyElem.addEventListener('click',buyLap)
selectLaptopElem.addEventListener("change", handleLapChange);