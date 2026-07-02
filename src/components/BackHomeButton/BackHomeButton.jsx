import { Link } from "react-router-dom";
import "./BackHomeButton.css";

function BackHomeButton() {
  return (
    <div className="backHomeContainer">
      <Link
        to="/"
        className="backHomeButton"
      >
        Voltar para o início
      </Link>
    </div>
  );
}

export default BackHomeButton;