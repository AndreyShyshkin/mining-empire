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
        resurse2.innerHTML = "Железо 10"
    }

    createPick.addEventListener("click", (event) => {
        if(resurse.lvlPick == 1 && resurse.res1 >= 10 && resurse.res2 >= 10){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res2 -= 10
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Железо 30"
            resurse3.innerHTML = "Золото 20"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 2 && resurse.res1 >= 10 && resurse.res2 >= 30 && resurse.res3 >= 20){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res2 -= 30
            resurse.res3 -= 20
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Золото 30"
            resurse3.innerHTML = "Вольфрам 20"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 3 && resurse.res1 >= 10 && resurse.res3 >= 30 && resurse.res4 >= 20){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res3 -= 30
            resurse.res4 -= 20
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Вольфрам 30"
            resurse3.innerHTML = "Титан 20"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 4 && resurse.res1 >= 10 && resurse.res4 >= 30 && resurse.res5 >= 20){
            resurse.lvlPick += 1
            resurse.res1 -= 10
            resurse.res4 -= 30
            resurse.res5 -= 20
            resurse1.innerHTML = "Уголь 10"
            resurse2.innerHTML = "Титан 30"
            resurse3.innerHTML = "Драгоційний камінь 20"
            Player.Instance.damage += 1
        }else if(resurse.lvlPick == 5 && resurse.res1 >= 10 && resurse.res5 >= 30 && resurse.res6 >= 20){
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