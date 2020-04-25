import Loadable from 'react-loadable-visibility/react-loadable'

import { FallBackLinear } from '~/components/FallBack'

const Profile = Loadable({
    loader: () => import(/* WebpackChunkName: "profile" */ './view'),
    loading: FallBackLinear
})

export default Profile
