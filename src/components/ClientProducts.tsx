import { useEffect, useState } from "react";

type Product = {
	id: number;
	name: string;
	price: number;
};

type Props = {
	token: string;
	onPurchaseSuccess: () => void;
};

export default function ClientProducts({ token, onPurchaseSuccess }: Props) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch(
					"https://*/api/api.php?action=products"
				);
				if (!res.ok) throw new Error("Error loading products");
				const data = await res.json();
				setProducts(data);
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		fetchProducts();
	}, []);

	async function handlePurchase(productId: number) {
		try {
			const res = await fetch(
				"https://*/api/client_purchases_api.php",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ product_id: productId }),
				}
			);
			const data = await res.json();

			if (!res.ok) {
				alert("Error: " + (data.error || "Not possible to purchase"));
				return;
			}
			alert("Purchase successful!");
			onPurchaseSuccess();
		} catch (e) {
			alert("Request error!");
		}
	}

	if (loading) return <p>Loading products...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h2>Products</h2>
			<ul>
				{products.map((prod) => (
					<li key={prod.id}>
						{prod.name} - €{parseFloat(prod.price as any).toFixed(2)}{" "}
						<button onClick={() => handlePurchase(prod.id)}>Buy</button>
					</li>
				))}
			</ul>
		</div>
	);
}
