import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Video from '../Components/Video';

const fetcher = (url) => fetch(url).then((r) => r.json());

function PlaylistOverview() {
  const { id, name } = useParams();
  const { data, error, isLoading } = useSWR(
    ` https://youtube.thorsteinsson.is/api/playlists/${id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data)
  return (
    <div>
      <h1>{name}</h1>
      <p>{id}</p>
      {/* {data.map((video) => (
        <Video video={video} key={video.id.videoId} />
      ))} */}
    </div>
  )
}

export default PlaylistOverview