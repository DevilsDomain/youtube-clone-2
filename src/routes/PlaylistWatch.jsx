import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import App from '../App';
import styled from 'styled-components';

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

const RecVids = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  padding-bottom: 5px;
  font-size: 30px;
  margin: 0;
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
  console.log(playlistData)

  if (playlistError) return <div>failed to load</div>;
  if (playlistIsLoading) return <div>loading...</div>;


  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
          <VideoPlayer width="1000" height="500" src={iframeSrc}></VideoPlayer>
        ) : (
          <p>Error loading video</p>
        )}
        {/* <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        <Description>{data.channelName}</Description>
        <Description>{data.views} views</Description> */}
      </VideoContainer>
      <ContentContainer>
        <RecVids>{name}</RecVids>
        {/* <App /> */}
      </ContentContainer>
    </Wrapper>
  );
}

export default PlaylistWatch;
