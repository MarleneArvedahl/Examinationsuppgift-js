const sunElem = document.querySelector("#sun");
// const mercuruElem = document.querySelector('#mercuru');
// const venusElem = document.querySelector('#venus');
// const earthElem = document.querySelector('#earth');
// const marsElem = document.querySelector('#mars');
// const jupiterElem = document.querySelector('#jupiter');
// const saturnElem = document.querySelector('#saturn');
// const uraniusElem = document.querySelector('#uranius');
// const neptuneElem = document.querySelector('#neptune');
const planetsElem = document.querySelector("#planets");

const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
// const API_KEY = 'solaris-1Cqgm3S6nlMechWO'; // för godkänt nyckel

//hämtar nyckeln och lägger den i en variabel
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

//hämtar alla planeter och solen
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

function addInfo(bodyID, data) {
  console.log(`Add info to ${bodyID}`, data);
  document.querySelector("#name").innerHTML = data.name;
}

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

//async loadData gör att den väntar på att planeterna kommit, nästa -ett klickevent.
async function loadData() {
  const bodies = await getBodies();

  planetsElem.addEventListener("click", (event) => {
    console.log("planeten klickar", event.target.id);
    const index = bodyElementIdToIndex[event.target.id];
    const planet = bodies[index];
    addInfo(event.target.id, planet);
  });
}

document.addEventListener("DOMContentLoaded", loadData);

