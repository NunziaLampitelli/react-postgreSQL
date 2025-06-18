
type Props = {
	onSelect: (sub: string) => void;
	selected: string;
};

export default function SubMenu({ onSelect, selected }: Props) {
	const options = ["home", "list", "edit", "note"];

	return (
		<nav className="client-submenu">
			{options.map((option) => (
				<button
					key={option}
					className={`submenu-button ${selected === option ? "active" : ""}`}
					onClick={() => onSelect(option)}
				>
					Person {option.charAt(0).toUpperCase() + option.slice(1)}
				</button>
			))}
		</nav>
	);
}
