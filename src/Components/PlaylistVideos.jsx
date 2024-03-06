import Video from './Video';
import styled from 'styled-components';

const fetcher = (url) => fetch(url).then((r) => r.json());

const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 0 auto; 
  padding-top: 50px;
  max-width: 1300px;
  gap: 20px 20px; 
`;

function PlaylistVideos({playlistVideos}) {

  return (
    <VideosContainer>
      {playlistVideos.map((video) => (
        <Video video={video} playlist={false} key={video.id.videoId} />
      ))}
    </VideosContainer>
  );
}

export default PlaylistVideos;
