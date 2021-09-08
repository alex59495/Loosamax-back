import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div className="container-center">
      <div className="text-ghost-title">404</div>
      <div className="text-ghost text-gray-ghost">Oops, il semblerait que tu te sois perdu l'ami</div>
      <div className="container-ghost">
        <div className="ghost-copy">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
        </div>
        <div className="ghost">
          <div className="face">
            <div className="eye"></div>
            <div className="eye-right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
      <p className="text-dark-ghost">Apparemment cette page est déjà occupé par un fantôme, ne traîne pas trop ici.</p>
      <div className="link">
        <Link to="/">S'enfuir</Link>
      </div>
    </div>
  )
}

export default NoMatch