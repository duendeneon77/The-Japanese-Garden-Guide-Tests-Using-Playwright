import { useEffect, useState } from "react";

import Header from "../components/HeaderComponent/Header";
import ContentComponent from "../components/ContentComponent/Content";
import Footer from "../components/FooterComponent/Footer";

import { getVideos } from "../services/videosService";

import VideoDiv from "../components/ContentComponent/Videos/VideoDiv/VideoDiv";
import BackHomeButton from "../components/BackHomeButton/BackHomeButton";
import AdminParagraph from "../components/AdminParagraph/AdminParagraph";

function MidiaVideos() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  return (
    <div id="mainDiv">

      <Header />
      <AdminParagraph/>

      <ContentComponent>

        <h1>Vídeos</h1>

        {videos.map((video) => (
          <VideoDiv
            key={video.id}
            titulo={video.titulo}
            video={video.embed}
            descricao={video.description}
          />
        ))}

        <BackHomeButton />

      </ContentComponent>

      <Footer />

    </div>
  );
}

export default MidiaVideos;