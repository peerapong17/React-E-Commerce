import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components";

const NavBarLayout = ({ children }) => {
  const { cart } = useSelector((state) => state.cart);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <Navbar totalItems={cart.length} handleDrawerToggle={handleDrawerToggle}>
      {children}
    </Navbar>
  );
};

export default NavBarLayout;
