import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
  },
}));
