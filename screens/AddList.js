import React, { Component } from 'react';
import {Text, ScrollView, View, TouchableOpacity, BackHandler, AsyncStorage, TextInput, Dimensions} from 'react-native';
import { styles, buttons } from '../components/styles';


export default class AddList extends Component {
  state = {
    listname: "Unnamed",
    name: '',
    items: [{ name: '' }],
    height: 180
  };

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonClick);
  }

  _handleBackButtonClick = () => {
    this.props.navigation.navigate("Home");
    return true;
  }

  _addItem = () => {
    this.setState({
      items: this.state.items.concat([{name: ''}])
    });
  }
  _removeItem = (idx) => () => {
    this.setState({
      items: this.state.items.filter((s, sidx) => idx !== sidx)
    });
  }
  _saveList = async () => {
    let listItems = this.state.items;
    let name = this.state.name;
    var nameArray;

    // Get the current list of lists
    try {
      let names = await AsyncStorage.getItem('names');
      if(names != null){
        nameArray = JSON.parse(names);
        nameArray.push(name);
      }
      else{
        nameArray = [name];
      }
    } catch (error){
      // Error retrieving
    }
    // Store the new name list
    try {
      await AsyncStorage.setItem('names', JSON.stringify(nameArray));
    } catch (error){
      //Error storing data
    }
    // Store array of items under the name of the list
    try {
      await AsyncStorage.setItem(name, JSON.stringify(listItems));
    } catch (error){
      //Error with data
    }
    this.props.navigation.navigate("Home");
  }
  render() {
    let screenHeight = Dimensions.get('window').height;
    return(
      <View style={styles.container}>
        <View style= {{ height: (screenHeight - this.state.height)}}>
          <ScrollView>
            <View style={styles.flex}>
            <TextInput onChangeText={(text) => this.setState({name: text}) }
              placeholder = {'Input name of the list here'}
              value={this.state.text}
              style={styles.inputBox}
              />
            </View>
            {
              this.state.items.map((item, idx) => (
              <View style={styles.flex} key={idx}>
                <TextInput style={styles.inputBox}
                  placeholder={'Item ' + (idx+1)}
                  value={item.name}
                  onChangeText={text => {
                    item.name = text;
                    this.setState({items: this.state.items});
                  }}
                />
              <View style={buttons.removeContainer}>
                <TouchableOpacity style={buttons.removeButton} onPress={this._removeItem(idx)}>
                </TouchableOpacity>
                </View>
            </View>
            ))
          }
          </ScrollView>
        </View>

        <View style={{ height: (this.state.height ), flex: 1}}>
          <View style={buttons.buttons}>
            <TouchableOpacity style={buttons.addItem} onPress={this._addItem} >
              <Text style={buttons.textStyle}>Add new item</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.saveList} onPress={this._saveList}>
              <Text style={buttons.textStyle}>Save this list</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
