import * as MaterialIcons from 'react-icons/md'

import { TypeMaterialIconName } from "@/shared/types/icons.types"
import { FC } from "react"
import { useRenderClient } from '@/hooks/useRenderClient'

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
    const { isRenderClient } = useRenderClient()

    const IconComponent = MaterialIcons[name]

    if (isRenderClient) return <IconComponent />
    else return null
}

export default MaterialIcon