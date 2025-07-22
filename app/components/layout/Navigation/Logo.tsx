import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

import LogoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
    return (
        <Link href={'/'}>
            <a href="" className={'px-layout mb-10 block'}>
                <Image
                    src={LogoImage}
                    alt="logo"
                    width={34}
                    height={34}
                    draggable={false}
                />
            </a>
        </Link>
    )
}

export default Logo