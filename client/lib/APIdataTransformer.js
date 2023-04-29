const mockData = require("./mockData.json")

function transformAPIData(APIData) {
    const newData = {
        title: APIData.original_title,
        movieId: APIData.id,
        releaseYear: APIData.release_date,
        runtime: APIData.runtime,
        imageURL:`https://image.tmdb.org/t/p/w500${APIData.poster_path}`,
        synopsis: APIData.overview,
    }
    return newData
}
console.log(transformAPIData(mockData))
