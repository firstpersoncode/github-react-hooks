import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const Followers = Loadable({
    loader: () => import(/* WebpackChunkName: "followers" */ './view'),
    loading: FallBackLinear
})

export default Followers
