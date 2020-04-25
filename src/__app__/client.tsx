import React, { FunctionComponent, useEffect } from 'react'
import { hydrate } from 'react-dom'
import { preloadReady } from 'react-loadable'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import App from '~/containers/App'

import { Context, useConfigStore } from '../store'

const targetDom: HTMLElement | null = document.querySelector('#root')

const render = (App: FunctionComponent): FunctionComponent => () => {
    const handleDeleteStyleSSR = () => {
        const styleSSR = document.querySelector('#style-server-side')
        if (styleSSR) {
            const parent = styleSSR.parentNode as any
            parent.removeChild(styleSSR)
        }
    }

    useEffect(() => {
        handleDeleteStyleSSR()
    }, [])

    const store = useConfigStore()

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#95a4ff'
            }
        }
    })

    return (
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <Context.Provider value={store}>
                        <App />
                    </Context.Provider>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    )
}

preloadReady()
    .then(() => {
        const Render = render(App)

        hydrate(<Render />, targetDom)

        if ((process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') && module.hot) {
            module.hot.accept('~/containers/App', () => {
                // eslint-disable-next-line global-require
                const Render = render(require('~/containers/App').default)
                hydrate(<Render />, targetDom)
            })
        }
    })
    .catch((err) => {
        /* eslint-disable-next-line no-console */
        console.log(err)
    })
