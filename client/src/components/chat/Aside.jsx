import PropTypes from "prop-types";
import "../../styles/chat/Aside.css";

import { RiSettings4Fill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { BsFillPersonFill } from "react-icons/bs";
import { useAppContext } from "../../hooks/useAppContext";
import { nanoid } from "nanoid";
// import userImage from "../../assets/user-image.jpg";

function Aside({ usersActive = [] }) {

  const { chat, setChat, setting, setSetting } = useAppContext();

  const handleClick = () => {
    setChat({ 
      id: nanoid(),
      name: "General Chat",
      isActive: true
    })
  }

  return (
    <aside id="chat-menu" className={ chat.isActive ? "hidden" : "show" }>
			<section className="menu__header">
        <RiSettings4Fill className="header__icon" onClick={ () => {
          setSetting({
            ...setting,
            isActive: true
          })
        }} />
        <h1 className="header__title">Neochat</h1>
        <BiSearchAlt2 className="header__icon"/>
			</section>
      <ul className="menu__chats">
        <li className="chats__chat" onClick={handleClick}>
          <TfiWorld className="chat-icon"/>
          <h4 className="chat-title">General Chat</h4>
          <div className="chat-options">
            <BsFillPersonFill className="chat-icon"/>
            <span>{ usersActive.length }</span>
          </div>
        </li>
      </ul>
		</aside>
  )
}

Aside.propTypes = {
  usersActive: PropTypes.array,
}

export default Aside
