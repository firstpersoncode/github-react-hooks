import React, { FunctionComponent, useEffect } from 'react'
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
    Chip,
    Avatar
} from '@material-ui/core'
import { ExpandMore, ChevronLeft, ChevronRight, Folder } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_REPOS_NEXT, SET_USER_REPOS_PREV, SET_USER_REPOS_PANEL } from '~/store/user'
import { SET_PROJECT_SELECTED, SET_PROJECT_CONTENTS, SET_PROJECT_LANGUAGES } from '~/store/project'

import useStyle from './style'

const Repos: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { repos, reposPanel, reposPage, reposFetch } = state.user

    const _toggleRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PANEL, payload: user.login })
    }

    useEffect(() => {
        _toggleRepos()
    }, [user])

    const _nextRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_NEXT, payload: user.login })
    }

    const _prevRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PREV, payload: user.login })
    }

    const history = useHistory()

    const _openProject = (projectName: string) => async () => {
        history.push('/project')
        await actions({ type: SET_PROJECT_SELECTED, payload: projectName })
        await actions({ type: SET_PROJECT_CONTENTS, payload: projectName })
        actions({ type: SET_PROJECT_LANGUAGES, payload: projectName })
    }

    return (
        <ExpansionPanel
            expanded={reposPanel}
            onChange={_toggleRepos}
            className={classes.root + (reposFetch ? ' loading' : '')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Box flex={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>Repositories</Typography>
                    <Avatar>{user.public_repos}</Avatar>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box style={{ flex: 1 }}>
                    {repos && repos.length ? (
                        <List component="nav">
                            {repos
                                .filter((repo: any) => !repo.private)
                                .map((repo: any) => (
                                    <>
                                        <ListItem key={repo.id} button onClick={_openProject(repo.full_name)}>
                                            <ListItemIcon>
                                                <Folder />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={repo.name}
                                                secondary={
                                                    <>
                                                        {repo.description ? <small>{repo.description}</small> : null}
                                                        <Box my={2} display="flex" alignItems="center" flexWrap="wrap">
                                                            {repo.language ? (
                                                                <Chip
                                                                    color="primary"
                                                                    size="small"
                                                                    label={<small>{repo.language}</small>}
                                                                />
                                                            ) : null}
                                                        </Box>
                                                        <small>
                                                            Last update: {new Date(repo.pushed_at).toLocaleString()}
                                                        </small>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                        </List>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <IconButton onClick={_prevRepos}>
                            <ChevronLeft />
                        </IconButton>
                        <Typography>Page {reposPage}</Typography>
                        <IconButton onClick={_nextRepos}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Repos
