// import React from "react";
// import { Navbar } from "../components/index";

// const DynamicLayoutRoute = (props) => {
//   const { component: RoutedComponent, layout, ...rest } = props;

//   // render actual Route from react-router
//   const actualRouteComponent = (
//     <Route {...rest} render={(props) => <RoutedComponent {...props} />} />
//   );

//   // depends on the layout, you can wrap Route component in different layouts
//   switch (layout) {
//     case "NAV": {
//       return (
//         <LayoutNav>
//           <Navbar
//             totalItems={cart.length}
//             handleDrawerToggle={handleDrawerToggle}
//             onFilterProduct={onFilterProduct}
//           />
//           {actualRouteComponent}
//         </LayoutNav>
//       );
//     }
//     case "WITH_OUT_NAV": {
//       return {actualRouteComponent};
//     }
//     default: {
//       return {actualRouteComponent};
//     }
//   }
// };

// export default DynamicLayoutRoute;
