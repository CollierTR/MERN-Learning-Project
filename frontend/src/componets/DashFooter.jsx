import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from 'react-router-dom'
import { faHouse } from "@fortawesome/free-solid-svg-icons"


const DashFooter = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const onGoHomeClicked = () => {
        navigate('/dash')
    }

    let goHomeBtn = null
    if (pathname !== '/dash') {
        goHomeBtn = (
            <button onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

  return (
    <footer>
        {goHomeBtn}
        <p>Current User: Chfjagjj fjafj</p>
        <p>Status: fjgskgf</p>
    </footer>
  )
}

export default DashFooter