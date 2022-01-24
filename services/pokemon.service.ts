import axios from 'axios';

export class PokemonService {

    public async getAllPokemon(): Promise<any> {
        const response = await fetch('/api/pokemon');
        return await response.json();
    }

    public async getChosenPokemon(pokemon: String): Promise<any> {
        const response = await fetch('/api/pokemon/' + pokemon);
        return await response.json();
    }

    public async getPokemonAbilities(pokemon: String): Promise<any> {
        const response = await fetch('/api/pokemon/' + pokemon + '/abilities');
        return await response.json();
    }

}