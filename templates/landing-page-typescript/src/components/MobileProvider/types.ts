import { ReactNode } from "react";

export type MobileContextType = {
  isMobile: boolean;
  screenWidth: number;
};

export type MobileProviderProps = {
  children: ReactNode;
};
