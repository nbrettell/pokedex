import * as React from 'react'
import { PokemonService } from '../services/pokemon.service';
import { Image } from 'react-bootstrap'

type Pokemon = {
    name: String,
    experience: Number,
    height: Number,
    default: Boolean,
    weight: Number,
    order: Number,
    image: String
  }

const PokemonDetail = (item: String) => {
    const [detail, setPokemonDetail] = React.useState<Pokemon>()
    const pokemonService = new PokemonService()

    React.useEffect(() => {
        // ResetIsLoading(true)

        console.log('details = ', item.item)
    
        const fetchData = async () => {
          try {
            const response = await pokemonService.getChosenPokemon(item.item);
            const json = await response;
            setPokemonDetail({...json})
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
        
      }, [])

    return (
        <section className='pokemon-card'>
            <div>
                {detail && (
                    <div>
                    <Image src={detail.image} fluid />

                    <ul>
                        <li>{detail.name}</li>
                        <li>{detail.weight}</li>
                    </ul>
                </div>
                )}
                <div>Nothing to show</div>
            </div>
        </section>
    )
}

export default PokemonDetail