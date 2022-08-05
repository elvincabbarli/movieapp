import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from "axios";
import "./Trending.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";

const Trending = () => {
  // Movies state
  const [movieContent, setMovieContent] = useState([]);

  // Pagination state
  const [page, setPage] = useState(1);

  // Fvorites state
  const [favorites, setFavorites] = useState([]);

  // Sending movie object to LocalStorage
  const setLocalStorage = (productId) => {
    let product = movieContent.find((product) => product.id === productId);
    let findInLocalStorage = favorites.find(
      (product) => product.id === productId
    );
    if (findInLocalStorage){
        findin()
        window.scroll(0, 0)
      return
    };
    let newFavouries = [...favorites, product];
    setFavorites(newFavouries);
    localStorage.setItem("favorites", JSON.stringify(newFavouries));
    window.scroll(0, 0)
    addedFav()
  };


  const removeLocalrstorage = (id) => {
    const itemsFav = JSON.parse(localStorage.getItem('favorites'))
    const filteredItems = itemsFav.filter(item => item.id !== id)
    console.log(filteredItems)
    setFavorites(filteredItems)
    localStorage.setItem('favorites' , JSON.stringify(filteredItems))
  }



  // POPUP FUNCTIONS
  const addedFav = () => {
    const popup2 = document.getElementById('pop-up-div2')
    const popupOverlay2 = document.getElementById('pop-up-overlay2')
    const closeButton2 = document.getElementById('close-button2')
    closeButton2.addEventListener('click' , () => {
      popup2.style.display = 'none'
      popupOverlay2.style.display = 'none'
    })
    popup2.style.display = 'flex'
    popupOverlay2.style.display = 'block'
  }

  const findin = () => {
    const popup = document.getElementById('pop-up-div')
    const popupOverlay = document.getElementById('pop-up-overlay')
    const closeButton = document.getElementById('close-button')
    closeButton.addEventListener('click' , () => {
      popup.style.display = 'none'
      popupOverlay.style.display = 'none'
    })
    popup.style.display = 'flex'
    popupOverlay.style.display = 'block'
  }

  // Getting movies from LocalStorage
  useEffect(() => {
    let favoritesFromStorage = JSON.parse(
      localStorage.getItem("favorites") || JSON.stringify([])
    );
    setFavorites([...favoritesFromStorage]);
  }, []);

  // Fetching trending movies from api
  const fecthTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setMovieContent(data.results.slice(0,8));
  };

  useEffect(() => {
    fecthTrending();
  }, [page]);

  return (
    <>
      <span className="pageTitle">Trendİng Lİst</span>
      <hr />
      <div id="pop-up-overlay" className="pop-up-overlay">
        <div id="pop-up-div" className="pop-up">
            <h2>Film already in Favorites</h2>
            <button id="close-button" > <FontAwesomeIcon icon={faCircleCheck} /></button>
        </div>
      </div>
      <div id="pop-up-overlay2" className="pop-up-overlay2">
        <div id="pop-up-div2" className="pop-up2">
            <h2>Film added Favorites</h2>
            <button id="close-button2" > <FontAwesomeIcon icon={faCircleCheck} /></button>
        </div>
      </div>
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
              removeLocalrstorage={removeLocalrstorage}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
