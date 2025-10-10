import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IProfileInput } from "./profile.interface"
import { useMutation, useQuery } from "react-query"
import { UserService } from "@/services/user.service"
import { toastError } from "@/utils/toast-error"
import { toastr } from "react-redux-toastr"

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
    const { isLoading } = useQuery(
        ['profile'],
        () => UserService.getProfile(),
        {
            onSuccess: ({ data }) => setValue('email', data.email),
            onError: (error) => toastError(error, 'Get profile')
        }
    )

    const { mutateAsync } = useMutation(
        'update user',
        (data: IProfileInput) => UserService.updateProfile(data),
        {
            onSuccess: ({ data }) => {
                toastr.success('Update profile', 'update was successful')
            },
            onError: (error) => toastError(error, 'Update profile'),
        }
    )

    const onSubmit: SubmitHandler<IProfileInput> = async (data) => await mutateAsync(data)

    return { onSubmit, isLoading }
}