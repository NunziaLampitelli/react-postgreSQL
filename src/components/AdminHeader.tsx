// AdminHeader.tsx
type Props = { onLogout: () => void };

export default function AdminHeader({ onLogout }: Props) {
	return (
		<header style={{ background: "#003366", color: "white", padding: "10px" }}>
			<h2>Admin area</h2>
			<button onClick={onLogout}>Logout</button>
		</header>
	);
}
