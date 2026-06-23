const STORAGE_KEY = 'nutrivision_fridge_items'

export function getFridgeItems() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

export function addFridgeItem(item) {
  const items = getFridgeItems()
  if (!items.some(i => i.name.toLowerCase() === item.name.toLowerCase())) {
    items.push({ ...item, id: Date.now().toString(), addedAt: new Date().toISOString() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
  return items
}

export function removeFridgeItem(id) {
  const items = getFridgeItems().filter(i => i.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  return items
}

export function clearFridge() {
  localStorage.removeItem(STORAGE_KEY)
  return []
}

export function findMatchingRecipes(fridgeItems, allRecipes) {
  if (!fridgeItems.length || !allRecipes.length) return []
  const fridgeNames = fridgeItems.map(i => i.name.toLowerCase())

  return allRecipes.map(recipe => {
    const ingredients = (recipe.additional_ingredients_required || []).map(i => i.toLowerCase())
    const matched = ingredients.filter(ing =>
      fridgeNames.some(f => f.includes(ing) || ing.includes(f))
    )
    const matchPercent = ingredients.length > 0
      ? Math.round((matched.length / ingredients.length) * 100)
      : 0
    return { ...recipe, matchPercent, matchedIngredients: matched }
  }).sort((a, b) => b.matchPercent - a.matchPercent)
}
