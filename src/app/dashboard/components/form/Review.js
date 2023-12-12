import "./form.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import AppContext from "../../../../contexts/AppContext";

export default function Review() {
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("None");
  const [isHourly, setIsHourly] = React.useState(false);
  const [isBoosted, setIsBoosted] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const { data, setProjectDescription, ProjectDescription } =
    React.useContext(AppContext);
  console.log(ProjectDescription);
  const handleChange = (event) => {
    setLocation(event.target.value);
    data[0].Location = event.target.value;
  };
  const handleChangeBoost = (event) => {
    const value = event.target.value;
    if (value === "yes") {
      setIsBoosted(true);
      data[0].Boosted_or_not = value;
    } else if (value === "no") {
      setIsBoosted(false);
      data[0].Boosted_or_not = value;
    }
  };
  const handleTicketType = (event) => {
    setType(event.target.value);
    data[0].Ticket_Type = event.target.value;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_URL' with the actual API URL you want to use
        const response = await axios.get("https://restcountries.com/v2/all");

        // Extracting only country names from the response
        const countryNames = response.data.map((country) => country.name);

        // Updating the state with the country names
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="project title"
            label="Upwork Project Title (choose NA if any other lead source)"
            fullWidth
            onChange={(e) => {
              data[0].Project_Title = e.target.value;
              data[0].Name = e.target.value;
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="project url"
            label="Project URL / LinkedIn URL"
            fullWidth
            onChange={(e) => (data[0].Project_URL = e.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sx={{ alignItems: "flex-start" }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              How many days before was this job posted on Upwork?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
              ononChange={(e) =>
                (data[0].days_before_job_posted = e.target.value)
              }
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="0"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="3"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="5"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <FormControlLabel
                value="Not upwork Lead"
                control={<Radio />}
                label="Not upwork Lead"
                variant="outlined"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
              <TextField
                id="standard-basic"
                label="Others"
                variant="standard"
                onChange={(e) =>
                  (data[0].days_before_job_posted = e.target.value)
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ alignItems: "flex-start" }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Company Name (compulsory for other lead sources) *
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="Not Available"
                onChange={(e) => (data[0].Company_Name = e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Others"
                variant="standard"
                onChange={(e) => (data[0].Company_Name = e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} alignItems="flex-start">
          <FormLabel id="demo-radio-buttons-group-label">
            Select Location
          </FormLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={handleChange}
            >
              {countries.map((country, i) => (
                <MenuItem key={i} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item xs={12} alignItems="flex-start">
          <InputLabel id="demo-simple-select-helper-label">
            Ticket Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={type}
            label="Ticket Type"
            onChange={handleTicketType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Low Ticket (between $2000 to $4000)">
              Low Ticket (between $2000 to $4000)
            </MenuItem>
            <MenuItem value="Medium Ticket (between $4000 to $6000)">
              Medium Ticket (between $4000 to $6000)
            </MenuItem>
            <MenuItem value="High Ticket (above $6000)">
              High Ticket (above $6000)
            </MenuItem>
            <MenuItem value="Generic Outbound">Generic Outbound</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-helper-label">Boosted</InputLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="yes"
              onChange={handleChangeBoost}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="no"
              onChange={handleChangeBoost}
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Connects Spent (including boost connects)"
            onChange={(e) => (data[0].connects_spent = e.target.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        {isBoosted && (
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Connects spent on boosting
            "
              fullWidth
              onChange={(e) =>
                (data[0].Connects_spent_on_boosting = e.target.value)
              }
              variant="standard"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-helper-label">
            Bid Payment Terms
          </InputLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Fixed"
              control={<Radio />}
              label="Fixed"
              onChange={(e) => (data[0].Bid_Payment_Terms = e.target.value)}
            />
            <FormControlLabel
              value="Hourly"
              control={<Radio />}
              label="Hourly"
              onChange={(e) => (data[0].Bid_Payment_Terms = e.target.value)}
            />
            <FormControlLabel
              value="Generic Outbound"
              control={<Radio />}
              label="Generic Outbound"
              onChange={(e) => (data[0].Bid_Payment_Terms = e.target.value)}
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Bid Budget (if not available, then put an indicator. Or put NA in case of any other Lead Source)"
            fullWidth
            variant="standard"
            onChange={(e) => (data[0].Bid_Budget = e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Bid Quoted (choose NA if any other lead source)

            "
            fullWidth
            variant="standard"
            onChange={(e) => (data[0].Bid_Quoted = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ alignItems: "flex-start" }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Which day is this bid submitted in the week? (choose NA if any
              other lead source) *
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Monday"
                control={<Radio />}
                label="Monday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Tuesday"
                control={<Radio />}
                label="Tuesday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Wednesday"
                control={<Radio />}
                label="Wednesday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Thrusday"
                control={<Radio />}
                label="Thrusday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Friday"
                control={<Radio />}
                label="Friday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Saturday"
                control={<Radio />}
                label="Saturday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
              <FormControlLabel
                value="Sunday"
                control={<Radio />}
                label="Sunday"
                onChange={(e) => (data[0].Day = e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Comments"
            fullWidth
            variant="standard"
            onChange={(e) => (data[0].Comments = e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            style={{ width: "100%" }}
            aria-label="minimum height"
            minRows={8}
            placeholder="Paste project description"
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
