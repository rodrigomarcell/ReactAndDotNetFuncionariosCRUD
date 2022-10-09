import React, { Component } from "react";
import { ButtonToolbar, Table, Button } from "react-bootstrap";
import { AddFuncModal } from './AddFuncModal';
import { EditFuncModal } from './editFuncModal';

export class Funcionario extends Component {

    constructor(props) {
        super(props);
        this.state = { funcs: [], addModalShow: false, editModalShow: false, funcfoto: "/avatar.png" };

    }

    refreshList() {

        fetch(process.env.REACT_APP_API + '/funcionarios')
            .then(response => response.json())
            .then(data => {

                this.setState({ funcs: data });

            });

    }



    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {

        if (JSON.stringify(prevState.funcs) !== JSON.stringify(this.state.funcs)) {
            this.refreshList();

        } else {
            return
        }
    }

    deleteFunc(funcid) {
        if (window.confirm('Tem certeza?')) {
            fetch(process.env.REACT_APP_API + '/funcionarios/' + funcid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.refreshList();
            });
        }
    }

    render() {

        const { funcs, funcid, funcname, funcdep, funcfoto, funcdatainicio } = this.state;

        let addModalClose = () => {
            
            this.setState({ addModalShow: false }, () => {
                this.refreshList();
                this.setState({ funcfoto: "/avatar.png" });
            });

        };

        let editModalClose = () => {
            this.setState({ editModalShow: false }, () => {
                this.setState({ funcfoto: "/avatar.png" });
                this.refreshList();
            });
        };

        let fotoNameChange = (nomeFoto) => {
            if(typeof nomeFoto !== 'object'){                
                this.setState({ funcfoto: nomeFoto });
            }else{
                return;
            }
            
        }

        return (
            <div className="mt-2 d-flex justify-content-left container">
                <Table className="mt-4" striped bordered hover size="sn">
                    <thead>
                        <tr>
                            <th>Funcionário Id</th>
                            <th>Funcionario Nome</th>
                            <th>Funcionario Departamento</th>
                            <th>Data Inicio</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcs.map(funcs =>
                            <tr key={funcs.EmpregadoId}>
                                <th>{funcs.EmpregadoId}</th>
                                <th>{funcs.NomeEmpregado}</th>
                                <th>{funcs.Departamento}</th>
                                <th>{funcs.DataInicio.split("T")[0]}</th>

                                <th>
                                    <ButtonToolbar>
                                        <Button className="btn btn-primary me-2" variant='primary' onClick={() => {

                                            this.setState({
                                                editModalShow: true,
                                                funcid: funcs.EmpregadoId,
                                                funcname: funcs.NomeEmpregado,
                                                funcdep: funcs.Departamento,
                                                funcfoto: funcs.NomeArquivoFoto,
                                                funcdatainicio: funcs.DataInicio
                                            });

                                            debugger
                                        }}>
                                            Edit
                                        </Button>

                                        <Button className="btn btn-danger me-2" variant='danger' onClick={() => this.deleteFunc(funcs.EmpregadoId)}>
                                            Delete
                                        </Button>

                                        <EditFuncModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            funcid={funcid}
                                            funcname={funcname}
                                            funcdep={funcdep}
                                            funcfoto={funcfoto}
                                            funcdatainicio={funcdatainicio}
                                            onChange = {fotoNameChange}
                                        />
                                    </ButtonToolbar>
                                </th>
                            </tr>
                        )}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td className="justify-content-center" colSpan="5">
                                <ButtonToolbar>
                                    <Button variant='primary' onClick={() => {
                                        this.setState({ addModalShow: true })
                                    }}>
                                        Add Funcionário
                                    </Button>
                                </ButtonToolbar>

                                <AddFuncModal 
                                show={this.state.addModalShow} 
                                funcfoto={this.state.funcfoto} 
                                onChange = {fotoNameChange}
                                onHide={addModalClose}>
                                </AddFuncModal>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        )
    }
}