import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import App from '../App';

const fetcher = (url) => fetch(url).then((r) => r.json());

function VideoPage() {
  const { videoID } = useParams();
  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoID}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  let iframeSrc;
  try {
    iframeSrc = `${data.url.substring(0, 24)}embed/${videoID}`;
  } catch (err) {
    console.error("Error creating iframe src:", err);
    iframeSrc = null;
  }

  return (
    <div>
      <div>
        {iframeSrc ? (
          <iframe width="420" height="315" src={iframeSrc}></iframe>
        ) : (
          <p>Error loading video</p>
        )}
        <p>{data.title}</p>
        <p>{data.description}</p>
        <p>{data.channelName}</p>
        <p>{data.views}</p>
      </div>
      <div>
        <h1>recommended videos</h1>
        <App />
      </div>
    </div>
  );
}

export default VideoPage;
