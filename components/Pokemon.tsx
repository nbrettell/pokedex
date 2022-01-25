// components/Find/index.tsx

import * as React from 'react'
import Find from './Find'
import Character from './Character'

type Pokemon = {
  name: String
}

const PokemonMain = () => {
    const [pokemon, setPokemon] = React.useState<String>()
    const selectPokemon = (value: String) => {
        const item = Object.assign({}, ...value)
        setPokemon(item.name)
    }

    console.log('pokemon main = ', pokemon)

    return (
        <section className="pokemon my-5">
            <Find onPokemonChanged={selectPokemon} />
            {
                pokemon && <Character item={pokemon} />
            }
            {
                !pokemon && <div>NOThing</div>
            }
        </section>
    )
}

export default PokemonMain