import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Grid, Box, Divider, LinearProgress } from '@material-ui/core'

import useStore from '~/store'
import Profile from '~/components/Profile'
import Events from '~/components/Events'
import Repos from '~/components/Repos'
import Followings from '~/components/Followings'
import Followers from '~/components/Followers'

const Home: FunctionComponent = () => {
    const { state } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { selectedFetch } = state.user

    return (
        <>
            <Helmet>
                <title>GitHub React Hooks</title>
                <meta name="title" content="GitHub React Hooks" />
                <meta
                    name="description"
                    content="GitHub page with user search and repository search, build using React"
                />
            </Helmet>

            <Box py={2}>
                <Container maxWidth="lg">
                    {user ? (
                        <Grid container spacing={2} alignItems="stretch">
                            <Grid item md={7} sm={12} xs={12}>
                                <Profile />
                                <Divider />
                                <Events />
                            </Grid>

                            <Grid item md={5} sm={12} xs={12}>
                                <Followings />
                                <Divider />
                                <Followers />
                                <Divider />
                                <Repos />
                            </Grid>
                        </Grid>
                    ) : selectedFetch ? (
                        <LinearProgress />
                    ) : null}
                </Container>
            </Box>
        </>
    )
}

export default Home
