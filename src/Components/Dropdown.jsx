import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #f8f8f7;
  color: black;
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownContent = styled.ul`
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid grey;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 8px;
  margin-top: 8px;
  z-index: 1;

  ${DropdownContainer}:hover & {
    display: block;
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
    console.log(playlists)
  return (
    <DropdownContainer>
      <DropdownButton>Playlists</DropdownButton>
      <DropdownContent>
        {playlists.map((playlist, index) => (
          <li key={index}>
            <p>{playlist.name}</p>
          </li>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
}

export default Dropdown;
