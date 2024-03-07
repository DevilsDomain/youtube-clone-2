import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Video from '../Components/Video';
import styled from 'styled-components';


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

const Title = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  padding-bottom: 5px;
  font-size: 25px;
  display: flex;
  justify-content: center;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());
function PlaylistOverview() {
  const { id, name } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    ` https://youtube.thorsteinsson.is/api/playlists/${id}`,
    fetcher
  );

  const handleVideoDelete = () => {
    mutate();
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
    <Title>{name}</Title>
    <VideosContainer>
      {data.videos.map((video, index) => (
        <Video video={video} playlist={true} id={id} name={name} onVideoDelete={handleVideoDelete} key={index} />
        ))}
    </VideosContainer>
    </>
  )
}

export default PlaylistOverview