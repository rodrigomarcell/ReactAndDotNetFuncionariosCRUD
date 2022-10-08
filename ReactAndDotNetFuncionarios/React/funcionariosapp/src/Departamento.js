import React, { Component } from "react";
import {ButtonToolbar, Table, Button} from "react-bootstrap";
import {AddDepModal} from './addDepModal';
import {EditDepModal} from './editDepModal';

export class Departamento extends Component {

    constructor(props) {
        super(props);
        this.state = {deps:[], addModalShow: false, editModalShow: false};
        
    }

    refreshList() {

        // const response = await fetch(process.env.REACT_APP_API + '/departamentos');
        // const data = await response.json();
        // this.setState({deps: data});
         
            fetch(process.env.REACT_APP_API + '/departamentos')
            .then(response => response.json())
            .then(data => {

                this.setState({deps: data});
   
            });
        
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {        

        if (JSON.stringify(prevState.deps) !== JSON.stringify(this.state.deps)) {
            this.refreshList();
        }else{
            return
        }
    }

    deleteDep(depid){
        if(window.confirm('Tem certeza?')){
            fetch(process.env.REACT_APP_API+'/departamentos/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            });
        }
    }

    render() {

        const {deps, depid, depname} = this.state;
        let addModalClose = () => this.setState({addModalShow: false}, () => {
            this.refreshList();
        });
        let editModalClose = () => this.setState({editModalShow: false}, () => {
            this.refreshList();
        });
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
                                <th>
                                <ButtonToolbar>
                                    <Button className="btn btn-primary me-2" variant='primary' onClick={() => {this.setState({editModalShow: true, depid: dep.departamentoId, depname: dep.NomeDepartamento})}}>
                                        Edit 
                                    </Button>

                                    <Button className="btn btn-danger me-2" variant='danger' onClick={() => this.deleteDep(dep.departamentoId)}>
                                        Delete 
                                    </Button>

                                    <EditDepModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid={depid}
                                    depname={depname}
                                    />
                                </ButtonToolbar>
                                </th>
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