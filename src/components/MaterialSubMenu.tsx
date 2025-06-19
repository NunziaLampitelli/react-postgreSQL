type Props = {
	onSelect: (sub: string) => void;
	selected: string;
};

export default function MaterialSubMenu({ onSelect, selected }: Props) {
	const options = ["home", "list", "calendar", "edit"];

	return (
		<nav className="material-submenu">
			{options.map((option) => (
				<button
					key={option}
					className={`submenu-button ${selected === option ? "active" : ""}`}
					onClick={() => onSelect(option)}
				>
					Material Orders {option.charAt(0).toUpperCase() + option.slice(1)}
				</button>
			))}
		</nav>
	);
}
