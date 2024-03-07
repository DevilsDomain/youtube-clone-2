import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';
import PlaylistOverview from './PlaylistOverview';
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
`;

const VideoContainer = styled.div`
  width: 1000px;
  margin: 0 auto; 
  padding-top: 50px;
`;

const Title = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  padding-bottom: 5px;
  font-size: 25px;
`;

const Description = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-bottom: 5px;
  font-size: 15px;
`;


const ContentContainer = styled.div`
  flex: 1; /* Take remaining space */
  padding-left: 20px;
  widht: 100px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());
const PlaylistFetcher = (url) => fetch(url).then((r) => r.json());


function PlaylistWatch() {
  const { id, name, currentVideo } = useParams();
  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${currentVideo}`, fetcher);
  const { data: playlistData, error: playlistError, isLoading: playlistIsLoading } = useSWR(`https://youtube.thorsteinsson.is/api/playlists/${id}`, PlaylistFetcher);
  const [currentVideoID, setCurrentVideoID] = useState(currentVideo)
  const navigate = useNavigate(); 


  if (playlistError) return <div>failed to load</div>;
  if (playlistIsLoading) return <div>loading...</div>;
  
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const videoIDs = playlistData.videos.map((video) => video.videoId);
  

  let ReactPlayerUrl;
  try {
    ReactPlayerUrl = `${data.url.substring(0, 24)}embed/${currentVideo}`;
  } catch (err) {
    console.error("Error creating iframe src:", err);
    ReactPlayerUrl = null;
  }

  const handleOnEnded = () => {
    // Find the index of the current video ID
    const currentIndex = videoIDs.indexOf(currentVideoID);

    // If the current video is not the last one, set the next video ID
    if (currentIndex < videoIDs.length - 1) {
      const nextVideoID = videoIDs[currentIndex + 1];
      setCurrentVideoID(nextVideoID);

      // Update the URL to navigate to the next video
      navigate(`/playlist/${id}/${name}/${nextVideoID}`);
    }
  }




  return (
    <Wrapper>
      <VideoContainer>
        {ReactPlayerUrl ? (
          <ReactPlayer wrapper={VideoContainer}
           width={1000} 
           height={500} 
           url={ReactPlayerUrl}
           controls={true}
           playing={true}
           onEnded={handleOnEnded}
            />

        ) : (
          <p>Error loading video</p>
        )}
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        <Description>{data.channelName}</Description>
        <Description>{data.views} views</Description>
      </VideoContainer>
      <ContentContainer>
        <PlaylistOverview />
      </ContentContainer>
    </Wrapper>
  );
}

export default PlaylistWatch;
