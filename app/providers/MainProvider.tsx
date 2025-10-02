import Layout from "@/components/layout/Layout"
import { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import ReduxToast from "./ReduxToast"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import HeadProvider from "./HeadProvider/HeadProvider"
import AuthProvider from "./AuthProvider/AuthProvider"
import { TypeComponentAuthFields } from "@/shared/types/auth.types"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const MainProvider: FC<TypeComponentAuthFields> = ({
    children,
    Component
}) => {
    return (
        <HeadProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ReduxToast />
                    <AuthProvider Component={Component} />
                    <Layout>{children}</Layout>
                </QueryClientProvider>
            </Provider>
        </HeadProvider>
    )
}

export default MainProvider