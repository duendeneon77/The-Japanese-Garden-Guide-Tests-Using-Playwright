import { Link } from "react-router-dom";
import "./BackToSpeciesButton.css";

function BackToSpeciesButton() {
  return (
    <div className="backToSpeciesContainer">
      <Link
        to="/species"
        className="backToSpeciesButton"
      >
        Voltar para Especies
      </Link>
    </div>
  );
}

export default BackToSpeciesButton;