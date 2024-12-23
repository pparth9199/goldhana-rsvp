import React, { useState } from "react";
import { Box, Button, CssBaseline, Grid, Radio, RadioGroup, FormControlLabel, Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: false, fullName: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      fullName: !fullName.trim(),
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.fullName) {
      return;
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbxTOrmqSmJ687idXWxnoZ7i4NluA9_IocQj-ZP9z2zHOt3I0l1w1lbLWXcjyk1M49s/exec", {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        fullName,
        attendance,
      }),
      mode: "no-cors",
    });
    console.log(response);
    setSubmitted(true);
    setName("");
    setFullName("");
    setErrors({ name: false, fullName: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={5}
          id="image-section"
          sx={{
            backgroundImage: "url(/cover.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        />
        <Grid
          item
          xs={12}
          md={7}
          id="form-section"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            overflowY: "auto",
            height: "100vh",
            padding: "20px 0",
          }}
        >
          <Box
            sx={{
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ color: "#2f855a", marginBottom: "20px" }}>
              Riddhi and Parth's Goldhana
            </Typography>
            {!submitted ? (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  helperText={errors.name ? "Please enter your first name." : ""}
                  required
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                  helperText={errors.fullName ? "Please enter your last name." : ""}
                  required
                />
                <Typography variant="body1" sx={{ margin: "20px 0 10px", color: "#2d3748" }}>
                  Will you be attending?
                </Typography>
                <RadioGroup row value={attendance} onChange={(e) => setAttendance(e.target.value)}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#2f855a",
                    "&:hover": { backgroundColor: "#276749" },
                    padding: "15px",
                  }}
                >
                  RSVP
                </Button>
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "#2d3748",
                  marginTop: "20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Thank you for your RSVP! <br /> <br /> We look forward to taking the first step to forever with you. <br /> <br /> Please re-submit the form if anything changes.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
