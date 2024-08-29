import logo from "@/assets/wiley-logo.svg";

export const Logo = (props: React.HTMLProps<HTMLDivElement>) => (
  <div className="logo" {...props}>
    <img src={logo} alt="Wiley logo" style={{ width: `100%` }} />
  </div>
);
