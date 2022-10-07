import React, { Component } from "react";
import {ButtonToolbar, Table, Button} from "react-bootstrap";
import {AddDepModal} from './addDepModal';

export class Departamento extends Component {

    constructor(props) {
        super(props);
        this.state = {deps:[], addModalShow: false};
        
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + '/departamentos')
        .then(response => response.json())
        .then(data => {
            this.setState({deps: data});
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(s) {
        //this.refreshList();
    }

    render() {

        const {deps} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div className="mt-2 d-flex justify-content-left container">
                <Table className="mt-4" striped bordered hover size="sn">
                    <thead>
                        <tr>
                            <th>Departamento Id</th>
                            <th>Nome Departamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep => 
                            <tr key={dep.departamentoId}>
                                <th>{dep.departamentoId}</th>
                                <th>{dep.NomeDepartamento}</th>
                                <th>Editar / Excluir</th>
                            </tr>
                        )}
                    </tbody>
                    
                    <tfoot>
                        <tr>
                            <td className="justify-content-center" colSpan="3">
                            <ButtonToolbar>
                                <Button variant='primary' onClick={() => {this.setState({addModalShow: true})}}>
                                    Add Departamento
                                </Button>
                            </ButtonToolbar>

                            <AddDepModal show={this.state.addModalShow} onHide={addModalClose}></AddDepModal>
                            </td>
                        </tr>
                   </tfoot>

             </Table>



            </div>
            
        )
    }
}