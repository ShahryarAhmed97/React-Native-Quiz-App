import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import * as FaceDetector from 'expo-face-detector'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Home from './componenets/home'


export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      home:true,
     
    
      // faces:[],
      

    }
    // this.reQuizFun=this.reQuiz.bind(this)
  }
 

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  handleFacesDetected = ({ faces }) => {
    
        this.setState({ faces });
    
};


reQuizFun(){
  this.setState({
    home:false,
  })
}
 


  async capture() {
    const photo = await this.camera.takePictureAsync();
    this.setState({photo: photo})
    // console.log('photo *********', photo);
    
  
    // console.log('faces--->',this.state.faces)
    if(this.state.faces.length>0){
      this.setState({home:true})
    }
    else{
      Alert.alert('No face Found Try Agian ')
    }
  }





  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>No access to camera</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
       
        this.state.home ? 
        <View>

          <Home   reQuizFun={()=>this.reQuizFun()} />
        </View>
          
      :
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
             
            }} 
            style={{ flex: 1 }} 
            type={this.state.type}
            onFacesDetected={this.handleFacesDetected}
             faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.none,
              runClassifications: FaceDetector.Constants.Classifications.none,
            }}
            
             >

             <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>

            
            </View>
                    
            <View style={{flex:0.1,marginTop:50,width:100,alignSelf:'center'}}>


      <Button title='Take Snap' style={{flex:0.1,marginTop:100, color:'green'}} color='green' onPress={()=>this.capture()} />  

    </View>

          </Camera>
        </View> 
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
