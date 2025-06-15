import type { User } from "../types";

type UsersTableProps = {
	users: User[];
	onDeleteUser: (id: number) => void;
};

export default function UsersTable({ users, onDeleteUser }: UsersTableProps) {
	return (
		<>
			<h1>Users</h1>
			{users.map((u) => (
				<div key={u.id} style={{ marginBottom: 8 }}>
					ID: {u.id} - {u.name} ({u.email}){" "}
					<button onClick={() => onDeleteUser(u.id)}>Delete</button>
				</div>
			))}
		</>
	);
}
