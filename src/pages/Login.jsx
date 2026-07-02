import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from '../components/HeaderComponent/Header'
import BackHomeButton from "../components/BackHomeButton/BackHomeButton"
import Footer from '../components/FooterComponent/Footer'
import ContentComponent from '../components/ContentComponent/Content'

import './form.css'
import AdminParagraph from "../components/AdminParagraph/AdminParagraph";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    // 🔎 validações
    if (email.trim() === "" || senha.trim() === "") {
      setErrorMessage("Preencha todos os campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Digite um email válido");
      return;
    }

    if (senha.includes(" ")) {
      setErrorMessage("A senha não pode conter espaços");
      return;
    }

    if (senha.length < 6) {
      setErrorMessage("A senha deve possuir ao menos 6 caracteres");
      return;
    }

    try {

      // 🔥 CORREÇÃO DEFINITIVA PARA GITHUB PAGES + LOCALHOST
      const base = import.meta.env.BASE_URL || "/";

      const response = await fetch(
        `${base}user/user.json`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const users = await response.json();

      const userFound = users.find(
        (userData) =>
          userData.user === email &&
          userData.password === senha
      );

      if (userFound) {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(userFound)
        );

        navigate("/usersection");
      } else {
        setErrorMessage("Usuário ou senha incorretos");
      }

    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao carregar dados de login");
    }
  }

  return (
    <div id='mainDiv'>

      <Header />
      <AdminParagraph/>

      <ContentComponent>

        <form className='userForms' onSubmit={handleLogin}>

          <p>
            Atenção, esta página é direcionada apenas ao proprietário do site.
          </p>

          <p>Digite seu email:</p>

          <input
            type="text"
            id='inputEmail'
            placeholder='digite seu email aqui'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>Digite sua senha:</p>

          <input
            type="password"
            id='inputSenha'
            placeholder='digite sua senha aqui'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {errorMessage && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              {errorMessage}
            </p>
          )}

          <button type="submit">
            Entrar
          </button>

        </form>
        <BackHomeButton/>

      </ContentComponent>

      <Footer />

    </div>
  );
}

export default Login;