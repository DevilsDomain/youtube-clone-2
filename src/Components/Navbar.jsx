import { Link } from "react-router-dom"
import LogoPNG from '../assets/Logo_of_YouTube_(2015-2017).svg.png'
import styled from "styled-components";

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.img`
  width: 100px;
  height: 45px;
`;

function Navbar() {
  return (
    <div>
        <LogoLink to="/">
        <Logo src={LogoPNG} alt="Youtube logo" />
        </LogoLink>
        <input />
        <button>search</button>
    </div>
  )
}

export default Navbar