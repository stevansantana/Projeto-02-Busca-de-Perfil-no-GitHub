import { useEffect, useState } from "react";
import styles from "./GithubUserSearch.module.css";
import appLogo from "./../../assets/logo.svg";
import searchIcon from "./../../assets/search-icon.svg";
import loadingSpinner from "../../assets/loading.gif";
import GithubProfileCard from "../GithubProfileCard/GithubProfileCard";
import ProfileNotFound from "../ProfileNotFound/ProfileNotFound";

function GithubUserSearch() {
  const [githubQuery, setGithubQuery] = useState("");
  const [githubProfile, setGithubProfile] = useState();
  const [fetchStatus, setFetchStatus] = useState(0);

  const handleUserSearch = (ev) => {
    ev.preventDefault();
    const formInputs = new FormData(ev.target);
    const { githubUsername } = Object.fromEntries(formInputs);
    setGithubQuery(githubUsername);
  };

  useEffect(() => {
    if (githubQuery) {
      setFetchStatus(10); // Reset para loading

      fetch(`https://api.github.com/users/${githubQuery}`)
        .then((response) => {
          if (response.ok) {
            setFetchStatus(200);
            return response.json();
          } else {
            setFetchStatus(404); // Não encontrado
            return null;
          }
        })
        .then((data) => {
          if (data) {
            setGithubProfile(data);
          }
        })
        .catch(() => {
          setFetchStatus(400); // Erro de rede
          console.error("Erro na requisição");
        });
    }
  }, [githubQuery]);

  const renderSearchResults = () => {
    switch (fetchStatus) {
      case 10:
        return (
          <img
            src={loadingSpinner}
            alt="Carregando"
            className={styles.loadingSpinner}
          />
        );
      case 200:
        return <GithubProfileCard {...githubProfile} />;
      case 404:
        return <ProfileNotFound />;
      case 400:
        return <p className={styles.errorMessage}>Erro na conexão</p>;
      default:
        return null;
    }
  };

  return (
    <section className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <img src={appLogo} alt="Logo do App" className={styles.appLogo} />
        <form className={styles.searchForm} onSubmit={handleUserSearch}>
          <input
            type="text"
            name="githubUsername"
            placeholder="Digite um usuário do GitHub"
            required
          />
          <button type="submit">
            <img src={searchIcon} alt="Ícone de busca" />
          </button>
        </form>
      </div>
      <div className={styles.searchResults}>{renderSearchResults()}</div>
    </section>
  );
}

export default GithubUserSearch;
