import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Posts from './pages/posts/posts';
import SinglePost from "./pages/single post/single post";
import PublicRoute from "./routes/public";

function App() {
  return (
      <BrowserRouter>
          
        <Switch>

          <PublicRoute component={Posts} exact path="/posts" />
          <PublicRoute component={SinglePost} exact path="/posts/:id" />
            
          <Redirect to = "/posts" />
        </Switch>
      </BrowserRouter>


  )
}

export default App;
