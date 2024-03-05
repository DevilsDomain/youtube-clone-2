import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  // Dummy playlist data
  const [playlists, setPlaylists] = useState(['Playlist 1', 'Playlist 2', 'Playlist 3']);
  const [showInputForm, setShowInputForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylistClick = () => {
    setShowInputForm(true);
  };

  const handleCreateClick = () => {
    // Handle the logic for creating the playlist
    console.log('Creating playlist with name:', newPlaylistName);
    // Update playlists state
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylistName]);
    // Reset the state and close inpt
    setShowInputForm(false);
    setNewPlaylistName('');
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
              <Link to={`/playlist/id`}>{playlist}</Link>
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
