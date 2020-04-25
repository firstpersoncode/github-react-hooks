import React, { FunctionComponent } from 'react'
import { CircularProgress, Box } from '@material-ui/core'
import { LoadingComponentProps } from 'react-loadable'

import FallBack from '.'

const FallBackCircularFull: FunctionComponent<LoadingComponentProps> = (props) => (
    <FallBack {...props}>
        <Box display="flex" alignItems="center" p={2} minHeight="50vh">
            <CircularProgress color="secondary" />
        </Box>
    </FallBack>
)

export default FallBackCircularFull
