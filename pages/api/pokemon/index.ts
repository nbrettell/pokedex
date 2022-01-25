import { NextApiRequest, NextApiResponse } from 'next'

type PokemonList = {
  name: string,
}

type PokemonSuccessResponse = {
    message: string,
    results: Array<PokemonList>
}

interface PokemonErrorResponse {
    message: string;
}

export async function getPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999');
  const jsonData = await response.json()
  const selections = jsonData.results.map((item: PokemonList) => {
      return {name: item.name}
  })
  return selections
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PokemonSuccessResponse | PokemonErrorResponse>
  ) {
    const jsonData = await getPokemonList()
    if (jsonData) {
        res.status(200).json({ message: "Pokemon ready!", results: jsonData })   
    } else {
        res.status(500).json({ message: "Pokemon not found" })
    }
  }