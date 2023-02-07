import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <ul className={styles.footer}>
      <li>
        <a href="./cerez.docx" download>
          Çerez Politikası
        </a>
      </li>
      <li>
        <a href="./gizlilik.docx" download>
          Gizlilik Politikası
        </a>
      </li>
    </ul>
  );
}
