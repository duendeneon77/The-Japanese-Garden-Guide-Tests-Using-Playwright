import Header from '../../components/HeaderComponent/Header'
import Footer from '../../components/FooterComponent/Footer'
import ContentComponent from '../../components/ContentComponent/Content'

import { Link } from 'react-router-dom'

import '../form.css'
import './user-menu.css'

function UserMenu() {
  return (
    <div id='mainDiv'>
      <Header />

      <ContentComponent>
        <div id='menuMainDiv'>
          <h2>O que deseja fazer?</h2>

          <div id='menuDiv'>
            <div className='subMenuDiv'>
              <Link to="/addspecie">
                <button>Cadastrar Espécie</button>
              </Link>

              <Link to="/editdeletespecie">
                <button>Editar/Excluir Espécie</button>
              </Link>
            </div>

            <div className='subMenuDiv'>
              <Link to="/addarticle">
                <button>Publicar Artigo</button>
              </Link>

              <Link to="/editdeletearticle">
                <button>Editar/Excluir Artigo</button>
              </Link>
            </div>

            <div className='subMenuDiv'>
              <Link to="/addvideo">
                <button>Postar Vídeo</button>
              </Link>

              <Link to="/editdeletevideo">
                <button>Editar/Deletar Vídeo</button>
              </Link>
            </div>

            <div className='subMenuDiv'>
              <Link to="/edithistorypage">
                <button>Editar Página "História"</button>
              </Link>

              <Link to="/editprojectpage">
                <button>Editar Página "Projeto"</button>
              </Link>
            </div>

            <div className='subMenuDiv'>
              <Link to="/editotherswater">
                <button>Editar sessão "Água"</button>
              </Link>

              <Link to="/editotherstoro">
                <button>Editar sessão "Torô"</button>
              </Link>
            </div>

            <div className='subMenuDiv'>
              <Link to="/editothersbridges">
                <button>Editar sessão "Pontes"</button>
              </Link>

              <Link to="/editothersrocks">
                <button>Editar sessão "Pedras"</button>
              </Link>
            </div>
          </div>
        </div>
      </ContentComponent>

      <Footer />
    </div>
  )
}

export default UserMenu