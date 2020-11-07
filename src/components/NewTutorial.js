import React, { Component } from 'react'
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react'
import Helpers from '../handlers/Handler'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewTutorial extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: null,
            profesor: null,
            materia: null,
            fecha: '',
            status: 0,
            flag: false,
            navigate: false
        }
    }
    createdTutorial = (event) => {
        let obj = {
            nombre: event.target.titulo.value,
            profesor: event.target.profesor.value,
            materia: event.target.materia.value,
            fecha: event.target.fecha.value
        }
        try{
            Helpers.createTutorial(obj, (tutorial) => {
                toast.success('Tutorial guardado con éxito!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    this.props.history.push(`/detail/${tutorial.id}`)
                }, 3000)
                
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
                <Header as='h2'  style={{marginTop: '1%', padding: '2%', backgroundColor:'purple', color: '#FFF'}}textAlign='center'><Icon style={{float: 'left'}} name="arrow left" onClick={() => this.props.history.push("/")} /> Agregar Tutorial</Header>               
                <Form onSubmit={this.createdTutorial}>
                    <Form.Group unstackable widths={2}>
                        <Form.Input label='Titulo' name='titulo' placeholder='titulo' onChange={this.handleChange} required/>
                        <Form.Input label='Profesor' name='profesor' placeholder='profesor' onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Materia' name='materia' placeholder='materia' onChange={this.handleChange} required/>
                        <Form.Input type='date' name='fecha' label='Fecha' onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button.Group widths='2'>
                        <Button type='submit'>AGREGAR</Button>
                    </Button.Group>
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

export default NewTutorial