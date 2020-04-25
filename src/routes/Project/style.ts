import { makeStyles } from '@material-ui/core/styles'

const useStyle = (makeStyles as any)((theme: any) => ({
    root: {
        '&.loading': {
            filter: 'blur(4px)'
        }
    }
}))

export default useStyle
