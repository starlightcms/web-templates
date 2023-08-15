import styles from "./styles.module.css";
import clsx from "clsx";

/**
 * Renders a flexible container and places all its children in it. This
 * works just like a Bootstrap container.
 *
 * By default, a `div` will be rendered as the container element, but
 * you can change this by providing another element to the `as` prop.
 * It should be either a string with the name of the HTML element
 * (e.g.: "main", "article", "span", etc.) or a React component.
 *
 * All other props will be forwarded to the container element.
 */

export const Container = ({ as, className, children, ...props }) => {
  const Component = as ?? "div";

  return (
    <Component className={clsx(styles.container, className)} {...props}>
      {children}
    </Component>
  );
};
