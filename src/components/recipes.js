import React from 'react';
import {RecipeItem} from './recipeItem'

export class Recipes extends React.Component{

    render(){
        //maps the recipe item with appriopriate key id
        return this.props.myRecipes.map((recipe)=>{
            return <RecipeItem recipe={recipe} key={recipe._id} ReloadData={this.props.ReloadData}></RecipeItem>
        })
        
    }

}