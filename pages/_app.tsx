import type { AppProps } from 'next/app'

import '../app/assets/styles/globals.scss'

type TypeAppProps = AppProps

const MyApp = ({ Component, pageProps }: TypeAppProps) => {
	return (
		<Component {...pageProps} />
	)
}

export default MyApp
