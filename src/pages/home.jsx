import Header from '../components/HeaderComponent/Header'
import Carousel from '../components/CarouselComponent/Carousel'
import ContentComponent from '../components/ContentComponent/Content'
import Footer from '../components/FooterComponent/Footer'
import ArticleCard from "../components/ContentComponent/Artigos/ArticleCard/ArticleCard"
import artigos from '../../public/articles/artigos.json'
import './pages.css'
import AdminParagraph from '../components/AdminParagraph/AdminParagraph'
function Home() {

  return (
    <div id='mainDiv'>
      <Header/>
      <AdminParagraph/>
      <Carousel/>
      <ContentComponent>
        
            <h1>Artigos</h1>
            {artigos.map((item)=>(
                <ArticleCard
                key={item.id}
                artigo={item}
                />
            ))}

    </ContentComponent>
      <Footer/>
    </div>
  )
}

export default Home