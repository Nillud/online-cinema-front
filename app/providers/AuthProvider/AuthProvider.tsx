import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields> = ({
    children,
    Component: {
        isOnlyAdmin,
        isOnlyUser
    }
}) => {
    const { user } = useAuth()
    const { logout, checkAuth } = useActions()

    const { pathname } = useRouter()

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken && user) logout()
    }, [pathname])

    const Children = () => <>{children}</>

    return !isOnlyAdmin && !isOnlyUser
        ? <Children />
        : <DynamicCheckRole
            Component={{
                isOnlyAdmin,
                isOnlyUser
            }}
        >
            <Children />
        </DynamicCheckRole>
}

export default AuthProvider