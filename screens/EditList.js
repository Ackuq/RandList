import React, { Component } from 'react';
import {TouchableOpacity, Text, View, ScrollView, AsyncStorage, BackHandler, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { styles, buttons } from '../components/styles';

export default class EditList extends Component {
  state = {
    isLoading: true,
    height: 180
  };

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonClick);
  }

  componentDidMount(){
    const listID = this.props.navigation.getParam('listID', 'NULL');
    this.setState({name: listID, newName: listID});

    AsyncStorage.getItem(listID).then((listItems) => {
      this.setState(
        {isLoading: false, items: JSON.parse(listItems)}
      );
    })
  }

  _handleBackButtonClick = () => {
    this.props.navigation.navigate("List", {listID: this.state.name});
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
      nameArray = JSON.parse(names);
      if(this.state.name !== this.state.newName){
        const index = nameArray.indexOf(this.state.name);
        nameArray[index] = this.state.newName;
        try {
          await AsyncStorage.removeItem(this.state.name);
        } catch (error){
          //Error removing list
        }
        // Store the new name list
        try {
          await AsyncStorage.setItem('names', JSON.stringify(nameArray));
        } catch (error){
          //Error storing data
        }
      }
    } catch (error){
      // Error retrieving
    }
    // Store array of items under the name of the list
    try {
      await AsyncStorage.setItem(this.state.newName, JSON.stringify(this.state.items));
    } catch (error){
      //Error with data
    }
    this.props.navigation.navigate("List", {listID: this.state.newName});
  }

  render () {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <Text>Loading</Text>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    let screenHeight = Dimensions.get('window').height;
    return(
      <View style={styles.container}>
        <View style= {{ height: (screenHeight - this.state.height)}}>
          <ScrollView>
            <View style={styles.flex}>
            <TextInput onChangeText={(text) => this.setState({newName: text}) }
              placeholder = {'Input name of the list here'}
              defaultValue={this.state.newName}
              value={this.state.text}
              style={styles.inputBox}
              />
            </View>
            {this.state.items.map((item, idx) => (
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
            ))}
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
