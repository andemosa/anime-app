import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import IndexPage from "./pages/Index";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={"/"} exact>
          <IndexPage />
        </Route>
        <Route path={`/anime/:id`}>
          <Details />
        </Route>
        <Route path={"*"}>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
