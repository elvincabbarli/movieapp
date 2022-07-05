import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'

const Trending = () => {
  const [movieContent, setMovieContent] = useState([]);

  const fecthTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );

    setMovieContent(data.results);
  };

  useEffect(() => {
    fecthTrending();
  }, []);

  return (
    <>
      <span className="pageTitle">Trending</span>
      <hr />
      <div className="trending">
        {movieContent &&
          movieContent.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
              title={item.title || item.name}
            />
          ))}
      </div>
    </>
  );
};

export default Trending;
