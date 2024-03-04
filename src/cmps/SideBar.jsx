import { Link, Outlet } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";


export function SideBar() {

    return <section className="side-bar">
    <nav>
        <Link to="/email/newemail">Create new email <CiSquarePlus /></Link>
    </nav>
    <Outlet />
</section>
}