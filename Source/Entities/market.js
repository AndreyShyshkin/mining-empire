import resurse from "../Logic/inventory"
let market = document.querySelector(".market")
let sell = document.querySelector(".sell")
let buy = document.querySelector(".buy")
let selector = document.querySelector(".selector")
let sellBlock = document.querySelector(".sellBlock")
let sellRes1 = document.querySelector(".sellRes1")
let sellRes2 = document.querySelector(".sellRes2")
let sellRes3 = document.querySelector(".sellRes3")
let sellRes4 = document.querySelector(".sellRes4")
let sellRes5 = document.querySelector(".sellRes5")
let sellRes6 = document.querySelector(".sellRes6")
let buyBlock = document.querySelector(".buyBlock")
let buyRes1 = document.querySelector(".buyRes1")
let buyRes2 = document.querySelector(".buyRes2")
let buyRes3 = document.querySelector(".buyRes3")
let buyRes4 = document.querySelector(".buyRes4")
let buyRes5 = document.querySelector(".buyRes5")
let buyRes6 = document.querySelector(".buyRes6")

const coefficientsSell = {
    res1: 1,
    res2: 2,
    res3: 3,
    res4: 4,
    res5: 5,
    res6: 6
};

const coefficientsBuy = {
    res1: 2,
    res2: 4,
    res3: 6,
    res4: 8,
    res5: 10,
    res6: 12
}


function marketLogic(){
    sell.addEventListener("click", (event) => {
        sell.style.display = "none";
        buy.style.display = "none";
        sellBlock.style.display = "block";
        selector.style.display = "none";
    });
    
    buy.addEventListener("click", (event) => {
        sell.style.display = "none";
        buy.style.display = "none";
        buyBlock.style.display = "block";
        selector.style.display = "none";
    }); 

    const sellResButtons = [sellRes1, sellRes2, sellRes3, sellRes4, sellRes5, sellRes6];

    sellResButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            sellRes(`res${index + 1}`);
        });
    });

   const buyResButtons = [buyRes1, buyRes2, buyRes3, buyRes4, buyRes5, buyRes6];

    buyResButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            buyRes(`res${index + 1}`);
        });
    })
}

function sellRes(resKey) {
    let res = prompt("Enter the quantity you want to sell:");
    if (resurse[resKey] < res) {
        alert("You don't have enough resources!");
    } else {
        resurse[resKey] -= res;
        res = res * coefficientsSell[resKey];
        resurse.money += res * 10
    }
}

function buyRes(resKey) {
    let res = prompt("Enter the quantity you want to buy:");
    if (resurse.money < res * coefficientsBuy[resKey] * 10) {
        alert("You don't have enough money!");
    } else {
        resurse[resKey] += res
        res = res * coefficientsBuy[resKey] * 10;
        resurse.money -= res;
    }
}


export default marketLogic;