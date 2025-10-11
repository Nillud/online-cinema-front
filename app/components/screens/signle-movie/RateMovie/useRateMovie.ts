import { useAuth } from "@/hooks/useAuth"
import { RatingService } from "@/services/rating.service"
import { toastError } from "@/utils/toast-error"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"

export const useRateMovie = (movieId: string) => {
    const { user } = useAuth()

    const [rating, setRating] = useState<number>(0)
    const [isSended, setIsSended] = useState<boolean>(false)

    const { refetch } = useQuery(
        ['your movie rating', movieId],
        () => RatingService.getByUserMovie(movieId),
        {
            onSuccess: ({ data }) => {
                setRating(data)
            },
            onError: (error) => toastError(error, 'Get rating'),
            enabled: !!movieId && !!user
        }
    )

    const { mutateAsync } = useMutation(
        'set rating movie',
        ({ value }: { value: number }) => RatingService.setRating(movieId, value),
        {
            onSuccess: ({ data }) => {
                setIsSended(true)
                refetch()

                setTimeout(() => {
                    setIsSended(false)
                }, 2400);
            },
            onError: (error) => toastError(error, 'Rate movie'),
        }
    )

    const handleClick = async (nextValue: number) => {
        setRating(nextValue)
        await mutateAsync({ value: nextValue })
    }

    return {
        isSended,
        rating,
        handleClick
    }
}