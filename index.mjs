import { getData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";

const showIngredients = async (ingredients) => {

    for(let i = 0; i < ingredients.ingredients.length; i++){

        const ingredient = ingredients.ingredients[i]
        

        console.log("Ingredient name: " + ingredient.name + " effects: ");
        console.log("------------------------")

        for(let k = 0; k < ingredient.effects.length; k++){

            const effect = ingredient.effects[k];

            console.log(effect.name);
        }

        console.log("------------------------")
    }

} 

const execute = async () => {

    try {
        const data          = await getData();
        const ingredients   = Ingredients.load(data);

        // await showIngredients(ingredients);
        const cauldron      = new Cauldron(ingredients);

        const potion1       = cauldron.createPotion("Bear Claws", "Bee");
        showPotion(potion1);

        const potion2       = cauldron.createPotion("Chicken's Egg", "Chaurus Eggs");
        showPotion(potion2);

        const potion3       = cauldron.createPotion("Chaurus Eggs", "Bleeding Crown");
        showPotion(potion3);

        const potion4       = cauldron.createPotion("Nightshade", "Ectoplasm");
        showPotion(potion4);

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