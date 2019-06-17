import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      marginBottom: theme.spacing(1)
    },
    textField: {
      fontFamily: "monospace"
    },
    switch: {
      marginLeft: 0
    }
  })
);

interface State {
  title: string;
  text: string;
  language: string;
  public: boolean;
}

const NewPasteForm: React.FC = () => {
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const [values, setValues] = React.useState<State>({
    title: "",
    text: "",
    language: "",
    public: true
  });

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === "public")
      setValues({ ...values, public: event.target.checked });
    else setValues({ ...values, [name]: event.target.value });
  };

  const handleLanguageChange = () => (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) =>
    setValues({
      ...values,
      language: `${event.target.value}`
    });

  return (
    <form>
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
            name="text"
            placeholder="Paste Your Code Here"
            required
            className={classes.textField}
            onChange={handleChange("text")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            margin="dense"
            fullWidth
            variant="outlined"
            name="title"
            onChange={handleChange("title")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel ref={inputLabel} htmlFor="syntax-highlighting-input">
              Syntax Highlighting
            </InputLabel>
            <Select
              value={values.language}
              onChange={handleLanguageChange()}
              input={
                <OutlinedInput
                  fullWidth
                  labelWidth={labelWidth}
                  name="language"
                  id="syntax-highlighting-input"
                />
              }
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              {languageOptions.map(lang => (
                <MenuItem value={lang.value} key={lang.value}>
                  {lang.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

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
              onClick={e => {
                e.preventDefault();
                console.table(values);
              }}
            >
              Create Paste
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewPasteForm;
