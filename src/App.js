import './App.css';
import { useState, useEffect } from 'react';
import { ADD_RECORD , DELETE_RECORD, EDIT_RECORD,UPDATE_RECORD } from './action/action';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  let record = useSelector(state => state.Crud.users);
  let singlerecord = useSelector(state => state.Crud.user);
  const [editid,setEditId] = useState("");
  const [alldata,setAllData] = useState(record)
  const [input,setInput] = useState({
      name : '',
      phone : ''
  })
  const handleChange = (e) => {
      const {name,value} = e.target;
      setInput({
          ...input,[name] : value
      })
  }
  const handleSubmit = () => {

    if(editid){
      let obj = {
        id : editid,
        name : input.name,
        phone : input.phone
      }
      dispatch(UPDATE_RECORD(obj));
      alert("Record successfully Edit");
      setEditId("");
    }else{
      let obj = {
        id : Math.floor(Math.random() * 10000),
        name : input.name,
        phone : input.phone
      }
      dispatch(ADD_RECORD(obj));
      alert("Record successfully insert");
    }  
    setInput({
      name: '',
      phone : ''
    })
  }

    useEffect(()=>{
        setInput({
           name : singlerecord.name,
           phone : singlerecord.phone
        })
        setEditId(singlerecord.id)
    },[singlerecord])

  return (
     <body>
       <center>
      <br/>
      <br/>
      <br/>   <br/>   <br/>
        <h1>Add User</h1>   <br/>   
          <table>
              <tr>
                <td>Name :-  </td>
                <td>
                  <input type='text' name='name' onChange={handleChange} value={input.name}/>
                </td>
              </tr>
              <tr>
                <td>Phone :-  </td>
                <td>
                  <input type='text' name='phone' onChange={handleChange} value={input.phone}/>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {
                    editid ? ( <input type='button' onClick={ () => handleSubmit() } value='Edit' style={{backgroundColor:"black",color:"white",padding:"5px 15px",border:"none",marginTop:"8px"}}/>) : (<input type='button' onClick={ () => handleSubmit() } value='submit' style={{backgroundColor:"black",color:"white",padding:"5px 15px",border:"none",marginTop:"8px"}}/>)
                  }

                </td>
              </tr>
          </table><br></br>
          <br/>
       <div className='container'>
       <table  className="table">
                <tr style={{textAlign:"center",color:"white",backgroundColor:"black",padding:"10px"}}>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Phone</td>
                  <td>Action</td>
                </tr>

                {
                  record.map((val)=>{
                      return (
                          <tr style={{textAlign:"center",color:'white',backgroundColor:"#000000d1"}}>
                              <td>{val.id}</td>
                              <td>{val.name}</td>
                              <td>{val.phone}</td>
                              <td>
                                <button onClick={ () => dispatch(DELETE_RECORD(val.id)) } style={{marginRight:"10px",marginBottom:"5px",padding:"5px 10px",marginTop:"5px"}}><i class="bi bi-calendar2-x-fill"></i></button>
                                <button onClick={ () => dispatch(EDIT_RECORD(val.id)) } style={{marginRight:"10px",marginBottom:"5px",padding:"5px 10px",marginTop:"5px"}}><i class="bi bi-pencil-square"></i></button>
                              </td>
                          </tr> 
                      )
                  })
                }
            </table>
       </div>

      </center>
     </body>
  );
}

export default App;
