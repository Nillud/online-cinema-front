import { FC } from 'react'
import styles from './AuthPlaceholder.module.scss'
import Link from 'next/link'
import { getMovieUrl } from 'config/url.config'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
    return (
        <Link href={`/auth?redirect=${getMovieUrl(slug)}`}>
            <a className={styles.btn}>Sign in</a>
        </Link>
    )
}

export default AuthButton