import Movie from "./movie.js";
import { getLocalStorage } from "./utilities.js";


const searchBtn = document.getElementById('btn--search')
const movieInputEl = document.getElementById('input--movie')
const movieContainer = document.getElementById('movie--container')


const key = 'af3d11d4';



searchBtn.addEventListener('click', getMovieId)

async function getMovieId() {
    const movieSearchName = movieInputEl.value
    
        movieContainer.innerHTML = ` <img class='col-start-1 col-end-3 text-center justify-self-center h-20' id="spinner" src="/public/spinner.svg">  </img>`              //   SHOULD BE ADDED AS  INNER HTML
        document.getElementById('spinner').style.display = "block"

    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${movieSearchName}`)
        
    const movies = await response.json() 
    setTimeout(()=>{
    (document.getElementById('spinner').style.display = "none")

    },10000)



    console.log(movies)

    if (movies.Error === "Incorrect IMDb ID.") {
        movieContainer.innerHTML = ` <h1 class='col-start-1 col-end-3 text-center text-slate-600 justify-self-center' "> Please Enter a Movie  </h1>`
    } else if (movies.Error === 'Movie not found!') {
        movieContainer.innerHTML = ` <h1 class='col-start-1 col-end-3 text-center text-slate-600 justify-self-center' "> No movies Found </h1>`
        //   SHOULD BE ADDED AS  INNER HTML
        //   SHOULD BE ADDED AS  INNER HTML
    } else {

       ``

        const movieIds = movies.Search.map(movie => {
            return movie.imdbID
        })

        getMovie(movieIds)
           
    }

}

async function getMovie(movieIds) {

    let movieArray = []
    let movieHtmlArray = []
    
    for (let movieId of movieIds) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${movieId}`)
        const data = await response.json()
        
        const movie= new Movie(data)

        for(let localMovie of getLocalStorage()){
            if(movie.imdbID === localMovie.imdbID ){
                movie.inLocalStorage = true
                
            }
            
        }
        
        
        movieHtmlArray.push(movie.getHtml())

        movieArray.push(movie)



    }

    movieContainer.innerHTML = movieHtmlArray.join('')

    transferToLocalStorage(movieArray)


}

function transferToLocalStorage(movieArray) {
    movieContainer.addEventListener('click', addMovie )
    function addMovie(btn){
            const oneMovieArray = movieArray.filter(e => btn.target.id === e.imdbID)
            const movie = oneMovieArray[0]
            
            console.log(movie)
            const localstorageKey = movie.imdbID
            const data = JSON.stringify(movie)
    
            localStorage.setItem(localstorageKey, data)
            document.querySelector(`button[id=${movie.imdbID}]`).innerHTML = "<img src='/public/remove.svg' /> Remove" 
        
    }
}







