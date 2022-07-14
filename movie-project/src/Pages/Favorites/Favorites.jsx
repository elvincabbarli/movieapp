import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Favorites.css'

const Favorites = () => {
  const [localFilms , setLocalFilms] = useState([])

  useEffect(() => {
    const myFilms = JSON.parse(localStorage.getItem('favorites') || JSON.stringify([]))
    setLocalFilms(myFilms)
   
  } , [])

  console.log(localFilms)

  return(
    <div className="container">
      <span className="pageTitle">Favorite Movies</span>
      <br />
      <div className="favorites-container">
        {
          localFilms.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              date={item.first_air_date || item.release_date}
              media_type={item.tagline}
              vote_average={item.vote_average}
              title={item.title || item.name}
          />
          ))
          
     
        

          
        
        
        }
     
      </div>
    </div>
  ) 
};

export default Favorites;
