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
}