import { useParams } from 'react-router-dom';

function PlaylistOverview() {
    const { id } = useParams();
  return (
    <div>{id}</div>
  )
}

export default PlaylistOverview