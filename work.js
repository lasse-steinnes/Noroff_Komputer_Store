// JS for work: An area to increase earnings and deposit cash into your bank account
/* Description:
* Pay txt: Show how much money earned by "working"
* Bank: Transfer money from pay to Bank balance. Remember to reset pay
* When money is transferred to the bank:
1) If loan --> 10% must be paid to loan
2) The rest is tranferred to bank account.
* Work must increase your Pay by 100 on each click

If you have a loan, a button called "Repay loan" should appear: IF clicked 
a total will go to loan. If loan < pay, then net MAY be transferred to bank account.
*/

// Elements in HTML and global objects
const btntransferBankElem = document.getElementById('btn-bank');
const btntransferLoanElem = document.getElementById('btn-repay');
const btnWorkElem = document.getElementById('btn-work');
const descPayElem =  document.getElementById('desc-paid');
const descbalanceElem = document.getElementById('desc-balance');
const descloanElem = document.getElementById('desc-loan')

// Needed parameters: bankValue; loanValue, payValue, tenPercentDeduction;
let payValue = 0; let tenPercentDeduction = 0; let bankValue = 0; let loanValue = 0;

// Functions 
function updatePay(){
    descbalanceElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(payValue)}`;
} 

function getPaid(currentVal){ // increase by 100 NOK per work (ie. click)
    currentVal += 100; // add 100 NOK to pay and update pay description
    descPayElem.innerHTML = `Pay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    ${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(currentVal)}`;
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
        updateBalance(); updateLoan(); checkLoan(); updatePay();
    } else {
        payValue = 0;
        bankValue += payValue;
        updatePay(); updateBalance();
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