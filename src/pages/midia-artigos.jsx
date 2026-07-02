import Header from '../components/HeaderComponent/Header'
import Footer from '../components/FooterComponent/Footer'
import ContentComponent from '../components/ContentComponent/Content'
import './pages.css'

import { useEffect, useState } from "react";
import { getArticles } from "../services/articlesService";

import ArticleCard from '../components/ContentComponent/Artigos/ArticleCard/ArticleCard'
import BackHomeButton from '../components/BackHomeButton/BackHomeButton'
import AdminParagraph from '../components/AdminParagraph/AdminParagraph';

function MidiaArtigos() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
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
        <h1>Artigos</h1>

        {loading && <p>Carregando...</p>}

        {!loading &&
  [...articles]
    .reverse()
    .map((item) => (
      <ArticleCard
        key={item.id}
        artigo={item}
      />
    ))}

        <div style={{
          marginTop: "3rem",
          marginBottom: "3rem",
          backgroundColor: "transparent"
        }}>
          <BackHomeButton />
        </div>
      </ContentComponent>

      <Footer />
    </div>
  )
}

export default MidiaArtigos;