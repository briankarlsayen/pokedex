import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GetPokemon} from '../actions/pokemonActions';
import _ from 'lodash';

function Pokemon(props) {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    
    const ShowData = () => {
        if(!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return(
                <div className={"pokemon-wrapper"}>
                    <div className={"item"}>
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default} alt="" />
                        <img src={pokeData.sprites.back_default} alt="" />
                        <img src={pokeData.sprites.front_shiny} alt="" />
                        <img src={pokeData.sprites.back_shiny} alt="" />
                    </div>
                    <div className="item">
                        <h1>Stats</h1>
                        {pokeData.stats.map((el, index) => {
                            return <p key={index}>{el.stat.name} {el.base_stat}</p>
                        })}
                    </div>
                    <div className="item">
                        <h1>Abilities</h1>
                        {pokeData.abilities.map((el, index) => {
                            return <p key={index}>{el.ability.name}</p>
                        })}
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
    }, [])

    console.log("pokemon name:", pokemonName)

    return (
        
        
        <div className="poke">
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
}

export default Pokemon
