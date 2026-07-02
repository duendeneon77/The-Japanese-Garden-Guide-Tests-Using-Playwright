import { Link } from "react-router-dom";
import "./BackUserPageButton.css";

function BackUserPageButton() {
  return (
    <div className="backUserContainer">
      <Link
        to="/usersection"
        className="backUserButton"
      >
        Voltar para o menu
      </Link>
    </div>
  );
}

export default BackUserPageButton;