// components/Pokemon.tsx

import * as React from 'react'
import Find from './Find'
import Character from './Character'
import { Option } from 'react-bootstrap-typeahead/types/types';

const PokemonMain = () => {
    const [pokemon, setPokemon] = React.useState<string>()
    const selectPokemon = (value: Option[]) => {
        const item = Object.assign({}, ...value)
        setPokemon(item.name)
    }

    return (
        <section className="pokemon my-5">
            <Find onPokemonChanged={selectPokemon} />
            {
                pokemon && <Character item={pokemon} />
            }
            {
                !pokemon && <div className='my-3'>No Pokemon selected...</div>
            }
        </section>
    )
}

export default PokemonMain