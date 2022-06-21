import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Modal, TextInput, Button, TouchableOpacity} from 'react-native';

export default function App() {
  const [props, setProps] = useState({
    alcool: '',
    gas: '',
  })
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleCalc () {
    let error;
    if (props.alcool.trim() === '' || props.gas.trim() === ''){
     error = 'Por favor preencha todos os campos !'
      alert(error);
    }else{
      const sum = parseFloat(props.alcool) / parseFloat(props.gas);
      if (sum < 0.7) {
        setResult('Alcool');
       
      }else {
        setResult('Gasolina');
      }
      setModalVisible(!modalVisible);
    }
    
  }
  function closeModal() {
    setModalVisible(!modalVisible);
    setProps({gas: '', alcool: ''})
  }
  return (
    <View style={styles.container}>
     <View style={styles.firstScreen}>
      <View style={styles.viewImg}>
      <Image source={require('./src/img/logo.png')} style={styles.img} />
      </View>
      <Text style={styles.textMain}>Qual a melhor opção? </Text>
      <View style={styles.viewInputs}>
      <Text style={styles.text}>Alcool (Preço por Litro) </Text>
      <TextInput
       keyboardType='numeric'
       returnKeyType='done'
       style={styles.textInput}
       value={props.alcool}
       onChangeText={(text)=> setProps(prevState => ({alcool: text, gas: prevState.gas}))}
       />
      <Text style={styles.text}>Gasolina (Preço por Litro) </Text>
      <TextInput
       keyboardType='numeric'
       returnKeyType='done'
       style={styles.textInput}
       value={props.gas}
       onChangeText={(text)=> setProps(prevState => ({gas: text, alcool: prevState.alcool}))}
        />
      </View>
      <TouchableOpacity
       style={styles.buttonCalc}
       onPress={()=> handleCalc()}
       >
        <Text style={styles.textCalc}>Calcular</Text>
      </TouchableOpacity>
     </View>

     <Modal animationType='slide' visible={modalVisible}>
      <View style={styles.viewModal}>
      <View style={styles.viewImg}>
      <Image source={require('./src/img/gas.png')} style={styles.img} />
      </View>
     <Text style={styles.textGreen}>Compensa usar {result} !</Text>
     <Text style={styles.textCalc}>Com os preços:</Text>
     <Text style={styles.text}>Alcool: R$ {props.alcool}</Text>
     <Text style={styles.text}>Gasolina: R$ {props.gas}</Text>
      <TouchableOpacity
       style={styles.buttonCalcAgain}
       onPress={()=> closeModal()}
       >
        <Text style={styles.textCalcClose}>Calcular Novamente</Text>
        
      </TouchableOpacity>
      </View>
     </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstScreen:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMain: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10
  },
  textInput: {
    width: 300,
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  viewInputs: {
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'flex-start'
  },
  viewImg: {
    marginBottom: 40
  },
  buttonCalc: {
    backgroundColor: 'red',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10
  },
  textCalc: {
    color: '#FFF',
    fontSize: 18,
    letterSpacing: 5,
    fontWeight: 'bold'
  },
  buttonCalcAgain: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'red',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 20
  },
  viewModal: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGreen: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#77dd77',
    marginBottom: 30
  },
  textCalcClose: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
