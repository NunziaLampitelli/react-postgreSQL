import "./pages-css/home.css";
import PicOne from "../assets/public-image.jpg"

export default function Home() {
  return (
		<>
			<div className="home-page">
				<img src={PicOne} alt="" />
				<article>
					<h1>Welcome to PostgreSQL demo</h1>
					<p>Discover a new way to manage your work-life!</p>
				</article>
			</div>
		</>
	);
}