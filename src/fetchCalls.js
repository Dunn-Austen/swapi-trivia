export const retrieveAllMovies = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(movies => movies.results)
        .catch(error => console.log(error))
}



export const retrieveAllCharacters = (characters) => {
    const characterInfo = characters.map(character => {
        return getCharacterData(character)
            .then(character => ({
                name: character[0],
                homeWorld: character[1].home,
                population: character[1].population,
                species: character[2].species,
                relatedFilms:character[3]
            }))
    })
    return Promise.all(characterInfo)
}
    
const getCharacterData = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(character => {
            const { name } = character;
            const homeWorld = getHomeWorld(character.homeworld);
            const species = getSpecies(character.species);
            const films = getrelatedFilms(character.films)
                return Promise.all([name, homeWorld, species, films])
        })
}

const getHomeWorld = (homeworldUrl) => {
    return fetch(homeworldUrl)
        .then(response => response.json())
        .then(data => {
            return ({
                home: data.name,
                population: data.population
            })
        })
}
    

const getSpecies = (speciesUrl) => {
    return fetch(speciesUrl)
        .then(response => response.json())
        .then(data =>   {
            return ({
                species: data.name,
            })
        })
}

const getrelatedFilms = (films) => {
    const filmData = films.map(film => {
        return getFilmName(film)
        .then(film => film)
    })
    return Promise.all(filmData)
}

const getFilmName = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.title)
}