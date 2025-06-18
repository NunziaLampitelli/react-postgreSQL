import "./components-css/public-navbar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className="navbar">
			<NavLink
				to="/products"
				className={({ isActive }) =>
					isActive ? "navbar-link active" : "navbar-link"
				}
			>
				Produkter
			</NavLink>
			<NavLink
				to="products/rScada"
				className={({ isActive }) =>
					isActive ? "navbar-link active" : "navbar-link"
				}
			>
				rScada
			</NavLink>
			<NavLink
				to="products/rBis"
				className={({ isActive }) =>
					isActive ? "navbar-link active" : "navbar-link"
				}
			>
				rBis
			</NavLink>
			<NavLink
				to="products/rBisScada"
				className={({ isActive }) =>
					isActive ? "navbar-link active" : "navbar-link"
				}
			>
				rBisScada
			</NavLink>
		</nav>
	);
}
