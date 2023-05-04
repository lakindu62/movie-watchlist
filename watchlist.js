import Movie from "./movie.js";

const container = document.getElementById('movieWatchlist--container')

let movies = []    //needed for function renderLocalMovies

function renderLocalMovies() {
    let moviesHtml = []
    for (let i = 0; i < localStorage.length; i++) {
        const movieData = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const movie = new Movie(movieData, true)
        movies.push(movie)
        moviesHtml.unshift(movie.getHtml())
    }

    if(moviesHtml.length < 1){
        container.innerHTML = ` <div>
                                    <h1 style="color:#413b3b; font-weight:bold;" class="text-[#413b3b]">Your watchlist is looking a little empty...</h1>
                                    <a style="color:#FFFFFF; display:flex; gap:5px; justify-content:center; "   href="index.html"><img src="/public/add.svg"/> Let’s add some movies!</a>
                                </div>`
    }else{
    container.innerHTML = moviesHtml.join('')

    }
}






container.addEventListener("click", removeItem)


function removeItem(btn) {
    const movie = movies.filter(e => btn.target.id === e.imdbID)
    localStorage.removeItem(`${movie[0].imdbID}`)
    renderLocalMovies()
}



renderLocalMovies()