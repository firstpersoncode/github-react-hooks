import React, { FunctionComponent } from 'react'
import { CircularProgress, Box } from '@material-ui/core'
import { LoadingComponentProps } from 'react-loadable'

import FallBack from '.'

const FallBackPage: FunctionComponent<LoadingComponentProps> = (props) => (
    <FallBack {...props}>
        <Box p={2} minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    </FallBack>
)

export default FallBackPage
