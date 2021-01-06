
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { FaGithub,FaPizzaSlice,FaUtensils } from "react-icons/fa"; //to use react icons
import { DisplayRecipe } from './components/displayRecipe';
import { AddRecipe } from './components/addRecipe';
import { MainPage } from './components/mainPage';
import { EditRecipe } from './components/editRecipe';


class App extends Component { //class is now a component
  render() {
    return (
      <Router>
        <div className="App">
   
        <i class="bi bi-github"></i>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Recipes</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/recipes"><FaPizzaSlice/> Our Recipes</Nav.Link>
              <Nav.Link href="/addRecipe"><FaUtensils/> Add Recipe</Nav.Link>
              <Nav.Link href="https://github.com/wojtekpogo"><FaGithub/></Nav.Link> 
            </Nav>
          </Navbar>

         
          <Switch>
              <Route path='/' component={MainPage} exact />
              <Route path ='/recipes' component={DisplayRecipe} exact />
              <Route path ='/addRecipe' component={AddRecipe} exact />
              <Route path='/editRecipe/:id' component={EditRecipe}></Route> 
          
          </Switch>


        </div>
      </Router>
    );
  }
}

export default App;
