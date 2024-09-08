import { ReactNode } from "react";
import { Tabs, TabsProps } from "@mui/material";
import { LinkTab } from "./LinkTab";
import { pages } from "./pages";

export const Links = (props: TabsProps): ReactNode => (
  <Tabs {...props}>
    {pages.map((page, index) => {
      return (
        <LinkTab key={`menu-item-${index}`} to={page.path} label={page.label} />
      );
    })}
  </Tabs>
);
