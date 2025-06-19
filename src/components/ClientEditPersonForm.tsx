import "./components-css/edit-person-form.css";
import { useState, useEffect } from "react";

type Person = {
	person_id?: number; 
	name: string;
	company?: string;
	address?: string;
	postal_code?: string;
	town?: string;
	state?: string;
	country?: string;
	work_phone?: string;
	home_phone?: string;
	cell_phone?: string;
	email?: string;
	category?: string;
	note?: string;
	status?: string;
	version?: string;
};

type Props = {
	person: Person | null;
	onSaved?: () => void;
};

export default function ClientEditPersonForm({ person, onSaved }: Props) {
	const initialState: Person = {
		person_id: undefined,
		name: "",
		company: "",
		address: "",
		postal_code: "",
		town: "",
		state: "",
		country: "",
		work_phone: "",
		home_phone: "",
		cell_phone: "",
		email: "",
		category: "",
		note: "",
		status: "",
		version: "",
	};

	const [formData, setFormData] = useState<Person>(initialState);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (person) {
			setFormData(person);
			setIsEditing(true);
		} else {
			setFormData(initialState);
			setIsEditing(false);
		}
	}, [person]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "person_id" ? Number(value) : value,
		}));
	}

	function handleNew() {
		setFormData(initialState);
		setIsEditing(false);
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		const token = localStorage.getItem("token");
		if (!token) return alert("Missing auth token.");

		const method = isEditing ? "PUT" : "POST";

		try {
			const bodyToSend = { ...formData };
			if (!isEditing) {
				delete bodyToSend.person_id;
			}

			if (bodyToSend.person_id !== undefined && bodyToSend.person_id !== null) {
				bodyToSend.person_id = Number(bodyToSend.person_id);
			}

			const response = await fetch(
				"https://*/api/person_api.php",
				{
					method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(bodyToSend),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Error");
			} else {
				alert(data.message);
				if (!isEditing) {
					setFormData(initialState);
					setIsEditing(false);
				}
				if (onSaved) onSaved();
			}
		} catch {
			alert("Net error");
		}
	}

	async function handleDelete() {
		const token = localStorage.getItem("token");
		if (!token) return alert("Missing token");

		if (!formData.person_id) return alert("Specify a valid id");

		if (!window.confirm("Are you sure you want to delete this person?")) return;

		try {
			const response = await fetch(
				"https://*/api/person_api.php",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ person_id: formData.person_id }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Error");
			} else {
				alert(data.message);
				setFormData(initialState);
				setIsEditing(false);
				if (onSaved) onSaved();
			}
		} catch {
			alert("Net error");
		}
	}

	return (
		<form className="edit-person-form" onSubmit={handleSubmit}>
			<h3>Edit</h3>

			<div className="input-group-top">
				<label>Person ID:</label>
				<input
					type="text"
					name="person_id"
					value={formData.person_id ?? ""}
					disabled
				/>
			</div>
			<div className="input-group-top">
				<label>Name:</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>

			<div className="form-grid">
				<div className="form-column">
					{["company", "town", "work_phone", "email"].map((field) => (
						<div className="input-group" key={field}>
							<label>
  {field.replace("_", " ").replace(/^\w/, c => c.toUpperCase()) + ":"}
</label>
							<input
								type={field === "email" ? "email" : "text"}
								name={field}
								value={(formData as any)[field]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>

				<div className="form-column">
					{["address", "state", "home_phone", "category"].map((field) => (
						<div className="input-group" key={field}>
							<label>
  {field.replace("_", " ").replace(/^\w/, c => c.toUpperCase()) + ":"}
</label>
							<input
								type="text"
								name={field}
								value={(formData as any)[field]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>

				<div className="form-column">
					{["postal_code", "country", "cell_phone"].map((field) => (
						<div className="input-group" key={field}>
							<label>
  {field.replace("_", " ").replace(/^\w/, c => c.toUpperCase()) + ":"}
</label>
							<input
								type="text"
								name={field}
								value={(formData as any)[field]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="textarea-section">
				<div className="input-group">
					<label>Note:</label>
					<textarea
						name="note"
						value={formData.note || ""}
						onChange={(event) => handleChange(event as any)}
					/>
				</div>
			</div>

			<div className="extra-info">
				<div className="input-group">
					<label>Status:</label>
					<input
						type="text"
						name="status"
						value={formData.status || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="input-group">
					<label>Version:</label>
					<input
						type="text"
						name="version"
						value={formData.version || ""}
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="last-row">
				<div>
					<strong>Last updated:</strong>
				</div>

				<div className="form-buttons">
					<button type="button" onClick={handleNew}>
						New
					</button>
					<button type="submit">Save</button>
					<button type="button" onClick={() => alert("Edit clicked")}>
						Edit
					</button>
					<button
						type="button"
						onClick={handleDelete}
						disabled={!formData.person_id}
					>
						Delete
					</button>
				</div>
			</div>
		</form>
	);
}