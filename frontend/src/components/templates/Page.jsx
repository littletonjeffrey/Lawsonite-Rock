import Sidebar from "../sidebar/sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const Page = (props, {children}) => {
  const pageTitle = `${
    props.currentPage === "Home"
      ? "SociaLite - A Social network for introverts"
      : `${props.currentPage} SociaLite`
  }`;

  return (
    <HelmetProvider className="application">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={props.desc} />
      </Helmet>

      <div className="grid grid-cols-12 gap-2">
        <nav>
          <Sidebar />
        </nav>

        {children}
      </div>
    </HelmetProvider>
  );
};
