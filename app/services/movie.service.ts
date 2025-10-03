import { IMovie } from "@/shared/types/movie.types"
import axios, { axiosClassic } from "api/interceptors"
import { getMoviesUrl } from "config/api.config"
import { getMovieUrl } from "config/url.config"

export const MovieService = {
    async getAll(searchTerm?: string) {
        return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
            params: searchTerm
                ? { searchTerm }
                : {}
        })
    },

    async getMostPopularMovies() {
        const { data: movies } = await axiosClassic.get<IMovie[]>(getMoviesUrl('/most-popular'))

        return movies
    },

    async deleteMovie(_id: string) {
        return axios.delete<string>(getMovieUrl(`/${_id}`))
    }
}