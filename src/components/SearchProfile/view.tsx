import React, { FunctionComponent, useState } from 'react'
import {
    TextField,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    DialogActions,
    Button,
    Box,
    Typography,
    Avatar,
    LinearProgress
} from '@material-ui/core'
import { Search, ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT, SET_USER_QUERY, SET_USER_QUERY_PREV } from '~/store/user'
import {
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    SET_PROJECT_QUERY,
    SET_PROJECT_QUERY_PREV
} from '~/store/project'
import { PATH_PROJECT } from '~/variables/urls'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const SearchProfile: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()
    const [search, setSearch] = useState('')
    const [showQueryResult, setShowQueryResult] = useState(false)

    const _setSearch = (e: any) => {
        const { value } = e.target
        setSearch(value)
    }
    const location = useLocation()
    const isProject = PATH_PROJECT === location.pathname || PATH_PROJECT === location.pathname + '/'
    const { query: userQuery, queryPage: userQueryPage, queryFetch: userQueryFetch } = state.user
    const { query: projectQuery, queryPage: projectQueryPage, queryFetch: projectQueryFetch } = state.project

    const _submit = async (e: any) => {
        e.preventDefault()

        if (isProject) {
            await actions({ type: SET_PROJECT_QUERY, payload: search })
            setShowQueryResult(true)
        } else {
            await actions({ type: SET_USER_QUERY, payload: search })
            setShowQueryResult(true)
        }
    }

    const _closeQuery = () => {
        setShowQueryResult(false)
    }

    const _nextQuery = () => {
        if (isProject) {
            actions({ type: SET_PROJECT_QUERY, payload: search })
        } else {
            actions({ type: SET_USER_QUERY, payload: search })
        }
    }

    const _prevQuery = () => {
        if (isProject) {
            actions({ type: SET_PROJECT_QUERY_PREV, payload: search })
        } else {
            actions({ type: SET_USER_QUERY_PREV, payload: search })
        }
    }

    const _openProfile = (selected: string) => async () => {
        _closeQuery()
        if (isProject) {
            await actions({ type: SET_PROJECT_SELECTED, payload: selected })
            await actions({ type: SET_PROJECT_CONTENTS, payload: selected })
            actions({ type: SET_PROJECT_LANGUAGES, payload: selected })
        } else {
            await actions({ type: SET_USER_SELECTED, payload: selected })
            actions({ type: SET_USER_EVENTS_NEXT, payload: selected })
        }
    }

    const query = isProject ? projectQuery : userQuery
    const queryPage = isProject ? projectQueryPage : userQueryPage
    const queryFetch = isProject ? projectQueryFetch : userQueryFetch

    return (
        <form onSubmit={_submit}>
            <TextField
                fullWidth
                label="search"
                variant="outlined"
                style={{ flex: 1 }}
                placeholder={isProject ? 'GitHub Repository name' : 'GitHub User name'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton color="primary" type="submit" onClick={_submit}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                value={search}
                onChange={_setSearch}
            />

            {queryFetch ? <LinearProgress /> : null}

            <Dialog
                maxWidth="lg"
                fullWidth
                open={showQueryResult}
                onClose={_closeQuery}
                className={classes.root + (queryFetch ? ' loading' : '')}>
                <DialogTitle style={{ backgroundColor: '#000' }}>Search result for: {search}</DialogTitle>
                <DialogContent style={{ backgroundColor: '#000' }}>
                    <Grid container spacing={2}>
                        {query.length
                            ? query.map((q) => (
                                  <Grid item xs={3}>
                                      <Button
                                          onClick={_openProfile(q.login || q.full_name)}
                                          fullWidth
                                          variant="contained"
                                          startIcon={
                                              <ProgressiveImage
                                                  fallBack={q.avatar_url || q.owner.avatar_url}
                                                  src={q.avatar_url || q.owner.avatar_url}
                                                  render={(src: string) => <Avatar alt={q.login || q.name} src={src} />}
                                              />
                                          }>
                                          <Typography style={{ textTransform: 'none' }}>{q.login || q.name}</Typography>
                                      </Button>
                                  </Grid>
                              ))
                            : null}
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <IconButton onClick={_prevQuery}>
                            <ChevronLeft />
                        </IconButton>
                        <Typography>Page {queryPage}</Typography>
                        <IconButton onClick={_nextQuery}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </DialogContent>
                <DialogActions style={{ backgroundColor: '#000' }}>
                    <Button onClick={_closeQuery} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export default SearchProfile
