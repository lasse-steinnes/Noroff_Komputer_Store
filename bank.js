// JS for bank: Store funds and make bank loans
// PS: Remember type checks


/* When "get a loan" --> Prompt pop-up box which allows you to enter amount.
 Constraints:
 1) Cannot get loan higher than 2x bank balance

 2) When you have 1x loan, you need to repay it fully before taking a new loan.
 3) 

 */

// Outstanding loan should only be visible after taking a loan, 
// and should be reduced as loan is paid back

// -------------------------------------------------- //
// Collecting tag IDs for bank

// Elements
const descbalanceElem = document.getElementById('desc-balance');
const descloanElem = document.getElementById('desc-loan');
const btngetloanElem = document.getElementById('btn-get-loan')
const btnrepayloanElem = document.getElementById('btn-repay')

// Global to be returned 
let loanValue = 0;
let bankValue = 0;

// Functions
function updateBalance(){
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
    } else if (BankValue == 0){
        alert(`You need money in the bank to get a loan`)
    } else { // Get a loan (Max 2x BankValue)
        loanValue = Number(window.prompt(`Enter loan amount in NOK: `));
        if (loanValue> (2*Bankvalue)){
            alert(`You cannot loan more than 2x your current balance: ${BankValue} NOK`)
        } else { // Get loan, show loan value and activate loan button
            descloanElem.innerHTML = `Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loanValue)}`;
            descloanElem.style.display = "block"  // show loan value in Bank
            btnrepayloanElem.style.display = 'block'; // show optional repay button in Work
        }
    }
}

