import React, { FunctionComponent } from 'react'
import { LinearProgress, Box } from '@material-ui/core'
import { LoadingComponentProps } from 'react-loadable'

import FallBack from '.'

const FallBackLinear: FunctionComponent<LoadingComponentProps> = (props) => (
    <FallBack {...props}>
        <Box p={2}>
            <LinearProgress />
        </Box>
    </FallBack>
)

export default FallBackLinear
