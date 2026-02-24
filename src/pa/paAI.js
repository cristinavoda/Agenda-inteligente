import { useTasksStore } from '../stores/tasksStore'
import { speak } from './speechOutput'

export async function askAI(question) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    return data 
  } catch (err) {
    console.error("Error IA:", err)
    return { answer: "No pude conectarme a la IA", action: null }
  }
}

export async function handleAIResponse(question) {
    const taskStore = useTasksStore()
    const addTaskToStore = (task) => {
      taskStore.addTask(task.title)
    }
  const { answer, action } = await askAI(question)

 
  speak(answer)

  
  if (action && action.type === 'CREATE_TASK' && action.task) {
    addTaskToStore(action.task)
    speak(`He creado la tarea: ${action.task.title}`)
  }
}