import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

export class EditFuncModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        let id = event.target.depid.value;
        event.preventDefault();
        fetch(process.env.REACT_APP_API + '/departamentos/' + id, {
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                DepartamentoId: event.target.depid.value,
                NomeDepartamento: event.target.depname.value
            })
        })
        .then(res => res.json())
        .then(result => {
            alert(result)
        }, (error) => {
            alert("Falha");
        });
        
    }

    render(){
        
        return (
            <div className="container">
                
                <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered> 

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Departamento
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                     <Form.Group controlId="DepartamentoId">
                                        
                                        <Form.Label>Nome Departamento</Form.Label>
                                        <Form.Control type="text" name="depid" required placeholder="ID Departamento" disabled defaultValue={this.props.depid}/>

                                    </Form.Group>

                                    <Form.Group controlId="NomeDepartamento">
                                        
                                        <Form.Label>Nome Departamento</Form.Label>
                                        <Form.Control type="text" name="depname" required placeholder="Nome departamento" defaultValue={this.props.depname}/>

                                    </Form.Group>
                                    <Form.Group controlId="NomeDepartamento">
                                        <br />
                                        <Button variant="primary" type="submit">
                                            Edit Departamento
                                        </Button>
                                        
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button vaiant="danger" onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}