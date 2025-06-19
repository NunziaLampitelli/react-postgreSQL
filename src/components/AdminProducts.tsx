import { useEffect, useState } from "react";
import type { Product } from "../types";

export default function AdminProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		product_id: "",
	});

	const fetchProducts = async () => {
		const res = await fetch(
			"https://*/api/api.php?action=products"
		);
		const data = await res.json();
		setProducts(data);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const addProduct = async () => {
		await fetch("https://*/api/api.php?action=products", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: newProduct.name,
				price: parseFloat(newProduct.price),
				product_id: parseInt(newProduct.product_id),
			}),
		});
		setNewProduct({ name: "", price: "", product_id: "" });
		fetchProducts();
	};

	const updateProduct = async (product: Product) => {
		await fetch("https://*/api/api.php?action=products", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});
		fetchProducts();
	};

	const deleteProduct = async (id: number) => {
		await fetch("https://*/api/api.php?action=products", {
			method: "DELETE",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `id=${id}`,
		});
		fetchProducts();
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<h2>Products</h2>

			<h3>Add New Product</h3>
			<input
				name="name"
				placeholder="Name"
				value={newProduct.name}
				onChange={handleChange}
			/>
			<input
				name="price"
				placeholder="Price"
				value={newProduct.price}
				onChange={handleChange}
			/>
			<input
				name="product_id"
				placeholder="Product ID"
				value={newProduct.product_id}
				onChange={handleChange}
			/>
			<button onClick={addProduct}>Add Product</button>

			<h3>Product List</h3>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Product ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>
								<input
									value={product.name}
									onChange={(e) =>
										setProducts((p) =>
											p.map((pr) =>
												pr.id === product.id
													? { ...pr, name: e.target.value }
													: pr
											)
										)
									}
								/>
							</td>
							<td>
								<input
									type="number"
									value={product.price}
									onChange={(e) =>
										setProducts((p) =>
											p.map((pr) =>
												pr.id === product.id
													? { ...pr, price: parseFloat(e.target.value) }
													: pr
											)
										)
									}
								/>
							</td>
							<td>{product.product_id}</td>
							<td>
								<button onClick={() => updateProduct(product)}>Save</button>
								<button onClick={() => deleteProduct(product.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
