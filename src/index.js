import Movie from "./movie";

const searchBtn = document.getElementById('btn--search')
const movieInputEl = document.getElementById('input--movie')
const movieContainer = document.getElementById('movie--container')



const key = 'af3d11d4';
let localstorageKey ;

searchBtn.addEventListener('click', getMovieData)


async function getMovieData() {
    const movieName = movieInputEl.value

    const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movieName}
    `)

    // console.log(response)

    const data = await response.json()

    if (data.Error === "Incorrect IMDb ID.") {
        console.log(` please enter a movie name`)               //   SHOULD BE ADDED AS  INNER HTML
    } else if (data.Error === 'Movie not found!') {
        console.log('movie not found')                          //   SHOULD BE ADDED AS  INNER HTML
    } else {

        // console.log(data)
        const movieIdArray = data.Search.map(movie => {
            return movie.imdbID
        })

        getMovie(movieIdArray)



    }

}


async function getMovie(movieIds) {
    const movieArray = []

    for (let movieId of movieIds) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}
    `)
        const data = await response.json()

        movieArray.push(data)
    }
    
    getMovieHtml(movieArray)
}


function getMovieHtml(movieArray){

    const moviesHtml = movieArray.map(movieHtml =>{
        const {Poster , Title , imdbRating , Runtime , Genre , Plot , imdbID } = movieHtml

       

        return `
        
            <div class=" flex items-start  rounded-xl">
                <img class="h-[300px]" src="${Poster}" />
                <div class='movieInfo--container'>
                    <div>
                        <h1>${Title}</h1>
                        <span><img src="" /> <p>${imdbRating}</p></span>
                    </div>
                    <div>
                        <span>${Runtime}</span>
                        <span>${Genre}</span>
                        <div>
                            <img src="" />
                            <button class="btn--watchlist" id="${imdbID}">Watchlist</button>
                        </div>
                    
                    </div>
                    <span>${Plot}</span>
                </div>


            </div>

        `
    }).join('')

    

    renderMovie(moviesHtml , movieArray)
    
}

 function renderMovie(moviesHtml , movieArray){

    

    movieContainer.innerHTML = moviesHtml
    
    transferToLocalStorage(movieArray)
    
}



function transferToLocalStorage(movieArray){
    
    
    movieContainer.addEventListener('click' , btn =>{
        // e.target.id
        const oneMovieArray = movieArray.filter(e => btn.target.id === e.imdbID)
        const movie = oneMovieArray[0]
        localstorageKey = movie.imdbID
        const data = JSON.stringify(movie)

        localStorage.setItem(localstorageKey , data)

        
        
        addToWatchlist(localstorageKey)
    })
}


export function addToWatchlist(key){
        const retrievedData = JSON.parse(localStorage.getItem(key))

        const {Poster , Title , imdbRating , Runtime , Genre , Plot , imdbID } = retrievedData

        
        return localstorageKey

}


function exportKey(){

}