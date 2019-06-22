import React from "react";
import { Link } from "@reach/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { formatDate } from "../utils";
import { Typography } from "@material-ui/core";

type TPaste = {
  title: string | null;
  content: string;
  createdAt: string;
  createdBy: any | null;
  language: string | null;
};

type PasteListProps = {
  pastes: [TPaste];
};

const PasteList: React.FC<PasteListProps> = ({ pastes }) => {
  return (
    <React.Fragment>
      {pastes.length > 0 ? (
        <List>
          {pastes.map((paste: any) => (
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
      ) : (
        <Typography variant="body1" align="center">
          Nothing to display
        </Typography>
      )}
    </React.Fragment>
  );
};

export default PasteList;
