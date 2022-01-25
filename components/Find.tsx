// components/Find.tsx

import * as React from 'react'
import { PokemonService } from '../services/pokemon.service';
import { 
  Typeahead,
  Menu,
  MenuItem } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';


// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';

interface PokemonSelectorProps {
    onPokemonChanged: ((selected: Option[]) => void)
}

type PokemonItem = {
  name: string
}

const Find = ({onPokemonChanged}: PokemonSelectorProps) => {
  const [pokemons, setPokemons] = React.useState<Array<PokemonItem>>()

  const pokemonService = new PokemonService()

  React.useEffect(() => {
    // ResetIsLoading(true)

    const fetchData = async () => {
      try {
        const response = await pokemonService.getAllPokemon();
        const json = await response;
        console.log(json);
        setPokemons(json.results)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    
  }, [])

  return (
    <div>
      <Typeahead
        id="find-pokemon"
        options={pokemons!}
        labelKey="name"
        placeholder="Choose a pokemon..."
        onChange={onPokemonChanged}
        renderMenu={(results, menuProps) => (
          <Menu text="Pokemon Search" {...menuProps}>
            {results.map((result: Option, index) => (
              <MenuItem option={result} position={index} key={index}>
                {result.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      />
    </div>
  )
}

export default Find