import { useEffect, useState } from "react";

import Header from '../components/HeaderComponent/Header'
import Footer from '../components/FooterComponent/Footer'
import ContentComponent from '../components/ContentComponent/Content'
import './pages.css'
import BackHomeButton from '../components/BackHomeButton/BackHomeButton'

import db from "../../db.json"
import AdminParagraph from "../components/AdminParagraph/AdminParagraph";

function Projeto() {
  const [project, setProject] = useState(db.project);

  useEffect(() => {
    const saved = localStorage.getItem("project");

    if (saved) {
      setProject(JSON.parse(saved));
    }
  }, []);

  return (
    <div id='mainDiv'>
      <Header />
      <AdminParagraph/>

      <ContentComponent>

        <h1 style={{
          marginBottom:'2rem',
          fontSize:'2rem',
          fontWeight:'100'
        }}>
          {project.titulo}
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#000000e4',
          backgroundColor:'#ffffffac',
          lineHeight: '1.8',
          padding:'1rem',
          paddingBottom:'2rem',
          marginBottom:'2rem',
        }}>

          {project.conteudo.map((item, index) => (
            <p
              key={index}
              style={{
                maxWidth: '75ch',
                backgroundColor:'transparent',
                whiteSpace: 'pre-wrap'
              }}
            >
              {item.texto}
            </p>
          ))}

        </div>

        <BackHomeButton/>

      </ContentComponent>

      <Footer/>
    </div>
  )
}

export default Projeto;