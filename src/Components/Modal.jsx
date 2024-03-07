import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useLocalStorage } from './useLocalStorage';
import ConfettiExplosion from 'react-confetti-explosion';

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

const PlaylistName = styled.p`
  cursor: pointer;
`;

function Modal({ videoData }) {
  const [playlists, setPlaylists, updatePlaylistsStorage] = useLocalStorage('playlistsObject', []);
  const [showInputForm, setShowInputForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlistID, setPlaylistID] = useState('');
  const [confetti, setConfetti] = useState(false); // State for confetti

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
        // Set confetti to true when playlist is created
        setConfetti(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setShowInputForm(false);
    setNewPlaylistName('');
    // Update local storage after creating a new playlist
    updatePlaylistsStorage([...playlists, { name: newPlaylistName, id: playlistID }]);
  };

  const handleAddToPlaylist = (playlistId, videoData) => {
    console.log("Adding video to playlist:", playlistId);
    const { id: { videoId }, ...rest } = videoData;
    const modifiedVideoData = { videoId, ...rest };

    axios.post(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}/videos`, modifiedVideoData)
      .then(function (response) {
        console.log(response);
        // Set confetti to true when video is added to the playlist
        setConfetti(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleConfettiComplete = () => {
    setConfetti(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {/* ConfettiExplosion component conditionally rendered */}
        {confetti && <ConfettiExplosion onComplete={handleConfettiComplete} zIndex={1500} />}
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
                  <PlaylistName onClick={() => handleAddToPlaylist(playlist.id, videoData)}>{playlist.name}</PlaylistName>
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
