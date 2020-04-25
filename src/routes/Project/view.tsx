import React, { FunctionComponent, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Box, LinearProgress, Chip, Typography, Avatar, Card, Button } from '@material-ui/core'
import { GitHub, ChevronLeft } from '@material-ui/icons'
import { useHistory, Link } from 'react-router-dom'
import marked from 'marked'

import useStore, { SET_ERROR } from '~/store'
import ProgressiveImage from '~/components/ProgressiveImage'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT } from '~/store/user'
import { PATH_ROOT } from '~/variables/urls'

import useStyle from './style'

const Project: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const project =
        state.project && state.project.selected && Object.keys(state.project.selected).length && state.project.selected
    const { selectedFetch, contents, contentsFetch, languages, languagesFetch } = state.project

    const [markdown, setMarkdown] = useState('')
    const _fetchMarkdown = async () => {
        setMarkdown('')
        const md = contents.find((content) => content.name.toLowerCase() === 'readme.md')
        if (md) {
            try {
                const rawmd = await fetch(md.download_url)
                if (!rawmd.ok) {
                    throw await rawmd.json()
                }

                const result = await rawmd.text()

                setMarkdown(marked(result))
            } catch (err) {
                actions({
                    type: SET_ERROR,
                    payload: {
                        message:
                            "Failed to load the README.md file. The project probably doesn't have the README.md file or try to check your connection.",
                        statusCode: err.statusCode || 500
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (!contents.length) {
            return
        }

        _fetchMarkdown()
    }, [contents])

    const history = useHistory()
    const _openProfile = (userName: string) => async () => {
        history.push('/')
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }
    return (
        <>
            <Helmet>
                <title>GitHub React Hooks | Project</title>
                <meta name="title" content="GitHub React Hooks | Project" />
                <meta
                    name="description"
                    content="GitHub page with user search and repository search, build using React"
                />
            </Helmet>

            <Box py={2}>
                <Container maxWidth="lg">
                    {project ? (
                        <Box className={classes.root + (selectedFetch ? ' loading' : '')}>
                            <Box my={2}>
                                <Typography variant="h3">{project.name}</Typography>
                            </Box>
                            <Card>
                                <Box p={2}>
                                    <Button
                                        onClick={_openProfile(project.owner.login)}
                                        startIcon={
                                            <ProgressiveImage
                                                fallBack={project.owner.avatar_url}
                                                src={project.owner.avatar_url}
                                                render={(src: string) => <Avatar alt={project.owner.login} src={src} />}
                                            />
                                        }>
                                        <Typography style={{ textTransform: 'lowercase' }}>
                                            @{project.owner.login}
                                        </Typography>
                                    </Button>
                                    <Button
                                        size="small"
                                        component="a"
                                        href={project.html_url}
                                        startIcon={<GitHub />}
                                        target="_blank">
                                        <Typography style={{ textTransform: 'lowercase' }}>
                                            @{project.full_name}
                                        </Typography>
                                    </Button>

                                    <Box my={2}>
                                        <Typography variant="body2">{project.description}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        {Object.keys(languages).length ? (
                                            Object.keys(languages).map((lang) => <Chip color="primary" label={lang} />)
                                        ) : languagesFetch ? (
                                            <LinearProgress />
                                        ) : null}
                                    </Box>
                                    <Box textAlign="right">
                                        <small>Created: {new Date(project.created_at).toLocaleString()}</small> |{' '}
                                        <small>Updated: {new Date(project.updated_at).toLocaleString()}</small> |{' '}
                                        <small>Pushed: {new Date(project.pushed_at).toLocaleString()}</small>
                                    </Box>
                                </Box>
                            </Card>
                            <Box mt={2} p={2} border={1}>
                                {contentsFetch ? (
                                    <LinearProgress />
                                ) : markdown ? (
                                    <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
                                ) : (
                                    'No README.md file was found in this project'
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Box textAlign="center">
                            <Typography>Try search project using the search top bar, or</Typography>{' '}
                            <Button size="small" component={Link} to={PATH_ROOT} startIcon={<ChevronLeft />}>
                                <Typography style={{ textTransform: 'lowercase' }}>
                                    Go back to profile search
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    )
}

export default Project
