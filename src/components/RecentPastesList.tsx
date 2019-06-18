import React from "react";
import { QueryResult, Query } from "react-apollo";
import { Link } from "@reach/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { GET_RECENT_PASTES } from "../gqlQueryMutatioions";
import { CircularProgress } from "@material-ui/core";

const RecentPastesList: React.FC = () => {
  const formatDate: (dateString: string) => string = dateString => {
    const d: Date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return `${
      months[d.getUTCMonth()]
    } ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  };

  return (
    <Query query={GET_RECENT_PASTES}>
      {(result: QueryResult) => (
        <React.Fragment>
          {result.loading && <CircularProgress />}
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
                    primary={paste.title || "Untitled"}
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
