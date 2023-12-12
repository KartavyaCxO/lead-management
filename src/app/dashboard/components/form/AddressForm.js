import "./form.css";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import AppContext from "../../../../contexts/AppContext";

export default function AddressForm() {
  const [source, setSource] = React.useState("None");
  const [isUpwork, setIsUpwork] = React.useState(false);
  const [isLinkedin, setIsLinkedin] = React.useState(false);
  const { data } = React.useContext(AppContext);
  const handleChange = (event) => {
    const value = event.target.value;
    setSource(value);
    if (value === "upwork") {
      setIsUpwork(true);
      setIsLinkedin(false);
      data[0].Source = value;
    } else if (value === "linkedin") {
      data[0].Source = value;
      setIsUpwork(false);
      setIsLinkedin(true);
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Source of Lead
        </Typography>
        <FormControl>
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Source
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={source}
              label="Source"
              onChange={handleChange}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="upwork">Upwork</MenuItem>
              <MenuItem value="linkedin">Linkedin</MenuItem>
            </Select>
          </Grid>
          {isUpwork && (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Upwork Bid"
                control={<Radio />}
                label="Upwork Bid"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
              <FormControlLabel
                value="maUpwork Invitationle"
                control={<Radio />}
                label="Upwork Invitation"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
              <FormControlLabel
                value="Upwork Consultation"
                control={<Radio />}
                label="Upwork Consultation"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
            </RadioGroup>
          )}
          {isLinkedin && (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="LinkedIn - Stewart"
                control={<Radio />}
                label="LinkedIn - Stewart"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
              <FormControlLabel
                value="LinkedIn - Div50"
                control={<Radio />}
                label="LinkedIn - Div50"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
              <FormControlLabel
                value="LinkedIn - CxO"
                control={<Radio />}
                label="LinkedIn - CxO"
                onChange={(e) => (data[0].Bid_Type = e.target.value)}
              />
            </RadioGroup>
          )}
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
