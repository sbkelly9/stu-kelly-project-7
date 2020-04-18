import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const classes = useStyles;

class AppContainer extends Component {
    state = {
        episodes: []
    }
    componentDidMount(){
        console.log("hello")
        this.fetchEpisodes()
        
    }
  fetchEpisodes() {
      console.log("world")
    axios.get("http://localhost:3000/episodes").then((res) => {
        console.log("moo", res)
      this.setState({episodes:res.data})
    });
  }
  render() {
      const {episodes}=this.state
      console.log(episodes)
    return (
      <Container>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {episodes.map((episode) => (
            <GridListTile key={episode._id} cols={1}>
              <img src={episode.image ? episode.image.medium : ""} alt={episode.name} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    );
  }
}

export default AppContainer;
