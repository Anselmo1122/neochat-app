import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext"
import "../../styles/chat/Setting.css"
import { GrClose } from "react-icons/gr"
import PropTypes from "react"

function Setting({ socket }) {

  const { setting, setSetting } = useAppContext();
  const navigate = useNavigate();

  const handleShow = () => {
    setSetting({
      ...setting,
      isActive: false,
    })
  }

  const logout = async () => {
    await socket.emit("disconnect-user");
    window.localStorage.clear();
    navigate("/");
  }

  return (
    <section 
      id="app-setting" 
      className={ setting.isActive ? "show" : "hidden" } 
    >
      <div className="setting">
        <GrClose className="close-button" onClick={handleShow} />
        <div className="setting__option">
          <button 
            className={ setting.theme === "dark" ? "enabled" : "" }
            onClick={() => setSetting({
              ...setting,
              theme: "dark"
            })}
          >
            Dark
          </button>
          <button 
            className={ setting.theme === "light" ? "enabled" : "" }
            onClick={() => setSetting({
              ...setting,
              theme: "light"
            })}
          >
            Light
          </button>
        </div>
        <div className="setting__option">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </section>
  )
}

Setting.propTypes = {
  socket: PropTypes.object
}

export default Setting