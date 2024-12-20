import React, { useState, useEffect } from "react";
import { Box, Button, CssBaseline, Grid, Radio, RadioGroup, FormControlLabel, Typography, TextField, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [submitted, setSubmitted] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);

  const handleScroll = () => {
    const formSection = document.getElementById("form-section");
    const imageSection = document.getElementById("image-section");
    const formTop = formSection.getBoundingClientRect().top;
    const imageBottom = imageSection.getBoundingClientRect().bottom;

    setShowDownArrow(imageBottom > 50 && window.innerWidth < 960); // Down arrow shows if image is visible and on mobile
    setShowUpArrow(formTop < window.innerHeight - 50 && window.innerWidth < 960); // Up arrow shows if form is visible and on mobile
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    setSubmitted(true);
    setName("");
    setFullName("");
  };

  const scrollToForm = () => {
    document.getElementById("form-section").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToImage = () => {
    document.getElementById("image-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid
          item
          xs={12}
          md={5}
          id="image-section"
          sx={{
            backgroundImage: "url(/cover.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "100vh", md: "auto" },
            position: "relative",
          }}
        >
          {showDownArrow && (
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={scrollToForm} sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <ArrowDownwardIcon />
              </IconButton>
            </Box>
          )}
        </Grid>
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
            {showUpArrow && (
              <Box
                sx={{
                  position: "absolute",
                  top: "20px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={scrollToImage} sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                  <ArrowUpwardIcon />
                </IconButton>
              </Box>
            )}
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
                Thank you for your RSVP! We look forward to take the first to forever with you. Please resubmit the form if anything changes.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
