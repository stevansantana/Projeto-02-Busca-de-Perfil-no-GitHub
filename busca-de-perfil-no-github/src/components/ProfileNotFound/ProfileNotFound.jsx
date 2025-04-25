import notFoundStyles from "./ProfileNotFound.module.css";

const ProfileNotFound = () => {
  return (
    <div className={notFoundStyles.notFoundContainer}>
      <p className={notFoundStyles.notFoundMessage}>
        Nenhum perfil foi encontrado com esse nome de usuário.
        <br />
        Tente novamente
      </p>
    </div>
  );
};

export default ProfileNotFound;
