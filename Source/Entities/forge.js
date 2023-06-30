import resurse from "../Logic/inventory";
import { Player } from "./Player";
let resurse1 = document.querySelector(".resurse1")
let resurse2 = document.querySelector(".resurse2")
let resurse3 = document.querySelector(".resurse3")
let createPick = document.querySelector(".createPick")

function forgeLogic(){
    console.log(Player.Instance.damage)
    if(resurse.lvlPick == 1){
        resurse1.innerHTML = "Уголь 10"
        resurse2.innerHTML = "Железо 30"
    }

    createPick.addEventListener("click", (event) => {
        if(resurse.lvlPick == 1 && resurse.res1 >= 10 && resurse.res2 >= 30){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res2 -= 30
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Золото 30"
            resurse3.innerHTML = "Железо 50"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 2 && resurse.res1 >= 10 && resurse.res2 >= 30 && resurse.res3 >= 50){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res2 -= 30
            resurse.res3 -= 50
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Золото 30"
            resurse3.innerHTML = "Вольфрам 50"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 3 && resurse.res1 >= 10 && resurse.res3 >= 30 && resurse.res4 >= 50){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res3 -= 30
            resurse.res4 -= 50
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Вольфрам 30"
            resurse3.innerHTML = "Титан 50"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 4 && resurse.res1 >= 10 && resurse.res4 >= 30 && resurse.res5 >= 50){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res4 -= 30
            resurse.res5 -= 50
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Титан 30"
            resurse3.innerHTML = "Драгоційний камінь 50"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 5 && resurse.res1 >= 10 && resurse.res5 >= 30 && resurse.res6 >= 50){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res5 -= 30
            resurse.res6 -= 50
            resurse1.innerHTML = ""
            resurse2.innerHTML = ""
            resurse3.innerHTML = ""
            Player.Instance.damage += 1
        }else{
            alert("У вас не хватает ресурсов!")
        }

        
    });
}

export default forgeLogic;