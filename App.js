import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, AsyncStorage } from 'react-native';

export default function App() {

  const [state, setState] = useState('read')
  const [annotation, setAnnotation] = useState('')

  function Header(){
    return(
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
      </View>
    );

  }

  useEffect(()=>{

    (async () =>{
      try{
        const note = await AsyncStorage.getItem('note')
        setAnnotation(note)
      }catch(error){

      }

    })()

  },[])

  setData = async()=>{
    try{
      await AsyncStorage.setItem('note', annotation)
    }catch(error){

    }

    alert('salvo')
  }

  function atualizar(parametro) {
    setState(parametro);
    setData()
  }

   if(state == 'read'){
    return(
      <View style={{height: '100%'}}>
        <Header></Header>
        {
          (annotation != '') ?
          
          <View style={styles.annotationList}>
            <Text style={styles.annotationListText}>{annotation}</Text>
          </View>

        :
        
          <View style={styles.annotationList}>
            <Text style={{opacity: 0.3}}>Nada anotado ainda :(</Text>
          </View>
        }
        
        {
          (annotation == '')?
          <TouchableOpacity style={styles.bntAdd} onPress={() => atualizar('write')}><Text style={styles.bntAddText}>+</Text></TouchableOpacity>
          :
          <TouchableOpacity style={styles.bntSave} onPress={() => atualizar('write')}><Text style={styles.bntSaveText}>Editar</Text></TouchableOpacity>
        }

        
      </View>
    );
      
    } else if(state == 'write'){
      return(
        <View style={{height: '100%'}}>
          <Header></Header>
          <TextInput autoFocus={true} value={annotation} numberOfLines={5} multiline={true} onChangeText={(text)=> setAnnotation(text)} style={styles.boxWrite}></TextInput>
          <TouchableOpacity style={styles.bntSave} onPress={() => atualizar('read')}><Text style={styles.bntSaveText}>Salvar</Text></TouchableOpacity>
        </View>
      );
    }
  
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#069',
    padding: 10,
    alignItems: 'center'
  },
  title:{
    color: '#FFF',
    fontSize: 20
  },
  annotationList: {
    padding: 10,
    backgroundColor: '#ccc',
    height: '100%'
  },
  annotationListText: {
    fontSize: 16
  },
  bntAdd: {
    position: 'absolute',
    backgroundColor: '#069',
    right: 20,
    bottom: 20,
    width: 50, 
    height: 50,
    borderRadius: 25
  },
  bntAddText: {
    position: 'relative',
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    top: 2,
    fontWeight: 'bold'
  },
  bntSave:{
    position: 'absolute',
    backgroundColor: '#069',
    right: 20,
    bottom: 20,
    width: 80, 
    height: 40
  },
  bntSaveText:{
    fontSize: 18,
    color: '#FFF',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  boxWrite: {
    padding: 10,
    height: 300,
    textAlignVertical: 'top'
  }
});
