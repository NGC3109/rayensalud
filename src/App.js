import React, { Component } from 'react';
import Helpers from './handlers/Handler'
import { Container, Header, Input, Select, Button } from 'semantic-ui-react'
import AllTutorials from './components/AllTutorials';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allTutorials: [],
    }
  }  
  componentDidMount() {
    try{
      Helpers.getTutoriales((tutoriales) => {
        tutoriales.sort(function(a, b){
          if(a.nombre < b.nombre) { return -1; }
          if(a.nombre > b.nombre) { return 1; }
          return 0;
        })
        this.setState({
          allTutorials: tutoriales
        })
      })
    }catch(error){
      console.log(error)
    }
  }
  sortTutorials = (e, result) => {
    const { value } = result;
    if(value === 'title'){
      Helpers.getTutoriales((tutoriales) => {
        tutoriales.sort(function(a, b){
          if(a.nombre < b.nombre) { return -1; }
          if(a.nombre > b.nombre) { return 1; }
          return 0;
        })
        this.setState({
          allTutorials: tutoriales
        })
      })
    }else if(value === 'date'){
      Helpers.getTutoriales((tutoriales) => {
        tutoriales.sort(function(a, b){
          if(a.fecha < b.fecha) { return -1; }
          if(a.fecha > b.fecha) { return 1; }
          return 0;
        })
        this.setState({
          allTutorials: tutoriales
        })
      })
    }
  }
  deleteAllTutorials = () => {
    try{
      if(window.confirm('Esta seguro que quiere eliminar todos los registros?')){
        Helpers.deleteAllTurorials()
        alert('todo eliminado')
        this.setState({
          allTutorials: []
        })
      }
    }catch(error){
      console.log(error)
    }
    
  }
  sortedSearchTutoriales = (params) => {
    if(params){
      Helpers.searchTutorialsByInput(params, (tutoriales) => {
        tutoriales.sort(function(a, b){
          if(a.nombre < b.nombre) { return -1; }
          if(a.nombre > b.nombre) { return 1; }
          return 0;
        })
        this.setState({
          allTutorials: tutoriales
        })
      })
    }else{
      Helpers.getTutoriales((tutoriales) => {
        tutoriales.sort(function(a, b){
          if(a.nombre < b.nombre) { return -1; }
          if(a.nombre > b.nombre) { return 1; }
          return 0;
        })
        this.setState({
          allTutorials: tutoriales
        })
      })
    }
    
  }
  render(){
    return (
      <Container text>
        <Header as='h2'  style={{marginTop: '1%', padding: '2%', backgroundColor:'purple', color: '#FFF'}}textAlign='center'>Tutoriales</Header>
        <Input focus placeholder='Search...' onChange={(text) => this.sortedSearchTutoriales(text.target.value)} />
        <Select placeholder='Ordenar por: ' style={{float: 'right'}} options={[
          {key: 'alpha', value: 'title', text: 'Titulo'}, 
          {key: 'date', value: 'date', text: 'Fecha'}
        ]} onChange={this.sortTutorials}/>
        <AllTutorials arrayTutorials={this.state.allTutorials}/>
        <Button.Group widths='3'>
          <Button negative onClick={this.deleteAllTutorials}>ELIMINAR TODOS</Button>
        </Button.Group>
        <Link to="/created"><Button circular floated='right' size='massive' color='blue' icon='plus' /></Link>
      </Container>
    );
  }
}

export default App;
