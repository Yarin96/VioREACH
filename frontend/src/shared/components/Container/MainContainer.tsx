import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles: any = makeStyles((theme) => ({
  root: {
    height: "400",
    overflow: "auto",
  },
}));

const MainContainer = (props: any) => {
  const classes = useStyles();

  return <Paper className={classes.root}>{props.children}</Paper>;
};

export default MainContainer;
