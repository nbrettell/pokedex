import { NextApiRequest, NextApiResponse } from 'next'

type PokemonAbility = {
    ability: Object,
    is_hidden: Boolean,
    slot: Number
}

type PokemonData = {
    abilities: Array<PokemonAbility>
}

export async function getPokemon(name: string) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  const jsonData = await response.json()
  return jsonData
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PokemonData>
  ) {
    const pokemon = req.query.pokemon as string
    const jsonData = await getPokemon(pokemon)
    res.status(200).json({ abilities: jsonData.abilities })
  }