import { FormEvent, useContext, useReducer, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/Auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessge] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }
    await api.post("messages", { message });
    setMessge("");
  }
  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Messagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual é sua expectativa par ao evento?"
          onChange={(event) => setMessge(event.target.value)}
          value={message}
        ></textarea>
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}
