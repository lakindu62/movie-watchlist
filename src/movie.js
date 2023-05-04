// } "<img src='/public/add.svg' /> Add to Watchlist"     "<img src='/public/remove.svg' /> Remove" }

class Movie{

    constructor(data , isFromLocalStorage = false){
        Object.assign(this , data)
        this.isFromLocalStorage = isFromLocalStorage
        this.added = false
        this.inLocalStorage = false
    }

    getHtml(){
        const {Poster,Title,imdbRating,Runtime,Genre,imdbID,Plot , isFromLocalStorage , added , inLocalStorage} = this;
        return`
                <div class=" movie flex items-start  rounded-xl mb-5 mt-10">
                        <img class="h-[300px] w-[202px] object-cover m-auto relative left-0 right-0 " src="${Poster}" />
                        <div class='movieInfo--container ml-10 flex flex-col justify-center h-[100%] '>
                            <div class="flex  justify-between mb-5">
                                <h1 class="text-2xl  font-bold">${Title}</h1>
                                <span class="flex gap-2"><img src="/public/star.svg" /> <p>${imdbRating}</p></span>
                            </div>
                            <div class="flex justify-between mb-5">
                                <div>
                                    <span class=" text-base">${Runtime}</span>
                                    <span class="ml-5 text-base">${Genre}</span>
                                </div>
                                <div class="ml-10 flex justify-between">
                                    
                                    <button  
                                    
                                    ${isFromLocalStorage ? "data-inLocal ='TRUE' " :"data-inLocal ='false'"}
                                    class="btn--watchlist flex items-center gap-2" 
                                    id="${imdbID}"
                                    
                                        >
                                        
                                        ${inLocalStorage || isFromLocalStorage ? "<img src='/public/remove.svg' /> Remove" 
                                        : "<img src='/public/add.svg' /> Watchlist" }
                                        
                                    
                                    </button>
                                </div>
                            
                            </div>
                            <span class="text-[#A5A5A5]">${Plot}</span>
                        </div>


                    </div>
                    <hr />
        `
    }




}




export default Movie