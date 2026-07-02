import { useEffect, useState } from "react";

import Header from '../components/HeaderComponent/Header';
import Footer from '../components/FooterComponent/Footer';
import ContentComponent from '../components/ContentComponent/Content';
import './pages.css';
import BackHomeButton from "../components/BackHomeButton/BackHomeButton";

import data from "../../db.json";
import AdminParagraph from "../components/AdminParagraph/AdminParagraph";

function History() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("history");

    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      setHistory(data.history);
    }
  }, []);

  if (!history) return null;

  return (
    <div id='mainDiv'>
      <Header />
      <AdminParagraph/>

      <ContentComponent>
        <h1>{history.titulo}</h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '1.1rem',
            textAlign: 'center',
            color: '#000000e4',
            backgroundColor: '#ffffffac',
            lineHeight: '1.8',
            padding: '1rem',
            paddingBottom: '2rem',
            marginBottom: '2rem',
          }}
        >
          {history.conteudo.map((item, index) => (
            <p
              key={index}
              style={{
                maxWidth: '75ch',
                backgroundColor: 'transparent'
              }}
            >
              {item.texto}
            </p>
          ))}
        </div>

        <BackHomeButton />
      </ContentComponent>

      <Footer />
    </div>
  );
}

export default History;