import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
  type,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return(
    <div style={{ padding: "6px 0" }}></div>
  )
};

export default Genres;
