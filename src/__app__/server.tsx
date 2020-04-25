import React, { FunctionComponent } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable-ssr-addon'
import { StaticRouter } from 'react-router'
import server from '__core__/server'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheets, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import App from '~/containers/App'
import { PATH_ROOT } from '~/variables/urls'
import routes from '~/routes'
import { extractHostName } from '~/utils/string'
import { Context, useConfigStore } from '~/store'

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const manifest = require('../../dist/react-loadable-ssr-addon.json')

const sheets = new ServerStyleSheets()
const modules = new Set()

const ContextProvider: FunctionComponent = ({ children }) => {
    const store = useConfigStore()
    return <Context.Provider value={store}>{children}</Context.Provider>
}

const app = server({
    routes,
    rootPath: PATH_ROOT,
    render: async (expressCtx) => {
        const { req } = expressCtx

        const routeCtx: any = { status: null, url: null }
        const helmetCtx: any = { helmet: {} }

        const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)])

        const { helmet } = helmetCtx

        const darkTheme = createMuiTheme({
            palette: {
                type: 'dark',
                primary: {
                    main: '#95a4ff'
                }
            }
        })

        const AppWithMUIStyle = sheets.collect(
            <Capture report={(moduleName: any) => modules.add(moduleName)}>
                <HelmetProvider context={helmetCtx}>
                    <StaticRouter location={req.url} context={routeCtx}>
                        <ThemeProvider theme={darkTheme}>
                            <ContextProvider>
                                <App />
                            </ContextProvider>
                        </ThemeProvider>
                    </StaticRouter>
                </HelmetProvider>
            </Capture>
        )

        const root = renderToString(AppWithMUIStyle)

        const html = `<!doctype html>
            <html lang="en">
                <head>
                    ${helmet.title ? helmet.title.toString() : ''}
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    ${[
                        helmet.meta ? helmet.meta.toString() : '',
                        helmet.link ? helmet.link.toString() : '',
                        helmet.script ? helmet.script.toString() : ''
                    ]
                        .filter((s) => s !== '')
                        .join('\n')}

                    <style id="style-server-side">
                        ${sheets
                            .toString()
                            .trim()
                            .replace(/\r?\n|\r/g, '')}
                    </style>
                </head>
                <body>
                    <div id="root">${root}</div>

                    ${
                        bundles.js && bundles.js.length
                            ? bundles.js
                                  .map(
                                      (script: { file: string }) =>
                                          `<script src="/${process.env.APP_NAME}/${script.file}"></script>`
                                  )
                                  .join('\n')
                            : ''
                    }

                </body>
            </html>`

        return { html, routeCtx }
    }
})

preloadAll().then(() => {
    const HOST = extractHostName(process.env.APP_HOST || 'http://localhost')
    const PORT = Number(process.env.APP_PORT) || 3000
    const httpServer = app.listen(PORT, HOST, (error: any): void => {
        if (error) {
            /* eslint-disable-next-line no-console */
            console.error(error)
        } else {
            const address: any = httpServer.address()
            /* eslint-disable-next-line no-console */
            console.info(`==> 🌎 Listening on PORT: ${address.port}. Open up ${HOST}:${address.port}/ in your browser.`)
        }
    })
})
