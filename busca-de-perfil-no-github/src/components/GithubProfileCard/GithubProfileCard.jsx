import profileStyles from "./GithubProfileCard.module.css";

const GithubProfileCard = ({ name, avatar_url, bio }) => {
  return (
    <div className={profileStyles.profileCard}>
      <img
        src={avatar_url}
        alt={`Foto de perfil de ${name}`}
        className={profileStyles.profileImage}
      />

      <div className={profileStyles.profileDetails}>
        <h2 className={profileStyles.profileName}>{name}</h2>
        <p className={profileStyles.profileBio}>
          {bio || "Usuário sem biografia disponível."}
        </p>
      </div>
    </div>
  );
};

export default GithubProfileCard;
