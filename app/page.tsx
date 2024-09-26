import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="text">Welcome! Ask me anything!</div>
        <div className={styles.chatContainer}></div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Chat away!" />
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://chatgpt.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to ChatGPT website →
        </a>
      </footer>
    </div>
  );
}
