// JS for laptops: Select and display information about the merchandise + buy button
/* Includes
Select box with available computers --> Feature list must be displayed
for chosen laptop below.

Laptop API: https://hickory-quilled-actress.glitch.me/computers , RESTful API
returns JSON data:
returns array w. prop. {
 "id": 1,
 "title": "Classic Notebook",
 "description": "A little old, but turns on.",
 "specs": [
 "Has a screen",
 "Keyboard works, mostly",
 "32MB Ram (Not upgradable)",
 "6GB Hard Disk",
 "Comes with Floppy Disk Reader (Free) - Requires cable",
 "Good exercise to carry"
 ],
 "price": 200,
 "stock": 1,
 "active": true,
 "image": "assets/images/1.png"
} NOTE: There are 6 options in total.
Info: Image, name (title) and description
Get access to comp path: https://hickory-quilled-actress.glitch.me/assets/images/1.png

Buy now button: Buy a laptop and validate if bank balance is sufficient.
If not enough money: Should give a message "Cannot afford"
If enough: "You are now owner of the new laptop!"
*/

const btntransferBankElem = document.getElementById('btn-bank');
const btntransferLoanElem = document.getElementById('btn-repay');
const btnWorkElem = document.getElementById('btn-work');
const descPayElem =  document.getElementById('desc-paid');
const descbalanceElem = document.getElementById('desc-balance');
const descloanElem = document.getElementById('desc-loan');

const selectLaptopElem = document.getElementById('sel-pc-option'); // Specific for laptops
const descPriceElem = document.getElementById("hd-laptop-price");
const btnBuyElem = document.getElementById("btn-buy");
const descAffordElem = document.getElementById("prompt-cannotAfford");
const descNewOwnerElem = document.getElementById("prompt-newOwner");
const descLapTitleElem= document.getElementById("hd-my-comp-title");
const descLapDescElem= document.getElementById("desc-comp-dd");
const descLapFeatureElem = document.getElementById("desc-comp-features");
const imageLapElem = document.getElementById("hd-my-comp-image");

// load data into an object 
let laptops = [];
const pageData = "https://hickory-quilled-actress.glitch.me/computers";
fetch(pageData)
    .then(response => response.json()) // With promise
    .then(data => laptops = data) // 
    .then(laptops => addLaptopsToSelect(laptops)); // after loading data to laptop object

// function to buy a laptop
function addLaptopsToSelect(laptopsObject){
    selectedLap = laptopsObject[0];
    laptopsObject.forEach(x => addOneToSelect(x));
    descPriceElem.innerText = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(computers[0].price);
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
    descPriceElem.innerText = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(selectedComputer.price);
    descLapFeatureElem.innerText = selectedLap.specs;
    descLapTitleElem.innerText = selectedLap.title;
    descLapDescElem.innerText = selectedLap.description;
    imageLapElem.src = "https://hickory-quilled-actress.glitch.me/computers" + selectedLap.image;
} 

// To get elements to work when clicking. 
btntransferBankElem.addEventListener("click", ); // to the right <-- function
btntransferLoanElem.addEventListener('click', );
btnWorkElem.addEventListener('click', );
btnrepayloanElem.addEventListener('click', )
btngetloanElem.addEventListener('click', );
btnBuyElem.addEventListener('click',)
selectLaptopElem.addEventListener("change", handleLapChange);

/// --- example code

//handleComputerMenuChange - function to handle the change of computers in the menu
/* const handleComputerMenuChange = e => {
    selectedComputer = computers[e.target.selectedIndex];
    console.log(selectedComputer.price);
    computerPriceElement.innerText = new Intl.NumberFormat('sv-SE', {style: 'currency', currency: 'SEK'}).format(selectedComputer.price);
    console.log(computerPriceElement.innerHTML);
    computerSpecsElement.innerText = selectedComputer.specs;
    computerNameElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = selectedComputer.description;
    computerImageElement.src = `https://noroff-komputer-store-api.herokuapp.com/${selectedComputer.image}`;
} */