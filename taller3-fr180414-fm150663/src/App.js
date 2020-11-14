import React, { Component } from 'react';
import axios from 'axios';

  class App extends Component {
   
    constructor() {
      super();
      this.crearEmpleado = this.crearEmpleado.bind(this);
      this.escribirEstado = this.escribirEstado.bind(this);
      this.editar = this.editar.bind(this);
      this.guardarNotas = this.guardarNotas.bind(this);
   //this.eliminar = this.eliminar.bind(this);
   this.state = {          
          empleado:[],
          id:'',
          nombres:'',
          apellidos:'',
          value:'',
          n1:'',
          n2:'',
          n3:'',
          n4:'',
          n5:'',
          notas:[],
          envio:true
      };      
    }
    
    componentDidMount() {
      this.getEmpleados();
    
   }

async getEmpleados() {
  try {
    const res = await axios.get('http://127.0.0.1/taller3-backend/obtenerdatos.php');
    //const res = await axios.get('https://taller3backend.000webhostapp.com/backend/obtenerdatos.php');  
      this.setState({
            empleado:res.data
          })
        
     } catch (error) {
       console.error(error);
     }
    }

async crearEmpleado(e) {
   e.preventDefault();
   
  try {
    if(this.state.envio){
    const {nombres: nombres, apellidos: apellidos} = this.state;
    const obj1 = {nombres:nombres, apellidos:apellidos };
    await axios.post('http://127.0.0.1/taller3-backend/creardatos.php',obj1);
    //await axios.post('https://taller3backend.000webhostapp.com/backend/creardatos.php',obj1);

     }else{
      const {id, nombres: nombres, apellidos: apellidos} = this.state;
      const obj2 = {id:id, nombres:nombres, apellidos:apellidos };
      await axios.post('http://127.0.0.1/taller3-backend/editar.php',obj2);
      //await axios.post('https://taller3backend.000webhostapp.com/backend/editar.php',obj2);

     }
      
       } catch (error) {
        console.error(error);
      }
     this.setState({
       id:'',
       nombres:'',
       apellidos:'',
       sueldo:'',
       envio:true,
     })
     this.getEmpleados();
    }

    escribirEstado(e) {
     const {name , value} = e.target;
     this.setState({
      [name]:value
       });
     }

   async eliminar(e,id) {
      e.preventDefault();
      const obj = {id:id}; 
      try {
     
        if(window.confirm("esta seguro de querer elinarlo")){
          await axios.post('http://127.0.0.1/taller3-backend/eliminar.php',obj); 
          //await axios.post('https://taller3backend.000webhostapp.com/backend/eliminar.php',obj); 
          this.getEmpleados();
        }
         
       } catch (error) {
        console.error(error);
      }
    }
    
async editar(e, id){
  e.preventDefault();
  const obj = {id:id}; 
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    
    const res = await axios.post('http://127.0.0.1/taller3-backend/obteneruno.php',obj);
    //const res = await axios.post('https://taller3backend.000webhostapp.com/backend/obteneruno.php',obj);    
    this.setState({
      id:res.data[0].id,
      nombres:res.data[0].nombres,
      apellidos:res.data[0].apellidos,
      envio:false
    });    
    console.log(res);
        this.getEmpleados();
       } catch (error) {
        console.error(error);
      }
    }

    handleChange = e => {
      this.setState({ value: e.target.value });
    };

    async guardarNotas(e) {
      e.preventDefault();
      
      const{value,n1,n2,n3,n4,n5} = this.state;
      const obj1 = {estudiante:value, n1:parseFloat(n1), 
        n2:parseFloat(n2), n3:parseFloat(n3), 
        n4:parseFloat(n4), n5:parseFloat(n5),
        promedio: (parseFloat(n1)+parseFloat(n2)+parseFloat(n3)+parseFloat(n4)+parseFloat(n5))/5,
        mensaje:''}

        if(obj1.promedio>=7){
          obj1.mensaje = "(Aprobado)";
        }else if(obj1.promedio>=4 && obj1.promedio<7){
          obj1.mensaje = "(Regular)";
        }else{
          obj1.mensaje = "(Reprobado)";
        }
       
      if(obj1.n1 < 0 || obj1.n1 > 10 || 
         obj1.n2 < 0 || obj1.n2 > 10 ||
         obj1.n3 < 0 || obj1.n3 > 10 ||
         obj1.n4 < 0 || obj1.n4 > 10 ||
         obj1.n5 < 0 || obj1.n5 > 10){
           alert("Error, una o varias notas son incorrectas, ingrese valores entre 0 y 10")
         }else{
          if(obj1.estudiante.length>0){
            this.state.notas.push(obj1);      
          }
    
          this.state.notas.sort((a, b) => (a.promedio < b.promedio) ? 1 : -1)   
    
          const obj2 = {indices:[],index:0};
    
          if(this.state.notas[0].promedio > 8){
            for(let i of this.state.notas) {
              obj2.indices.push(obj2.index);
              obj2.index++;
            }
            for(let i of obj2.indices){
              this.state.notas[i].promedio = this.state.notas[i].promedio +1;
            }
          }else{
            for(let i of this.state.notas) {
              obj2.indices.push(obj2.index);
              obj2.index++;
            }
            for(let i of obj2.indices){
              this.state.notas[i].promedio = this.state.notas[i].promedio -1;
            }
          }
          
    
          /*this.state.notas.map((item) =>
            console.log(item.estudiante + " " + item.n1)
          )*/
    
          this.getEmpleados();
         }      
    }
   
 render(){
      return(

        <div className="container p-4">
          <nav className="navbar navbar-dark bg-dark mb-2">
            <span className="navbar-brand mb-0 h1">Taller</span>
          </nav>
          <form onSubmit={this.crearEmpleado}>
            <input type="text"  name="nombres"   onChange={this.escribirEstado} 
              value={this.state.nombres} placeholder="nombres"/>
            <input type="text" name="apellidos"  onChange={this.escribirEstado} 
            value={this.state.apellidos} placeholder="apellidos"/>
            <input type="submit" className="btn btn-success" value="Guardar" />
          </form>   
          <div className="row p-3">

            {this.state.empleado.map(item=>{return (
              <div className="card p-2 m-2" key={item.id}>
                <img  width="60" src="logo192.png" alt="img"></img>
                <div className="card-body">
                  <h6>{item.nombres}</h6>
                  <h6>{item.apellidos}</h6>
                  <button className="btb btn-danger mx-2"
                    onClick={(e)=>this.eliminar(e,item.id)}>delete</button>
                  <button className="btb btn-info"
                    onClick={(e)=>this.editar(e,item.id)}>edit</button>
                </div>                 
              </div>
            )})
            }
          </div>
          <div className="row p-3">
          <form onSubmit={this.guardarNotas}>
              <label>Estudiante: </label>
              <select  value={this.state.value} onChange={this.handleChange}>
              <option value="">Selecciona un estudiante</option>
              {this.state.empleado.map(item=>{return (
                  <option value={item.nombres + " " + item.apellidos}>
                    {item.nombres + " " + item.apellidos}
                  </option>
              )})
              }
              </select> 
              <input type="number" min="0" max="10"  
              style={{ width: "75" }} name="n1" onChange={this.escribirEstado} 
              value={this.state.n1} placeholder="nota 1"/>
              |<input type="number" min="0" max="10" 
              style={{ width: "75px" }} name="n2" onChange={this.escribirEstado} 
              value={this.state.n2} placeholder="nota 2"/>
              |<input type="number" min="0" max="10" 
              style={{ width: "75px" }} name="n3" onChange={this.escribirEstado} 
              value={this.state.n3} placeholder="nota 3"/>
              |<input type="number" min="0" max="10" 
              style={{ width: "75px" }} name="n4" onChange={this.escribirEstado} 
              value={this.state.n4} placeholder="nota 4"/>
              |<input type="number" min="0" max="10" 
              style={{ width: "75px" }} name="n5" onChange={this.escribirEstado} 
              value={this.state.n5} placeholder="nota 5"/>
              <input type="submit" className="btn btn-success" value="Guardar" />
          </form> 
          <br></br>  <br></br>  
          <table className="table">
              <thead>
                <tr>                
                  <th>Estudiante</th>
                  <th>Nota 1</th>
                  <th>Nota 2</th>
                  <th>Nota 3</th>
                  <th>Nota 4</th>
                  <th>Nota 5</th>
                  <th>Promedio</th>
                </tr>
              </thead>
              <tbody>
                {this.state.notas.map(item=>{return (
                    <tr>
                      <td>{item.estudiante} <b>{item.mensaje}</b></td>
                      <td>{item.n1}</td>
                      <td>{item.n2}</td>
                      <td>{item.n3}</td>
                      <td>{item.n4}</td>
                      <td>{item.n5}</td>
                      <td>{item.promedio}</td>
                    </tr>
                )})
                }
              </tbody>
          </table>          
          </div>
        </div>         
      );
  
  }
};
export default App;