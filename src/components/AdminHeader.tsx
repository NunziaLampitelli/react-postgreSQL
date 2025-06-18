import "./components-css/admin-header.css";
import { Link } from "react-router-dom";
import Logo from "../assets/postgresql.png";



export default function AdminHeader() {
	return (
		<header className="adm-header" >
			<article className="adm-header-article">

				<img className="adm-logo" src={Logo} alt="" />
				<Link to="/" className="adm-header-h2">
					PostgreSQL
				</Link>
			</article>

			<h2>Admin area</h2>
			
		</header>
	);
}

