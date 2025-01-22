import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";


const App = () => {
// Cuando usemos react router dom, App solo debería tener el RouterProvider y el resto de cosas deberían estar en RootLayout
 return(
    <RouterProvider router={router}/>
 );
};
export default App;