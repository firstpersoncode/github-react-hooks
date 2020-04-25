import { makeStyles } from '@material-ui/core/styles'

const useStyle = (makeStyles as any)((theme: any) => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: '#000',
        boxShadow: theme.shadows[3],
        width: '100%',
        zIndex: theme.zIndex.appBar,
        position: 'sticky',
        top: 0,
        minHeight: 50
    }
}))

export default useStyle
