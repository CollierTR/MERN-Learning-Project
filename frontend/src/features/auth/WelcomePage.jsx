import { Link } from "react-router-dom"

const WelcomePage = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <section>
        <p>{today}</p>
        <h1>Welcome!</h1>
        <p><Link to={'/dash/notes'}>View TechNotes</Link></p>
        <p><Link to={'/dash/users'}>View user settings</Link></p>
    </section>
  )
}

export default WelcomePage