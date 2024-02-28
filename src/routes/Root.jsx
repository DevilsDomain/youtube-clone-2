import Navbar from "../Components/Navbar"
import { Outlet } from "react-router-dom";



function root() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet />
    </div>
  )
}

export default root