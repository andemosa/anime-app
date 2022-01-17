import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";

interface AnimeDetails {
  mal_id: number;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  image_url: string;
  title: string;
}

const Details = () => {
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      try {
        let result = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);
        setAnime(result.data);
      } catch (error: any) {
        setError(error.response.statusText);
      } finally {
        setLoading(false);
      }
    };
    getInfo();
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", my: 2 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ display: "flex", my: 2 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ef5350" }}
              >
                {error}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={anime?.image_url}
                    alt={anime?.title}
                  />
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ my: 2 }}
                >
                  Synopsis
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  {anime?.synopsis}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "auto",
                    "& > :not(style)": {
                      m: 1,
                      width: 150,
                      height: 90,
                    },
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#6fccf7",
                      color: "#085ec0",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ my: 1 }}
                    >
                      {anime?.score}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Rating
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#dda2e7",
                      color: "#7817a1",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ my: 1 }}
                    >
                      #{anime?.popularity}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Popularity
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#eeb3b2",
                      color: "#e0110d",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ my: 1 }}
                    >
                      #{anime?.rank}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Rank
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#b0ecb2",
                      color: "#084e0d",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ my: 1 }}
                    >
                      {anime?.members?.toLocaleString()}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Members
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          )}

          <Link to="/">
            <Button
              sx={{ my: 2, backgroundColor: "#7817a1" }}
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>
          </Link>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Details;
