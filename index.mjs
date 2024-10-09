import { getData } from "./service.mjs";
import Ingredients from "./ingredients.mjs";
import Cauldron from "./cauldron.mjs";
import PotionBag from "./PotionBag.mjs";

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

        const cauldron      = new Cauldron(ingredients);
        const names         = ingredientsNames(ingredients);

        const potionBag     = PotionBag.create(names, cauldron);
        showPotions(potionBag.potions);

        
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

function ingredientsNames(ingredients){
    const ingredientsArray   = ingredients.ingredients;


    const names         = [];

    for(let i = 0; i < ingredientsArray.length; i++){

        const ingredient    = ingredientsArray[i];
        const name          = ingredient.name;
        
        names.push(name);
    }

    return names;
}
