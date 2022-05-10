import { useState, useCallback, memo } from 'react';
import Button from './Button';
import styles from './App.module.css';
import SearchField from './SearchField';
import Tippy from './Tippy';

export default memo(function App() {
  const [button1Clicks, setButton1Clicks] = useState(0);
  const button1Click = useCallback(() => {
    setButton1Clicks((c) => c + 1);
  }, [setButton1Clicks]);

  const [button1Type, setButton1Type] = useState('default');

  const [button2Clicks, setButton2Clicks] = useState(0);
  const button2Click = useCallback(() => {
    setButton2Clicks((c) => c + 1);
  }, [setButton2Clicks]);

  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [searchValue, setSearchValue] = useState(null);

  const [showBlock, setShowBlock] = useState(true);
  const showBlockChanged = useCallback((e) => {
    setShowBlock(e.target.checked);
  }, []);

  const [tooltipPlacement, setTooltipPlacement] = useState('bottom');
  const tooltipPlacementChanged = useCallback(
    (e) => {
      setTooltipPlacement(e.target.value);
    },
    [setTooltipPlacement],
  );

  return (
    <main>
      <div className={styles.container}>
        <h3>Buttons</h3>
        <div className={styles.flex}>
          <Tippy text="This is the first button" placement={tooltipPlacement}>
            <Button type={button1Type} onClick={button1Click}>
              Button 1 clicked {button1Clicks} times
            </Button>
          </Tippy>

          <Button type="important" onClick={button2Click}>
            Button 2 clicked {button2Clicks} times
          </Button>

          <Button
            onClick={() => {
              setButton1Type('important');
            }}
          >
            Change Button 1 type to 'important'
          </Button>

          <Button type={{ backgroundColor: 'green' }} />
        </div>
      </div>

      <div className={styles.container}>
        <h3>Tooltip Placement</h3>
        {['top', 'bottom', 'right', 'left'].map((p, i) => (
          <label key={i} className={styles.placementLabel}>
            <input
              type="radio"
              name="placement"
              checked={tooltipPlacement === p}
              value={p}
              onChange={tooltipPlacementChanged}
            />
            {p}
          </label>
        ))}
      </div>

      <div className={styles.container}>
        <h3>Search Field</h3>
        <SearchField onChange={setSearchFieldValue} onSearch={setSearchValue} />
        <div className={styles.extra}>
          Current search field value: {searchFieldValue}
        </div>
        <div className={styles.extra}>Last search for: {searchValue}</div>
      </div>

      <div className={styles.container}>
        <h3>Show/Hide Block</h3>
        <label>
          <input
            type="checkbox"
            checked={showBlock}
            onChange={showBlockChanged}
          />
          Show
        </label>
        {showBlock && (
          <div className={styles.extra}>
            This part will show and hide dynamically
          </div>
        )}
      </div>
    </main>
  );
});
