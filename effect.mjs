const positive_effecto_tokens = ['Fortify', 'Resist', 'Cure', 'Restore', 'Regenerate', 'Invisibility', 'Waterbreathing'];


export default class Effect {
    constructor(name, type){
        this.name   = name;
        this.type   = type;
    }

    static from(name){
        return new Effect(
            name,
            positive_effecto_tokens.some(token => name.includes(token) ? 'beneficial' : 'harmful')
        );
    }

}