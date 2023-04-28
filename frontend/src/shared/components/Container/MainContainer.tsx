import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles: any = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 120px)",
    width: "100vw",
    overflow: "auto",
    backgroundColor: "#F4F6F9",
  },
}));

const MainContainer = (props: any) => {
  const classes = useStyles();

  return <Paper className={classes.root}>{props.children}</Paper>;
};

export default MainContainer;
