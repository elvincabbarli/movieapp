import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [numOfPages, setnumOfPages] = useState();

  // SORTING STATE
  const [sort, setSort] = useState("Select");

  
  const filteredMovie = () => {
    if (sort === "Select") {
      return content.map((item) => (
        <SingleContent
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          date={item.first_air_date || item.release_date}
          media_type="movie"
          vote_average={item.vote_average}
          title={item.title || item.name}
        />
      ));
    } else if (sort === "IMDB(asc)") {
      return filteredData.map((item) => (
        <SingleContent
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          date={item.first_air_date || item.release_date}
          media_type="movie"
          vote_average={item.vote_average}
          title={item.title || item.name}
        />
      ));
    } else if (sort === "Year(asc)") {
      return filteredData.map((item) => (
        <SingleContent
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          date={item.first_air_date || item.release_date}
          media_type="movie"
          vote_average={item.vote_average}
          title={item.title || item.name}
        />
      ));
    }
  };

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_vide0=false&page=${page}`
    );

    setContent(data.results);
    setnumOfPages(data.total_pages);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value === "IMDB(asc)") {
      setfilteredData(
        content.sort(function (a, b) {
          return a.vote_average - b.vote_average;
        })
      );
    } else if (e.target.value === "Year(asc)") {
      setfilteredData(
        content.sort(function (a, b) {
          return (
            parseInt(a.release_date.split("-")[0]) -
            parseInt(b.release_date.split("-")[0])
          );
        })
      );
    }
  };

  console.log(filteredData);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      <span className="pageTitle">Movies</span>
      {/* <FilterMovie setPage={setPage} page={page} handleSort={handleSort} /> */}
      <div>
        <form style={{ marginBottom: "20px" }} action="">
          <label style={{ fontSize: "20px" }} htmlFor="">
            FILTER MOVIE&nbsp;&nbsp;&nbsp;
          </label>

          <select
            style={{
              padding: "10px 15px",
              fontFamily: "Montserrat",
              textTransform: "uppercase",
              outline: "none",
            }}
            name=""
            id="filter"
            defaultValue={"Select"}
            onChange={handleSort}
          >
            <option value="Select">Select</option>
            <option value="IMDB(asc)">IMDB(asc)</option>
            <option value="IMDB(des)">IMDB(des)</option>
            <option value="Year(asc)">Year(asc)</option>
            <option value="Year(des)">Year(des)</option>
          </select>
        </form>
      </div>
      <hr />
      <div className="trending">{filteredMovie()}</div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPAges={numOfPages} />
      )}
    </>
  );
};

export default Movies;
