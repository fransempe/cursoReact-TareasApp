import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Components/Nav'
import ListaTareas from './Components/ListaTareas'
import AgregarTareas from './Components/AgregarTareas';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      formValues: {
        id: null,
        titulo: "",
        descripcion: ""
      },
      tareas: []
    }
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  componentDidMount() {

    if (localStorage.getItem("tareas") === null) {
      this.getTasks() 
    } else {
      let tareas = localStorage.getItem('tareas')
      this.setState({ tareas: JSON.parse(tareas) })
    }
  }

  handleChangeForm(e) {
    const { name, value } = e.target;

    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    })
  }

  handleAddTask = () => {
    const { id, titulo, descripcion } = this.state.formValues
    const nuevaListaTareas = this.state.tareas
    //Si no es null el ID es porque es para editar la tarea, sino, se da de alta.
    if(id != null){
      const nuevasTareas = nuevaListaTareas.map(tarea => {
        if (tarea.id === id) {
          tarea.titulo = titulo
          tarea.descripcion = descripcion
        }
        return tarea
      })
      this.setState({ tareas: this.setLocalStorage(nuevasTareas) })
      this.limpioState()    
    } else {
        nuevaListaTareas.push({
          id: nuevaListaTareas.length,
          titulo: titulo,
          descripcion: descripcion,
          terminada: false
        })
        //Agrego la nueva lista de tareas al estado tareas.
        this.setState({ tareas: this.setLocalStorage(nuevaListaTareas) });
        // Reseteo el estado de formValues para que se vacíen las cajas de texto.
        this.limpioState()
    }
  }

  handleFinishTask = id => {
    const { tareas } = this.state
    const nuevasTareas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.terminada = !tarea.terminada
      }
      return tarea
    })
    this.setState({ tareas: this.setLocalStorage(nuevasTareas) })
  }

  handleEditTask = (id, titulo, descripcion) => {

    this.setState({
      formValues:
      {
        id: id,
        titulo: titulo,
        descripcion: descripcion
      }
    })

  }

  async getTasks(){
    const res = await fetch("http://localhost:3000/tareas.json")
    const datos = await res.json()
        
    this.setState({ tareas: this.setLocalStorage(datos)})
  }

  limpioState() {
    this.setState({
      formValues: { id: null, titulo: '', descripcion: '' }
    })
  }

  setLocalStorage = (datos) => {
    //Guardo en localStorage
    localStorage.setItem('tareas', JSON.stringify(datos))
    let tareas = localStorage.getItem('tareas')
    // Se parsea para poder ser usado en js con JSON.parse
    tareas = JSON.parse(tareas)
    return tareas
  } 

  render() {
    const { tareas } = this.state
    return (
      <div>
        <Nav />
        <AgregarTareas
          handleChange={this.handleChangeForm}
          formValues={this.state.formValues}
          onAddTask={this.handleAddTask}
        />
        <div className="container p-4">
          <ListaTareas
            tituloForm = {"No Terminadas"}
            tareas={tareas.filter(tarea => tarea.terminada === false)}
            onFinishTask={this.handleFinishTask}
            onEditTask={this.handleEditTask}
            hide={false} 
          />
          <ListaTareas
            tituloForm = {"Terminadas"}
            tareas={tareas.filter(tarea => tarea.terminada === true)}
            onFinishTask={this.handleFinishTask}
            onEditTask={this.handleEditTask}
            hide={true} 
          />
        </div>
      </div>
    );
  }
}

export default App;
