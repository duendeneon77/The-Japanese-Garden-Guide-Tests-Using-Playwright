import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

import Home from './pages/home'
import History from './pages/indice-historia'
import Especies from './pages/indice-especies'
import Projeto from './pages/indice-projeto'
import Mais from './pages/indice-mais'
import MidiaArtigos from './pages/midia-artigos'
import MidiaVideos from './pages/midia-videos'
import Specie from './pages/specie'
import Login from './pages/Login'
import Article from './pages/article'

import TorosPage from './pages/moreContentPages/TorosPage'
import WaterPage from './pages/moreContentPages/WaterPage'
import RocksPage from './pages/moreContentPages/RocksPage'
import BridgesPage from './pages/moreContentPages/BridgesPage'

import UserMenu from './pages/userPages/user-menu'
import AddSpecie from './pages/userPages/add-specie'
import AddArticle from './pages/userPages/add-article'
import AddVideo from './pages/userPages/add-video'
import EditDeleteVideo from './pages/userPages/edit-delete-video'
import EditOrDeleteSpecie from './pages/userPages/edit-or-delete-especie'
import EditOrDeleteArticle from './pages/userPages/edit-or-delete-article'
import EditHistoryPage from './pages/userPages/editHistoryPage'
import EditProjectPage from './pages/userPages/editProjectPage'
import EditOthersRocksPage from './pages/userPages/editOtherRocksPage'
import EditOtherToroPage from './pages/userPages/editOtherToroPage'
import EditOthersWaterPage from './pages/userPages/editOthersWaterPage'
import EditOthersBridgesPage from './pages/userPages/editOthersBridgesPage'

import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <HashRouter>

      <ScrollToTop />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/history" element={<History />} />
        <Route path="/species" element={<Especies />} />
        <Route path="/project" element={<Projeto />} />
        <Route path="/more" element={<Mais />} />
        <Route path="/artigos" element={<MidiaArtigos />} />
        <Route path="/videos" element={<MidiaVideos />} />

        <Route path="/specie/:id" element={<Specie />} />
        <Route path="/article/:id" element={<Article />} />

        <Route path="/others/toro" element={<TorosPage />} />
        <Route path="/others/bridge" element={<BridgesPage />} />
        <Route path="/others/rocks" element={<RocksPage />} />
        <Route path="/others/water" element={<WaterPage />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/usersection"
          element={
            <ProtectedRoute>
              <UserMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addspecie"
          element={
            <ProtectedRoute>
              <AddSpecie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addarticle"
          element={
            <ProtectedRoute>
              <AddArticle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addvideo"
          element={
            <ProtectedRoute>
              <AddVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editdeletevideo"
          element={
            <ProtectedRoute>
              <EditDeleteVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editdeletespecie"
          element={
            <ProtectedRoute>
              <EditOrDeleteSpecie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editdeletearticle"
          element={
            <ProtectedRoute>
              <EditOrDeleteArticle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edithistorypage"
          element={
            <ProtectedRoute>
              <EditHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editprojectpage"
          element={
            <ProtectedRoute>
              <EditProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editothersrocks"
          element={
            <ProtectedRoute>
              <EditOthersRocksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editotherstoro"
          element={
            <ProtectedRoute>
              <EditOtherToroPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editotherswater"
          element={
            <ProtectedRoute>
              <EditOthersWaterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editothersbridges"
          element={
            <ProtectedRoute>
              <EditOthersBridgesPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </HashRouter>
  )
}

export default App