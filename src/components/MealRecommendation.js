import React, { useState, useEffect } from 'react';
import styles from './MealRecommendation.module.css';

function MealRecommendation() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        const response = await fetch(
          'https://api.spoonacular.com/recipes/random?apiKey=75c6f88907ad45e7b914a5daa8641421&tags=vegetarian&number=1'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch meal');
        }

        const data = await response.json();
        setMeal(data.recipes[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRandomMeal();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!meal) return <div className={styles.noMeal}>No meal found</div>;

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeMain}>
        <div className={styles.imageWrapper}>
          <img src={meal.image} alt={meal.title} className={styles.recipeImage} />
        </div>
        <div className={styles.recipeInfo}>
          <div className={styles.tags}>
            {/* Example tags, you can map real tags if available */}
            {meal.diets && meal.diets.map((diet) => (
              <span key={diet} className={styles.tag}>{diet}</span>
            ))}
          </div>
          <h2 className={styles.recipeTitle}>{meal.title}</h2>
          <div className={styles.ratingRow}>
            <span className={styles.stars}>★ ★ ★ ★ ☆</span>
            <span className={styles.ratingValue}>3.7</span>
            <span className={styles.ratingCount}>(3 ratings)</span>
          </div>
          <div className={styles.recipeMeta}>
            <span className={styles.metaItem}>⏱ Prep. {meal.preparationMinutes || 20}min</span>
            <span className={styles.metaItem}>🕒 Total {meal.readyInMinutes}min</span>
            <span className={styles.metaItem}>🍽 {meal.servings} servings</span>
          </div>
          <button className={styles.cookButton}>Cook now</button>
        </div>
      </div>
      <div className={styles.recipeDetailsRow}>
        <div className={styles.ingredientsCol}>
          <div className={styles.ingredientsSection}>
            <h3 className={styles.sectionTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {meal.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className={styles.ingredientItem}>
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    className={styles.ingredientImage}
                  />
                  <span className={styles.ingredientText}>{ingredient.original}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.preparationCol}>
          <div className={styles.recipeCards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Preparation</h3>
              <div className={styles.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealRecommendation;
