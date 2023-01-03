// hooks
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export default function messagesResponsive(Page) {
  return function Wrapper(pageProps) {
    const navigate = useNavigate();

    const isTablet = useMediaQuery({
      query: "(min-width: 778px)"
    });

    useEffect(() => {
      if (isTablet) {
        navigate("/messages");
      }
    }, [isTablet]);

    return <Page {...pageProps} />;
  };
}
