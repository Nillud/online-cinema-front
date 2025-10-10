import { useFavorites } from "@/components/screens/favorites/useFavorites"
import { useAuth } from "@/hooks/useAuth"
import { FC } from "react"
import NotAuthFavorites from "./NotAuthFavorites"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
import MovieList from "../MovieList"

const FavoriteMovies: FC = () => {
  const { favoriteMovies, isLoading } = useFavorites()
  const { user } = useAuth()

  if (!user) return <NotAuthFavorites />

  return isLoading
    ? (
      <SkeletonLoader count={3} className="h-28 mb-4" />
    )
    : (
      <MovieList
        link="/favorites"
        movies={favoriteMovies?.slice(0, 3) || []}
        title="Popular Movies"
      />
    )
}

export default FavoriteMovies