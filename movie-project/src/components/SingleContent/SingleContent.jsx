import React, { useState } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const SingleContent = ({id,poster,title,date,media_type,vote_average,}) => {

  const handleChange = (e) =>{
    console.log(e.target.parentElement.parentElement.childNodes)
  }


  return (
    <div style={{ display: "inline-block", flexDirection: "column" , position: 'relative', marginBottom: '20px' }} className='singlecontent-container' >
      <div className="badge">
        ⭐  
          {Math.round(vote_average)}
        </div>
          <button className="fav-button" onClick={handleChange} style={{background: 'red' , color: '#fff' , border: 'none' , cursor: 'pointer'}}>
              < FontAwesomeIcon icon={faHeart} />
          </button>
       
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
         <ContentModal media_type={media_type} id={id}>
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type}
          <br /> <br />
          <span className="subTitle">Release Date: {date}</span>
        </span>
      </ContentModal>
    </div>
  );
};

export default SingleContent;
