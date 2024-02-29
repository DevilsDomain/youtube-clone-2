import { Link } from "react-router-dom";
import styled from "styled-components";

const VideoContainer = styled(Link)`
  display: flex;
  border-radius: 20px;
  text-decoration: none; /* Remove text decoration from VideoContainer */
  color: black;
  width: 400px;
  font-family: "Roboto", sans-serif;

  div p {
    text-decoration: none;
    margin: 0;
    padding-left: 10px;
  }
  div img {
    width: 400px;
    height: 200px;
    border-radius: 20px;
  }
`;

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

function Video({ video }) {
  return (
    <VideoContainer to={`/video/${video.id.videoId}`}>
      <div>
        {/* <duration>{video.duration_raw}</duration> */}
        <img src={video.snippet.thumbnails.url} alt={video.title} />
        <Title>{video.title}</Title>
        <TitleThin>{video.channelName}</TitleThin>
        <TitleThin>{video.views} views</TitleThin>
      </div>
    </VideoContainer>
  );
}

export default Video;
