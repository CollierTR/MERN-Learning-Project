import { Link } from "react-router-dom"

const Public = () => {
  return (
    <section>
        <header>
            <h1>Welcome to TechNotes!</h1>
        </header>
        <main>
            <p>Located in downtown Moriarty, our shop have the solutions you need for all your Tech related repairs</p>
            <address>
                TechNote Repairs <br />
                228 Buford Ave <br />
                Moriarty, NM 63549 <br />
                <a href="tel:5402206532">(540) 220-6532</a>
            </address>
            <br />
            <p>Owner: Tristan Collier</p>
        </main>
        <footer>
            <Link to={'/login'} >Employee Login</Link>
        </footer>
    </section>
  )
}

export default Public