import "./components-css/client-submenu.css";

type Props = {
	onSelect: (sub: string) => void;
	selected: string;
};

export default function ClientProductsSubMenu({ onSelect, selected }: Props) {
	const options = ["purchase", "history"];

	return (
		<nav className="client-submenu">
			{options.map((option) => (
				<button
					key={option}
					className={`submenu-button ${selected === option ? "active" : ""}`}
					onClick={() => onSelect(option)}
				>
				 {option.charAt(0).toUpperCase() + option.slice(1)}
				</button>
			))}
		</nav>
	);
}
