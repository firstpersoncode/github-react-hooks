import Loadable from 'react-loadable'
import { RouteConfig } from 'react-router-config'

import { FallBackPage } from '~/components/FallBack'

const NotFoundPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "not-found" */ './view'),
    loading: FallBackPage
})

const NotFound: RouteConfig = {
    component: NotFoundPromise,
    path: '**'
}

export default NotFound
