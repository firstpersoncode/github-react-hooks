import React, { FunctionComponent } from 'react'
import {
    Box,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar
} from '@material-ui/core'
import { ExpandMore, ChevronLeft, ChevronRight } from '@material-ui/icons'

import useStore from '~/store'
import {
    SET_USER_FOLLOWERS_NEXT,
    SET_USER_FOLLOWERS_PREV,
    SET_USER_FOLLOWERS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Followers: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followers, followersPanel, followersPage, followersFetch } = state.user

    const _toggleFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PANEL, payload: user.login })
    }

    const _nextFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_NEXT, payload: user.login })
    }

    const _prevFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PREV, payload: user.login })
    }

    const _openProfile = (userName: string) => async () => {
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <ExpansionPanel
            expanded={followersPanel}
            onChange={_toggleFollowers}
            className={classes.root + (followersFetch ? ' loading' : '')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Box flex={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>Followers</Typography>
                    <Avatar>{user.followers}</Avatar>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box style={{ flex: 1 }}>
                    {followers && followers.length ? (
                        <List component="nav">
                            {followers
                                .filter((follower: any) => !follower.private)
                                .map((follower: any) => (
                                    <>
                                        <ListItem key={follower.id} button onClick={_openProfile(follower.login)}>
                                            <ListItemIcon>
                                                <ProgressiveImage
                                                    fallBack={follower.avatar_url}
                                                    src={follower.avatar_url}
                                                    render={(src: string) => <Avatar alt={follower.login} src={src} />}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={follower.login} />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                        </List>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <IconButton onClick={_prevFollowers}>
                            <ChevronLeft />
                        </IconButton>
                        <Typography>Page {followersPage}</Typography>
                        <IconButton onClick={_nextFollowers}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Followers
