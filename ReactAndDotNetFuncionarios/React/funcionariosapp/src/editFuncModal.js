import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap'

export class EditFuncModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departamentos: [],
            nomeArquivoFoto: "/avatar.png",
            fotoPath: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSaveFile = this.handleSaveFile.bind(this);
    }


    componentDidMount() {

        this.setState({ nomeArquivoFoto: "/avatar.png" });
        this.setState({ fotoPath: process.env.REACT_APP_FOTOPATH + this.state.nomeArquivoFoto });

        fetch(process.env.REACT_APP_API + '/departamentos')
            .then(response => response.json())
            .then(data => {
                this.setState({ departamentos: data });
            });
    }

    handleSubmit(event) {

        event.preventDefault();
        let id = event.target.FuncionarioId.value;
        fetch(process.env.REACT_APP_API + '/funcionarios/'+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FuncionarioId: event.target.FuncionarioId.value,
                NomeFuncinoario: event.target.NomeFuncinoario.value,
                Departamento: event.target.Departamento.value,
                DataInicio: event.target.DataInicio.value,
                NomeArquivoFoto: process.env.REACT_APP_FOTOPATH +"/" + event.target.NomeArquivoFoto.value.split("\\")[2]
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

                this.props.onChange(process.env.REACT_APP_FOTOPATH + "/" + result);
                // this.setState({ fotoPath: process.env.REACT_APP_FOTOPATH + "/" + result }, () => {
                //     alert('Imagem alterada com sucesso ' + this.state.fotoPath);
                // });

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
                            Edit Funcionário
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col sm={6}>
                              

                                     <Form.Group controlId="FuncionarioId">
                                        <Form.Label>Nome Funcionário</Form.Label>
                                        <Form.Control type="text" name="FuncionarioId" 
                                        required placeholder="Id Funcionário" 
                                        disabled
                                        defaultValue={this.props.funcid}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="NomeFuncinoario">
                                        <Form.Label>Nome Funcionário</Form.Label>
                                        <Form.Control type="text" name="NomeFuncinoario" 
                                        defaultValue={this.props.funcname}
                                        required placeholder="Nome Funcionário" />
                                    </Form.Group>

                                    <Form.Group controlId="Departamento">
                                        <Form.Label>Departamento</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.funcdep}>
                                            {this.state.departamentos.map(dep => {
                                                return <option key={dep.departamentoId}>{dep.NomeDepartamento}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DataInicio">
                                        <Form.Label>Data de inicio</Form.Label>
                                        <Form.Control
                                            defaultValue={this.props.funcdatainicio ? this.props.funcdatainicio.split("T")[0] : ""}
                                            type="date"
                                            name="DataDeInicio"
                                            required
                                            placeholder="Data de inicio"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <br />
                                        <Button variant="primary" type="submit">
                                            Edit Funcionário
                                        </Button>
                                    </Form.Group>
                                
                            </Col>
                            <Col sm={6}>
                                <img width="200px" alt="Imagem" height="200px" 
                                src={this.props.funcfoto} />
                                <input name="NomeArquivoFoto" onChange={this.handleSaveFile} type="file" />
                            </Col>
                        </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button vaiant="danger" onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}