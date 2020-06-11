import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
                <nav className="navbar navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">Tareas App</a>
                    <form className="form-inline">
                        <input className="btn btn-primary" type="submit" value="Agregar Tarea" />
                    </form>
                </nav>
        )
    }
}

export default Nav;