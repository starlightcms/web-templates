import throttle from "lodash/throttle";
import { createContext, useContext, useEffect, useState } from "react";
import { MobileContextType, MobileProviderProps } from "./types";

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
  screenWidth: 800,
});

export const useMobile = () => useContext(MobileContext);

/**
 * Doesn't render anything, but wraps around the application and adds a hook
 * so the developer can request the screen width and a boolean stating if the
 * screen is a mobile screen (under 768 pixels) or not.
 */
export const MobileProvider = ({ children }: MobileProviderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(800);

  useEffect(() => {
    const listener = throttle(() => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    }, 250);

    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile, screenWidth }}>
      {children}
    </MobileContext.Provider>
  );
};
