import React, { FunctionComponent } from 'react'
import { Container, Typography, Box } from '@material-ui/core'

import useStyle from './style'

const Footer: FunctionComponent = () => {
    const classes = useStyle()
    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Box p={2} textAlign="right">
                    <Typography>
                        &copy; Copyright 2020{' '}
                        <a
                            style={{ color: 'white' }}
                            href="https://github.com/firstpersoncode"
                            target="_blank"
                            rel="noopener noreferrer">
                            @firstpersoncode
                        </a>
                    </Typography>
                </Box>
            </Container>
        </footer>
    )
}

export default Footer
