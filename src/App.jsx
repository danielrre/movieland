/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react"
import SearchIcon from '../public/search.svg'
import './App.css'
import MovieCard from "./MovieCard"


const API_URL = 'https://www.omdbapi.com?apikey=467f175f'

function App() {

  const [movies, setMovies] = useState([]) /// Hook de estado para llenar dinamicamente el resultado de la API

  const [searchTerm, setSearchTerm] = useState ('') /// Hook de estado para capturar la busqueda del input

  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  } /// Logica para consultar API

  useEffect(()=>{
    searchMovies('')
  },[])

  return (
    <div className="app">
      <h1>Movieland</h1>
      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)} 
        />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={()=>searchMovies(searchTerm)}
        /> {/* Llama a la funcion searchMovies que es la que busca la api y le pasa el valor de searchTerm */}
      </div> 

        {movies?.length > 0 /// Si la variable "movies" tiene resultados va a mostrar la card con la pelicula
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) :
          (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
        }
       </div>
  );
}

export default App
