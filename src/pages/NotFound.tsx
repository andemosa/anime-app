import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const NotFound = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 2 }}>
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here! Let's go back home</p>
            <Link to="/">
              <Button
                sx={{ my: 2, backgroundColor: "#7817a1" }}
                variant="contained"
                startIcon={<ArrowBackIosNewIcon />}
              >
                Back
              </Button>
            </Link>
          </main>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
