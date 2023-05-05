import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useRef } from "react";

function Login() {

  const formLogin = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {};

    for(let el of formLogin.current.elements) {
      if (el.name.length > 0) formData[el.name] = el.value;
    }

    fetch( "http://localhost:8001/api/auth/" + "login", {
      method: "POST",
      body: JSON.stringify( formData ),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then(({ token }) => {
        localStorage.setItem("token", token);
        navigate("chat");
      })
      .catch((err) => console.error(err))
  }

  return (
    <main id="login-chat">
      <form className="form" onSubmit={handleSubmit} ref={formLogin}>
        <h2>Login</h2>
        <div className="input">
          <div className="inputBox">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="example@xyz.com" autoComplete="off" />
          </div>
          <div className="inputBox">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••" autoComplete="off" />
          </div>
          <div className="inputBox">
            <input type="submit" value="Sign In"/>
          </div>
        </div>
        <p className="forget">Forget Password ? <a href="#">Click Here</a></p>
      </form>
    </main>
  )
}

export default Login
