import { IGenre } from "@/shared/types/movie.types"
import axios, { axiosClassic } from "api/interceptors"
import { getGenresUrl } from "config/api.config"
import { getGenreUrl } from "config/url.config"

export const GenreService = {
    async getAll(searchTerm?: string) {
        return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
            params: searchTerm
                ? { searchTerm }
                : {}
        })
    },

    async getPopularGenres() {
        return axiosClassic.get<IGenre[]>(getGenresUrl('/popular'), {})
    },

    async deleteGenre(_id: string) {
        return axios.delete<string>(getGenreUrl(`/${_id}`))
    }
}