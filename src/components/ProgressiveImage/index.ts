import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackNull } from '~/components/FallBack'

const ProgressiveImage = Loadable({
    loader: () => import(/* WebpackChunkName: "progressive-image" */ './view'),
    loading: FallBackNull
})

export default ProgressiveImage
