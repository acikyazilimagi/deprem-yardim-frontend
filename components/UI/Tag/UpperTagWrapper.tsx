import UpperTag from "./UpperTag";
import styles from "./UpperTagWrapper.module.css";

const UpperTagWrapper = () => {
  return (
    <div className={styles.TagWrapper}>
      <UpperTag innerText="Düşük Yoğunluk" color="gray" />
      <UpperTag innerText="Orta-Alt Yoğunluk" color="#faf7bf" />
      <UpperTag innerText="Orta Yoğunluk" color="red" />
      <UpperTag innerText="Orta - Üst Yoğunluk" color="#f0944b" />
      <UpperTag innerText="Yoğun" color="#74080a" />
    </div>
  );
};

export default UpperTagWrapper;
