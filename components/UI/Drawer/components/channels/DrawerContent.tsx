import { ReactNode } from "react";
import styles from "./drawerContent.module.css";
function DrawerContent({ children }: { children: ReactNode }) {
  return <div className={styles.drawerContent}>{children}</div>;
}

DrawerContent.Channel = function DrawerContentChannel({
  children,
}: {
  children: ReactNode;
}) {
  return <span>{children}</span>;
};

DrawerContent.Header = function DrawerContentHeader({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.drawerContentHeader}>{children}</div>;
};

DrawerContent.Title = function DrawerContentTitle({
  children,
}: {
  children: ReactNode;
}) {
  return <span className={styles.drawerContentHeaderTitle}>{children}</span>;
};

DrawerContent.Text = function DrawerContentText({
  children,
}: {
  children: ReactNode;
}) {
  return <span className={styles.drawerContentText}>{children}</span>;
};

DrawerContent.Body = function DrawerContentBody({
  children,
}: {
  children: ReactNode;
}) {
  return <span className={styles.drawerContentBody}>{children}</span>;
};

DrawerContent.Badge = function DrawerContentBadge({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.drawerContentBadge}>{children}</div>;
};

export { DrawerContent };
