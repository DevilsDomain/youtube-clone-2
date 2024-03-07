import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import options from "../assets/options.svg"
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

const VideoContainer = styled(Link)`
  display: flex;
  border-radius: 20px;
  text-decoration: none; /* Remove text decoration from VideoContainer */
  color: black;
  width: 350px;
  font-family: "Roboto", sans-serif;

  div p {
    text-decoration: none;
    margin: 0;
    padding-left: 10px;
  }
`;

const Thumbnail = styled.img`
  width: 350px;
  height: 200px;
  border-radius: 20px;
`


const Title = styled.p`
    font-weight: 700;
    font-style: normal;
    padding-bottom: 5px;
`
const TitleThin = styled.p`
    font-weight: 200px;
    font-style: normal;
    color: #606061;
    font-size: 14px;
    padding-bottom: 2px;
`
const Options = styled.img`
  height: 18px;
  padding-top: 16px;
  padding-left: 0px;
  cursor: pointer;
`

function Video({ video, playlist, id, name }) {
  const [toggle, setToggle] = useState(false)
  const [modal, setModal] = useState(false)

  const handleClick = (e) => {
    window.location.href = playlist ? (`/playlist/${id}/${name}/${video.videoId}`) :  (`/video/${video.id.videoId}`)
  }

  const deleteVideo = () => {
    axios
      .delete(`https://youtube.thorsteinsson.is/api/playlists/${id}/videos/${video.videoId}`)
      .then((response) => {
        // Handle success, you might want to update the UI or perform other actions
        console.log("Video deleted successfully");
        console.log(response)
      })
      .catch((error) => {
        // Handle error, you might want to show an error message
        console.error("Error deleting video:", error);
      });
  };



  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  return (
    <>
    <div onClick={(e) => handleClick(e)}>
      <VideoContainer>
        <motion.div whileHover={{scale: 1.07}}>
          <Thumbnail src={video.snippet.thumbnails.url} alt={video.title} />
          <Title>{video.title}</Title>
          <TitleThin>{video.channelName}</TitleThin>
          <TitleThin>{video.views} views</TitleThin>
        </motion.div>
      </VideoContainer>
    </div>
    <Options src={options}
     alt="three circles on-top of each other"
     onClick={() => {setToggle(!toggle)}} />
     {
      toggle ?
      <button onClick={() => {setModal(true)}}>Add to playlist</button>
      :
      null
     }
     {
      modal ?
      <Modal videoData={video} /> :
      null
     }
     {
      playlist ? 
      <button onClick={deleteVideo}>Delete</button> :
      null
     }
    </>
  );
}

export default Video;
