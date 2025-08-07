import { FC } from "react"
import { IMovieList } from "./movie-list.interface"

import styles from './MovieList.module.scss'
import Link from "next/link"
import MovieItem from "./MovieItem"

const MovieList: FC<IMovieList> = ({
  title,
  link,
  movies
}) => {
  return (
    <div className={styles.list}>
      <div className={styles.heading}>
        {title}
      </div>

      {movies.map(movie => <MovieItem key={movie._id} movie={movie} />)}

      <Link href={link}>
        <a className={styles.button} href={link}>See more</a>
      </Link>
    </div>
  )
}

export default MovieList