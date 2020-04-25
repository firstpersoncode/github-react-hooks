import React, { ReactNode, FunctionComponent } from 'react'
import { Route, RouteComponentProps } from 'react-router'

interface IRenderStatusProps {
    children: ReactNode
    status?: number
}

const RenderStatus: FunctionComponent<IRenderStatusProps> = ({ children, status }) => {
    const render = (route: RouteComponentProps) => {
        if (route.staticContext as any) {
            route.staticContext = Object.assign(route.staticContext, { status })
        }

        return children
    }

    return <Route render={render} />
}

export default RenderStatus
