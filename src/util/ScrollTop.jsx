import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop component to scroll window to top when route changes
function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollTop;
