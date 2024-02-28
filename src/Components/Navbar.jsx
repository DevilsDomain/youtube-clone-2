import { Link } from "react-router-dom"
import LogoPNG from '../assets/Logo_of_YouTube_(2015-2017).svg.png'
import styled from "styled-components";
import { useSearch } from "./SearchContext";

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.img`
  width: 100px;
  height: 45px;
`;

function Navbar() {
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
    <div>
      <LogoLink to="/">
        <Logo src={LogoPNG} alt="Youtube logo" />
      </LogoLink>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search videos..."
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Navbar;
