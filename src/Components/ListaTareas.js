import React, { Component } from 'react'

export class ListaTareas extends Component {


    render() {
        const { tareas } = this.props

        return (
            <div>
                <h1 className="text-center">Tareas {this.props.tituloForm}</h1>
                <div className="row">
                    {
                        tareas.map(tarea => (
                            <div className="col-md-4 p-2" key={tarea.id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h5>{tarea.titulo}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p>{tarea.descripcion}</p>
                                    </div>
                                
                                    <div className="card-footer" hidden={this.props.hide}>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={this.props.onEditTask.bind(this, tarea.id, tarea.titulo, tarea.descripcion)}
                                            >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-success float-right"
                                            onClick={this.props.onFinishTask.bind(this, tarea.id)}
                                            >
                                            Terminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        )
    }
}
