import styles from "./FooterBanner.module.css";

export default function FooterBanner() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        <b>Duyuru:</b> 6 Şubat 2023 depreminde sosyal medyada paylaşılan deprem ile ilgili paylaşımları anlamlandırarak yardım kuruluşlarına destek verilmesi amaçlanmıştır.
      </span>
    </div>
  )
}