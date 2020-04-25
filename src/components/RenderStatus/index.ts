import Loadable from 'react-loadable'

import { FallBackCircularOverlay } from '~/components/FallBack'

const RenderStatus = Loadable({
    loader: () => import(/* WebpackChunkName: "render-status" */ './view'),
    loading: FallBackCircularOverlay
})

export default RenderStatus
