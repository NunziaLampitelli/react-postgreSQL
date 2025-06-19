import { useState } from "react";
import { BrowserRouter as Router,	Routes,	Route, Navigate,} from "react-router-dom";
import { AdminLogin } from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Products";
import Contacts from "./pages/Contacts";
import Courses from "./pages/Courses";
import PublicLogin from "./pages/PublicLogin";
import PublicSignup from "./pages/PublicSignup";
import ClientDashboard from "./pages/ClientDashboard";
import RBis from "./pages/rBis";

function App() {
	const [adminToken, setAdminToken] = useState<string | null>(null);
	const [clientToken, setClientToken] = useState<string | null>(null);

	const handleAdminLogin = (token: string) => setAdminToken(token);
	const handleUserLogin = (token: string) => setClientToken(token);

	const handleLogout = () => {
		setAdminToken(null);
		setClientToken(null);
	};

	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route element={<PublicLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/rBis" element={<RBis />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route
						path="/public_login"
						element={<PublicLogin onLoginSuccess={handleUserLogin} />}
					/>
					<Route path="/signup" element={<PublicSignup />} />
					<Route
						path="/admin_login"
						element={
							adminToken ? (
								<Navigate to="/admin" />
							) : (
								<AdminLogin onLoginSuccess={handleAdminLogin} />
							)
						}
					/>
				</Route>

				{/* Admin routes */}
				{adminToken && (
					<Route element={<AdminLayout />}>
						<Route path="/admin" element={<Admin onLogout={handleLogout} />} />
					</Route>
				)}
				{!adminToken && (
					<Route path="/admin" element={<Navigate to="/admin_login" />} />
				)}

				{/* User dashboard route */}
				{clientToken && (
					<Route
						path="/dashboard"
						element={
							<ClientDashboard token={clientToken} onLogout={handleLogout} />
						}
					/>
				)}
				{!clientToken && (
					<Route path="/dashboard" element={<Navigate to="/public_login" />} />
				)}
			</Routes>
		</Router>
	);
}

export default App;
