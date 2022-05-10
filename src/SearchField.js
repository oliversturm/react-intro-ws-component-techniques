import { memo, useCallback, useState } from 'react';
import styles from './SearchField.module.css';
import SearchIcon from './SearchIcon';

const SearchField = ({ onSearch, onChange }) => {
  const [text, setText] = useState('');

  const search = useCallback(() => {
    if (onSearch) onSearch(text);
  }, [onSearch, text]);

  const inputKeypress = useCallback(
    (e) => {
      if (e.key === 'Enter') search();
    },
    [search],
  );

  const textChanged = useCallback(
    (e) => {
      setText(e.target.value);
      if (onChange) onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={styles.outer}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for something..."
        text={text}
        onChange={textChanged}
        onKeyPress={inputKeypress}
      />
      <button className={styles.button} disabled={!text} onClick={search}>
        Search
      </button>
    </div>
  );
};

export default memo(SearchField);
