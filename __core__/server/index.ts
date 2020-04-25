import path from 'path'

import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { RouteConfig } from 'react-router-config'

import render, { IRender } from './render'

export interface IExpressCTX {
    req: Request
    res: Response
    next?: any
}

interface IConfigs {
    render: (ctx: IExpressCTX) => Promise<IRender>
    rootPath: string
    routes: RouteConfig[]
}

const app: Application = express()

/* ========================= Initial Configs ========================= */
app.use(express.static(path.resolve(process.cwd(), 'static')))
app.use(`/${process.env.APP_NAME}/`, express.static(path.resolve(process.cwd(), 'dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((_, res: any, next: any) => {
    res.header('Service-Worker-Allowed', '/')
    next()
})

/* ========================= Dev Server & Configs ========================= */
const isDev = Boolean(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development')

if (isDev) {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')

    const config = require('__core__/webpack')
    const compiler = webpack(config)

    app.use((_, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    })

    app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))
    app.use(morgan('dev'))
}

export default ({ rootPath, render: renderApp, routes }: IConfigs): Application => {
    app.get(rootPath + '*', render({ render: renderApp, routes }))

    return app
}
