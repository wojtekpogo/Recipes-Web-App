import React from 'react';
import axios from 'axios'; //importing axios
import '../addRecipe.css';
import BackgroundPic from '../Images/background.jpg' //background image


    const bgImage= {
        
        backgroundImage: 'url('+BackgroundPic+')' //setting the bg image
    }
    
export class AddRecipe extends React.Component {


    constructor() {

        super();
        //all events has to be binded
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeRecipe = this.onChangeRecipe.bind(this);
        this.onChangePic = this.onChangePic.bind(this);
        this.state = {
            Title: '',
            Recipe: '',
            Pic: ''
        }
    }

    //method to input a title
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }
    //method to input new recipe
    onChangeRecipe(e) {
        this.setState({
            Recipe: e.target.value
        });
    }

    //method to input a picture url
    onChangePic(e) {
        this.setState({
            Pic: e.target.value
        });
    }

    onSubmit(e) {
        //stops before calling button multiple times
        e.preventDefault();
        //alert
        alert("Recipe Succesfuly added.");


        //creating the object
        const newRecipe = {
            Title: this.state.Title,
            Recipe: this.state.Recipe,
            Pic: this.state.Pic
        }
        
        //posts data to the server
        axios.post('http://localhost:4000/recipes', newRecipe)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div style ={bgImage} className='Form'>
                 <form onSubmit={this.onSubmit}>
                    <div className="form-group w-200" >
                        <label>Add Recipe Name: </label>
                        <input type='text' 
                            className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>

                    <div className="form-group w-200">
                        <label>Add Recipe: </label>
                        <textarea type='text' rows={7}
                            className='form-control'
                            value={this.state.Recipe}
                            onChange={this.onChangeRecipe}></textarea>
                    </div>

                    <div className="form-group w-200">
                        <label>Add recipe URL:</label>
                        <textarea type='text' rows={3}
                            className="form-control"
                            value={this.state.Pic}
                            onChange={this.onChangePic}></textarea>
                    </div>
                    <div className="form-group">
                        <input type='submit'
                            value='Add New Recipe'
                            className='btn btn-success'></input>
                    </div>
                </form>

            </div>


        );

    }

}