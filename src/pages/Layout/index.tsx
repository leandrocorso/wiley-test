import { Outlet } from "react-router-dom";
import { Container, GlobalStyles } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { FeedBack } from "@/components/FeedBack";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Layout = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          "#root": {
            display: "grid",
            gridTemplateRows: "48px auto 48px",
            gap: "1rem",
            minHeight: "100vh",
          },
        }}
      />

      <FeedBack />

      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <Container
          sx={{
            width: "100%",
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Footer />
        </Container>
      </footer>
    </>
  );
};
