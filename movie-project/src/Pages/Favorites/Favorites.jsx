import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";

const Favorites = () => {
  const [localFilms , setLocalFilms] = useState([])

  const getFilms = () =>{
    const myFilms = JSON.parse(localStorage.getItem('Films'))
    setLocalFilms(myFilms)
    console.log(localFilms)
  }

  useEffect(() => {
    getFilms()
  } , [])

  return(
    <div className="container">
      <span className="pageTitle">Favorite Movies</span>
      <br />
      <div>
        {localFilms &&
          <SingleContent
          key={localFilms.id}
          id={localFilms.id}
          poster={localFilms.poster_path}
          date={localFilms.first_air_date || localFilms.release_date}
          media_type={localFilms.tagline}
          vote_average={localFilms.vote_average}
          title={localFilms.title || localFilms.name}
          />
        
        
        }
     
      </div>
    </div>
  ) 
};

export default Favorites;
