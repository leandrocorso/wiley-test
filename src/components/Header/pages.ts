interface PagesProps {
  path: string;
  label: string;
}

export const pages: PagesProps[] = [
  { path: "/", label: "Products" },
  { path: "/add-product", label: "Add product" },
];
