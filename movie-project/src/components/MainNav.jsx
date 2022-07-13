import * as React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  Whatshot,
  Movie,
  LiveTv,
  Search,
  FavoriteBorder,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#000",
    boxShadow: "10px 1px 10px red",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/search");
    else if (value === 3) navigate("/favorites");
  }, [value, navigate]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction
          style={{ color: "#fff" }}
          label="Trending"
          icon={<Whatshot />}
        />
        <BottomNavigationAction
          style={{ color: "#fff" }}
          label="Movies"
          icon={<Movie />}
        />
        <BottomNavigationAction
          style={{ color: "#fff" }}
          label="Search"
          icon={<Search />}
        />
        <BottomNavigationAction
          style={{ color: "#fff" }}
          label="Favorites"
          icon={<FavoriteBorder />}
        />
      </BottomNavigation>
    </Box>
  );
}
