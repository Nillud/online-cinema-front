import { FC } from 'react'
import styles from './AdminNavigation.module.scss'
import { INavItem } from './admin-navigation.interface'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

const AdminNavItem: FC<{ item: INavItem }> = ({
    item: {
        title,
        link
    }
}) => {
    const { asPath } = useRouter()
    return (
        <li>
            <Link href={link}>
                <a
                    href={link}
                    className={cn({
                        [styles.active]: asPath === link
                    })}
                >
                    {title}
                </a>
            </Link>
        </li>
    )
}

export default AdminNavItem