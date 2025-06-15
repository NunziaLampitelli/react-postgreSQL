import { useEffect, useState } from "react";
import type { User, Product, PurchaseDetail } from "../types";

type AdminProps = {
	onLogout: () => void;
};

export default function Admin({ onLogout }: AdminProps) {
	const handleLogout = async () => {
		try {
			const res = await fetch("https://******/api/logout.php", {
				method: "POST",
				credentials: "include",
			});
			const data = await res.json();
			console.log(data.message);
		} catch (error) {
			console.error("Logout failed:", error);
		}
		onLogout();
	};

	const [users, setUsers] = useState<User[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null
	);
	const [message, setMessage] = useState("");
	const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);

	const fetchUsers = async () => {
		try {
			const res = await fetch("https://******/api/api.php?action=users");
			const data = await res.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetch users:", error);
		}
	};

	const fetchProducts = async () => {
		try {
			const res = await fetch("https://******/api/api.php?action=products");
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			console.error("Error fetch products:", error);
		}
	};

	const addUser = async () => {
		if (!name || !email) return;
		try {
			await fetch("https://******/api/api.php?action=users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email }),
			});
			setName("");
			setEmail("");
			fetchUsers();
		} catch (error) {
			console.error("Error add user:", error);
		}
	};

	const deleteUser = async (id: number) => {
		try {
			await fetch("https://******/api/api.php?action=users", {
				method: "DELETE",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `id=${id}`,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error delete user:", error);
		}
	};

	const addPurchase = async () => {
		if (!selectedUserId || !selectedProductId) {
			setMessage("Select user or product");
			return;
		}
		try {
			const res = await fetch("https://******/api/api.php?action=purchases", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: selectedUserId,
					product_id: selectedProductId,
				}),
			});
			const data = await res.json();
			setMessage(data.message || "Purchase registered");
		} catch (error) {
			setMessage("Registration error");
			console.error("Error add purchase:", error);
		}
	};

	const fetchPurchaseDetails = async () => {
		try {
			const res = await fetch(
				"https://******/api/api.php?action=purchasedetails"
			);
			const data = await res.json();
			setPurchaseDetails(data);
		} catch (error) {
			console.error("Error fetching purchase details:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
		fetchProducts();
		fetchPurchaseDetails();
	}, []);

	return (
		<div style={{ padding: 20 }}>
			<button onClick={handleLogout} style={{ marginBottom: 20 }}>
				Logout
			</button>

			<h1>Users</h1>
			<div>
				{users.map((u) => (
					<div key={u.id} style={{ marginBottom: 8 }}>
						ID: {u.id} - {u.name} ({u.email}){" "}
						<button onClick={() => deleteUser(u.id)}>Delete</button>
					</div>
				))}
			</div>

			<h2>Add an user</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addUser();
				}}
			>
				<input
					type="text"
					placeholder="Name"
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
					style={{ marginRight: 8 }}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
					style={{ marginRight: 8 }}
				/>
				<button type="submit">Add</button>
			</form>

			<h1>Add a purchase</h1>
			<label>
				Select a user:
				<select
					value={selectedUserId ?? ""}
					onChange={(e) => setSelectedUserId(Number(e.target.value))}
					style={{ marginLeft: 8, marginRight: 16 }}
				>
					<option value="">-- Select user --</option>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.name}
						</option>
					))}
				</select>
			</label>

			<label>
				Select a product:
				<select
					value={selectedProductId ?? ""}
					onChange={(e) => setSelectedProductId(Number(e.target.value))}
					style={{ marginLeft: 8, marginRight: 16 }}
				>
					<option value="">-- Select product --</option>
					{products.map((p) => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
			</label>

			<button onClick={addPurchase}>Register shop</button>
			<p>{message}</p>

			<h1>Purchase History</h1>
			{purchaseDetails.length === 0 ? (
				<p>No purchases found</p>
			) : (
				<table style={{ borderCollapse: "collapse", width: "100%" }}>
					<thead>
						<tr>
							<th style={{ border: "1px solid black", padding: "8px" }}>
								User
							</th>
							<th style={{ border: "1px solid black", padding: "8px" }}>
								Product
							</th>
							<th style={{ border: "1px solid black", padding: "8px" }}>
								Purchase Date
							</th>
						</tr>
					</thead>
					<tbody>
						{purchaseDetails.map((p, i) => (
							<tr key={i}>
								<td style={{ border: "1px solid black", padding: "8px" }}>
									{p.user_name}
								</td>
								<td style={{ border: "1px solid black", padding: "8px" }}>
									{p.product_name}
								</td>
								<td style={{ border: "1px solid black", padding: "8px" }}>
									<time>{new Date(p.purchase_date).toLocaleString()}</time>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
