import { FC, ChangeEventHandler } from "react";

import "./search.styles.scss";

type SearchBarProps = {
  placeholder: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};
const SearchBar: FC<SearchBarProps> = ({ placeholder, onChangeHandler }) => {
  return (
    <div className={"searchBox"}>
      <input
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchBar;
