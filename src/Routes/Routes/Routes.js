import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/products/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`),
                element: <Products></Products>
            }
        ]
    }
])

export default router;