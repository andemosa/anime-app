import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface AnimeDetails {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  synopsis: string;
  type: string;
  episodes: string;
  score: string;
  start_date: string;
  end_date: string;
  members: string;
  rated: string;
  airing: boolean;
}

export default function SimpleContainer() {
  const [animes, setAnimes] = React.useState<AnimeDetails[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState("");
  const timeout = useRef<any>();
  const inputRef = useRef<any>();

  const getAnimes = () => {
    setError("");
    setLoading(false);
    //Clear the previous timeout.
    clearTimeout(timeout.current);
    // If there is no search term, do not make API call
    if (!inputRef?.current?.value?.trim()) {
      setAnimes([]);
      setLoading(false);
      setError("");
      return;
    }
    timeout.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      setAnimes([]);
      try {
        let url = `https://api.jikan.moe/v3/search/anime?q=${inputRef.current.value}&page=${page}`;
        let result = await axios.get(url);
        setAnimes(result.data.results);
      } catch (error: any) {
        setError(error.response.statusText);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    getAnimes();
  };

  useEffect(() => {
    getAnimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box>
          <FormControl sx={{ my: 2 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              onChange={handleChange}
              inputRef={inputRef}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              label="search"
            />
          </FormControl>
          {loading && (
            <Box sx={{ display: "flex", my: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {!loading && animes?.length === 0 && !inputRef?.current?.value && (
            <Box sx={{ display: "flex" }}>
              <Typography gutterBottom variant="h5" component="div">
                Please enter an anime to search for......
              </Typography>
            </Box>
          )}
          {error && (
            <Box sx={{ display: "flex" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ef5350" }}
              >
                No search result for {inputRef?.current?.value}. Please try a
                different search
              </Typography>
            </Box>
          )}
          {!error && animes.length !== 0 && !loading && (
            <Container>
              <Grid container spacing={2}>
                {animes?.map((item) => (
                  <Grid item xs={12} sm={4} md={3} key={item.mal_id}>
                    <Link to={`/anime/${item.mal_id}`}>
                      <Card sx={{ minHeight: 400 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="300"
                            image={item.image_url}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Stack spacing={2} sx={{ my: 2 }}>
                <Typography>Page: {page}</Typography>
                <Pagination
                  count={10}
                  page={page}
                  onChange={handlePageChange}
                />
              </Stack>
            </Container>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
