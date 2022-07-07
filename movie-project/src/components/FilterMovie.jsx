import React from "react";
import axios from "axios";
import { useEffect } from "react";

const FilterMovie = ({ setPage, page, handleSort }) => {
  const fetchFilter = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_vide0=false&page=${page}`
    );

    
    
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
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
          id=""
          defaultValue={"Select"}
          onChange={handleSort}
        >
          <option  value="Select">Select</option>
          <option value="IMDB(asc)">IMDB(asc)</option>
          <option value="IMDB(des)">IMDB(des)</option>
          <option value="Year(asc)">Year(asc)</option>
          <option value="Year(des)">Year(des)</option>
        </select>
      </form>
    </div>
  );
};

export default FilterMovie;
