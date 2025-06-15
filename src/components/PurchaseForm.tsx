import { useState } from "react";
import type { User, Product } from "../types";

type PurchaseFormProps = {
	users: User[];
	products: Product[];
	onAddPurchase: (userId: number, productId: number) => void;
	message: string;
};

export default function PurchaseForm({
	users,
	products,
	onAddPurchase,
	message,
}: PurchaseFormProps) {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null
	);

	return (
		<>
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

			<button
				onClick={() => {
					if (selectedUserId && selectedProductId) {
						onAddPurchase(selectedUserId, selectedProductId);
					}
				}}
			>
				Register shop
			</button>
			<p>{message}</p>
		</>
	);
}
