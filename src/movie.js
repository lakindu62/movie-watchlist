

class Movie{

    constructor(data){
        Object.assign(data , this)
    }

    getHtml(){
        const {Poster,Title,imdbRating,Runtime,Genre,imdbID,Plot} = this;
        return`
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
    }


}




export default Movie