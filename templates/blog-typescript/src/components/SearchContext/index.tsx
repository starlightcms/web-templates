import { createContext, Dispatch, SetStateAction, useContext } from "react";

type SearchContextProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContextProps>({
  isSearchOpen: true,
  setIsSearchOpen: () => undefined,
});

export const useSearchContext = () => useContext(SearchContext);
