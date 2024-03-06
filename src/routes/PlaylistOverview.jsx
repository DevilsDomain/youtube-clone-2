import { useParams } from 'react-router-dom';

function PlaylistOverview() {
  const { id, name } = useParams();

  return (
    <div>
      <h1>{name}</h1>
      <p>{id}</p>
    </div>
  )
}

export default PlaylistOverview