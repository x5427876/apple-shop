import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: {
    minHeight: '90px'
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#eee',
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));
