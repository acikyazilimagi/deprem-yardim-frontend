import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <ul className={styles.footer}>
      <li>
        <a href="" target="_blank" rel="noopener noreferrer">
          Hizmet Koşulları
        </a>
      </li>
      <li>
        <a href="" target="_blank" rel="noopener noreferrer">
          Gizlilik Politikası
        </a>
      </li>
    </ul>
  );
}
