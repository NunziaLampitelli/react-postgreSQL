import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

type Props = {
	onLogout: () => void;
};

export default function AdminLayout({ onLogout }: Props) {
	return (
		<div>
			<AdminHeader onLogout={onLogout} />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
