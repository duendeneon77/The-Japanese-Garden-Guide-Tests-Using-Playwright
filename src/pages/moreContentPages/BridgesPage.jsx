import { useEffect, useState } from "react";

import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import Header from "../../components/HeaderComponent/Header";
import BackHomeButton from "../../components/BackHomeButton/BackHomeButton";
import "./morePages.css";
import AdminParagraph from "../../components/AdminParagraph/AdminParagraph";

function BridgesPage() {
  const base = import.meta.env.BASE_URL;

  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("bridges");

    if (saved) {
      setData(JSON.parse(saved));
    } else {
      import("../../../db.json").then((mod) => {
        setData(mod.default.bridges);
      });
    }
  }, []);

  function resolveImage(src) {
    if (!src) return "";
    return `${base}${src.replace(/^\//, "")}`;
  }

  function renderContent(item, index) {
    if (!item) return null;

    if (item.tipo === "imagem") {
      return (
        <img
          key={index}
          src={resolveImage(item.texto)}
          alt=""
        />
      );
    }

    let text = item.texto || "";

    const imgMatch = text.match(
      /<img[^>]*src=["']([^"']+)["'][^>]*>/i
    );

    if (imgMatch) {
      return (
        <img
          key={index}
          src={resolveImage(imgMatch[1])}
          alt=""
        />
      );
    }

    text = text.replace(/<[^>]+>/g, "");

    return (
      <p key={index} className="textParagraph">
        {text}
      </p>
    );
  }

  if (!data) return null;

  return (
    <div id="mainDiv">
      <Header />
      <AdminParagraph/>

      <ContentComponent>
        <div id="contentMoreDiv">
          <h1>{data.titulo}</h1>

          {data.conteudo.map((item, index) =>
            renderContent(item, index)
          )}
        </div>

        <BackHomeButton />
      </ContentComponent>

      <Footer />
    </div>
  );
}

export default BridgesPage;