import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IMovieEditInput } from './movie-edit.interface'
import { useMovieEdit } from './useMovieEdit'
import Meta from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/form-elements/Button'
import formStyles from '@/ui/form-elements/admin-form.module.scss'

const MovieEdit: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues,
        control
    } = useForm<IMovieEditInput>({
        mode: 'onChange'
    })

    const { isLoading, onSubmit } = useMovieEdit(setValue)

    return (
        <Meta title='edit movie'>
            <AdminNavigation />
            <Heading title='Edit movie' />
            <form
                className={formStyles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    isLoading
                        ? <SkeletonLoader count={3} />
                        : (
                            <>
                                <div className={formStyles.fields}>
                                    <Field
                                        {...register(
                                            'title',
                                            {
                                                required: 'Title is required!'
                                            }
                                        )}
                                        placeholder='Title'
                                        error={errors.title}
                                        style={{ width: '31%' }}
                                    />

                                    <div style={{ width: '31%' }}>
                                        <SlugField
                                            register={register}
                                            error={errors.slug}
                                            generate={() => setValue('slug', generateSlug(getValues('title')))}
                                        />
                                    </div>

                                    <Field
                                        {...register(
                                            'poster',
                                            {
                                                required: 'Poster is required!'
                                            }
                                        )}
                                        placeholder='Poster'
                                        error={errors.poster}
                                        style={{ width: '31%' }}
                                    />

                                    <Field
                                        {...register(
                                            'bigPoster',
                                            {
                                                required: 'Big Poster is required!'
                                            }
                                        )}
                                        placeholder='Big Poster'
                                        error={errors.poster}
                                        style={{ width: '31%' }}
                                    />

                                    <Field
                                        {...register(
                                            'videoUrl',
                                            {
                                                required: 'Video Url is required!'
                                            }
                                        )}
                                        placeholder='Video Url'
                                        error={errors.poster}
                                        style={{ width: '31%' }}
                                    />
                                </div>

                                <Button>Update</Button>
                            </>
                        )
                }
            </form>
        </Meta>
    )
}

export default MovieEdit