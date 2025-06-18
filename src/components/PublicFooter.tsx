import "./components-css/public-footer.css";
import MailIcon from "../assets/mail.png";
import PhoneIcon from "../assets/phone.png";
import AddressIcon from "../assets/address.png";
import TimeIcon from "../assets/time.png";

type PublicFooterProps = {
	className?: string;
};

export default function PublicFooter({ className }: PublicFooterProps) {
	return (
		<div className={`public-footer ${className ?? ""}`}>
			<section className="public-footer-info">
				<article className="public-footer-article">
					<img src={MailIcon} alt="icon" />
					<a href="mailto:example@mail.com">postgresql@mail.com</a>
				</article>

				<article className="public-footer-article">
					<img src={PhoneIcon} alt="icon" />
					<a href="tel:+1247596210">+46 123 456 7890</a>
				</article>

				<article className="public-footer-article">
					<img src={AddressIcon} alt="icon" />
					<p>
						Great Street 5 <br /> 12345 Maplewood
					</p>
				</article>
				<article className="public-footer-article">
					<img src={TimeIcon} alt="" />
					<p>
						Mon - Fri <br />
						8.30 - 16.30
					</p>
				</article>
			</section>

			<address>PostgreSqlDemo © 2025</address>

			<nav className="public-footer-nav" id="public-footer-links">
				<a href="">FAQ</a>
				<a href="">Licenses</a>
			</nav>
		</div>
	);
}
