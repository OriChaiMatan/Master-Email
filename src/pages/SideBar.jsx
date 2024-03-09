import { Link, Outlet } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi2";



export function SideBar() {

    return <section className="side-bar">
    <nav>
        <Link to="/email/newemail"><button className="new-mail-btn"><HiOutlinePencil />  Compose</button></Link>
    </nav>
    <Outlet />
</section>
}