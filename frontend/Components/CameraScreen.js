import React from 'react';
import {Text, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import { Button } from 'react-native';

import { connect } from 'react-redux';


 class CameraScreen extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        permision: null,
        type: Camera.Constants.Type.back,
      };
      
      this.onPictureSaved = this.onPictureSaved.bind(this)
    }
  
  
    async componentDidMount() {
  
      console.log('On passe dans le componentDidMount')
  
      var { status } = await Permissions.askAsync(Permissions.CAMERA);
      var permision = (status === 'granted')? true : false;
      this.setState({ permision });
    }
  
   
    onPictureSaved = async photo => {
    
      console.log(photo.uri);   
  
      var data = new FormData();
  
      await data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'MyPicture',
      });

      await fetch("http://10.2.3.62:3000/upload", {
        method: 'post',
        body: data
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(picture => {
        console.log('FROM FRONT',picture)
        this.props.handlePicture(picture.data.name, picture.data.age, picture.data.gender, picture.data.url)
      }).catch(err => {
        console.log(err)
      })
    
     
    }
  
  
    render() {
  
      console.log('state permission -->', this.state.permision)
  
      if (this.state.permision === null) {
         return <View />;
      } 
      else if (this.state.permision === false) {
         return <Text>No access to camera</Text>;
      } 
  
      else {
  
        return (
  
          <View style={{ flex: 1 }}>
  
                <Camera 
                  ref={ref => { this.camera = ref }}
                  style={{ flex: 1,alignItems: 'center',
                  justifyContent: 'center',  }} type={this.state.type}>
                </Camera>
  
                <Button title="snapshot"
                              color="red"
                              onPress={() => {
                            if (this.camera) {
                            this.camera.takePictureAsync({ 
                                onPictureSaved: this.onPictureSaved,
                                quality : 0.7,
                                base64: true,
                                exif: true
                            });
                          }
                        }} 
                />
  
           </View>
     
        );
      }
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    handlePicture: function(pictureName, pictureAge, pictureGender, pictureUrl) {
        dispatch({
          type: 'takePicture',
          pictureName,
          pictureAge,
          pictureGender,
          pictureUrl
        })
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(CameraScreen);
