import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Components/Nav'
import { ListaTareas } from './Components/ListaTareas'
import AgregarTareas from './Components/AgregarTareas';
import CustomModal from './Components/CustomModal';

class App extends Component {

  constructor() {
    super();
    this.state = {
      formValues: {
        id: null,
        titulo: "",
        descripcion: ""
      },
      tareas: [],
      showModal: false,
      titleModal: "",
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

  handleSaveTask = () => {
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
      this.setLocalStorage(nuevasTareas)
      this.setState({ tareas: nuevasTareas, showModal: false })
      this.limpioState()    
    } else {
        nuevaListaTareas.push({
          id: nuevaListaTareas.length,
          titulo: titulo,
          descripcion: descripcion,
          terminada: false
        })
        //Agrego la nueva lista de tareas al estado tareas.
        this.setLocalStorage(nuevaListaTareas)
        this.setState({ tareas: nuevaListaTareas, showModal:false });
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
    this.setLocalStorage(nuevasTareas)
    this.setState({ tareas: nuevasTareas })
  }

  handleEditTask = (id, titulo, descripcion) => {

    this.setState({
      formValues:
      {
        id: id,
        titulo: titulo,
        descripcion: descripcion
      },
      showModal: true,
      titleModal: "Editar Tarea",
    })

  }

  async getTasks(){
    const res = await fetch("http://localhost:3000/tareas.json")
    const datos = await res.json()
    console.log("datos", datos)
    this.setLocalStorage(datos)
    this.setState({ tareas: datos})
  }

  limpioState() {
    this.setState({
      formValues: { id: null, titulo: '', descripcion: '' }
    })
  }

  setLocalStorage = (datos) => {
    //Guardo en localStorage
    localStorage.setItem('tareas', JSON.stringify(datos))
  } 

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleShowModal = (event ) => {
    event.preventDefault();
    this.setState({ showModal: true, titleModal: "Agregar Tarea" })
  }

  render() {
    const { tareas } = this.state
    return (
      <div>
        <Nav
          handleAddTask={ this.handleShowModal }
        />

        <CustomModal
          show={ this.state.showModal }
          handleClose={ this.handleCloseModal }
          title={ this.state.titleModal }
        >
          <AgregarTareas
            handleChange={this.handleChangeForm}
            formValues={this.state.formValues}
            onAddTask={this.handleSaveTask}
          />
        </CustomModal>

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
