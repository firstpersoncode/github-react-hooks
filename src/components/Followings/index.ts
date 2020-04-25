import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const Followings = Loadable({
    loader: () => import(/* WebpackChunkName: "followings" */ './view'),
    loading: FallBackLinear
})

export default Followings
