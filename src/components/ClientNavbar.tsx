import "./components-css/client-navbar.css";

type Props = {
	onSelect: (section: string) => void;
	selected: string;
};

export default function ClientNavbar({ onSelect, selected }: Props) {
	const sections = [
		"start",
		"system info",
		"contacts",
		"materials",
		"products",
		"network admin",
		"ledger",
		"timelog",
	];

	return (
		<nav className="client-navbar">
			{sections.map((section) => (
				<p
					key={section}
					className={`client-navbar-link ${
						selected === section ? "active" : ""
					}`}
					onClick={() => onSelect(section)}
					style={{ cursor: "pointer" }}
				>
					{section.charAt(0).toUpperCase() + section.slice(1)}
				</p>
			))}
		</nav>
	);
}
