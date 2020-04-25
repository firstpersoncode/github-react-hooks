import React, { useEffect, FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import {
    CssBaseline,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box
} from '@material-ui/core'

import routes from '~/routes'
import Header from '~/containers/Header'
import Footer from '~/containers/Footer'
import { CDN_MATERIALUI_ICONS, CDN_GOOGLE_FONT_STYLES } from '~/variables/urls'
import useStore, { SET_ERROR } from '~/store'

import useStyle from './style'

const App: FunctionComponent = () => {
    const classes = useStyle()

    const { pathname } = useLocation()
    const store = useStore()

    useEffect(() => {
        matchRoutes(routes, pathname).forEach(({ route, match }) => {
            if (route.exact && route.loadData) {
                route.loadData(store, { route, match })
            }
        })
    }, [pathname])

    const { error } = store.state

    const _closeError = () => {
        store.actions({ type: SET_ERROR, payload: {} })
    }

    // const _requestGitHubToken = async () => {
    //     try {
    //         const res = await fetch('https://github.com/login/oauth/authorize')
    //
    //         if (!res.ok) {
    //             throw await res.json()
    //         }
    //
    //         const data = await res.json()
    //         console.log(data)
    //     } catch (err) {
    //         store.actions({ type: SET_ERROR, payload: { message: err.message, statusCode: err.statusCode || 500 } })
    //     }
    // }
    //
    // useEffect(() => {
    //     _requestGitHubToken()
    // }, [])

    return (
        <>
            <Helmet>
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon-16x16.png" />

                <link rel="stylesheet" href={CDN_GOOGLE_FONT_STYLES} />
                <link rel="stylesheet" href={CDN_MATERIALUI_ICONS} />
            </Helmet>
            <CssBaseline />
            <Header />
            <Box className={classes.content}>{renderRoutes(routes)}</Box>
            <Footer />

            <Dialog maxWidth="sm" fullWidth open={Boolean(error && error.statusCode)} onClose={_closeError}>
                <DialogTitle>{error ? 'Oops.. Something went wrong' : ''}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{error ? <small>{error.message}</small> : null}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={_closeError} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default App
