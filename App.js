
import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'

export default function App (){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdSearch] = useState("");
  const [username, setUsername] = useState("")
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  //const getUserById = async (idsearch) => {
   // try {
    // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${idsearch}`);
     //const json = await response.json();
     //setData(json);
     // Chequear si se encuentra el id
     //if(json.name != null){
      //setUsername(json.username) //Actualizar el estado de name
      //setEmail(json.email) //Actualizar el esatdo de email
     //} else {
      //alert("La identificacion no existe")
     //}
   //} catch (error) {
    // console.error(error);
   //} finally {
    // setLoading(false);
   //}
 //}

 const getClientes = async () => {
  try{
    const url = `http://172.16.63.73:3000/api/clientes`;
    const response = await axios.get(url);
    setData(response.data)
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const getClienteById = async (id) => {
  try{
    const url = `http://172.16.63.73:3000/api/clientes/${id}`;
    const response = await axios.get(url);
    //setData(response.data)
    setNombre(response.data.nombre);
    setApellidos(response.data.apellidos);
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const saveCliente = async () => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.63.73:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    alert("Cliente agregado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const updateCliente = async (id) => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.put(`http://172.16.63.73:3000/api/clientes/${id}`, {
      nombre,
      apellidos,
    });
    alert("Cliente actualizado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const deleteCliente = async (id) => {
  try {
    if(confirm("Esta seguro de borrar este cliente?")){
      const response = await axios.delete(`http://172.16.63.73:3000/api/clientes/${id}`, {
        nombre,
        apellidos,
      });
      alert("Cliente Eliminado exitosamente ...")
      setApellidos("")
      setNombre("")
      setIdSearch("")
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};


  useEffect(() => {
    //getUsers(); // Al cargar el componente por primera vez
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
      style={[styles.buttons,{backgroundColor:"#5DCBFF",marginBottom:15}]}
      onPress={getClientes}>
        <Text>Listado de Clientes</Text>
      </TouchableOpacity>
      <View>
        <Text style={{marginBottom:4,textAlign:"center"}}>Usuarios</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Ingrese le id del usuario"
          onChangeText={idsearch => setIdSearch(idsearch)}
          value={idsearch}/>
          <TextInput
          style={[styles.input]}
          value={nombre}
          onChangeText={nombre => setNombre(nombre)}/>
          <TextInput
          style={[styles.input]}
          value={apellidos}
          onChangeText={apellidos => setApellidos(apellidos)}/>
          <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#7EFF78",marginBottom:15}]}
          onPress={() => saveCliente()}>
        <Text>Guardar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#7EFF78",marginBottom:15}]}
          onPress={() => updateCliente(idsearch)}>
        <Text>Actualizar Cliente</Text>
      </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#5DCBFF",marginBottom:15}]}
          onPress={() => getClienteById(idsearch)}>
        <Text>Buscar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#FF3535",marginBottom:15}]}
          onPress={() => deleteCliente(idsearch)}>
        <Text>Eliminar Cliente</Text>
      </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.boxUsers}>
              <Text>Id Cliente: {item._id}</Text>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Apellidos: {item.apellidos}</Text>
              <TouchableOpacity
                style={[styles.buttons,{backgroundColor:"#00000050"}]}
                onPress = {() => {
                  alert(item.nombre)
                }
              }>
                <Text>Ver información</Text>
              </TouchableOpacity>
            </View>
            
          )}
        />
      )} 
    </View>
  )}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUsers: {
    backgroundColor:"#00000020",borderRadius:15,marginBottom:15,padding:10
  },
  buttons:{
    borderRadius:15,paddingVertical:5,textAlign:"center"
  },
  input:{
    marginBottom:15,
    backgroundColor:"#00000030",
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:15,
    borderColor:"#00000040",
    borderWidth:1
  }
})
