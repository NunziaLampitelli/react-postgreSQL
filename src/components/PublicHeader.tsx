import "./components-css/public-header.css";

type PublicHeaderProps = {
	className?: string;
};

export default function PublicHeader({ className }: PublicHeaderProps) {
	return (
		<header className={`public-header ${className ?? ""}`}>
			<h2 className="public-header-h2">PostgreSQL demo</h2>

			<nav className="public-header-nav">
				<a href="">Products</a>
				<a href="">Courses</a>
				<a href="">Contacts</a>
				<a href="">Log in</a>
			</nav>
		</header>
	);
}
