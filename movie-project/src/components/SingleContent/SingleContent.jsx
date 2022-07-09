import React from "react";
import {img_300 , unavailable} from '../../config/config'
import {FavoriteBorder} from '@material-ui/icons';
import './SingleContent.css'
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {

  return (
    <ContentModal media_type={media_type} id={id} >
        < Badge badgeContent={Math.round(vote_average)} color={vote_average > 6 ? 'primary' : 'secondary'} />
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type}
        <br /> <br />
        <span className="subTitle">Release Date: {date }</span>
      </span>
      <button className="favorite-button">< FavoriteBorder /></button>
      
    </ContentModal>
  );
};

export default SingleContent;
