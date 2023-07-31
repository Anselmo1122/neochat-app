
const url = (window.location.hostname == "localhost")
  ? "http://localhost:8001/api/"
  : "https://socketchat-node-production.up.railway.app/api/";

export default url;