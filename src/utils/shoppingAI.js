export function shoppingAIv2(input) {
  const text = input.toLowerCase()

  
 const menu = {
    desayuno: [],
    comida: [],
    cena: [],
    merienda: []
  }

  const recipes = {
    desayuno: [
      {
        title: "Tostadas con tomate",
        ingredients: ["pan", "tomate", "aceite de oliva"]
      },
      {
        title: "Café con leche, Tostadas con tomate",
        ingredients: ["café", "leche", "pan", "tomate", "aceite de oliva"]
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
    ],
    pizza: {
      title: "Pizza",
      ingredients: ["harina", "tomate", "queso", "aceite de oliva"]
    },
    paella: {
      title: "Paella",
      ingredients: ["arroz", "pollo", "caldo", "pimiento", "aceite de oliva"]
  }, 

  carbonara: {
    title: "Pasta Carbonara",
    ingredients: ["pasta", "huevo", "queso", "bacon"]
  }
  ,
bolognese: {
    title: "Pasta Bolognese",
    ingredients: ["pasta", "carne picada", "tomate", "cebolla", "aceite de oliva"]
  }
  ,salmon: { 
    title: "Salmón al horno",
    ingredients: ["salmón", "limón", "aceite de oliva"]
  }
    ,
  sopa: {
    title: "Sopa de verduras",
    ingredients: ["calabacín", "zanahoria", "patata", "cebolla", "aceite de oliva"]
  }
    ,
  hamburguesa: {
    title: "Hamburguesa",
    ingredients: ["pan", "carne picada", "lechuga", "tomate", "queso"]
  }
  ,macarrones: {
    title: "Macarrones con tomate",
    ingredients: ["macarrones", "tomate", "aceite de oliva", "queso"],},

    polloAsado: {
    title: "Pollo asado",
    ingredients: ["pollo", "limón", "aceite de oliva", "ajo"] 
  },
  ratatouille: {
    title: "Ratatouille",
    ingredients: ["calabacín", "berenjena", "pimiento", "tomate", "aceite de oliva"]
  },
  verdurasSalteadas: {
    title: "Verduras salteadas",
    ingredients: ["calabacín", "zanahoria", "pimiento", "aceite de oliva"]
  },
  pescadoAlHorno: {
},

}

const intents = {
  desayuno: /desayuno|breakfast/,
  comida: /comida|lunch/,
  cena: /cena|dinner/,
  menu: /menú|semana|completo/
}

if (intents.menu.test(text)) {
  // todo
}
 let usedAny = false


  if (text.includes("menú") || text.includes("semana") || text.includes("completo" )) {
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

if (text.includes("bolognese")) {
  menu.cena.push(recipes.bolognese)

}
if (text.includes("salmon")) {
  menu.comida.push(recipes.salmon)
}
if (text.includes("sopa")) {
  menu.comida.push(recipes.sopa)
}
if (text.includes("hamburguesa")) {
  menu.cena.push(recipes.hamburguesa)
}
if (text.includes("macarrones")) {
  menu.comida.push(recipes.macarrones)
}
if (text.includes("pollo asado")) {
  menu.comida.push(recipes.polloAsado)
}
if (text.includes("ratatouille")) {
  menu.comida.push(recipes.ratatouille)
}
if (text.includes("verduras salteadas")) {
  menu.comida.push(recipes.verdurasSalteadas)
}
if (text.includes("pescado al horno")) {
  menu.comida.push(recipes.pescadoAlHorno)
}
if (text.includes("ensalada")) {
  menu.comida.push(recipes.ensaladaMixta)

    if (text.includes("ensalada mixta")) {
    menu.comida.push(recipes.ensaladaMixta)
  }
  if (text.includes("ensalada cesar")) {
    menu.comida.push(recipes.ensaladaCesar)
  }
    if (text.includes("ensalada caprese")) {
    menu.comida.push(recipes.ensaladaCaprese)
  }
  if (text.includes("desayuno")) {
    menu.desayuno.push(...recipes.desayuno)
  }
    if (text.includes("ensalada de pasta")) {

    menu.comida.push(recipes.ensaladaDePasta)
    if (text.includes("ensalada de quinoa")) {

    menu.comida.push(recipes.ensaladaDeQuinoa)
  } 
}
if (text.includes("ensalada de garbanzos")) {


    menu.comida.push(recipes.ensaladaDeGarbanzos)
  }


if (text.includes("paella")) {
  menu.comida.push(recipes.paella)
}
if (text.includes("tortilla")) {
  menu.cena.push(recipes.tortillaDePatatas)
}
if (text.includes("crema de verduras")) {
  menu.cena.push(recipes.cremaDeVerduras)
}
if (text.includes("yogur con fruta")) {
  menu.merienda.push(recipes.yogurConFruta)
}
if (text.includes("bocadillo de jamón")) {
  menu.merienda.push(recipes.bocadilloDeJamon)
}
if (text.includes("tostadas con tomate")) {
  menu.desayuno.push(recipes.tostadasConTomate)
}
if (text.includes("café con leche")) {
  menu.desayuno.push(recipes.cafeConLeche)
}
if (text.includes("ensalada mixta")) {
  menu.comida.push(recipes.ensaladaMixta)
}
if (text.includes("macarrones ")) {
  menu.comida.push(recipes.macarrones )
}
if (text.includes("desayuno")) {
  menu.desayuno.push(...recipes.desayuno)
}
 if (text.includes("comida")) {
  menu.comida.push(...recipes.comida)
  usedAny = true
}

if (text.includes("cena")) {
  menu.cena.push(...recipes.cena)
  usedAny = true
}

if (text.includes("merienda")) {
  menu.merienda.push(...recipes.merienda)
  usedAny = true
} 
}
  const shoppingList = []

  Object.values(menu).forEach(meals => {
    meals.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        shoppingList.push(ing)
      })
    })
  })

 
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


if (!usedAny) {
  menu.desayuno.push(...recipes.desayuno)
  menu.comida.push(...recipes.comida)
  menu.cena.push(...recipes.cena)
  menu.merienda.push(...recipes.merienda)
}



  return {
    menu,
    shoppingList,
    grouped
  }
}