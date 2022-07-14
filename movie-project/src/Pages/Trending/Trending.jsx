import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";

const Trending = () => {
  const [movieContent, setMovieContent] = useState([]);
  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState([]);


  const setLocalStorage = (productId) => {
    let product = movieContent.find(product => product.id === productId)
    let findInLocalStorage = favorites.find(product => product.id === productId);
    if (findInLocalStorage) return;
    let newFavouries = [...favorites, product]
    setFavorites(newFavouries)
    localStorage.setItem("favorites", JSON.stringify(newFavouries))
}

useEffect(() => {
    let favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || JSON.stringify([]))
    setFavorites([...favoritesFromStorage])
}, [])

  const fecthTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setMovieContent(data.results);
  };

  useEffect(() => {
    fecthTrending();
  }, [page]);

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
              setLocalStorage={setLocalStorage}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
