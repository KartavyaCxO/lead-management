import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, FormControl, Radio, RadioGroup } from "@mui/material";
import AppContext from "../../../../contexts/AppContext";

export default function PaymentForm() {
  const [otherValue, setOtherValue] = React.useState("");
  const { data } = React.useContext(AppContext);
  const handleOtherChange = (event) => {
    setOtherValue(event.target.value);
    data[0].Function = event.target.value;
  };

  const handleChange = (event) => {
    data[0].Function = event.target.value;
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
          Your Funtion/Department
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Demand Gen"
              control={<Radio />}
              label="Demand Gen"
              onChange={handleChange}
            />
            <FormControlLabel value="male" control={<Radio />} label="Sales" />
            <FormControlLabel
              value="Strategy & Ops"
              control={<Radio />}
              label="Strategy & Ops"
              onChange={handleChange}
            />
            <FormControlLabel
              value="Marketing"
              control={<Radio />}
              label="Marketing"
              onChange={handleChange}
            />
            <FormControlLabel
              value="tech"
              control={<Radio />}
              label="Tech"
              onChange={handleChange}
            />
            <FormControlLabel
              value="Finance"
              control={<Radio />}
              label="Finance"
              onChange={handleChange}
            />
            <FormControlLabel
              value="People"
              control={<Radio />}
              label="People"
              onChange={handleChange}
            />

            <TextField
              id="otherText"
              label="Other"
              value={otherValue}
              onChange={handleOtherChange}
              variant="standard"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
