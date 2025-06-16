import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";
import { Outlet } from "react-router-dom";
import "./layouts-css/public-layout.css";

export default function PublicLayout() {
	return (
		<div className="public-layout-container">
			<PublicHeader className="public-layout-header" />
			<main className="public-layout-main">
				<Outlet />
			</main>
			<PublicFooter className="public-layout-footer" />
		</div>
	);
}
