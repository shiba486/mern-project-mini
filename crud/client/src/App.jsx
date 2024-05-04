import {RouterProvider, createBrowserRouter} from "react-router-dom"
import "./App.css"
import { AddUser, UpdateUser, User } from "./components"



const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element:<User/>
    },
    {
      path: "/add",
      element: <AddUser/>
    },
    {
      path: "/edit/:id",
      element: <UpdateUser/>
    },
  ])
  return (
    <>
      <div className='App'>
        <RouterProvider router={route}>

        </RouterProvider>
      </div>
    </>
  );
};

export default App;