import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import Statistics from './statistics/Statistics'
import Heading from '@/components/ui/heading/Heading'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'

const Admin: FC = () => {
  return (
    <Meta title='Admin panel'>
        <AdminNavigation />
        <Heading title='Some statistics' />
        <Statistics />
    </Meta>
  )
}

export default Admin