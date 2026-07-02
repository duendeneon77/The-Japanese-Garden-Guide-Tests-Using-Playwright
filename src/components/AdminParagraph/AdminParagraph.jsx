import "./AdminParagraph.css";
import { Link } from "react-router-dom";

function AdminParagraph() {
  const isLogged = !!localStorage.getItem("loggedUser");

  if (!isLogged) {
    return null;
  }

  return (
    <div id="adminDiv">
      <p id="adminParagraph">
        VERSÃO DO ADMINISTRADOR
      </p>

      <div id="buttonDiv">
        <Link to="/usersection" id="adminLink">
          Menu de Administrador
        </Link>
      </div>
    </div>
  );
}

export default AdminParagraph;