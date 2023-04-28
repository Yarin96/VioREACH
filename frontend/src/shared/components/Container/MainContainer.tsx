import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles: any = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 120px)",
    width: "100vw",
    overflow: "auto",
    backgroundColor: "#f4f6f9 !important",
  },
}));

const MainContainer = (props: any) => {
  const classes = useStyles();

  return <Paper className={classes.root}>{props.children}</Paper>;
};

export default MainContainer;
