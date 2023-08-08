import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import url from "../utils/url";

function Login() {

  const formLogin = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {};

    for(let el of formLogin.current.elements) {
      if (el.name.length > 0) formData[el.name] = el.value;
    }

    fetch( url + "auth/login", {
      method: "POST",
      body: JSON.stringify( formData ),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then(({ token }) => {
        localStorage.setItem("token", token);
        navigate("/chat");
      })
      .catch((err) => console.error(err))
  }

  return (
    <main id="login-chat">
      <form className="login" onSubmit={handleSubmit} ref={formLogin}>
        <h2 className="login__title">Login</h2>
        <div className="login__input">
          <div className="input__box">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="example@xyz.com" autoComplete="off" />
          </div>
          <div className="input__box">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••" autoComplete="off" />
          </div>
          <div className="input__box">
            <input type="submit" value="Sign In"/>
          </div>
        </div>
        <p className="forget"><span>Forget Password ?</span><a href="#">Click Here</a></p>
      </form>
    </main>
  )
}

export default Login
