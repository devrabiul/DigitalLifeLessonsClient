import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    const scrollContainers = document.querySelectorAll(".overflow-y-auto");
    scrollContainers.forEach((container) => {
      container.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
