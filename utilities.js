function getLocalStorage(){
    const localMovieArray = []
    for(let i=0 ; i < localStorage.length ; i++){
        const localMovie  = JSON.parse(localStorage.getItem(localStorage.key(i)))
        localMovieArray.unshift(localMovie)
    }

    return localMovieArray
}

export {getLocalStorage}