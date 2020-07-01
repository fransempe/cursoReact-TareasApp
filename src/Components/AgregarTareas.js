import React, { Component } from 'react'

class AgregarTareas extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        e.target.titulo.value = ""
        e.target.descripcion.value = ""
        this.props.onAddTask()
    }

    render() {
        const { handleChange, formValues } = this.props ;
        const { titulo, descripcion } = formValues;

        return (
            <div className="p-2">
                <div className="card card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Título"
                                name="titulo"
                                onChange={ handleChange } 
                                value={ titulo }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="descripcion"
                                className="form-control"
                                placeholder="Descripción"
                                onChange={ handleChange } 
                                value={ descripcion }
                                required
                            >
                            </textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AgregarTareas;
