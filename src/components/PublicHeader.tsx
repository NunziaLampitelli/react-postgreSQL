import "./components-css/public-header.css";
import { Link } from "react-router-dom";
import Logo from "../assets/postgresql.png";

type PublicHeaderProps = {
	className?: string;
};

export default function PublicHeader({ className }: PublicHeaderProps) {
	return (
		<header className={`public-header ${className ?? ""}`}>
			<article className="public-header-article">
				<img id="header-logo" src={Logo} alt="" />
				<Link to="/" className="public-header-h2">
					PostgreSQL
				</Link>
			</article>
			
			<nav className="public-header-nav">
				<Link to="/products">Products</Link>
				<Link to="courses">Courses</Link>
				<Link to="contacts">Contacts</Link>
				<Link to="public_login">Login</Link>
			</nav>
		</header>
	);
}
