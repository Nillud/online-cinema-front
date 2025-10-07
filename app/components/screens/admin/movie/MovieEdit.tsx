import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import { useAdminGenres } from './useAdminGenre'
import { useAdminActors } from './useAdminActors'
import Select from '@/components/ui/select/Select'
import dynamic from 'next/dynamic'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), { ssr: false })

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

    const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
    const { isLoading: isActorsLoading, data: actors } = useAdminActors()

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
                                    />

                                    <SlugField
                                        register={register}
                                        error={errors.slug}
                                        generate={() => setValue('slug', generateSlug(getValues('title')))}
                                    />

                                    <Field
                                        {...register(
                                            'parameters.country',
                                            {
                                                required: 'Country is required!'
                                            }
                                        )}
                                        placeholder='Country'
                                        error={errors.parameters?.country}
                                        style={{ width: '31%' }}
                                    />

                                    <Field
                                        {...register(
                                            'parameters.duration',
                                            {
                                                required: 'Duration is required!'
                                            }
                                        )}
                                        placeholder='Duration (min.)'
                                        error={errors.parameters?.duration}
                                        style={{ width: '31%' }}
                                    />

                                    <Field
                                        {...register(
                                            'parameters.year',
                                            {
                                                required: 'Year is required!'
                                            }
                                        )}
                                        placeholder='Year'
                                        error={errors.parameters?.year}
                                        style={{ width: '31%' }}
                                    />

                                    <Controller
                                        control={control}
                                        name='genres'
                                        render={({
                                            field,
                                            fieldState: { error }
                                        }) => (
                                            <DynamicSelect
                                                field={field}
                                                options={genres || []}
                                                isLoading={isGenresLoading}
                                                isMulti
                                                placeholder='Genres'
                                                error={error}
                                            />
                                        )}
                                        rules={{
                                            required: 'Please select at least one genre'
                                        }}
                                    />

                                    <Controller
                                        control={control}
                                        name='actors'
                                        render={({
                                            field,
                                            fieldState: { error }
                                        }) => (
                                            <DynamicSelect
                                                field={field}
                                                options={actors || []}
                                                isLoading={isActorsLoading}
                                                isMulti
                                                placeholder='Actors'
                                                error={error}
                                            />
                                        )}
                                        rules={{
                                            required: 'Please select at least one actor'
                                        }}
                                    />

                                    <Controller
                                        control={control}
                                        name='poster'
                                        defaultValue=''
                                        render={({
                                            field: {
                                                value,
                                                onChange
                                            },
                                            fieldState: { error }
                                        }) => (
                                            <UploadField
                                                onChange={onChange}
                                                value={value}
                                                error={error}
                                                folder='movies'
                                                placeholder='Poster'
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                        rules={{
                                            required: 'Poster is required!'
                                        }}
                                    />

                                    <Controller
                                        control={control}
                                        name='bigPoster'
                                        defaultValue=''
                                        render={({
                                            field: {
                                                value,
                                                onChange
                                            },
                                            fieldState: { error }
                                        }) => (
                                            <UploadField
                                                onChange={onChange}
                                                value={value}
                                                error={error}
                                                folder='movies'
                                                placeholder='Big poster'
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                        rules={{
                                            required: 'Big Poster is required!'
                                        }}
                                    />

                                    <Controller
                                        control={control}
                                        name='videoUrl'
                                        defaultValue=''
                                        render={({
                                            field: {
                                                value,
                                                onChange
                                            },
                                            fieldState: { error }
                                        }) => (
                                            <UploadField
                                                onChange={onChange}
                                                value={value}
                                                error={error}
                                                folder='movies'
                                                placeholder='Video'
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                        rules={{
                                            required: 'Video url is required!'
                                        }}
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