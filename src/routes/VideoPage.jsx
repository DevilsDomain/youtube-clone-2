import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import App from '../App';
import styled from 'styled-components';
import ReactPlayer from 'react-player/youtube'


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

function VideoPage() {
  const { videoID } = useParams();
  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoID}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  let ReactPlayerUrl;
  try {
    ReactPlayerUrl = `${data.url.substring(0, 24)}embed/${videoID}`;
  } catch (err) {
    console.error("Error creating iframe src:", err);
    ReactPlayerUrl = null;
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
        <RecVids>recommended videos</RecVids>
        <App />
      </ContentContainer>
    </Wrapper>
  );
}

export default VideoPage;
