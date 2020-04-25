import React, { FunctionComponent } from 'react'
import { Box, Avatar, Typography, Chip, Button, Divider, Grid, Card } from '@material-ui/core'
import { GitHub, Language } from '@material-ui/icons'

import useStore from '~/store'
import { SET_USER_REPOS_PANEL, SET_USER_FOLLOWINGS_PANEL, SET_USER_FOLLOWERS_PANEL } from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Profile: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { selectedFetch } = state.user
    const _toggleRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PANEL, payload: user.login })
    }

    const _toggleFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PANEL, payload: user.login })
    }

    const _toggleFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PANEL, payload: user.login })
    }

    return (
        <Box my={2} className={classes.root + (selectedFetch ? ' loading' : '')}>
            <Grid container spacing={2} alignItems="center">
                <Grid item md={5} sm={12} xs={12}>
                    <ProgressiveImage
                        fallBack={user.avatar_url}
                        src={user.avatar_url}
                        render={(src: string) => <Avatar alt={user.name} src={src} className={classes.large} />}
                    />
                </Grid>
                <Grid item md={7} sm={12} xs={12}>
                    <Typography variant="h3">{user.name}</Typography>
                    <Divider />
                    <Box display="flex" alignItems="center" justifyContent="space-around" my={2}>
                        <Chip
                            color="primary"
                            onClick={_toggleRepos}
                            avatar={<Avatar>{user.public_repos}</Avatar>}
                            label="Repos"
                        />
                        <Chip
                            color="primary"
                            onClick={_toggleFollowings}
                            avatar={<Avatar>{user.following}</Avatar>}
                            label="Following"
                        />
                        <Chip
                            color="primary"
                            onClick={_toggleFollowers}
                            avatar={<Avatar>{user.followers}</Avatar>}
                            label="Followers"
                        />
                    </Box>
                    <Card>
                        <Box p={2}>
                            <Button
                                size="small"
                                component="a"
                                href={user.html_url}
                                startIcon={<GitHub />}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Typography style={{ textTransform: 'lowercase' }}>@{user.login}</Typography>
                            </Button>
                            {user.blog ? (
                                <Button
                                    size="small"
                                    component="a"
                                    href={user.blog}
                                    startIcon={<Language />}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Typography style={{ textTransform: 'lowercase' }}>Site</Typography>
                                </Button>
                            ) : null}
                            {user.location ? <Typography>Location: {user.location}</Typography> : null}
                            {user.company ? <Typography>Company: {user.company}</Typography> : null}
                            <Box my={2}>
                                <Typography variant="body2">{user.bio}</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Profile
