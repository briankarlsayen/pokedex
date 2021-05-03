import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GetPokemon} from '../actions/pokemonActions';
import _ from 'lodash';
import '../PokemonCard.css';

function Pokemon(props) {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    
    const ShowData = () => {
        if(!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return(
                <div className="pokemon-card">
                    <div className="pokemonCard-img">
                        <img src={pokeData.sprites.front_default} alt="" />
                        <h2>{pokemonName}</h2>
                    </div>
                    <div className="pokemonCard-right">
                        <div className="pokemonCard-stats">
                            <h3 className="subtitle">Stats</h3>
                            {pokeData.stats.map((el, index) => {
                                return <p className="text" key={index}>{el.stat.name}<span>{el.base_stat}</span></p>
                            })}
                        </div>
                        <div className="pokemonCard-abilities">
                            <h3 className= "subtitle">Abilities</h3>
                            {pokeData.abilities.map((el, index) => {
                                return <p className="text" key={index}>{el.ability.name}</p>
                            })}
                        </div>
                    </div>
                </div>
                
            )
        }

        if(pokemonState.loading) {
            return <p>Loading...</p>
        }
        if(pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>error getting pokemon</p>
    }
    useEffect(()=> {
        dispatch(GetPokemon(pokemonName))
        window.scrollTo(0, 0)
    }, [])

    console.log("pokemon name:", pokemonName)

    return (
        
        
        <div className="poke">
            {ShowData()}
        </div>
    )
}

export default Pokemon
