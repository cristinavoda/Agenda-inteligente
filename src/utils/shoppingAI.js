export function shoppingAIv2(input) {
  const text = input.toLowerCase()

  const menu = {
    desayuno: [],
    comida: [],
    cena: [],
    merienda: []
  }

  // 🧠 MENÚ BASE ESPAÑOL
  const recipes = {
    desayuno: [
      {
        title: "Tostadas con tomate",
        ingredients: ["pan", "tomate", "aceite de oliva"]
      },
      {
        title: "Café con leche",
        ingredients: ["café", "leche"]
      }
    ],

    comida: [
      {
        title: "Paella",
        ingredients: ["arroz", "pollo", "caldo", "pimiento", "aceite de oliva"]
      },
      {
        title: "Ensalada mixta",
        ingredients: ["lechuga", "tomate", "atún", "huevo"]
      }
    ],

    cena: [
      {
        title: "Tortilla de patatas",
        ingredients: ["huevo", "patata", "cebolla"]
      },
      {
        title: "Crema de verduras",
        ingredients: ["calabacín", "zanahoria", "patata"]
      }
    ],

    merienda: [
      {
        title: "Yogur con fruta",
        ingredients: ["yogur", "plátano"]
      },
      {
        title: "Bocadillo de jamón",
        ingredients: ["pan", "jamón"]
      }
    ]
  }

 
  if (text.includes("menú") || text.includes("semana") || text.includes("completo")) {
    menu.desayuno.push(...recipes.desayuno)
    menu.comida.push(...recipes.comida)
    menu.cena.push(...recipes.cena)
    menu.merienda.push(...recipes.merienda)
  }
if (text.includes("carbonara")) {
  menu.comida.push(recipes.carbonara)
}

if (text.includes("pizza")) {
  menu.cena.push(recipes.pizza)
}

if (text.includes("paella")) {
  menu.comida.push(recipes.paella)
}

if (text.includes("desayuno")) {
  menu.desayuno.push(...recipes.desayuno)
}
  // 🛒 LISTA DE COMPRA FINAL
  const shoppingList = []

  Object.values(menu).forEach(meals => {
    meals.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        shoppingList.push(ing)
      })
    })
  })

  // 🗂️ CATEGORIZACIÓN SUPERMERCADO
  const categories = {
    frutaVerdura: ["tomate", "lechuga", "zanahoria", "calabacín", "patata", "cebolla", "plátano", "pimiento"],
    carnePescado: ["pollo", "atún", "jamón"],
    lacteos: ["leche", "yogur", "huevo"],
    panaderia: ["pan"],
    despensa: ["arroz", "aceite de oliva", "café", "caldo"]
  }

  const grouped = {
    frutaVerdura: [],
    carnePescado: [],
    lacteos: [],
    panaderia: [],
    despensa: []
  }

  shoppingList.forEach(item => {
    const key = Object.keys(categories).find(cat =>
      categories[cat].includes(item)
    )

    if (key) {
      grouped[key].push(item)
    } else {
      grouped.despensa.push(item)
    }
  })

  return {
    menu,
    shoppingList,
    grouped
  }
}