import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';
import PlaylistVideos from '../Components/PlaylistVideos';
import PlaylistOverview from './PlaylistOverview';

const Wrapper = styled.div`
  display: flex;
`;

const VideoContainer = styled.div`
  width: 1000px;
  margin: 0 auto; 
  padding-top: 50px;
`;

const VideoPlayer = styled.iframe`
  border-radius: 20px;
  border: none;
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

  console.log("playlist id: ", id, name, "videoid: ",currentVideo)
  
  if (playlistError) return <div>failed to load</div>;
  if (playlistIsLoading) return <div>loading...</div>;
  
  
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(playlistData.videos)

  let iframeSrc;
  try {
    iframeSrc = `${data.url.substring(0, 24)}embed/${currentVideo}`;
  } catch (err) {
    console.error("Error creating iframe src:", err);
    iframeSrc = null;
  }

  return (
    <Wrapper>
      <VideoContainer>
        {iframeSrc ? (
          <VideoPlayer width="1000" height="500" src={iframeSrc} allow="autoplay; fullscreen;"></VideoPlayer>

        ) : (
          <p>Error loading video</p>
        )}
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        <Description>{data.channelName}</Description>
        <Description>{data.views} views</Description>
      </VideoContainer>
      <ContentContainer>
        {/* <PlaylistVideos playlistVideos={playlistData.videos} id={id} name={name}/> */}
        <PlaylistOverview />
      </ContentContainer>
    </Wrapper>
  );
}

export default PlaylistWatch;
