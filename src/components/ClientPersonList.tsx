import { useEffect, useState } from "react";
import "./components-css/client-person-list.css";

type Person = {
	person_id: string;
	name: string;
	surname?: string;
	company?: string;
};

type Props = {
	onSelectPerson: (person: Person) => void;
};

export default function ClientPersonList({ onSelectPerson }: Props) {
	const [persons, setPersons] = useState<Person[]>([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		async function fetchPersons() {
			if (!token) {
				alert("Missing auth token.");
				return;
			}
			try {
				const response = await fetch(
					"https://*/api/person_api.php",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				if (!response.ok) {
					alert(data.error || "Error fetching persons");
					return;
				}
				setPersons(data || []);
			} catch {
				alert("Network error while fetching persons");
			}
		}

		fetchPersons();
	}, [token]);

	return (
		<div className="client-person-list-page">
			<h3 className="person-list-h3">Person list</h3>
			{persons.length === 0 ? (
				<p>No persons found.</p>
			) : (
				<table className="person-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Company</th>
						</tr>
					</thead>
					<tbody>
						{persons.map((person) => (
							<tr
								key={person.person_id}
								onClick={() => onSelectPerson(person)}
								style={{ cursor: "pointer" }}
								title="Click to edit"
							>
								<td>{person.person_id}</td>
								<td>{person.name}</td>
								<td>{person.company || "-"}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
