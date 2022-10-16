
const startButton = document.querySelector("#start-btn")
let gameMode = "easy"


//UNIT VALUES

var unitsOfLumber = 0; //adds 25 lumber per click
var unitsOfMetal = 0; // adds 10 metal per click
var numberOfBuildings = 0;

//WARRIOR STATS

var warrior1 = document.getElementById("warrior-1");
var warrior1HealthEl = document.getElementById("life-bar");
var warrior1HealthBarBoxS = document.getElementById("life-bar-box");
var warrior1Health = 300; //when monster appear villager loose 10 health for every consecutive click until its gone
var warrior1Strength = 10; //if you buy sword villagerStrength become 40

//MONSTERSTATS
var bossDiv = document.getElementById("boss-div");
var monsterDiv = document.getElementById("monster-div");
var monsterHealth = 40; //as long as monster is present warrior looses 10 health per any click
var monsterDamage = 10;
var bossHealth = 120;
var bossDamage = 30;
// Metal mine
var metalMine = document.getElementById("metal-mine");

//TREE VARIABLES

var tree1 = document.getElementById("tree-1");
var tree2 = document.getElementById("tree-2");
var tree3 = document.getElementById("tree-3");

var treeHealth = [10, 10, 10];

//VILLAGE VARIABLES bruke getElementsById

var buttonMenu = document.getElementById("button-menu");
var buySmallHouse = document.getElementById("buy-building-1-btn");
var buyLargeHouse = document.getElementById("buy-building-2-btn");
var buySwordElm = document.getElementById("buy-sword-btn");

const outputDivMessage = document.querySelector("#output-div-message")
//var buildingDiv = document.getElementById("building-div");
// SWORD
var swordPrice = 200;

//BUILDING PRICES
var smallHousePriceLumber = 50;
var smallHousePriceMetal = 10;
var largeHousePriceLumber = 150;
var largeHousePriceMetal = 30;

var outputDiv = document.getElementById("output-div");


//UNIT VALUES
function updateInfo() {
	document.getElementById("material-info").innerHTML = 
	   `Treverk: ${unitsOfLumber} enheter.
 		Metall: ${unitsOfMetal} enheter. 
 		Antall bygninger: ${numberOfBuildings}. 
 		Styrke: ${warrior1Strength}`;

	// Setup monster listner by calling function
	setupMonsterListner();
	setHpNumber()
}
//FUNCTIONS FOR TREES

function clickTree(treeNumber) {
	treeHealth[treeNumber]--;
	unitsOfLumber += 25;

	if (treeHealth[treeNumber] <= 0) {
		if (treeNumber === 0) {
			tree1.remove();
			bossFight();
				} else if (treeNumber === 1) {
				tree2.remove();	
					} else if (treeNumber === 2) {
					tree3.remove();
				}
				
			}
			printMessage("you gathered 10 lumber, beware")
			// outputDiv.innerHTML = `<li> you gathered 10 lumber, beware </li>`
	takeLifeFromWarrior();
	updateInfo();
}

//FUNCTION FOR MINE AND MONSTER APPEARANCE

function clickMine() {
	// updates units of metal
	unitsOfMetal += 10;
	// outputDiv.innerHTML = '<div> you gathered 10 metal </div>'
	printMessage("you gahered 10 metal")
	// Generates a random monster based on random.math value
	generateMonster();
	takeLifeFromWarrior();
	updateInfo();
}



function clickMonster() {
	//  outputDiv.innerHTML +=  `<div>monster takes damage</div>`
	printMessage(` monster looses ${warrior1Strength} hp` )
}

function setupMonsterListner() {}

function generateMonster() {
	// Generate a new Random value for each time you click the mine
	const randomValue = Math.floor(Math.random() * 10);
	// If the random value is 7 we want to add a random monster to the screen
	if (randomValue === 7) {
		setupMonster();

	}
}

function setupMonster() {
	let oneMonsterHealth = monsterHealth;
	// Create a image tag
	const oneMonster = document.createElement("img");
	oneMonster.src = "images/cute-wolfman.png";
	oneMonster.classList.add("monster");
	// add monster to the dom
	monsterDiv.appendChild(oneMonster);
	oneMonster.addEventListener("click", () => {
		oneMonsterHealth = oneMonsterHealth - warrior1Strength;
		
		if (oneMonsterHealth <= 0) {
			monsterDiv.removeChild(oneMonster);
			takeLifeFromWarrior();
			
		}
		
	});
}


function clickBoss(){}

function bossFight() {
		let oneBossHealth = bossHealth;
		const oneBoss = document.createElement("img");
		oneBoss.src = "images/boss.png";
		oneBoss.classList.add("boss");
		bossDiv.style.paddingLeft = "500px";
		bossDiv.appendChild(oneBoss)
		oneBoss.addEventListener("click", () => {
			
		oneBossHealth = oneBossHealth - warrior1Strength
		printMessage(`Boss looses ${warrior1Strength} hp`)	
		if (oneBossHealth <= 0){
			bossDiv.removeChild(oneBoss)
			takeLifeFromWarrior()
		}
		});
}


function takeLifeFromWarrior() {
	const isMonsters = document.querySelector(".monster");
	const allMonsters = document.querySelectorAll(".monster");
	const isBoss = document.querySelector(".boss") // I DONT GET THIS
	const allBosses = document.querySelectorAll(".boss")
	// Check if monsters is present if so setup listener for taking life
	const resources = [tree1, tree2, tree3, metalMine, ...allBosses, ...allMonsters];
	if (isMonsters || isBoss) {
//		outputDiv.innerHTML += '<div> warrior hurts himself in its confusion </div>'
		printMessage("warrior hurts himself in its confusion")	
		// setup listeners for the mine and
		resources.forEach(function (resource) {
			resource.addEventListener("click", takeLifeFromWarriorHp);
		});
	} else {
		resources.forEach((resource) => {
			resource.removeEventListener("click", takeLifeFromWarriorHp);
			});
			}
}

function takeLifeFromWarriorHp() {
	if (warrior1Health === 0) {
		alert("GAME OVER");
	}
	const isBoss = document.querySelector(".boss") 
	if(isBoss){
		warrior1Health = warrior1Health - bossDamage
			
		printMessage(`You lost ${bossDamage} hp`)	
		
	}else{
		warrior1Health = warrior1Health - monsterDamage
		printMessage(`You lost ${monsterDamage} hp`)	

	}
	// target lifebar and set width to be minus monstersength
	// warrior1HealthEl.style.width = `${warrior1Health}px`;
	// warrior1HealthEl.innerHTML = `${warrior1Health}hp`;
	setHpNumber()
	
}

function setHpNumber(){
	warrior1HealthEl.style.width = `${warrior1Health}px`;
	warrior1HealthEl.innerHTML = `${warrior1Health}hp`;
}

// function gainHealth (){
// setTimeout(()=>{
// }, 5000)
// }

function buySword() {
	// target the sword button ps: you have it in top of this document

	buySwordElm.addEventListener("click", () => {
		if (unitsOfMetal >= swordPrice) {
			// remove metal
			unitsOfMetal = unitsOfMetal - swordPrice;
			warrior1Strength = warrior1Strength + 30;
			// increase warrior strength
			// make warrior bigger
			warrior1.style.scale = warrior1.style.scale
				? warrior1.style.scale * 1.2
				: "120%";
			if (warrior1.style.scale > 2) {
				warrior1.style.transform = "translateY(-40px)";
			} else if (warrior1.style.scale > 1.44) {
				warrior1.style.transform = "translateY(-30px)";
			} else {
				warrior1.style.transform = "translateY(-20px)";
			}
		}
		printMessage(`You bought a sword for ${swordPrice}`)	
		updateInfo();
	});
}
buySword();

//BUY SMALL HOUSE
function buySmallHouseFunction() {
	// targets the small house button

	buySmallHouse.addEventListener("click", () => {
		if (
			unitsOfLumber >= smallHousePriceLumber &&
			unitsOfMetal >= smallHousePriceMetal
		) {
			//remove lumber and metal
			unitsOfLumber = unitsOfLumber - smallHousePriceLumber;
			unitsOfMetal = unitsOfMetal - smallHousePriceMetal;
      //insert image of small building
      const image = document.createElement('img');
      image.setAttribute('src', 'images/building-1.png');
      image.setAttribute('alt', 'building-1');
      const buildingDiv = document.getElementById("building-div");
      buildingDiv.appendChild(image);
	  // outputDiv.innerHTML =  `<div> You bought a small house!! :-D </div>`
	  printMessage("You bought a small house!!")


		}
		updateInfo();
		
	});
}
buySmallHouseFunction();

//BUY LARGE HOUSE
function buylargeHouseFunction() {
	// targets the large house button

	buyLargeHouse.addEventListener("click", () => {
		if (
			unitsOfLumber >= largeHousePriceLumber &&
			unitsOfMetal >= largeHousePriceMetal
		) {
			//remove lumber and metal
			unitsOfLumber = unitsOfLumber - largeHousePriceLumber;
			unitsOfMetal = unitsOfMetal - largeHousePriceMetal;
      //insert image of large building
      	const image = document.createElement('img');
      	image.setAttribute('src', 'images/building-3.png');
      	image.setAttribute('alt', 'building-3');
      	const buildingDiv = document.getElementById("building-div");
		buildingDiv.appendChild(image);
		// outputDiv.innerHTML = `<div>You bought a large house :-D </div>`
		printMessage("You bought a large house")	
		/*
			const p = document.getElementById("output-div");
			p.insertAdjacentText("beforeend", "Du kjøpte et stort hus!")
			*/

		}
		updateInfo();
	});
}
buylargeHouseFunction();

function generatePassiveHealthGeneration() {
	setInterval(() => {
		if (warrior1Health <= 300) {
			// generate more health
			warrior1Health = warrior1Health + 20;
			// update style
			warrior1HealthEl.style.width = `${warrior1Health}px`;
			warrior1HealthEl.innerHTML = `${warrior1Health}hp`;
		}
	}, 5000);
}
//generatePassiveHealthGeneration();

let messageArray = []

function printMessage(msg)
{
	outputDivMessage.innerHTML = ""


console.log(messageArray.length)
if(messageArray.length === 5){
	 messageArray.splice(-1)

	console.log(messageArray)

}
messageArray.unshift(msg)
messageArray.forEach((melding) =>{
	const messageDiv = document.createElement('div');
	console.log("add bro")
	messageDiv.innerHTML = melding

	outputDivMessage.appendChild(messageDiv)
})	

}
//sprintMessage("enda en message")


// MODAL

const warriorMaleBtn = document.querySelector("#warrior-male")
const warriorFemaleBtn = document.querySelector("#warrior-female")

warriorMaleBtn.addEventListener('click', () => changeImage("./images/warrior.png") )
warriorFemaleBtn.addEventListener('click', () => changeImage("./images/warrior2.png"))

function changeImage(image){
	const imageEl = document.querySelector(".modal__settings__warrior__image")
	imageEl.src = image

}

function startGame(){

startButton.addEventListener('click', () => {
	setResources()
	setWarrior()
	setGameMode()
	const modalEl = document.querySelector("#modal")
	modalEl.style.opacity = 0;
	modalEl.style.visibility = "hidden"
	updateInfo()
} )




}

function setWarrior(){
	const warriorHp = document.querySelector("#warrior-hp")
	const warriorStr = document.querySelector("#warrior-sword")
	const warriorModalImage = document.querySelector(".modal__settings__warrior__image")
	warrior1.src = warriorModalImage.src
	
	console.log(warriorHp.value)
	if(warriorHp.value){
		
		warrior1Health = Number(warriorHp.value)
	
	}if(warriorStr.value){

		warrior1Strength = Number(warriorStr.value)
	}


}

function setResources(){
	const lumberEl = document.querySelector("#lumber-amount")
	const metalEl = document.querySelector("#metal-amount")

	if(lumberEl.value){
			
		unitsOfLumber = Number(lumberEl.value)
		
	}if(metalEl.value){
		
		unitsOfMetal = Number(metalEl.value)
	}

}

function setGameMode(){

	if(gameMode === "easy"){
		generatePassiveHealthGeneration()

	}else{
		const containerEl = document.querySelector("#container")
		containerEl.style.backgroundImage = `url("/images/The_Hell.webp")`;

	}
}


startGame()

const easyBtn = document.querySelector("#easy-mode")
const hardBtn = document.querySelector("#hard-mode")

easyBtn.addEventListener('click', ()=> {
	gameMode = "easy"
} )
hardBtn.addEventListener('click', ()=> {
	gameMode = "hard"
} )