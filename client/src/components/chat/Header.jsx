import { useNavigate } from "react-router-dom";
import "../../styles/chat/Header.css";
import { BiExit } from "react-icons/bi";
import PropTypes from "prop-types";

function Header({ socket }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    socket.disconnect();
  }

  return (
    <header id="chat-header">
			<h1 className="chat-header__title">Neochat App</h1>
      <button className="chat-header__logout" onClick={handleLogout}>
        <BiExit />
      </button>
		</header>
  )
}

Header.propTypes = {
  socket: PropTypes.object
}

export default Header
