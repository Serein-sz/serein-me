import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.ts";
function App() {
  return (
    <div className="min-h-screen w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
