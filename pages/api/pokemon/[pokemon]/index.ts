import { NextApiRequest, NextApiResponse } from 'next'

type Pokemon = {
  name: String,
  experience: Number,
  height: Number,
  default: Boolean,
  weight: Number,
  order: Number
}

export async function getPokemon(name: string) {
  console.log('pokemon name = ', name)
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  const jsonData = await response.json()
  return jsonData
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Pokemon>
  ) {
    console.log('request = ', req.query.pokemon)
    const pokemon = req.query.pokemon as string
    const jsonData = await getPokemon(pokemon)
    res.status(200).json({
        name: jsonData.name,
        experience: jsonData.base_experience,
        height: jsonData.height,
        default: jsonData.is_default,
        weight: jsonData.weight,
        order: jsonData.order
    })
  }