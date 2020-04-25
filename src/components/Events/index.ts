import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const Events = Loadable({
    loader: () => import(/* WebpackChunkName: "events" */ './view'),
    loading: FallBackLinear
})

export default Events
