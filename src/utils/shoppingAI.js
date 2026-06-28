const recipes = {
  "carbonara": ["Espaguetis", "Huevos", "Bacon", "Parmesano", "Pimienta"],
  "tortilla": ["Patatas", "Huevos", "Cebolla", "Aceite de oliva"],
  "ensalada": ["Lechuga", "Tomate", "Pepino", "Aceite"],
  "pizza": ["Masa", "Tomate", "Mozzarella", "Orégano"]
}
export function generateShoppingList(text) {
  const input = text.toLowerCase()

  const result = []

  if (input.includes("carbonara")) result.push(...recipes.carbonara)
  if (input.includes("tortilla")) result.push(...recipes.tortilla)
  if (input.includes("ensalada")) result.push(...recipes.ensalada)
  if (input.includes("pizza")) result.push(...recipes.pizza)
    

  return result
}