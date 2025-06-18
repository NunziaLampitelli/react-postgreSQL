import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import PublicFooter from "../components/PublicFooter";



export default function AdminLayout() {
	return (
		<div>
			<AdminHeader />
			<main>
				<Outlet />
			</main>
			<PublicFooter />			
		</div>
	);
}
