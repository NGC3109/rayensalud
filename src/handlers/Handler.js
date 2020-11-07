import axios from 'axios';

class Helpers{
  //get all tutorials
    static getTutoriales(callback){
      let arrayTutoriales = []
        axios.get('https://rayentutorialtestapp.azurewebsites.net/tutorials')
        .then(res => {
          arrayTutoriales = []
          if(res.data){
            arrayTutoriales = res.data
          }
          callback(arrayTutoriales)
        })
    }
    //looking tutorial for id
    static searchTutorialesById(idTutorial, callback){      
      let arrayTutoriales = []
      axios.get(`https://rayentutorialtestapp.azurewebsites.net/tutorials/${idTutorial}`)
        .then(res => {
          if(res.data){
            arrayTutoriales = res.data
          }
          callback(arrayTutoriales)
        })
    }
    //delete tutorial by id
    static deleteTurorialById(idTutorial, callback){      
      let status = 0
      axios.delete(`https://rayentutorialtestapp.azurewebsites.net/deletetutorial/${idTutorial}`)
        .then(res => {
          if(res.data){
            status = 1
          }
          callback(status)
        })
    }
    //WARNING: delete all tutorials
    static deleteAllTurorials(callback){
      axios.delete(`https://rayentutorialtestapp.azurewebsites.net/deletetutorials`)
        .then(res => {
          return;
        })
    }
    //create new tutorial
    static createTutorial(obj, callback){      
      let arrayTutoriales = []
      axios.post(`https://rayentutorialtestapp.azurewebsites.net/createtutorial`, obj)
      .then(res => {
        if(res.data){
          arrayTutoriales = res.data
        }
        callback(arrayTutoriales)
      })
    }
    //updated tutorial by id
    static updateTutorialById(idTutorial, obj, callback){      
      let status = 0
      axios.put(`https://rayentutorialtestapp.azurewebsites.net/updatetutorial/${idTutorial}`, obj)
      .then(res => {
        if(res.data.id !== null){
          status = 1
        }
        callback(status)
      })
    }

    //search tutorials
    static searchTutorialsByInput(parameter, callback){      
      let arrayTutoriales = []
      axios.get(`https://rayentutorialtestapp.azurewebsites.net/tutorial?description=${parameter}`)
        .then(res => {
          if(res.data){
            arrayTutoriales = res.data
          }
          callback(arrayTutoriales)
        })
    }
    
}

export default Helpers