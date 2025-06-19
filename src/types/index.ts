export type User = {
	id: number;
	name: string;
	email: string;
};

export type Product = {
	id: number;
	name: string;
	price: number;
	product_id: number;
	is_deleted?: boolean; 
};

export type PurchaseDetail = {
	purchase_id: number;
	client_id: number;
	client_name: string;
	product_name: string;
	price: number;
	purchase_date: string;
};