import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./pages-css/public-signup.css";

export default function PublicSignup() {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		birth_date: "",
		phone: "",
		email: "",
		password: "",
		confirm_password: "",
		accepted_terms: false,
	});

	const [message, setMessage] = useState("");
	const navigate = useNavigate(); 

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		const response = await fetch("https://*/api/clientSignup.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await response.json();
		if (data.success) {
			setMessage("Registration successful!");
			setTimeout(() => navigate("/public_login"), 1500); 
		} else {
			setMessage(data.error || "Registration failed");
		}
	}

	return (
		<div className="signup-page">
			<h1 className="signup-title">Create your account</h1>
	
			<form className="signup-form" onSubmit={handleSubmit}>
				<div className="form-columns">
					<div className="form-column">
						<label htmlFor="first_name">First Name</label>
						<input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
	
						<label htmlFor="birth_date">Birth Date</label>
						<input id="birth_date" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required />
	
						<label htmlFor="email">Email</label>
						<input id="signup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
					</div>
	
					<div className="form-column">
						<label htmlFor="last_name">Last Name</label>
						<input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
	
						<label htmlFor="phone">Phone</label>
						<input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
	
						<label htmlFor="password">Password</label>
						<input id="signup-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
	
						<label htmlFor="confirm_password">Confirm Password</label>
						<input id="signup-confirm_password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm Password" required />
					</div>
				</div>
	
				<div className="form-bottom">
					<label htmlFor="accepted_terms" className="terms-label">
						<input id="accepted_terms" name="accepted_terms" type="checkbox" checked={formData.accepted_terms} onChange={handleChange} required />
						I accept the terms and conditions
					</label>
	
					<button className="signup-button " type="submit">Sign Up</button>
					{message && <p>{message}</p>}
				</div>
			</form>
		</div>
	);
}	