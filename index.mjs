import { getData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";
import PotionBag from "./PotionBag.mjs";
import Character from "./Character.mjs";


const execute = async () => {

    try {
        const data          = await getData();
        const playerData    = await getPlayerData();


        const ingredients   = Ingredients.load(data);

        const cauldron      = new Cauldron(ingredients);
        const pouch        = playerData.players[0].pouch_aged;

        const potionBag     = PotionBag.create(pouch, cauldron);
        showPotions(potionBag.potions);

        const character     = Character.from(playerData, potionBag.potions);

        showCharacter(character);
        character.drinkEmAll();
    }
    catch (error) {
        // Error
        console.error(error.message);
    }

}

await execute();

function showPotion(potion){
    console.log(`${potion.name}`);
    console.log(`Value:     ${potion.value}`);
    console.log(`Weight:    ${potion.weight}`);
    console.log(`Time:      ${potion.time}`);
    console.log("---------------------------");
}

function showPotions(potions){

    for(let i = 0; i < potions.length; i++){

        const potion = potions[i];

        showPotion(potion);
    }
}

async function getPlayerData() {
    const data = await fetch('https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json');
    
    return data.json();
}

function showCharacter(character){
    console.log(`${character.fullName}`);
    console.log('----------------------------------');
    console.log(`Health: ${character.health}`);
    console.log(`Magick: ${character.magick}`);
    console.log(`Stamina: ${character.stamina}`);

    for(let i = 0; i < character.potions.length; i++){
        const potion = character.potions[i];

        console.log(`Potion ${i}: ${potion.name}`);
    }
}