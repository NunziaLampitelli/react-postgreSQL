import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages-css/login.css";
import { Link } from "react-router-dom";

type PublicLoginProps = {
	onLoginSuccess: (token: string) => void;
};

export default function PublicLogin({ onLoginSuccess }: PublicLoginProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(""); 

		try {
			const res = await fetch("https://*/api/clientLogin.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			const data = await res.json();
			console.log("Login response:", data);

			if (res.ok && data.token) {
				localStorage.setItem("token", data.token);
				onLoginSuccess(data.token);
				navigate("/dashboard");
			} else {
				setError(data.error || "Invalid email or password.");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An unexpected error occurred. Please try again later.");
		}
	};

	return (
		<div className="login-page">
			<div className="login-box">
				<h1 className="login-h1">User Login</h1>

				<form className="login-form" onSubmit={handleSubmit}>
					<article className="login-email">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							className="login-form-input"
							type="email"
							name="email"
							placeholder="Write your email here"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</article>

					<article className="login-password">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							className="login-form-input"
							type="password"
							name="password"
							placeholder="Write your password here"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</article>

					<button className="login-button" type="submit">
						Login
					</button>
					<p>
						Not a member yet? Click <Link to="/signup">here</Link> to sign up.
					</p>
					{error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
				</form>
			</div>
		</div>
	);
}
