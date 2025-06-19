import { useEffect, useState } from "react";
import AdminClients from "../components/AdminClients";
import AddUserForm from "../components/AddUserForm";
import PurchaseForm from "../components/PurchaseForm";
import AdminPurchaseHistory from "../components/AdminPurchaseHistory";
import AdminProducts from "../components/AdminProducts"; 
import type { User, Product, PurchaseDetail } from "../types";
import "./pages-css/admin.css";

type AdminProps = {
	onLogout: () => void;
};

export default function Admin({ onLogout }: AdminProps) {
	const [activeTab, setActiveTab] = useState<
		"clients" | "addClient" | "purchases" | "history" | "products"
	>("clients");

	const [clients, setClients] = useState<User[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
	const [message, setMessage] = useState("");

	const fetchClients = async () => {
		try {
			const res = await fetch(
				"https://*/api/api.php?action=users"
			);
			const data = await res.json();
			setClients(data);
		} catch (error) {
			console.error("Error fetching clients:", error);
		}
	};

	const fetchProducts = async () => {
		try {
			const res = await fetch(
				"https://*/api/api.php?action=products"
			);
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const fetchPurchaseDetails = async () => {
		try {
			const res = await fetch(
				"https://*/api/api.php?action=purchasedetails"
			);
			const data = await res.json();
			setPurchaseDetails(data);
		} catch (error) {
			console.error("Error fetching purchase details:", error);
		}
	};

	const deleteClient = async (id: number) => {
		try {
			await fetch("https://*/api/api.php?action=users", {
				method: "DELETE",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `id=${id}`, 
			});
			fetchClients();
		} catch (error) {
			console.error("Error deleting client:", error);
		}
	};

	const addClient = async (name: string, email: string) => {
		try {
			await fetch("https://*/api/api.php?action=users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email }),
			});
			fetchClients();
		} catch (error) {
			console.error("Error adding client:", error);
		}
	};

	const addPurchase = async (userId: number, productId: number) => {
		try {
			const res = await fetch(
				"https://*/api/api.php?action=purchases",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ user_id: userId, product_id: productId }),
				}
			);
			const data = await res.json();
			setMessage(data.message || "Purchase registered");
			fetchPurchaseDetails();
		} catch (error) {
			setMessage("Registration error");
			console.error("Error adding purchase:", error);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch("https://*/api/logout.php", {
				method: "POST",
				credentials: "include",
			});
		} catch (error) {
			console.error("Logout failed:", error);
		}
		onLogout();
	};

	useEffect(() => {
		fetchClients();
		fetchProducts();
		fetchPurchaseDetails();
	}, []);

	return (
		<div className="admin-container">
			<div className="admin-title">
				<h1>Admin Panel</h1>
				<button onClick={handleLogout}>Logout</button>
			</div>

			<div className="admin-tabs">
				<button
					className={activeTab === "clients" ? "active" : ""}
					onClick={() => setActiveTab("clients")}
				>
					Clients
				</button>
				<button
					className={activeTab === "addClient" ? "active" : ""}
					onClick={() => setActiveTab("addClient")}
				>
					Add Client
				</button>
				<button
					className={activeTab === "purchases" ? "active" : ""}
					onClick={() => setActiveTab("purchases")}
				>
					Add Purchase
				</button>
				<button
					className={activeTab === "history" ? "active" : ""}
					onClick={() => setActiveTab("history")}
				>
					Purchase History
				</button>
				<button
					className={activeTab === "products" ? "active" : ""}
					onClick={() => setActiveTab("products")}
				>
					Products
				</button>
			</div>

			<div className="admin-content">
				{activeTab === "clients" && (
					<AdminClients users={clients} onDeleteUser={deleteClient} />
				)}
				{activeTab === "addClient" && <AddUserForm onAddUser={addClient} />}
				{activeTab === "purchases" && (
					<PurchaseForm
						users={clients}
						products={products}
						onAddPurchase={addPurchase}
						message={message}
					/>
				)}
				{activeTab === "history" && (
					<AdminPurchaseHistory purchaseDetails={purchaseDetails} />
				)}
				{activeTab === "products" && <AdminProducts />}
			</div>
		</div>
	);
}
