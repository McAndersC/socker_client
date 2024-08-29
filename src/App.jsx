import { useRoutes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";


function App() {

  const routes = useRoutes([
    {
      path: "/",
      element : <HomePage></HomePage>
    },
  ]);


  return <>
    
    <div>
        {/* GLOBAL NAVIGATION */}
        <div className="globale-page-wrapper">
        
            {routes}
        
        </div>
       {/* GLOBAL FOOTER */}
    </div>
  </>;

}

export default App;
