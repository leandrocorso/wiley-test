import { ReactNode } from "react";
import { Tabs, TabsProps } from "@mui/material";
import { LinkTab } from "./LinkTab";

interface PagesProps {
  path: string;
  label: string;
}

export const pages: PagesProps[] = [
  { path: "/", label: "Products" },
  { path: "/add-product", label: "Add product" },
];

export const Links = (props: TabsProps): ReactNode => (
  <Tabs {...props}>
    {pages.map((page, index) => {
      return (
        <LinkTab key={`menu-item-${index}`} to={page.path} label={page.label} />
      );
    })}
  </Tabs>
);
