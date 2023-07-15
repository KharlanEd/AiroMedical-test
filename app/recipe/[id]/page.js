'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from '/app/style/recipeDetails.module.css'


async function getData(id) {
  const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await response.json();
  return data;
}




export default function RecipeDetails({ params: { id } }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(id);
          setRecipe(data[0]);
          console.log(data);
      } catch (error) {
        console.error('Ошибка при получении данных рецепта', error);
      }
    };

    fetchData();
  }, [id]);

  if (!recipe) {
    return <p>Загрузка...</p>;
  }

  console.log(recipe);

  return (
      <> <div>
          <Image src={recipe.image_url} alt={recipe.name} width={100} height={100} />
          <h2>{recipe.name }</h2>
          <ul>
              <li className={styled.list_item} key={recipe.brewers_tips} ><h3>Advice:</h3> <p>{recipe.brewers_tips
              }</p> </li> 
              <li className={styled.list_item} key={recipe.contributed_by}><h3>Contributed:</h3> <p>{recipe.contributed_by}</p>  </li>
              <li className={styled.list_item} key={recipe.first_brewed}> <h3>Brewed:</h3> <p>{recipe.first_brewed}</p>  </li>
               <h3>Ingredients:</h3>
      <h4>Malt:</h4>
      <ul>
        {recipe.ingredients.malt.map((malt,index) => (
          <li className={styled.list_item} key={`${malt.name}-${index}`}>{malt.name}</li>
        ))}
      </ul>
      <h4>Hops:</h4>
      <ul>
        {recipe.ingredients.hops.map((hop, index) => (
          <li className={styled.list_item} key={`${hop.name}-${index}`}>{hop.name}</li>
        ))}
      </ul>
      <h4>Yeast:</h4>
      <p>{recipe.ingredients.yeast}</p>
              
              <li className={styled.list_item}>Description: {recipe.description }</li>

         </ul>
      </div>
    </>
  );
}