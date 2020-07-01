import React from 'react'

function Nav ( { handleAddTask, handleLogOut } ) {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="\">Tareas APP</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    
                    <li className="nav-item">
                        <a className="nav-link" href="\">Login</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="\" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tareas
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="\" onClick={ handleAddTask }>Agregar Tareas</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="\" onClick={ handleLogOut }>Logout</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        // <nav className="navbar navbar-dark bg-dark">
        //     <a href="/" className="navbar-brand">Tareas App</a>
        //     <form className="form-inline" onSubmit={ handleAddTask }>
        //         <input className="btn btn-primary" type="submit" value="Agregar Tarea" />
        //     </form>
        // </nav>
    )
}



export default Nav;