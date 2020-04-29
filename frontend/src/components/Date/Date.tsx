import React, { useState, useContext } from "react";
import { IDay } from "../../types";
import { AuthContext } from "../../authContext";

import EditMenu from "../EditMenu/EditMenu";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Badge from "@material-ui/core/Badge";
import MoreIcon from "@material-ui/icons/MoreVert";

const Date: React.FC<IDay> = ({ day, tasks, removeElement }) => {
  const [menu, setShowMenu] = useState<null | SVGSVGElement>(null);
  const classes = useStyles();

  const isAuthenticated = useContext(AuthContext);

  const showMenuElem = (event: React.MouseEvent<SVGSVGElement>) => {
    setShowMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setShowMenu(null);
  };

  const deleteHours = async (hourId: number) => {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Token ${isAuthenticated.token}` },
    };
    const resp = await fetch(`http://localhost:8000/hours/${hourId}`, options);
    if (resp.status === 204) {
      removeElement!(hourId);
      console.log("Delete Succesful");
    }
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.paper_title}>{day}</Paper>
        {tasks?.map((task) => (
          <Paper
            key={task.id}
            className={classes.paper}
            style={{ height: "150px" }}
          >
            <EditMenu
              menu={menu}
              closeMenu={closeMenu}
              deleteHours={deleteHours}
              hourId={task.id}
            />
            <Grid
              item
              xs
              container
              direction="row"
              alignItems="center"
              spacing={0}
              style={{
                height: "50px",
              }}
            >
              <Grid item xs={9} sm={9}>
                <Typography
                  variant="body2"
                  className={classes.title}
                  gutterBottom
                >
                  {task.client}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3}>
                <IconButton
                  aria-label="display more actions"
                  edge="end"
                  color="inherit"
                >
                  <MoreIcon onClick={(e) => showMenuElem(e)} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs container direction="row" spacing={0}>
              <Grid item xs={12} style={{ height: "50px" }}>
                <Typography variant="body2" gutterBottom>
                  {task.task}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container direction="row" spacing={0}>
              <Grid
                item
                xs={12}
                justify="flex-end"
                alignItems="flex-end"
                style={{ display: "flex", height: "50px" }}
              >
                <StyledBadge badgeContent={task.hours} color="secondary">
                  <AccessTimeIcon />
                </StyledBadge>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flex: 1,
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      color: theme.palette.text.secondary,
    },
    paper_title: {
      padding: theme.spacing(2),
      backgroundColor: "#3949ab",
      color: "white",
    },
  })
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })
)(Badge);

export default Date;
