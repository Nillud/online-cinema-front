import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useActors } from './useActors'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

const ActorList: FC = () => {
    const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useActors()

    return (
        <Meta title='Actors'>
            <AdminNavigation />
            <Heading title='Actors' />

            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
            />
            <AdminTable
                isLoading={isLoading}
                removeHandler={deleteAsync}
                headerItems={['Name', 'Slug', 'Count movies']}
                tableItems={data || []}
            />
        </Meta>
    )
}

export default ActorList