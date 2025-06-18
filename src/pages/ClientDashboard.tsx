import { useState } from "react";
import PublicHeader from "../components/PublicHeader";
import ClientNavbar from "../components/ClientNavbar";
import ClientSubMenu from "../components/ClientSubMenu";
import ClientEditPersonForm from "../components/ClientEditPersonForm";
import ClientPersonList from "../components/ClientPersonList";

type ClientDashboardProps = {
	onLogout: () => void;
};

export type Person = {
	person_id: string;
	name: string;
	surname?: string;
	company?: string;
};

export default function ClientDashboard({ onLogout }: ClientDashboardProps) {
	const [mainSection, setMainSection] = useState("start");
	const [subSection, setSubSection] = useState("");
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

	function handleSelectPerson(person: Person) {
		setSelectedPerson(person);
		setMainSection("contacts");
		setSubSection("edit");
	}

	function handleFormSaved() {
		setSelectedPerson(null);
		setSubSection("");
	}

	const personForEdit =
		selectedPerson === null
			? null
			: {
					...selectedPerson,
					person_id: Number(selectedPerson.person_id),
			  };

	return (
		<>
			<PublicHeader />
			<ClientNavbar onSelect={setMainSection} selected={mainSection} />
			<button onClick={onLogout}>Logout</button>

			{mainSection === "contacts" && (
				<ClientSubMenu onSelect={setSubSection} selected={subSection} />
			)}

			<div className="client-content">
				{mainSection === "start" && <p>Welcome</p>}

				{mainSection === "contacts" && subSection === "list" && (
					<ClientPersonList onSelectPerson={handleSelectPerson} />
				)}

				{mainSection === "contacts" && subSection === "edit" && (
					<ClientEditPersonForm
						person={personForEdit}
						onSaved={handleFormSaved}
					/>
				)}
			</div>
		</>
	);
}
