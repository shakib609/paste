import React from "react";
import { navigate } from "@reach/router";
import {
  Query,
  QueryResult,
  Mutation,
  MutationFn,
  OperationVariables,
  MutationResult
} from "react-apollo";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import languageOptions from "../languageOptions";
import { CREATE_PASTE, GET_FOLDERS } from "../gqlQueryMutations";
import { useAuthentication } from "../contexts/useAuthentication";
import { capitalize } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(1)
    },
    textField: {
      fontFamily: "'Roboto Mono'",
      fontSize: "14px"
    },
    switch: {
      marginTop: theme.spacing(1)
    }
  })
);

interface State {
  title: string;
  content: string;
  language: string;
  public: boolean;
  folderId: string;
}

const NewPasteForm: React.FC = () => {
  const classes = useStyles();
  const { authToken } = useAuthentication();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const folderLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [folderLabelWidth, setFolderLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
    folderLabel.current &&
      setFolderLabelWidth(folderLabel.current!.offsetWidth);
  }, []);

  const [values, setValues] = React.useState<State>({
    title: "",
    content: "",
    language: "",
    public: true,
    folderId: ""
  });

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement | any>
  ) => {
    if (name === "public")
      setValues({ ...values, public: event.target.checked });
    else setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Mutation
      mutation={CREATE_PASTE}
      onCompleted={(data: any) => {
        const { id } = data.createPaste.paste;
        navigate(`/${id}`);
      }}
    >
      {(
        addTodo: MutationFn<any, OperationVariables>,
        result: MutationResult<any>
      ) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo({
              variables: { input: { ...values } },
              context: {
                headers: {
                  Authorization: authToken ? `JWT ${authToken}` : ""
                }
              }
            });
          }}
        >
          <Typography variant="h5" component="h5" className={classes.title}>
            New Paste
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Text"
                margin="dense"
                multiline
                rows="14"
                fullWidth
                variant="outlined"
                name="content"
                placeholder="Paste Your Code Here"
                required
                autoFocus
                value={values.content}
                inputProps={{ className: classes.textField }}
                onChange={handleChange("content")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                margin="dense"
                fullWidth
                variant="outlined"
                name="title"
                value={values.title}
                onChange={handleChange("title")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth margin="dense">
                <InputLabel
                  ref={inputLabel}
                  htmlFor="syntax-highlighting-input"
                >
                  Syntax Highlighting
                </InputLabel>
                <Select
                  value={values.language}
                  onChange={handleChange("language")}
                  input={
                    <OutlinedInput
                      fullWidth
                      labelWidth={labelWidth}
                      name="language"
                      id="syntax-highlighting-input"
                    />
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {languageOptions.map(lang => (
                    <MenuItem value={lang.value} key={lang.value}>
                      {capitalize(lang.text)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {authToken && (
              <Query
                query={GET_FOLDERS}
                context={{
                  headers: {
                    Authorization: `JWT ${authToken}`
                  }
                }}
              >
                {(result: QueryResult) => (
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                      <InputLabel
                        ref={folderLabel}
                        htmlFor="folder-select-input"
                      >
                        Folder
                      </InputLabel>
                      <Select
                        value={values.folderId}
                        onChange={handleChange("folderId")}
                        input={
                          <OutlinedInput
                            fullWidth
                            labelWidth={folderLabelWidth}
                            name="folder"
                            id="folder-select-input"
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {result.data.folders &&
                          result.data.folders.map(({ id, name }: any) => (
                            <MenuItem value={id} key={id}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Query>
            )}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                value="public"
                className={classes.switch}
                control={
                  <Switch
                    checked={values.public}
                    value="public"
                    onChange={handleChange("public")}
                    color="primary"
                  />
                }
                label="Public"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="dense">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={result.loading}
                >
                  {result.loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : (
                    "Create Paste"
                  )}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      )}
    </Mutation>
  );
};

export default NewPasteForm;
