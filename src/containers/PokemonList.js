import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import {GetPokemonList} from "../actions/pokemonActions";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';

 
function PokemonList(props) {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);

    useEffect(()=> {
        fetchData(1)
        
    }, [])

    const fetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
        
    }

    const ShowData = () => {
        if(pokemonList.loading) {
            return <p>Loading...</p>
        }
        if(!_.isEmpty(pokemonList.data)) {
            return (
                <div className={"list-wrapper"}>
                    {pokemonList.data.map(el => {
                return (
                    <div className={"pokemon-item"} key={el.name}>
                        <p>{el.name}</p>
                        <Link to={`/pokemon/${el.name}`}>View</Link>
                    </div>
                ) 
            })}
                </div>
            ) 
        }

        if(pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>unable to get data</p>
    }

    return (
        <div className="pokemon-list">
            <div className={"search-wrapper"}>
                <form className="searchWrapper-form" onSubmit={()=> props.history.push(`/pokemon/${search}`)}>
                    <p>Search Pokemon</p>
                    <div className="searchform">
                        <input className="searchForm-searchbar" placeholder="ex. pikachu" type="text" onChange={e => setSearch(e.target.value)} />
                        <button><SearchIcon /></button>
                    </div>
                </form>
                
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate 
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplay={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => fetchData(data.selected + 1)}
                    containerClassName={"pagination"}
                    activeClass={"pagination-active"}
                    pageClassName={"pagination-item"}
                />
            )}
        </div>
    )
}

export default PokemonList
