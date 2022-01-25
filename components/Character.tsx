import * as React from 'react'
import { PokemonService } from '../services/pokemon.service';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap'

type Pokemon = {
    name: string,
    experience: number,
    height: number,
    default: boolean,
    weight: number,
    order: number,
    image: string
  }

type PokemonProp = {
    item: string
}

const PokemonDetail = (item: PokemonProp) => {
    const [detail, setPokemonDetail] = React.useState<Pokemon>()
    const pokemonService = new PokemonService()

    React.useEffect(() => {
        // ResetIsLoading(true)    
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
            <Container>
                <Row className='justify-content-center'>
                    <Col lg="6" md="8" sm="10">
                        {detail && (
                            <Card className="my-4 pokemon border-3 rounded-3">
                                <Row className='justify-content-center'>
                                    <Col lg="8">
                                        <Card.Img variant="top" src={detail.image} alt={detail.name} />
                                    </Col>
                                </Row>
                                <Card.Body>
                                    <Card.Title>{detail.name}</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the cards content.
                                    </Card.Text>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Weight: {detail.weight}</ListGroup.Item>
                                        <ListGroup.Item>Height: {detail.height}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PokemonDetail