import Loadable from 'react-loadable'
import { RouteConfig } from 'react-router-config'

import { PATH_PROJECT } from '~/variables/urls'
import { FallBackPage } from '~/components/FallBack'

const ProjectPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "project" */ './view'),
    loading: FallBackPage
})

const Project: RouteConfig = {
    component: ProjectPromise,
    exact: true,
    path: PATH_PROJECT
}

export default Project
