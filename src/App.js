import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Components/Nav'
import ListaTareas from './Components/ListaTareas'
import AgregarTareas from './Components/AgregarTareas';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      formValues: {
        titulo: "",
        descripcion: "",
      },
      tareas:[
                
            ]
        }

    this.handleChangeForm = this.handleChangeForm.bind(this);
    }

  handleChangeForm(e) {
      const { name, value } = e.target;

      this.setState( {
          formValues: {
              ...this.state.formValues ,
              [name] : value
          }
      })
  }

  handleAddTask = () => {
    const {titulo , descripcion} = this.state.formValues
    const nuevaListaTareas = this.state.tareas
          nuevaListaTareas.push({
            id: nuevaListaTareas.length,
            titulo: titulo,
            descripcion: descripcion,
            terminada: false
        })

        this.setState({ tareas: nuevaListaTareas});
  }

  handleFinishTask = (e) => {
  
  }

  render(){
    const { tareas } = this.state
    return (
      <div>
        <Nav />
        <AgregarTareas 
          handleChange={ this.handleChangeForm }
          formValues={this.state.formValues}
          onAddTask={this.handleAddTask}
          />
          <div className="container p-4">
              <ListaTareas 
                tareas={tareas.filter( tarea => tarea.terminada === false )}  
                onFinishTask={this.handleFinishTask}
                />
          </div>
      </div>
    );
  }
}

export default App;
