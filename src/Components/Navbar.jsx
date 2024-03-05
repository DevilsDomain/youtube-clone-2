import { Link } from "react-router-dom";
import LogoPNG from '../assets/Logo_of_YouTube_(2015-2017).svg.png';
import styled from "styled-components";
import { useSearch } from "./SearchContext";
import searchIcon from "../assets/Vector.svg"
import Dropdown from "./Dropdown";
import { useLocalStorage } from "./useLocalStorage";


const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.img`
  width: 85px;
  height: 40px;
`;

const SearchForm = styled.form`
  display: flex;
  margin-left: 20px; /* Adjust the margin as needed */
`;

const SearchInput = styled.input`
  padding: 8px;
  width: 600px;
  height: 23px;
  border: 1px solid grey;
  border-radius: 20px 0px 0px 20px;
`;

const SearchButton = styled.button`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 60px;
  height: 41px;
  border: 1px solid grey;
  border-radius: 0px 20px 20px 0px;
  background-color: #F8F8F7;
  background-image: url('${searchIcon}'); /* Replace with the path to your image */
  background-size: fill;
  background-repeat: no-repeat;
  background-position: center;
`;


function Navbar() {
  const [playlists] = useLocalStorage('playlistsObject', []);
  const { setSearchQuery } = useSearch();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.querySelector('input').value;
    setSearchQuery(inputValue);
  };

  return (
    <NavbarContainer>
      <LogoLink to="/">
        <Logo src={LogoPNG} alt="Youtube logo" />
      </LogoLink>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Search videos..."
          onKeyDown={handleKeyDown}
        />
        <SearchButton type="submit"></SearchButton>
      </SearchForm>
      {
        playlists.length !== 0 ?
        <Dropdown playlists={playlists} /> :
        null
      }
    </NavbarContainer>
  );
}

export default Navbar;
