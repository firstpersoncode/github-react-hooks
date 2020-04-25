import { Request, Response } from 'express'
import { matchRoutes, RouteConfig } from 'react-router-config'

import { IExpressCTX } from '.'

export interface IRender {
    html: string
    routeCtx: {
        status: number | null
        url: string | null
    }
}

interface IRenderParams {
    render: (ctx: IExpressCTX) => Promise<IRender>
    routes: RouteConfig[]
}

export default ({ render, routes }: IRenderParams) => async (req: Request, res: Response) => {
    try {
        const expressCtx: IExpressCTX = { req, res }

        const {
            html,
            routeCtx: { status, url }
        }: IRender = await render(expressCtx)

        if (url) {
            return res.status(302).redirect(url)
        }

        matchRoutes(routes, req.path).map(({ match }) => {
            // path "**" is "404" page (defined in our react router)
            // we let react router to handle the 404 view
            // also set the static ctx header
            // but we still need to return the real status from server side
            if (match && match.path !== '**') {
                res.status(200)
            } else {
                res.status(404)
            }
        })

        if (status) {
            // receive context status from react router
            /* eslint-disable-next-line no-console */
            console.log('Static Route context status: ', status)
            return res.status(status).send(html)
        }

        res.send(html)
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('Error render:\n', err)
        throw res.status(500).send(err)
    }
}
