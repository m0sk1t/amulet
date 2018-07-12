/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Picker,
  Linking,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Canvas from 'react-native-canvas';

import generateImage from "./generator";
import {
  KEYS,
  TEXTS,
  COLORS,
  AMULETS,
} from "./constants";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.openURL = this.openURL.bind(this);
    this.state = { image: '', amulet: 'health' };
  }

  openURL() {
    const url = AMULETS[this.state.amulet];
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.warn('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleCanvas(canvas) {
    generateImage(canvas, (image) => this.setState({ image }));
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1}}
        resizeMode="cover"
        source={require('./bg.png')}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.instructions}>Выберите амулет</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.amulet}
              onValueChange={amulet => this.setState({ amulet })}
            >
              {KEYS.map(key => <Picker.Item key={key} label={TEXTS[key]} value={key} />)}
            </Picker>
          </View>
          <Canvas ref={this.handleCanvas}/>
          <Image
            style={styles.amulet}
            source={{ uri: this.state.image }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onClick={this.openURL}
              style={{ width: 300, borderRadius: 5, backgroundColor: COLORS[this.state.amulet] }}
            >
              <Text style={styles.instructions}>{TEXTS[this.state.amulet]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={[styles.instructions, { lineHeight: 64, fontSize: 64}]}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  amulet: {
    width: 200,
    height: 200,
    backgroundColor: '#333',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3f3f3fcc',
    justifyContent: 'space-between',
  },
  instructions: {
    margin: 10,
    fontSize: 20,
    color: '#fefefe',
    textAlign: 'center',
  },
  picker: {
    height: 32,
    width: 300,
    margin: 10,
    color: '#fefefe',
    backgroundColor: '#777',
  },
  refreshButton: {
    width: 72,
    height: 72,
    margin: 10,
    borderRadius: 72,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#3ce',
  },
});
