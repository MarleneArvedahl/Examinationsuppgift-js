
const sunElem = document.querySelector("#sun");
const planetsElem = document.querySelector("#planets");


const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";

//hämtar nyckeln och lägger den i en variabel, "key".
async function getKey() {
    let response = await fetch(
        "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
        {
            method: "POST",
        }
    );
    const data = await response.json();
    return data.key;
}

//hämtar alla planeter och solen med hjälp av nyckeln jag frågat om. 
async function getBodies() {
    const myKey = await getKey();
    console.log(myKey);

    let response = await fetch(
        "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
        {
            method: "GET",
            headers: { "x-zocom": myKey },
        }
    );
    const data = await response.json();
    return data.bodies;
}

//denna funktionen skriver ut all data jag eftersökt i mina element. Klick-eventet ligger på min knapp som tar en tillbaka till planeternas sida.
//Samtidigt som man klickar tar man bort klassen show på overlayen så att min första sida kan visas igen.
function addInfo(bodyID, data) {
    document.querySelector("#name").innerHTML = data.name;
    document.querySelector("#latinName").innerHTML = data.latinName;
    document.querySelector("#desc").innerHTML = data.desc;
    document.querySelector("#circumference").innerHTML = data.circumference;
    document.querySelector("#distance").innerHTML = data.distance;
    document.querySelector("#maxTemp").innerHTML = data.temp.day;
    document.querySelector("#minTemp").innerHTML = data.temp.night;
    document.querySelector("#moons").innerHTML = data.moons.join("   ");

    document.querySelector("button").addEventListener('click', () => {
    document.querySelector("#overlay").classList.remove("show");
    });
}
//visar vilken position/id i arrayen planeterna ligger på.
const bodyElementIdToIndex = {
    sun: 0,
    mercuru: 1,
    venus: 2,
    earth: 3,
    mars: 4,
    jupiter: 5,
    saturn: 6,
    uranius: 7,
    neptune: 8,
};

//async loadData gör att den väntar på att planeterna kommit och sparar planeterna i variabeln bodies, nästa -ett klickevent där koden hittar mina specifika planeter med hjälp av id.
//När man klickar på en planet hittar datorn min "overlay" och adderar klassen "show". Sen körs funktionen addInfo.
async function loadData() {
    const bodies = await getBodies();

    planetsElem.addEventListener('click', (event) => {
        const index = bodyElementIdToIndex[event.target.id];
        const planet = bodies[index];
        document.querySelector("#overlay").classList.add("show");
        addInfo(event.target.id, planet);
    });
    

}



document.addEventListener("DOMContentLoaded", loadData);
