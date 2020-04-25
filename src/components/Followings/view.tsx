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
    SET_USER_FOLLOWINGS_NEXT,
    SET_USER_FOLLOWINGS_PREV,
    SET_USER_FOLLOWINGS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Followings: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followings, followingsPanel, followingsPage, followingsFetch } = state.user

    const _toggleFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PANEL, payload: user.login })
    }

    const _nextFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_NEXT, payload: user.login })
    }

    const _prevFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PREV, payload: user.login })
    }

    const _openProfile = (userName: string) => async () => {
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <ExpansionPanel
            expanded={followingsPanel}
            onChange={_toggleFollowings}
            className={classes.root + (followingsFetch ? ' loading' : '')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Box flex={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>Followings</Typography>
                    <Avatar>{user.following}</Avatar>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box style={{ flex: 1 }}>
                    {followings && followings.length ? (
                        <List component="nav">
                            {followings
                                .filter((following: any) => !following.private)
                                .map((following: any) => (
                                    <>
                                        <ListItem key={following.id} button onClick={_openProfile(following.login)}>
                                            <ListItemIcon>
                                                <ProgressiveImage
                                                    fallBack={following.avatar_url}
                                                    src={following.avatar_url}
                                                    render={(src: string) => <Avatar alt={following.login} src={src} />}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={following.login} />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                        </List>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <IconButton onClick={_prevFollowings}>
                            <ChevronLeft />
                        </IconButton>
                        <Typography>Page {followingsPage}</Typography>
                        <IconButton onClick={_nextFollowings}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Followings
