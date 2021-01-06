import React from 'react';
import axios from 'axios'; //importing axios
import BackgroundPic from '../Images/background.jpg'


    const bgImage= {
        
        backgroundImage: 'url('+BackgroundPic+')' //setting the bg image
    }

export class EditRecipe extends React.Component {

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

    componentDidMount(){
        console.log("Load "+this.props.match.params.id);
        axios.get('http://localhost:4000/recipes/'+this.props.match.params.id) //async operation/ ID at the end of URL
        .then(response=>{ //updates the state                                     //
            this.setState({
                _id:response.data._id,
                Title:response.data.title,
                Recipe:response.data.recipeDetail,
                Pic:response.data.pic
            })
        })
        .catch((err)=>{
            console.log(err);
        });
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
        title: this.state.Title,
        recipeDetail: this.state.Recipe,
        pic: this.state.Pic
    }

    //posts data to the server
    axios.put('http://localhost:4000/recipes/'+this.state._id, newRecipe)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));

}
    render() {
        
        return (
            <div style ={bgImage} className='Form'>
            <form onSubmit={this.onSubmit}>
               <div className="form-group w-200" >
                   <label>Edit Recipe Name: </label>
                   <input type='text' 
                       className='form-control'
                       value={this.state.Title}
                       onChange={this.onChangeTitle}></input>
               </div>

               <div className="form-group w-200">
                   <label>Edit Recipe: </label>
                   <textarea type='text' rows={7}
                       className='form-control'
                       value={this.state.Recipe}
                       onChange={this.onChangeRecipe}></textarea>
               </div>

               <div className="form-group w-200">
                   <label>Edit recipe URL:</label>
                   <textarea type='text' rows={3}
                       className="form-control"
                       value={this.state.Pic}
                       onChange={this.onChangePic}></textarea>
               </div>
               <div className="form-group">
                   <input type='submit'
                       value='Update'
                       className='btn btn-success'></input>
               </div>
           </form>

       </div>
        );
    }

}