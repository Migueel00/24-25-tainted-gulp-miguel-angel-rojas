export default class PotionBag{
    constructor(potions){
        
        this.potions = potions;     // Array de pociones
    }

    static create(ingredients, cauldron){
        // ingredients array de nombres de ingredientes
        // cauldron objeto Cauldron

        const potions = [];
        for(let i = 0; i < ingredients.length; i++){
        
            const name1  = ingredients[i];

            for(let k = i + 1; k < ingredients.length; k++){

                const name2 = ingredients[k];

                const potion = cauldron.createPotion(name1, name2);
                
                potions.push(potion);
            }
        }

        return new PotionBag(potions);
    }
}