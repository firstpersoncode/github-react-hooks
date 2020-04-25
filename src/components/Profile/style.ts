import { makeStyles } from '@material-ui/core/styles'

const useStyle = (makeStyles as any)(() => ({
    root: {
        '&.loading': {
            filter: 'blur(4px)'
        }
    },
    large: {
        width: '100%',
        height: '100%'
    }
}))

export default useStyle
