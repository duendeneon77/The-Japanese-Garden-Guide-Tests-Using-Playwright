import Header from '../components/HeaderComponent/Header';
import Footer from '../components/FooterComponent/Footer';
import ContentComponent from '../components/ContentComponent/Content';
import SpeciesCard from '../components/ContentComponent/Especies/SpeciesCard/SpeciesCard';
import './pages.css';
import BackHomeButton from '../components/BackHomeButton/BackHomeButton';

import { useEffect, useState } from "react";
import { getSpecies } from "../services/speciesService";
import AdminParagraph from '../components/AdminParagraph/AdminParagraph';

function Especies() {

  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSpecies();
        setSpecies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div id='mainDiv'>
      <Header />
      <AdminParagraph/>

      <ContentComponent>

        <h1>Espécies</h1>

        {loading && <p>Carregando...</p>}

        {!loading &&
  [...species]
    .sort((a, b) =>
      a.titulo.localeCompare(b.titulo, "pt-BR", {
        sensitivity: "base"
      })
    )
    .map((item) => (
      <SpeciesCard
        key={item.id}
        species={item}
      />
    ))}

        <div
          style={{
            marginTop: "3rem",
            marginBottom: "3rem",
            backgroundColor: "transparent"
          }}
        >
          <BackHomeButton />
        </div>

      </ContentComponent>

      <Footer />
    </div>
  );
}

export default Especies;