import { useEffect, useState } from "react";
import "./components-css/client-purchases.css";

type Purchase = {
	purchase_id: number;
	product_name: string;
	price: number;
	purchase_date: string;
};

type Props = {
	token: string;
	onChange: () => void;
};

export default function ClientPurchases({ token, onChange }: Props) {
	const [purchases, setPurchases] = useState<Purchase[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Nuovi stati per filtri
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<"date" | "price">("date");
	const [sortAsc, setSortAsc] = useState(false);
	const [startDate, setStartDate] = useState<string>(""); // YYYY-MM-DD

	async function fetchPurchases() {
		try {
			const res = await fetch(
				"https://*/api/client_purchases_api.php",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (!res.ok) throw new Error("Error loading purchase history");
			const data = await res.json();
			setPurchases(data.map((p: any) => ({ ...p, price: Number(p.price) })));
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchPurchases();
	}, []);

	const filteredPurchases = purchases
		.filter((p) =>
			p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter((p) => {
			if (!startDate) return true;
			const purchaseDate = new Date(p.purchase_date).setHours(0, 0, 0, 0);
			const filterDate = new Date(startDate).setHours(0, 0, 0, 0);
			return purchaseDate >= filterDate;
		})
		.sort((a, b) => {
			let cmp = 0;
			if (sortBy === "date") {
				cmp =
					new Date(a.purchase_date).getTime() -
					new Date(b.purchase_date).getTime();
			} else {
				cmp = a.price - b.price;
			}
			return sortAsc ? cmp : -cmp;
		});

	async function handleDelete(purchase_id: number) {
		if (!confirm("Are you sure you want to delete this purchase?")) return;
		try {
			const res = await fetch(
				"https://*/api/client_purchases_api.php",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ purchase_id }),
				}
			);
			if (!res.ok) throw new Error("Deleting error");
			alert("Purchase deleted");
			fetchPurchases();
			onChange();
		} catch {
			alert("Error while deleting");
		}
	}

	if (loading) return <p>Loading purchases...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h2>Purchase history</h2>

			<input
				type="text"
				placeholder="Cerca prodotto..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginRight: "10px" }}
			/>

			<label>
				Data da:{" "}
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					style={{ marginRight: "10px" }}
				/>
			</label>

			<label>
				Ordina per:{" "}
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as "date" | "price")}
				>
					<option value="date">Data</option>
					<option value="price">Prezzo</option>
				</select>
			</label>

			<label style={{ marginLeft: "20px" }}>
				Ordine:{" "}
				<select
					value={sortAsc ? "asc" : "desc"}
					onChange={(e) => setSortAsc(e.target.value === "asc")}
				>
					<option value="asc">Crescente</option>
					<option value="desc">Decrescente</option>
				</select>
			</label>

			{filteredPurchases.length === 0 ? (
				<p>Nessun acquisto trovato</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Prodotto</th>
							<th>Prezzo</th>
							<th>Data acquisto</th>
							<th>Azioni</th>
						</tr>
					</thead>
					<tbody>
						{filteredPurchases.map((p) => (
							<tr key={p.purchase_id}>
								<td>{p.product_name}</td>
								<td>€{p.price.toFixed(2)}</td>
								<td>{new Date(p.purchase_date).toLocaleString()}</td>
								<td>
									<button onClick={() => handleDelete(p.purchase_id)}>
										Elimina
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
