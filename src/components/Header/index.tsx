import { useEffect, useState } from "react";
import { AppBar, Drawer, Container, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Links } from "./Links";
import { pages } from "./pages";
import { Logo } from "../Logo";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [currentLink, setCurrentLink] = useState<number | boolean>(false);
  const [drawerStatus, setDrawerStatus] = useState<boolean>(false);

  const { pathname } = useLocation();

  useEffect(() => {
    pages.forEach((page, index) => {
      if (page.path === pathname) setCurrentLink(index);
    });
  }, [pathname]);

  const handleNavigate = (event: React.SyntheticEvent, page: number): void => {
    setCurrentLink(page);
    handleToggleDrawer(false);
  };

  const handleToggleDrawer = (isOpen: boolean) => {
    setDrawerStatus(isOpen);
  };

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 48,
          }}
        >
          <Link to="/" title="Back to products page">
            <Logo
              style={{
                display: "flex",
                height: 30,
              }}
            />
          </Link>

          <Links
            onChange={handleNavigate}
            value={currentLink}
            sx={{ display: { xs: "none", sm: "flex" } }}
          />

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => handleToggleDrawer(true)}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Container>
      </AppBar>

      <Drawer
        open={drawerStatus}
        anchor="right"
        onClose={() => handleToggleDrawer(false)}
      >
        <Links
          orientation="vertical"
          onChange={handleNavigate}
          value={currentLink}
        />
      </Drawer>
    </>
  );
};
