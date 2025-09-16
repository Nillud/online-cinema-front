import type { AppProps } from 'next/app'

import '@/assets/styles/globals.scss'
import MainProvider from 'providers/MainProvider'

type TypeAppProps = AppProps

const MyApp = ({ Component, pageProps }: TypeAppProps) => {
	return (
		<MainProvider>
				<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
