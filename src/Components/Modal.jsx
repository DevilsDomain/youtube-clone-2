import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

function Modal() {
  const [playlists, setPlaylists, updatePlaylistsStorage] = useLocalStorage('playlistsObject', []);
  const [showInputForm, setShowInputForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlistID, setPlaylistID] = useState('');

  const handleCreatePlaylistClick = () => {
    setShowInputForm(true);
  };

  const handleCreateClick = () => {
    axios.post('https://youtube.thorsteinsson.is/api/playlists', {
      name: newPlaylistName
    })
    .then(function (response) {
      console.log(response.data.id);
      setPlaylistID(response.data.id);
      setPlaylists((prevPlaylists) => [...prevPlaylists, { name: newPlaylistName, id: response.data.id }]);
    })
    .catch(function (error) {
      console.log(error);
    });

    setShowInputForm(false);
    setNewPlaylistName('');
    // Update local storage after creating a new playlist
    updatePlaylistsStorage([...playlists, { name: newPlaylistName, id: playlistID }]);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {showInputForm ? (
          <>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleCreateClick}>Create</button>
          </>
        ) : (
          <>
            <ul>
              {playlists.map((playlist, index) => (
                <li key={index}>
                  <Link to={`/playlist/${playlist.id}/${playlist.name}`}>{playlist.name}</Link>
                </li>
              ))}
            </ul>
            <button onClick={handleCreatePlaylistClick}>Create New Playlist</button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
