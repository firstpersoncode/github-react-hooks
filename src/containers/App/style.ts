import { makeStyles } from '@material-ui/core/styles'

const useStyle = (makeStyles as any)(() => ({
    content: {
        minHeight: '100vh',
        '& a': {
            color: '#c6ceff'
        }
    }
}))

export default useStyle
