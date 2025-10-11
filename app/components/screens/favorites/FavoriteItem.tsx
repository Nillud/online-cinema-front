import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Favorites.module.scss'
import FavoriteButton from '../signle-movie/FavoriteButton/FavoriteButton'
import { IMovie } from '@/shared/types/movie.types'
import { getMovieUrl } from 'config/url.config'
import { useAuth } from '@/hooks/useAuth'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth()

	return (
		<div className={styles.itemWrapper}>
			{user && <FavoriteButton movieId={movie._id} />}
			<Link href={getMovieUrl(movie.slug)}>
				<a className={styles.item}>
					<Image
						alt={movie.title}
						src={movie.bigPoster}
						layout="fill"
						draggable={false}
						priority
					/>

					<div className={styles.title}>{movie.title}</div>
				</a>
			</Link>
		</div>
	)
}

export default FavoriteItem
