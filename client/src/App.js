import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Report from "./pages/Report/Report";
import ViewReport from "./components/ViewReport";
import DataForm from "./pages/DataForm/DataForm";
import Input from "./pages/Input/Input";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/report",
      element: <Report />,
    },
    {
      path: "/viewReport",
      element: <ViewReport />,
    },
    {
      path: "/viewreport/:regionName", // Use consistent casing for path segments
      element: <ViewReport />,
    },
    {
      path: "/viewreport/:regionName/:policeStation",
      element: <DataForm />,
    },
    {
      path: "/input",
      element: <Input />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
