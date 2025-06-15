import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
	const [token, setToken] = useState<string | null>(null);

	const handleLoginSuccess = (newToken: string) => setToken(newToken);
	const handleLogout = () => setToken(null);

	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route element={<PublicLayout />}>
					<Route path="/" element={<Home />} />
					<Route
						path="/admin_login"
						element={
							token ? (
								<Navigate to="/admin" />
							) : (
								<Login onLoginSuccess={handleLoginSuccess} />
							)
						}
					/>
				</Route>

				{/* Admin routes */}
				{token && (
					<Route element={<AdminLayout onLogout={handleLogout} />}>
						<Route path="/admin" element={<Admin onLogout={handleLogout} />} />
					</Route>
				)}

				{/* Redirect to login if not authenticated */}
				{!token && (
					<Route path="/admin" element={<Navigate to="/admin_login" />} />
				)}
			</Routes>
		</Router>
	);
}

export default App;
