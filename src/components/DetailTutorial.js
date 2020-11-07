import React, { Component } from 'react'
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react'
import Helpers from '../handlers/Handler'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DetailTutorial extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: null,
            profesor: null,
            materia: null,
            fecha: '',
            status: 0,
            flag: false,
            navigate: false,
            nameAction: 'Detalle tutorial',
        }
    }
    updatedTutorial = (event) => {
        event.preventDefault()
        let idTutorial = this.props.match.params.idTutorial
        let obj = {
            nombre: this.state.titulo,
            profesor: this.state.profesor,
            materia: this.state.materia,
            fecha: this.state.fecha
        }
        try{
            Helpers.updateTutorialById(idTutorial, obj, (status) => {
                if(status === 1){
                    toast.success('Tutorial modificado con éxito!', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 3000)
                }else{
                    toast.error('A ocurrido un error inesperado, favor vuelva a intentarlo...', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            
        }catch(error){
            console.log(error)
        }
    }
    deleteTutorial = (e) => {
        let idTutorial = this.props.match.params.idTutorial
        try{
            if(window.confirm('Esta seguro que quiere el registro?')){
                Helpers.deleteTurorialById(idTutorial, (status) => {
                    if(status === 1){
                        toast.info('Tutorial eliminado con éxito!', {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(() => {
                            this.props.history.push("/")
                        }, 3000)
                    }else{
                        toast.error('A ocurrido un error inesperado, favor vuelva a intentarlo...', {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
            }else{
                e.preventDefault()
            }
        }catch(error){
            console.log(error)
        }
    }
    componentDidMount(){
        let idTutorial = this.props.match.params.idTutorial
        try{
            Helpers.searchTutorialesById(idTutorial, (tutorial) => {
                if(tutorial.length !== 26){
                    this.setState({
                        titulo: tutorial.nombre,
                        profesor:tutorial.profesor,
                        materia:tutorial.materia,
                        fecha: tutorial.fecha,
                    })
                }else{
                    this.props.history.push("/")
                }
              
            })
        }catch(error){
            console.log(error)
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value 
        })
    }
    
    render(){
        return(
            <Container text>
                <Header as='h2'  style={{marginTop: '1%', padding: '2%', backgroundColor:'purple', color: '#FFF'}} textAlign='center'>
                    <Icon style={{float: 'left'}} name="arrow left" onClick={() => this.props.history.push("/")} /> {this.state.nameAction} {!this.state.flag ? <Icon onClick={() => this.setState({flag: true, nameAction: 'Modificar Tutorial'})} style={{float: 'right'}} name="pencil alternate" /> : null }</Header>               
                <Form>
                    <Form.Group widths={2}>
                        <Form.Input label='Titulo' name='titulo' placeholder='titulo' value={this.state.titulo || ''} onChange={this.handleChange} required/>
                        <Form.Input label='Profesor' name='profesor' placeholder='profesor' value={this.state.profesor || ''} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Materia' name='materia' placeholder='materia' value={this.state.materia || ''} onChange={this.handleChange} required/>
                        <Form.Input type='date' name='fecha' label='Fecha' value={this.state.fecha.split('T')[0] || ''} onChange={this.handleChange} required/>
                    </Form.Group>
                    {this.state.flag ? 
                    <Button.Group widths='2'>
                        <Button negative onClick={this.deleteTutorial}>ELIMINAR</Button><Button onClick={this.updatedTutorial}>MODIFICAR</Button>
                    </Button.Group>
                    : null}
                </Form>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>
        )
    }
}

export default DetailTutorial