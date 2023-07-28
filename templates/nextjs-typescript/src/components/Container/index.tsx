import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

/**
 * The "ComponentType" generic below allows this type to infer which props
 * the Container component will accept based on the element type passed to
 * the `as` prop.
 *
 * For instance, if the developer provides an `as` prop with a value of
 * "aside", the Container component will accept all props that an `aside`
 * HTML element would normally accept.
 *
 * This also works with React components: if the user provides a React
 * component to the `as` prop, all props accepted by the given component
 * will be accepted by the Container component too. In the implementation
 * below, all props passed to the Container will be forwarded to the given
 * rendered component.
 */
type ContainerProps<ComponentType extends ElementType> =
  ComponentPropsWithoutRef<ComponentType> & {
    as?: ComponentType;
    children: ReactNode;
  };

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
export const Container = <ComponentType extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<ComponentType>) => {
  const Component = as ?? "div";

  return (
    <Component className={clsx(styles.container, className)} {...props}>
      {children}
    </Component>
  );
};
