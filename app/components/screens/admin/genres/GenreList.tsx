import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useGenres } from './useGenres'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

const GenreList: FC = () => {
    const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useGenres()

    return (
        <Meta title='Genres'>
            <AdminNavigation />
            <Heading title='Genres' />

            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
            />
            <AdminTable
                isLoading={isLoading}
                removeHandler={deleteAsync}
                headerItems={['Name', 'Slug']}
                tableItems={data || []}
            />
        </Meta>
    )
}

export default GenreList