import React from 'react'

function Nav ( { handleAddTask } ) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a href="/" className="navbar-brand">Tareas App</a>
            <form className="form-inline" onSubmit={ handleAddTask }>
                <input className="btn btn-primary" type="submit" value="Agregar Tarea" />
            </form>
        </nav>
    )
}

export default Nav;