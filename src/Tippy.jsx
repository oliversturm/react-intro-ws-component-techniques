import '../node_modules/tippy.js/dist/tippy.css';
import tippy, { followCursor as followCursorPlugin } from 'tippy.js';
import { memo, useEffect, useRef } from 'react';

const Tippy = ({
  children,
  text = '',
  arrow = true,
  delay = [500, 250],
  followCursor = 'horizontal',
  placement = 'top',
  touch = true,
  trigger = 'mouseenter focus',
  zIndex = 9999,
}) => {
  const nodeRef = useRef(null);

  // This effect reruns automatically whenever one of the parameters
  // changes. The destruction logic is run before a new initalization
  // takes place. This works fine for the purpose - alternatively
  // I'd have to track the instance, keep this init/destroy effect
  // independent using [] as the deps array, and then have a separate
  // effect to depend on the individual props and call
  // `instance.setProps` - a lot of hassle in comparison for a small
  // cleanliness advantage.
  useEffect(() => {
    const instance = tippy(nodeRef.current, {
      content: text,
      arrow,
      delay,
      followCursor,
      placement,
      touch,
      trigger,
      zIndex,
      plugins: [followCursorPlugin],
    });

    return () => {
      instance.destroy();
    };
  }, [text, arrow, delay, followCursor, placement, touch, trigger, zIndex]);

  return <div ref={nodeRef}>{children}</div>;
};

const TippyMemo = memo(Tippy);
export default TippyMemo;
