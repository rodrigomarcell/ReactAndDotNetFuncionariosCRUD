import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

export class AddDepModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + '/departamentos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartamentoId: 0,
                NomeDepartamento: event.target.NomeDepartamento.value
            })
        })
            .then(res => res.json())
            .then(result => {
                alert(result)
            }, (error) => {
                alert("Falha");
            });

    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Departamento
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="NomeDepartamento">

                                        <Form.Label>Nome Departamento</Form.Label>
                                        <Form.Control type="text" name="nomeDepartamento" required placeholder="Nome departamento" />

                                    </Form.Group>
                                    <Form.Group controlId="NomeDepartamento">
                                        <br />
                                        <Button variant="primary" type="submit">
                                            Add Departamento
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