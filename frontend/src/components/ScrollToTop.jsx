import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't reset the scroll position on navigation.
 * This component does — mount it once near the top of the tree.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
