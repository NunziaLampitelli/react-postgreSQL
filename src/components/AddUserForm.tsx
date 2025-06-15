import { useState } from "react";

type AddUserFormProps = {
	onAddUser: (name: string, email: string) => void;
};

export default function AddUserForm({ onAddUser }: AddUserFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (name && email) {
			onAddUser(name, email);
			setName("");
			setEmail("");
		}
	};

	return (
		<>
			<h2>Add an user</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
					style={{ marginRight: 8 }}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
					style={{ marginRight: 8 }}
				/>
				<button type="submit">Add</button>
			</form>
		</>
	);
}
