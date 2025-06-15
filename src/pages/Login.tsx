import React, { useState } from "react";
import "./pages-css/login.css";

type LoginProps = {
	onLoginSuccess: (token: string) => void;
};
export function Login({ onLoginSuccess }: LoginProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await fetch("https://*/api/login.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});

		const data = await res.json();

		if (res.ok && data.message === "Login successful" && data.token) {
			onLoginSuccess(data.token); 
		} else {
			setError(data.error || "Login error");
		}
	};

	return (
		<>
			<div className="login-page">
				<h1 className="login-h1">Log in</h1>
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</article>
					<button className="login-button" type="submit">
						Login
					</button>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</form>
			</div>
		</>
	);
}
