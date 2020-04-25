import { makeStyles } from '@material-ui/core/styles'

const useStyle = (makeStyles as any)((theme: any) => ({
    root: {
        backgroundColor: '#000',
        boxShadow: theme.shadows[3]
    }
}))

export default useStyle
