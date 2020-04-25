import Loadable from 'react-loadable'
import { RouteConfig } from 'react-router-config'

import { FallBackPage } from '~/components/FallBack'
import { PATH_ABOUT } from '~/variables/urls'

const AboutPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "about" */ './view'),
    loading: FallBackPage
})

const About: RouteConfig = {
    component: AboutPromise,
    path: PATH_ABOUT
}

export default About
