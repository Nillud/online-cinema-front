import { IGenreEditInput } from "@/components/screens/admin/genre/genre-edit.interface"
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

    async getById(_id: string) {
        return axios.get<IGenreEditInput>(getGenreUrl(`/${_id}`))
    },

    async update(_id: string, data: IGenreEditInput) {
        return axios.put<string>(getGenreUrl(`/${_id}`), data)
    },

    async delete(_id: string) {
        return axios.delete<string>(getGenreUrl(`/${_id}`))
    }
}