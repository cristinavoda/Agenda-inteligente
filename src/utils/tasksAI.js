export function suggestTasks(input) {

  const text = input.toLowerCase()

  const tasks = []

  if (text.includes("mañana")) {
    tasks.push(
      {
        title: "Preparar desayuno",
        priority: "medium"
      },
      {
        title: "Revisar agenda",
        priority: "high"
      }
    )
  }

  if (text.includes("trabajo")) {
    tasks.push(
      {
        title: "Responder emails",
        priority: "medium"
      },
      {
        title: "Planificar tareas",
        priority: "high"
      }
    )
  }

  if (text.includes("vue")) {
    tasks.push(
      {
   title:"Practicar Vue",
   priority:"medium",
   done:false,
   category:"learning",
   estimatedTime:60
},
      {
        title: "Leer documentación",
        priority: "low",
        done:false,
        category:"learning",
        estimatedTime:60
      }
    )
  }

  if (text.includes("salud")) {
    tasks.push(
      {
        title: "Caminar 30 minutos",
        priority: "height"
      },
      {
        title: "Beber agua",
        priority: "low"
      }
    )
  }

  return tasks
}