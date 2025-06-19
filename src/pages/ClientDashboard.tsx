import { useState } from "react";
import PublicHeader from "../components/PublicHeader";
import ClientNavbar from "../components/ClientNavbar";
import ClientSubMenu from "../components/ClientSubMenu";
import ClientEditPersonForm from "../components/ClientEditPersonForm";
import ClientPersonList from "../components/ClientPersonList";
import MaterialSubMenu from "../components/MaterialSubMenu";
import ClientMaterialCalendar from "../components/ClientMaterialCalendar";
import ClientProducts from "../components/ClientProducts";
import ClientPurchases from "../components/ClientPurchases";
import ClientProductsSubMenu from "../components/ClientProductsSubMenu"; 

type ClientDashboardProps = {
	onLogout: () => void;
	token: string;
};

export type Person = {
	person_id: string;
	name: string;
	surname?: string;
	company?: string;
};

export default function ClientDashboard({
	onLogout,
	token,
}: ClientDashboardProps) {
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

			<div className="client-content">
				{mainSection === "start" && <p>Welcome!</p>}

				{mainSection === "products" && (
					<>
						<ClientProductsSubMenu onSelect={setSubSection} selected={subSection} />

						{subSection === "purchase" && (
							<ClientProducts
								token={token}
								onPurchaseSuccess={() => alert("Thank you!")}
							/>
						)}

						{subSection === "history" && (
							<ClientPurchases
								token={token}
								onChange={() => {
								}}
							/>
						)}

						{!subSection && <p>Select an option</p>}
					</>
				)}

				{mainSection === "purchases" && (
					<ClientPurchases
						token={token}
						onChange={() => {

						}}
					/>
				)}

				{mainSection === "contacts" && (
					<>
						<ClientSubMenu onSelect={setSubSection} selected={subSection} />

						{subSection === "list" && (
							<ClientPersonList onSelectPerson={handleSelectPerson} />
						)}

						{subSection === "edit" && (
							<ClientEditPersonForm
								person={personForEdit}
								onSaved={handleFormSaved}
							/>
						)}
					</>
				)}

				{mainSection === "materials" && (
					<>
						<MaterialSubMenu onSelect={setSubSection} selected={subSection} />

						{subSection === "home" && <p>Material Orders Home</p>}
						{subSection === "list" && <p>Material Orders List</p>}
						{subSection === "calendar" && <ClientMaterialCalendar />}
						{subSection === "edit" && <p>Material Orders Edit</p>}
					</>
				)}
			</div>
		</>
	);
}
