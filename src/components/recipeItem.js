import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


export class RecipeItem extends React.Component {

  constructor() {
    super();
    this.DeleteRecipe = this.DeleteRecipe.bind(this); //delete recipe has to be binded
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this); 
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true }); //set state to show modal
  };

  hideModal = () => {
    this.setState({ show: false }); //set state to hide modal
  };


  DeleteRecipe(e) {
    e.preventDefault();
    console.log('Delete:'+this.props.recipe._id);
    axios.delete('http://localhost:4000/recipes/' + this.props.recipe._id)
        .then(()=>{
            //calling the reload data method
            this.props.ReloadData();
        })
        .catch();

}


  render() {

    return (

      <Container>
        {/*using Card bootstrap to display recipe objects*/}{/*using Card bootstrap to display recipe objects*/}
        <Card>
          <Card.Header><h2>{this.props.recipe.title}</h2></Card.Header>
          <Card.Body>
          <img src={this.props.recipe.pic} width="400" height="300"></img><br></br>
            <Button variant="secondary" onClick={this.showModal}>Show Recipe</Button>
            <Button variant="danger" onClick={this.DeleteRecipe}>Delete</Button>
            <Link to={"/editRecipe/"+this.props.recipe._id} className="btn btn-primary">Edit Recipe</Link>


            <Modal show={this.state.show} onHide={this.hideModal}>

              {/*using Modal bootstrap to display the recipe*/}
              <Modal.Header closeButton>
                <Modal.Title>{this.props.recipe.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.props.recipe.recipeDetail}</Modal.Body>
              
              <Modal.Footer>
                <Button variant="secondary" onClick={this.hideModal}>
                  Close
          </Button>

              </Modal.Footer>
            </Modal>

          </Card.Body>
        </Card>


     </Container>

    );

  }

}