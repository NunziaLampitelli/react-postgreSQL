import type { PurchaseDetail } from "../types";

type Props = {
	purchaseDetails: PurchaseDetail[];
};

export default function PurchaseHistory({ purchaseDetails }: Props) {
	return (
		<>
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
		</>
	);
}
