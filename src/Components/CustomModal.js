import React from 'react'
import { Modal } from 'react-bootstrap'


export default class CustomModal extends React.Component {
    // const [show, setShow] = useState(false);
  

  
    render() {
      const { show, handleClose, title, children } = this.props;

    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {children}

          </Modal.Body>
        </Modal>
      </>
    );
  }
}