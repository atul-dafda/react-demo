import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// async function addMealHandler(DUMMY_MEALS) {
//   const response = await fetch(
//     "https://react-demo-eecd7-default-rtdb.firebaseio.com/meals.json",
//     {
//       method: "POST",
//       body: JSON.stringify(DUMMY_MEALS),
//       headers: {
//         "content-Type": "application/Json",
//       },
//     }
//   );
//   const data = await response.json;
//   console.log(data);
// }

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

// useEffect(() => {
//   addMealHandler(DUMMY_MEALS);
// }, []);

const AvailableMeals = () => {
  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch(
  //       "https://react-demo-eecd7-default-rtdb.firebaseio.com/meals.json"
  //     );
  //     const responseData = await response.json();
  //   };
  // }, []);

  // fetchMeals().catch((error) => {
  //   setIsloading(false);
  //   setHttpError(error.message);
  // });

  const [meal, setMeal] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealHandler = useCallback(async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        "https://react-demo-eecd7-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }

      setMeal(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, [setError]);

  useEffect(() => {
    fetchMealHandler();
  }, [fetchMealHandler]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading..</p>
      </section>
    );
  }

  const mealsList = meal.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>{!error ? <ul>{mealsList}</ul> : error}</Card>
    </section>
  );
};

export default AvailableMeals;
