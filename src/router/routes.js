import {
    createBrowserRouter,
  } from "react-router-dom";
  import App from "../App";
  import WorkerDetail from "../pages/WorkerDetail";
  const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: `/worker/:id`,
        element: <WorkerDetail/>,
    }
  ])

  export default routes