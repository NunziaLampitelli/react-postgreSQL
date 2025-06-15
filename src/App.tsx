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

function App() {
	const [token, setToken] = useState<string | null>(null);

	const handleLoginSuccess = (newToken: string) => {
		setToken(newToken);
	};

	const handleLogout = () => {
		setToken(null);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/admin_login"
					element={
						token ? (
							<Admin onLogout={handleLogout} />
						) : (
							<Login onLoginSuccess={handleLoginSuccess} />
						)
					}
				/>
				<Route
					path="/admin"
					element={
						token ? (
							<Admin onLogout={handleLogout} />
						) : (
							<Navigate to="/admin_login" />
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
