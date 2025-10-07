import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'
import Meta from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/form-elements/Button'
import formStyles from '@/ui/form-elements/admin-form.module.scss'

const ActorEdit: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues,
        control
    } = useForm<IActorEditInput>({
        mode: 'onChange'
    })

    const { isLoading, onSubmit } = useActorEdit(setValue)

    return (
        <Meta title='edit actor'>
            <AdminNavigation />
            <Heading title='Edit actor' />
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
                                            'name',
                                            {
                                                required: 'Name is required!'
                                            }
                                        )}
                                        placeholder='Name'
                                        error={errors.name}
                                    />

                                    <div style={{ width: '31%' }}>
                                        <SlugField
                                            register={register}
                                            error={errors.slug}
                                            generate={() => setValue('slug', generateSlug(getValues('name')))}
                                        />
                                    </div>

                                    {/* <Controller
                                    control={control}
                                    name='photo'
                                    defaultValue=''
                                    render={({
                                        field: {
                                            value,
                                            onChange
                                        },
                                        fieldState: { error }
                                    }) => (
                                        //photo upload
                                    )}
                                    rules={{
                                        required: 'Photo is required!'
                                    }}
                                /> */}
                                </div>
                                <Button>Update</Button>
                            </>
                        )
                }
            </form>
        </Meta>
    )
}

export default ActorEdit