import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import monoBlue from "react-syntax-highlighter/dist/styles/hljs/mono-blue";
import CopyToClipboard from "react-copy-to-clipboard";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import FaceIcon from "@material-ui/icons/Face";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LanguageIcon from "@material-ui/icons/Language";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { formatDate } from "../utils";
import { useSnackbar } from "../contexts/useSnackbar";

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
  const { openSnackbar } = useSnackbar();

  React.useEffect(() => {
    document.title = `${paste.title || "Untitled Paste"} | Paste`;
  });

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
            onCopy={() => openSnackbar("Copied to Clipboard")}
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
        style={monoBlue}
        showLineNumbers
        customStyle={{
          fontSize: "14px"
        }}
      >
        {paste.content}
      </SyntaxHighlighter>
    </React.Fragment>
  );
};

export default PasteDetails;
