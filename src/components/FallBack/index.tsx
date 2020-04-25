import React, { FunctionComponent, ReactNode } from 'react'
import { Button } from '@material-ui/core'

import FallBackCircular from './FallBackCircular'
import FallBackCircularBlack from './FallBackCircularBlack'
import FallBackCircularFull from './FallBackCircularFull'
import FallBackCircularOverlay from './FallBackCircularOverlay'
import FallBackNull from './FallBackNull'
import FallBackLinear from './FallBackLinear'
import FallBackPage from './FallBackPage'

interface IFallBackProps {
    error: boolean
    retry: any
    children: ReactNode
}

const FallBack: FunctionComponent<IFallBackProps> = ({ error, retry, children }) => {
    if (error) {
        // When the loader has errored
        return (
            <Button fullWidth variant="contained" color="secondary" onClick={retry}>
                Terjadi kesalahan, coba lagi.
            </Button>
        )
    }

    return <>{children}</>
}

export {
    FallBackCircular,
    FallBackCircularBlack,
    FallBackCircularFull,
    FallBackCircularOverlay,
    FallBackLinear,
    FallBackPage,
    FallBackNull
}

export default FallBack
