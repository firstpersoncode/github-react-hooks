import React, { FunctionComponent } from 'react'
import { CircularProgress, useTheme, Box } from '@material-ui/core'
import { LoadingComponentProps } from 'react-loadable'

import FallBack from '.'

const FallBackCircularOverlay: FunctionComponent<LoadingComponentProps> = (props) => {
    const theme = useTheme()
    return (
        <FallBack {...props}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgcolor="rgba(0,0,0,0.7)"
                zIndex={theme.zIndex.appBar + 10}
                style={{
                    pointerEvents: 'none'
                }}>
                <CircularProgress />
            </Box>
        </FallBack>
    )
}

export default FallBackCircularOverlay
