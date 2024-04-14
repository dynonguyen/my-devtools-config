import { useEffect } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';

export const AutoFocus = ({ children }: { children: JSXInternal.Element }) => {
  useEffect(() => {
    const id = children.props.id;
    if (id) {
      document.getElementById(id)?.focus();
    }
  }, []);

  return children;
};

export default AutoFocus;
