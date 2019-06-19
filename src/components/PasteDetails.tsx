import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/styles/hljs/obsidian";
import CopyToClipboard from "react-copy-to-clipboard";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import FaceIcon from "@material-ui/icons/Face";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LanguageIcon from "@material-ui/icons/Language";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { formatDate } from "../utils";

const useStyles = makeStyles(theme =>
  createStyles({
    pasteInfoContainer: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1)
    },
    chip: {
      marginRight: theme.spacing(1),
      padding: "0.25rem"
    },
    copyButton: {
      flexGrow: 1,
      justifyContent: "end",
      display: "flex"
    },
    copyButtonChip: {
      marginLeft: "auto",
      padding: "0.25rem"
    }
  })
);

type TPaste = {
  title: string | null;
  content: string;
  createdAt: string;
  createdBy: any | null;
  language: string | null;
};

type PasteDetailProps = {
  paste: TPaste;
};

const PasteDetails: React.FC<PasteDetailProps> = ({ paste }) => {
  const classes = useStyles();

  const [snackbarVisibility, setSnackbarVisibility] = React.useState(false);

  return (
    <React.Fragment>
      <Typography variant="h5" component="h1">
        {paste.title || "Untitled Paste"}
      </Typography>
      <div className={classes.pasteInfoContainer}>
        <Chip
          variant="outlined"
          icon={<FaceIcon />}
          label={paste.createdBy ? paste.createdBy.username : "Guest User"}
          className={classes.chip}
        />
        <Chip
          variant="outlined"
          icon={<DateRangeIcon />}
          label={formatDate(paste.createdAt)}
          className={classes.chip}
        />
        {paste.language && (
          <Chip
            variant="outlined"
            icon={<LanguageIcon />}
            label={paste.language}
            className={classes.chip}
          />
        )}
        <div className={classes.copyButton}>
          <CopyToClipboard
            text={paste.content}
            onCopy={() => setSnackbarVisibility(true)}
          >
            <Chip
              variant="outlined"
              icon={<FileCopyIcon />}
              label="Copy"
              className={classes.copyButtonChip}
            />
          </CopyToClipboard>
        </div>
      </div>
      <SyntaxHighlighter
        language={paste.language || "plaintext"}
        style={obsidian}
        showLineNumbers
      >
        {paste.content}
      </SyntaxHighlighter>
      {/* Copied Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarVisibility}
        autoHideDuration={6000}
        onClose={() => setSnackbarVisibility(false)}
        message="Copied to Clipboard!"
      />
    </React.Fragment>
  );
};

export default PasteDetails;
