import { FC } from "react"
import { IHeading } from "./heading.types"

const Heading: FC<IHeading> = ({ title, className }) => {
    return (
        <h1 className={`text-white text-opacity-80 font-semibold ${className?.includes('xl') ? '' : 'text-3xl'} ${className}`}>
            {title}
        </h1>
    )
}

export default Heading