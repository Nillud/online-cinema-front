import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { useDebounce } from "@/hooks/useDebounce"
import { ActorService } from "@/services/actor.service"
import { toastError } from "@/utils/toast-error"
import { getAdminUrl } from "config/url.config"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useActors = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    const queryData = useQuery(
        ['actors list', debouncedSearch],
        () => ActorService.getAll(debouncedSearch),
        {
            select: ({ data }) =>
                data.map(
                    (actor): ITableItem => ({
                        _id: actor._id,
                        editUrl: getAdminUrl(`actor/edit/${actor._id}`),
                        items: [actor.name, actor.slug, String(actor.countMovies)]
                    })
                ),
            onError: (error) => toastError(error, 'Actor list')
        }
    )

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { mutateAsync: deleteAsync } = useMutation(
        'delete actor',
        (actorId: string) => ActorService.deleteActor(actorId),
        {
            onError: (error) => toastError(error, 'Delete actor'),
            onSuccess: () => {
                toastr.success('delete was successful', 'Delete actor')
                queryData.refetch()
            }
        }
    )

    return useMemo(() => ({
        handleSearch, ...queryData, searchTerm, deleteAsync
    }), [queryData, searchTerm, deleteAsync])
}