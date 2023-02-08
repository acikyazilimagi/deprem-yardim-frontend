import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <ul className={styles.footer}>
      <li>
        <a href="./cerez.pdf" target="_blank">
          Çerez Politikası
        </a>
      </li>
      <li>
        <a href="./gizlilik.pdf" target="_blank">
          Gizlilik Politikası
        </a>
      </li>
    </ul>
  );
}
