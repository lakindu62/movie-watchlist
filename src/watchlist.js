// import {addToWatchlist} from './index.js'

let movies = []
for (let i = 0; i < localStorage.length; i++) {
    const movie = JSON.parse(localStorage.getItem(localStorage.key(i)));
    // Do something with the movie object, e.g., render it to the DOM
    movies.push(movie);
}

console.log(movies)




function getMoviewatchlistHtml() {
    movies = []
    for (let i = 0; i < localStorage.length; i++) {
        const movie = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // Do something with the movie object, e.g., render it to the DOM
        movies.push(movie);
    }

    const movieHtml = movies.reverse().map(movie => {


        const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = movie



        return `    <div class=" flex items-start  rounded-xl">
                        <img class="h-[300px]" src="${Poster}" />
                        <div class='movieInfo--container px-5'>
                            <div class="flex justify-between">
                                <h1>${Title}</h1>
                                <span><img src="" /> <p>${imdbRating}</p></span>
                            </div>
                            <div>
                                <span>${Runtime}</span>
                                <span>${Genre}</span>
                                <div>
                                    <img src="" />
                                    <button id="${imdbID}">remove</button>
                                </div>
                            
                            </div>
                            <span>${Plot}</span>
                        </div>
                    </div>`
    }).join('')

    renderMovies(movieHtml)
}

function renderMovies(html){
    const container = document.getElementById('movieWatchlist--container')
    container.innerHTML = html


    container.addEventListener('click', btn =>{
        console.log(btn.target.id)
        localStorage.removeItem(btn.target.id)
        getMoviewatchlistHtml()
    })
}







getMoviewatchlistHtml()