import styles from "./UpperTagWrapper.module.css";

interface TagProps {
  innerText: string;
  color: string;
}

const UpperTag = (props: TagProps) => {
  return (
    <div className={styles.upperRightTags}>
      <span
        className={styles.TagsCircle}
        style={{
          backgroundColor: props.color,
        }}
      ></span>
      {props.innerText}
    </div>
  );
};
export default UpperTag;
