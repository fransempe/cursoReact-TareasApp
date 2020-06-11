import React, { Component } from 'react'

class ListaTareas extends Component {
    constructor( props ) {
        super( props );
        
    }

    render() {
        const { tareas } = this.props

        return (
            <div>
                <h1 className="text-center">Tareas NO Terminadas</h1>
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
                                
                                    <div className="card-footer">
                                        <button  className="btn btn-primary" >
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
export default ListaTareas;