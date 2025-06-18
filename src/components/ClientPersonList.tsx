import { useEffect, useState } from "react";

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
				const response = await fetch("https://*/api/person_api.php", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
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
		<div>
			<h3>List of Persons</h3>
			<ul>
				{persons.length === 0 && <li>No persons found.</li>}
				{persons.map((person) => (
					<li
						key={person.person_id}
						onClick={() => onSelectPerson(person)}
						style={{ cursor: "pointer" }}
						title="Click to edit"
					>
						{person.name} {person.surname || ""} - {person.company || ""}
					</li>
				))}
			</ul>
		</div>
	);
}
