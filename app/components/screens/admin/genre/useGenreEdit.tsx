import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IGenreEditInput } from "./genre-edit.interface";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { GenreService } from "@/services/genre.service";
import { toastError } from "@/utils/toast-error";
import { getKeys } from "@/utils/object/get-keys";
import { toastr } from "react-redux-toastr";
import { getAdminUrl } from "config/url.config";

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
    const { push, query } = useRouter()

    const genreId = String(query.id)

    const { isLoading } = useQuery(
        ['genre', genreId],
        () => GenreService.getById(genreId),
        {
            onSuccess: ({ data }) => getKeys(data).forEach(key => setValue(key, data[key])),
            onError: (error) => toastError(error, 'Get genre'),
            enabled: !!query.id
        }
    )

    const { mutateAsync } = useMutation(
        'update genre',
        (data: IGenreEditInput) => GenreService.update(genreId, data),
        {
            onSuccess: ({ data }) => {
                toastr.success('Update genre', 'update was successful')
                push(getAdminUrl('genres'))
            },
            onError: (error) => toastError(error, 'Update genre'),
        }
    )

    const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => await mutateAsync(data)

    return { onSubmit, isLoading }
}