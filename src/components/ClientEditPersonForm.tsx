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
			<h3>{isEditing ? "Edit" : "New"}</h3>

			{isEditing && (
				<label>
					PERSON ID:
					<input
						type="text"
						name="person_id"
						value={formData.person_id ?? ""}
						disabled
					/>
				</label>
			)}

			{Object.keys(initialState).map((key) => {
				if (key === "person_id") return null;
				return (
					<label key={key}>
						{key.replace("_", " ").toUpperCase()}:
						<input
							type={key === "email" ? "email" : "text"}
							name={key}
							value={(formData as any)[key] || ""}
							onChange={handleChange}
						/>
					</label>
				);
			})}

			<div className="form-buttons">
				<button type="button" onClick={handleNew}>
					New
				</button>
				<button type="submit">Save</button>
				{isEditing && (
					<button type="button" onClick={handleDelete}>
						Delete
					</button>
				)}
			</div>
		</form>
	);
}
