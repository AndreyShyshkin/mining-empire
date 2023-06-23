const map = document.getElementById("playMap");

function home(cordinatY, cordinatX){
    let home = document.createElement("div");
        home.className = "home";

        map.appendChild(home);
    for(i = 1; i < 5; i++){
        const home = document.getElementById("playMap");
        let homeLevel1 = document.createElement("div");
        homeLevel1.className = "home-" + i + "-1";
        homeLevel1.style.top = cordinatY - 200 + "px";
        homeLevel1.style.left = cordinatX + 100 * i + "px";

        home.appendChild(homeLevel1);
    }
    for(i = 1; i < 5; i++){
        const home = document.getElementById("playMap");
        let homeLevel2 = document.createElement("div");
        homeLevel2.className = "home-" + i + "-2";
        homeLevel2.style.top = cordinatY - 100 + "px";
        homeLevel2.style.left = cordinatX + 100 * i + "px";

        home.appendChild(homeLevel2);
    }
    for(i = 1; i < 5; i++){
        const home = document.getElementById("playMap");
        let homeLevel3 = document.createElement("div");
        homeLevel3.className = "home-" + i + "-3";
        homeLevel3.style.top = cordinatY + "px";
        homeLevel3.style.left = cordinatX + 100 * i + "px";

        home.appendChild(homeLevel3);
    }
}

export default home;