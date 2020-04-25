import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const SearchProfile = Loadable({
    loader: () => import(/* WebpackChunkName: "search-profile" */ './view'),
    loading: FallBackLinear
})

export default SearchProfile
