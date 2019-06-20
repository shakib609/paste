import React from "react";
import { QueryResult, Query } from "react-apollo";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { GET_RECENT_PASTES } from "../gqlQueryMutations";
import { formatDate } from "../utils";

const useStyles = makeStyles(theme => ({
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
  }
}));

const RecentPastesList: React.FC = () => {
  const classes = useStyles();

  return (
    <Query query={GET_RECENT_PASTES}>
      {(result: QueryResult) => (
        <React.Fragment>
          <Typography variant="h6" component="h6">
            Recent Pastes
          </Typography>
          {result.loading && (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          )}
          {!result.loading && (
            <List>
              {result.data.pastes.map((paste: any) => (
                <ListItem
                  button
                  component={Link}
                  to={`/${paste.id}`}
                  key={paste.id}
                >
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={paste.title || "Untitled Paste"}
                    secondary={formatDate(paste.createdAt)}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </React.Fragment>
      )}
    </Query>
  );
};

export default RecentPastesList;
