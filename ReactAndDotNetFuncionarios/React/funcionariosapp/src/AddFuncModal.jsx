import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap'

export class AddFuncModal extends Component {

    constructor(props) {
        super(props);
        this.state = { departamentos: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSaveFile =  this.handleSaveFile.bind(this);
    }

    fotofilename = "/unknow.png";
    imagesrc = process.env.REACT_APP_FOTOPATH + this.fotofilename;

    componentDidMount() {
        fetch(process.env.REACT_APP_API + '/departamentos')
            .then(response => response.json())
            .then(data => {
                this.setState({ departamentos: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + '/funcionarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FuncionarioId: 0,
                NomeFuncinoario: event.target.NomeFuncinoario.value,
                Departamento: event.target.Departamento.value,
                DataInicio: event.target.DataInicio.value,
                NomeAraquivoFoto: event.target.NomeAraquivoFoto.value
            })
        })
            .then(res => res.json())
            .then(result => {
                alert(result)
            }, (error) => {
                alert("Falha");
            });

    }

    handleSaveFile(event) {

        event.preventDefault();
        this.fotofilename = event.target.files[0].name;
        const formData = new FormData();

        formData.append("meuArquivo",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + '/funcionarios/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                this.imagesrc = process.env.REACT_APP_FOTOPATH + result;
            }, (erro) => {
                alert('Falha');
            })
    }


    render() {
        return (
            <div className="container">
                <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Funcionário
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="NomeFuncinoario">
                                        <Form.Label>Nome Funcionário</Form.Label>
                                        <Form.Control type="text" name="NomeFuncinoario" required placeholder="Nome Funcionário" />
                                    </Form.Group>

                                    <Form.Group controlId="Departamento">
                                        <Form.Label>Departamento</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.departamentos.map(dep => {
                                                debugger
                                                return <option key={dep.departamentoId}>{dep.NomeDepartamento}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DataInicio">
                                        <Form.Label>Data de inicio</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DataDeInicio"
                                            required
                                            placeholder="Data de inicio"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <br />
                                        <Button variant="primary" type="submit">
                                            Add Funcionário
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                            <Image  name="NomeAraquivoFoto" width="200px" height="200px" src={this.imagesrc} />
                            <input onChange={this.handleFileSelected} type="file" />
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