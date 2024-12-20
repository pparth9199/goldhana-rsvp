import React, { useState } from "react";
import { Box, Button, CssBaseline, Grid, Radio, RadioGroup, FormControlLabel, Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    alert("RSVP Submitted if your answer changes please submit the form again! We look forward to celebrate the special day with you! ");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundImage: "url(/cover.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
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
                <TextField label="First Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
                <TextField label="Last Name" variant="outlined" fullWidth margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
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
              <Typography variant="h6" sx={{ color: "#2d3748", marginTop: "20px" }}>
                Thank you for your RSVP! We look forward to seeing you at the ceremony.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
