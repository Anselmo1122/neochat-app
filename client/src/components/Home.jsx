import "../styles/Home.css"
import { Link } from "react-router-dom"
import mainImage from "../assets/main-image.png"

function Home() {
  return (
    <main id="home">
      <header className="home__header">
        <div className="home__logo">
          <span>Neochat App</span>
        </div>
        <nav className="home__nav">
          <Link to="/login" className="nav__item">Sing Up</Link>
          <div className="divider"></div>
          <Link to="/login" className="nav__item">Sign In</Link>
        </nav>
      </header>
      <section className="home__content">
        <article className="home__text">
          <p>This is <span>Neochat</span> <br/> a web chat application <br/> were you can talk with your friends.</p>
        </article>
        <picture className="home__picture">
          <img className="home__image" src={mainImage} alt="chat image" />
        </picture>
      </section>
    </main>
  )
}

export default Home;