import React from 'react';
import { Recipes } from './recipes';
import axios from 'axios'; //importing axios
import BackgroundPic from '../Images/background.jpg'

const bgImage= {
        
    backgroundImage: 'url('+BackgroundPic+')' //setting the bg image
}

export class DisplayRecipe extends React.Component{

    constructor(){

        super();
        //binds the event
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = 
    {
        recipes:[
       
        ]
    };


    ReloadData(){
        axios.get('http://localhost:4000/recipes') //takes data from the server
        .then(resposne=>{
            this.setState({recipes:resposne.data});

        })
        .catch((error)=>{ {/*error handling if it won't work*/}

            console.log(error);
        });

    }
    
    componentDidMount(){ {/* function that takes json file from the server and returns a promise*/}
        axios.get('http://localhost:4000/recipes')  
        .then(resposne=>{
            this.setState({recipes:resposne.data});

        })
        .catch((error)=>{ {/*error handling if it won't work*/}

            console.log(error);
        });
    }

    render(){
        return(
            <div style ={bgImage}> {/*background image*/}
                <h1>Recipes</h1>
                <Recipes myRecipes={this.state.recipes} ReloadData={this.ReloadData}></Recipes>
            </div>
        );
        
    }
}