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

    container.innerHTML = moviesHtml.join('')
}






container.addEventListener("click", removeItem)


function removeItem(btn) {
    const movie = movies.filter(e => btn.target.id === e.imdbID)
    localStorage.removeItem(`${movie[0].imdbID}`)
    renderLocalMovies()
}



renderLocalMovies()