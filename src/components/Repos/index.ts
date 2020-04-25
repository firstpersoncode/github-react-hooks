import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const Repos = Loadable({
    loader: () => import(/* WebpackChunkName: "repos" */ './view'),
    loading: FallBackLinear
})

export default Repos
