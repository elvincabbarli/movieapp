import React, { useEffect, useState , useContext } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import AuthContext from "../../store/auth-context";
import "./Favorites.css";

const Favorites = () => {
  const [localFilms, setLocalFilms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn


  const removeLocalrstorage = (id) => {
    const itemsFav = JSON.parse(localStorage.getItem('favorites'))
    const filteredItems = itemsFav.filter(item => item.id !== id)
    console.log(filteredItems)
    setFavorites(filteredItems)
    localStorage.setItem('favorites' , JSON.stringify(filteredItems))
  }

  useEffect(() => {
    const myFilms = JSON.parse(
      localStorage.getItem("favorites") || JSON.stringify([])
    );
    setLocalFilms(myFilms);
  }, []);

  console.log(localFilms);

  return (
    <div className="container">
      <span className="pageTitle">Favorite Movies</span>
      <hr />
      <br />
      {
        isLoggedIn ?  <div className="favorites-container">
        {localFilms && localFilms.map((item) => (
          <SingleContent
            key={item.id}
            id={item.id}
            poster={item.poster_path}
            date={item.first_air_date || item.release_date}
            media_type={item.media_type}
            vote_average={item.vote_average}
            title={item.title || item.name}
            removeLocalrstorage={removeLocalrstorage}
          />
        ))}
      </div>
      : null
      }
     
    </div>
  );
};

export default Favorites;
