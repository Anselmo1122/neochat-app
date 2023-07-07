
const url = (window.location.hostname == "localhost")
  ? "http://localhost:8001/api/auth/"
  : "https://socketchat-node-production.up.railway.app/api/auth/";

export default url;