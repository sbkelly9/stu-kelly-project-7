import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import Container from "@material-ui/core/Container";
import "./Container.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    episodes: [],
  };
  componentDidMount() {
    console.log("hello");
    this.fetchEpisodes();
  }
  fetchEpisodes() {
    console.log("world");
    axios.get("http://localhost:3000/episodes").then((res) => {
      console.log("moo", res);
      this.setState({ episodes: res.data });
    });
  }

  deleteEpisode(id) {
    console.log("world");
    axios.delete(`http://localhost:3000/episodes/${id}`).then((res) => {
      console.log("moo", res);
      this.fetchEpisodes()
    });
  }
  render() {
    const { episodes } = this.state;
    console.log(episodes);
    return (
      <Container>
        <h1>South Park Episodes</h1>
        <GridList cellHeight={180} className={classes.gridList}>
          {episodes.map((episode) => (
            <GridListTile key={episode._id} cols={1}>
              <img
                src={episode.image ? episode.image.medium : ""}
                alt={episode.name}
              />
              <GridListTileBar
                title={episode.name}
                subtitle={
                  <span>
                    S{episode.season}E{episode.number}
                  </span>
                }
                actionIcon={
                  <div>
                    <IconButton
                      aria-label={`edit ${episode.name}`}
                      className={classes.icon}
                    >
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                    <IconButton
                      aria-label={`delete ${episode.name}`}
                      className={classes.icon}
                      onClick={()=>this.deleteEpisode(episode._id)}
                    >
                      <Icon color="error">delete_forever</Icon>
                    </IconButton>
                  </div>
                }
              />
              
            </GridListTile>
          ))}
        </GridList>
      </Container>
    );
  }
}

export default AppContainer;
