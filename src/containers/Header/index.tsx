import React, { FunctionComponent } from 'react'
import { Container, Button, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

import SearchProfile from '~/components/SearchProfile'

import useStyle from './style'

const Header: FunctionComponent = () => {
    const classes = useStyle()
    return (
        <header className={classes.root}>
            <Container maxWidth="lg">
                <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
                    <Button component={Link} to="/">
                        Profile
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/project">
                        Project
                    </Button>
                </Box>
                <SearchProfile />
            </Container>
        </header>
    )
}

export default Header
