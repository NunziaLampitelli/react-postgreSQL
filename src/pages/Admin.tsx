import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import AddUserForm from "../components/AddUserForm";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseHistory from "../components/PurchaseHistory";
import type { User, Product, PurchaseDetail } from "../types";
import "./pages-css/admin.css";


type AdminProps = {
	onLogout: () => void;
};

export default function Admin({ onLogout }: AdminProps) {
	const [activeTab, setActiveTab] = useState<
		"users" | "addUser" | "purchases" | "history"
	>("users");
	const [users, setUsers] = useState<User[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
	const [message, setMessage] = useState("");

	const fetchUsers = async () => {
		try {
			const res = await fetch("https://*/api/api.php?action=users");
			const data = await res.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const fetchProducts = async () => {
		try {
			const res = await fetch("https://*/api/api.php?action=products");
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const fetchPurchaseDetails = async () => {
		try {
			const res = await fetch("https://*/api/api.php?action=purchasedetails");
			const data = await res.json();
			setPurchaseDetails(data);
		} catch (error) {
			console.error("Error fetching purchase details:", error);
		}
	};

	const deleteUser = async (id: number) => {
		try {
			await fetch("https://*/api/api.php?action=users", {
				method: "DELETE",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `id=${id}`,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	const addUser = async (name: string, email: string) => {
		try {
			await fetch("https://*/api.php?action=users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email }),
			});
			fetchUsers();
		} catch (error) {
			console.error("Error adding user:", error);
		}
	};

	const addPurchase = async (userId: number, productId: number) => {
		try {
			const res = await fetch("https://*/api/api.php?action=purchases", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user_id: userId, product_id: productId }),
			});
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
		onLogout(); // 
	};

	useEffect(() => {
		fetchUsers();
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
					className={activeTab === "users" ? "active" : ""}
					onClick={() => setActiveTab("users")}
				>
					Users
				</button>
				<button
					className={activeTab === "addUser" ? "active" : ""}
					onClick={() => setActiveTab("addUser")}
				>
					Add User
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
			</div>

			<div className="admin-content">
				{activeTab === "users" && (
					<UsersTable users={users} onDeleteUser={deleteUser} />
				)}
				{activeTab === "addUser" && <AddUserForm onAddUser={addUser} />}
				{activeTab === "purchases" && (
					<PurchaseForm
						users={users}
						products={products}
						onAddPurchase={addPurchase}
						message={message}
					/>
				)}
				{activeTab === "history" && (
					<PurchaseHistory purchaseDetails={purchaseDetails} />
				)}
			</div>
		</div>
	);
}
