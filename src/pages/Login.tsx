import React, { useState } from "react";

type LoginProps = {
	onLoginSuccess: (token: string) => void;
};
export function Login({ onLoginSuccess }: LoginProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await fetch("https://********/api/login.php", {
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
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
}
