

import Header from '../components/HeaderComponent/Header'
import Footer from '../components/FooterComponent/Footer'
import ContentComponent from '../components/ContentComponent/Content'
import BackHomePageButton from '../components/BackHomeButton/BackHomeButton'
import './pages.css'
import MoreMenu from '../components/ContentComponent/MoreCotent/MoreMenu'
import AdminParagraph from '../components/AdminParagraph/AdminParagraph'
function Mais() {

  return (
    <div id='mainDiv'>
      
      <Header/>
      <AdminParagraph/>
      <ContentComponent>
        <h1 style={{fontFamily:'"Zen Old Mincho", serif"', fontWeight: "100", color:"rgba(255, 255, 255, 0.78)"}}>
          Tópicos Importantes 
        </h1>
        <MoreMenu/>

        
      <BackHomePageButton/>
        
      </ContentComponent>
      <Footer/>
    </div>
  )
}

export default Mais