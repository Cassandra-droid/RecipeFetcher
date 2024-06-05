import styles from "./fooddetail.module.css";
import { useEffect } from "react";
import { useState } from "react";
import ItemList from "./ItemList";
export default function FoodDetail({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "0973c39d40d143f0ab39cf51919e9445";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipecard}>
        <h1 className={styles.recipename}>{food.title}</h1>

        <img className={styles.recipeimage} src={food.image} />
        <div className={styles.recipedetails}>
          <span>
            <strong> Prep Time : {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>Serves {food.servings} peoples</strong>
          </span>
          <span>
            <strong>{food.vegetarian ? "Vegetarian" : "Non-vegetarian"}</strong>
          </span>
          <span>
            <strong>
              {food.vegan ? "Vegan friendly" : "Not vegan friendly"}
            </strong>
          </span>
        </div>
        <div>
          <span>
            {" "}
            <strong> ${food.pricePerServing / 100} per serving</strong>
          </span>
        </div>
      </div>{" "}
      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />
      <h2>Instructions</h2>
      <div className={styles.recipeinstructions}>
        <ol>
          {" "}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
