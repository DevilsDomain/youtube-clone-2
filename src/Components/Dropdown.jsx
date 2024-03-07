import styled from "styled-components";
import { Link } from "react-router-dom";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: "Roboto", sans-serif;
`;

const DropdownButton = styled.p`
  background-color: #f8f8f7;
  color: black;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: white;


  &:hover {
    text-decoration: underline;
  }
`;

const DropdownContent = styled.ul`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid grey;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 8px;
  z-index: 1;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out; /* Add this line for easing effect */

  ${DropdownContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }

  li {
    list-style-type: none;
    padding: 8px 0;
    cursor: pointer;

    &:hover {
      background-color: #f8f8f7;
    }
  }
`;


function Dropdown({ playlists }) {
  return (
    <DropdownContainer>
      <DropdownButton>Playlists</DropdownButton>
      <DropdownContent>
        {playlists.map((playlist, index) => (
          <li key={index}>
            <Link to={`/playlist/${playlist.id}/${playlist.name}`}>{playlist.name}</Link>
          </li>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
}

export default Dropdown;
