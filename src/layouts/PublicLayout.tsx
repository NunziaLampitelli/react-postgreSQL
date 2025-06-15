import { Outlet } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";

export default function PublicLayout() {
	return (
		<div>
			<PublicHeader />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
