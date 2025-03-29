
import { Link } from "react-router-dom"

const DashHeader = () => {
  return (
    <header>
        <div>
            <Link to={'/dash'}>
                <h1>TechNotes</h1>
            </Link>
            <nav>
                nav btn
            </nav>
        </div>
    </header>
  )
}

export default DashHeader