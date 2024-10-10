export default class Character {
    constructor(fullName, health, magick, stamina, potions){
        this.fullName = fullName;   // Nombre + "the" + clase del pj Ej: Sid Vicious the Cleric
        this.health   = health;     // Hp
        this.magick   = magick;     // Numero de puntos de magia
        this.stamina  = stamina;    // Nº de puntos resistencia
        this.potions  = potions;    // Array de pociones creadas
    }

    static from(playerData, potions){
        const players = playerData.players;

        const name      = `${players[0].name} the ${players[0].class}`;
        const health    = players[0].health;
        const magick    = players[0].magick;
        const stamina   = players[0].stamina;

        return new Character(name, health, magick, stamina, potions);
    }

    drinkEmAll(){
        /*
            3 tipos de pociones (POTION)
            Pocion salud: LLeva Health en el nombre suma el value al atributo health del character
            Pocion Magia: LLeva Magicka en el nombre, suma el value al atributo magick
            Pocion resistencia: LLevan la palabra Stamina en el nombre, suma el value 
            Resto: Suma 1 putno a los 3 atributos
            Venenos (POISON) funcionan igual pero restando
            Pocion de la cordura (Potion of sanity) sumaremos value a los 3 atributos
            Pocion fallida no hace nada

            _------- FIN DEL JUEGO-----
            Se ha bebido la pocima de la cordura
            health      <= 0
            magick      <= 0
            stamina     <= 0

        */
        this.clasifyPotionsAndPoison();


    }

    clasifyPotionsAndPoison(){
        
        // añadir el tipo a cada potion para segun el tipo hacer un switch y aplique cada cosa 
        for(let i = 0; i < this.potions.length; i++){


            const potion = this.potions[i];
            console.log('------------------------------');  
            
            this.showCharacterAttributes();

            if(potion.name === 'Potion of sanity'){

                this.applyPotions(potion);
                potion.type = 'potion of sanity';

            }else if(potion.name.includes('Poison')){

                this.applyPoisons(potion);
                potion.type = 'poison'

            }else if(potion.name.includes('Failed')){

                potion.type = 'failed';

            }else if( potion.name.includes('Potion')){

                this.applyPotions(potion);
                potion.type = 'potion'
            }
            console.log('------------------------------');  
            this.showCharacterDrinkigPotionAndType(potion);

            this.showCharacterAttributes();
            console.log('----------');
            console.log('----------');

            if(this.health <= 0){
                console.log(`${this.fullName} has died`);
                break;
            }else if(this.stamina <= 0){
                console.log(`${this.fullName} has lost all his stamina. He feels completely exhausted`);
                break;
            }else if(this.magick <= 0){
                console.log(`${this.fullName} has lost all his magick`);
                break;
            }else if(potion.type === 'potion of sanity'){
                break;
            }
        }
    }

    applyPotions(potion){

        if(potion.name.includes('Health')){

            this.health      += potion.value;
            potion.attribute  = 'health';
            
        }else if( potion.name.includes('Magicka')){

            this.magick      += potion.value;
            potion.attribute  = 'magick';

        }else if(potion.name.includes('Stamina')){
            this.stamina      += potion.value;
            potion.attribute   = 'stamina';

        }else if(potion.name === 'Potion of sanity'){
            this.stamina += potion.value;
            this.magick  += potion.value;
            this.health  += potion.value;
            
            
        }else {
            this.stamina += 1;
            this.health  += 1;
            this.magick  += 1;
            potion.attribute  = 'another';
        }
    }

    applyPoisons(poison){

        if(poison.name.includes('Health')){

            this.health -= poison.value;
            poison.attribute  = 'health';
            
        }else if( poison.name.includes('Magicka')){

            this.magick -= poison.value;
            poison.attribute  = 'magick';

        }else if(poison.name.includes('Stamina')){
            this.stamina -= poison.value;
            poison.attribute   = 'stamina';

        }else {
            this.stamina -= 1;
            this.health  -= 1;
            this.magick  -= 1;
            poison.attribute  = 'another';
        }
    }

    showCharacterAttributes(){
        console.log(`Health:    ${this.health}`);
        console.log(`Magick:    ${this.magick}`);
        console.log(`Stamina:   ${this.stamina}`);
    }

    showCharacterDrinkigPotionAndType(potion){
        const type = potion.type;
        
        switch(type){
            case 'poison':
                if(potion.attribute === 'another'){

                    console.log(`${this.fullName} drinks ${potion.name} and loses 1 point of all his attributes`);

                }else{
                    console.log(`${this.fullName} drinks ${potion.name} and loses ${potion.value} points of ${potion.attribute}`);
                }
                break;
            case 'potion':
                if(potion.attribute === 'another'){

                    console.log(`${this.fullName} drinks ${potion.name} and wins 1 point of all his attributes`);

                }else{
                    console.log(`${this.fullName} drinks ${potion.name} and wins ${potion.value} points of ${potion.attribute}`);
                }
                break;
            case 'failed':
                console.log(`${this.fullName} can't drink ${potion.name} and don't changes nothing`);
                break;

            case 'potion of sanity':
                console.log(`${this.fullName} has found ${potion.name}. His mind is healed. Well Done!`);

                break;
            

        }
    }
}