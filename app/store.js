import {create} from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  selectedRecipes: [],
  visibleRecipes: [],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, ...recipe],
      visibleRecipes: [...state.visibleRecipes, ...recipe.slice(0, 15)],
    })),
  removeRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
      visibleRecipes: state.visibleRecipes.filter((recipe) => recipe.id !== recipeId),
      selectedRecipes: state.selectedRecipes.filter((selectedId) => selectedId !== recipeId),
    })),
  toggleRecipeSelection: (recipeId) =>
    set((state) => {
      const isSelected = state.selectedRecipes.includes(recipeId);
      const updatedSelectedRecipes = isSelected
        ? state.selectedRecipes.filter((selectedId) => selectedId !== recipeId)
        : [...state.selectedRecipes, recipeId];
      return { selectedRecipes: updatedSelectedRecipes };
    }),
}));

export default useRecipeStore;
