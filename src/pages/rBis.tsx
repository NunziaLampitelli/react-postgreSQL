import "./pages-css/rBis.css";
import PicOne from "../assets/rbis-person-edit.png";
import PicTwo from "../assets/rbis-calendar-01.png";
import VideoOne from "../assets/calc-to-db.webm";
import VideoTwo from "../assets/web-video.webm";

export default function RBis() {
	return (
		<>
			<div className="rBis-page">
				<p className="h1-rBis">rBIS - Business Information System</p>

				<p className="rBis-presentation">
					rBIS är ett webb-baserat ramverk för utveckling av stödsystem till
					verksamheter. <br />
					I rBIS finns de vanliga register man behöver för att hålla kontakter
					med kunder och leverantörer. <br />
					En väldesignad databas gör det smidigt att göra specialanpassningar
					för just din verksamhet.
				</p>

				<article>
					<p className="h2-rBis">Kännetecken för rBIS</p>
					<ul className="ul-rBis">
						<li>
							Enkel replikering av data: Det är möjligt att ha flera servrar med
							backupdata.
						</li>
						<li>
							Databas: Baserat på Postgres med en tydligt databasstruktur.
						</li>
						<li>Öppenhet: Moduler kan läggas till genom öppna databaser.</li>
						<li>
							Inga utvecklingskit: För att göra utveckling i rBIS behövs inte
							några extra utvecklingskit.
						</li>
						<li>Inga extra moduler: Allt som finns ingår redan från början.</li>
					</ul>
				</article>

				<section className="example-rBis">
					<div className="screen-rBis">
						<p className="h2-rBis">Inmatningskärmar</p>
						<img src={PicOne} alt="screen1" />
						<p>
							Inmatningskärmar är utförda med moderna responsiva bibliotek.
							Applikationerna går att köra på såväl vanliga datorskärmar som på
							läsplattor och telefoner.
						</p>
					</div>

					<div className="screen-rBis">
						<p className="h2-rBis">Kalender</p>
						<img src={PicTwo} alt="" />
						<p>
							Många händelser kan presenteras i kalendrar. Det gör det enkelt
							att hålla ordning på saker man inte får glömma bort.
						</p>
					</div>

					<div className="screen-rBis">
						<p className="h2-rBis">Kalkylblad till databas</p>
						<video src={VideoOne} controls></video>
						<p>
							Ett exempel på hur man arbetar för att förvandla ett kalkylblad
							till en databas
						</p>
					</div>

					<div className="screen-rBis">
						<p className="h2-rBis">Kalkylblad till databas</p>
						<video src={VideoTwo} controls></video>
						<p>Exempel hur handscanner används tillsammans med rBIS</p>
					</div>
				</section>
			</div>
		</>
	);
}
