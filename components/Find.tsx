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

type Search = {
  isLoading: Boolean,
  selected: Option
}

type Pokemon = {
  name: String
}

interface PokemonSelectorProps {
    onPokemonChanged: ((selected: Pokemon) => void)
}

const Find = ({onPokemonChanged}: PokemonSelectorProps) => {
  const [selected, setSearchTerm] = React.useState<Search>()
  const [pokemons, setPokemons] = React.useState<any>([])

  const pokemonService = new PokemonService()

  const onSearch = (query: Option[]): void => {
    setSearchTerm({
      isLoading: true,
      selected: query,
    })
    setTimeout(() => {
      setSearchTerm({ isLoading: false, selected: query });
    }, 2000);
  };

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
        options={pokemons}
        labelKey="name"
        placeholder="Choose a pokemon..."
        onChange={onPokemonChanged}
        renderMenu={(results, menuProps) => (
          <Menu text="some" {...menuProps}>
            {results.map((result, index) => (
              <MenuItem option={result} position={index}>
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