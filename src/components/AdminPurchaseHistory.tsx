import type { PurchaseDetail } from "../types";

type Props = {
	purchaseDetails: PurchaseDetail[];
};

export default function AdminPurchaseHistory({ purchaseDetails }: Props) {
	return (
		<>
			<h1>All Client Purchases</h1>
			{purchaseDetails.length === 0 ? (
				<p>No purchases found</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Client</th>
							<th>Product</th>
							<th>Price</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{purchaseDetails.map((p, i) => (
							<tr key={i}>
								<td>{p.client_name}</td>
								<td>{p.product_name}</td>
								<td>{p.price}€</td>
								<td>{new Date(p.purchase_date).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}
