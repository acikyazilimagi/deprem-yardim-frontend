import { FormattedMessage } from "react-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <ul className={styles.footer}>
      <li>
        <a href="./cerez.pdf" target="_blank">
          <FormattedMessage id="label.cookiePolicy" />
        </a>
      </li>
      <li>
        <a href="./gizlilik.pdf" target="_blank">
          <FormattedMessage id="label.privacyPolicy" />
        </a>
      </li>
    </ul>
  );
}
