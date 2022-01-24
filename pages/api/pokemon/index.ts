import { NextApiRequest, NextApiResponse } from 'next'

type PokemonList = {
  name: String,
}

export async function getPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999');
  const jsonData = await response.json()
  const selections = jsonData.results.map((item: Object) => {
      return {name: item.name}
  })
  return selections
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PokemonList>
  ) {
    const jsonData = await getPokemonList()
    res.status(200).json({ test: 123, results: jsonData })
  }