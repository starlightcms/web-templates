import styles from "./styles.module.scss";
import clsx from "clsx";

type KeyWrapperProps = {
  keyText: string;
};

export const KeyWrapper = ({ keyText }: KeyWrapperProps) => (
  <div className={clsx("bg-brand-primary-200 rounded-2", styles.keyWrapper)}>
    {keyText}
  </div>
);
