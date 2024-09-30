"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRef } from "react";
import { useChat } from "ai/react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (error) => {
      console.error("Something went wrong", error.toString());
    },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="text">Welcome! Ask me anything!</div>
        <div className={styles.chatContainer}>
          <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {data && data.length ? <pre>{JSON.stringify(data, null, 2)}</pre> : ""}
            {messages.map((m) => (
              <div key={m.id} className={styles["whitespace-pre-wrap"]}>
                {m.role === "user" ? "You: " : "Chatty: "}
                {m.content}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={handleInputChange}
              ref={inputRef}
              placeholder="Chat away!"
              tabIndex={0}
              required
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  formRef.current?.requestSubmit();
                  e.preventDefault();
                }
              }}
            />
          </form>
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
