import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import FilterMovie from "../../components/FilterMovie";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres , setSelectedGenres] = useState([])
  const [genres , setGenres] = useState([])
  // SORTING STATE
  const [sort, setSort] = useState("Select");

  const handleSort = (e) => {
    setSort(e.target.value);
  };


  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_vide0=false&page=${page}`
    );

    setContent(data.results);
    setnumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);



  return (
    <>
      <span className="pageTitle">Movies</span>
      <FilterMovie setPage={setPage} page={page} handleSort={handleSort} />
      <hr />
      <div className="trending">
        {content && content.map((item) => (
        <SingleContent
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          date={item.first_air_date || item.release_date}
          media_type="movie"
          vote_average={(item.vote_average >8) ? item.vote_average : ''}
          title={item.title || item.name}
        />
      ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPAges={numOfPages} />
      )}
    </>
  );
};

export default Movies;
