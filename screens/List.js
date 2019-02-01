import React, { Component } from 'react';
import { TouchableOpacity, Text, View, AsyncStorage, ActivityIndicator, BackHandler } from 'react-native';
import { styles, buttons } from '../components/styles';

export default class List extends Component {
    state = {
      isLoading: true
    };

  constructor(props){
    super(props);
  }
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

  componentDidMount(){
    const listID = this.props.navigation.getParam('listID', 'NULL');
    this.setState({name: listID});

    AsyncStorage.getItem('names').then((lists) => {
      this.setState(
        {names: JSON.parse(lists)}
      );
    })

    AsyncStorage.getItem(listID).then((listItems) => {
      this.setState(
        {isLoading: false, items: JSON.parse(listItems)}
      );
    })
  }

  _generateRandomItem = async () => {
    let list = this.state.items;
    if(list){
      if(list.length > 0){
        let index = Math.floor(Math.random() * list.length);
        this.setState({ currentItem: JSON.stringify(list[index].name) });
        list.splice(index, 1);
        try{
          await AsyncStorage.setItem(this.state.name, JSON.stringify(list));
        } catch (error){
          //Error storing data
        }
        this.setState(
          {items: list}
        );
      }
      else {
        this._handleDeleteList();
      }
    }
    else {
      this._handleDeleteList();
    }
  }

  _editList = () => {
    this.props.navigation.navigate("EditList", {listID: this.state.name});
  }

  _handleDeleteList = async () =>{
    let names = this.state.names;
    const item = this.state.name;
    const index = names.indexOf(item);
    if(index > -1 ){
      names.splice(index, 1);
    }
    // Store the new name list
    try {
      await AsyncStorage.setItem('names', JSON.stringify(names));
    } catch (error){
      //Error storing data
    }
    // Delete items from the list
    try {
      await AsyncStorage.removeItem(item);
    } catch (error){
      //Error removing list
    }
    this.props.navigation.navigate("Home");
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <Text>Loading</Text>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return(
      <View style={styles.container}>
        <Text style={styles.headingText}>List: {this.state.name}</Text>
        <View style={styles.verCenter}>
          {this.state.currentItem ? (
            (
              <Text style={styles.itemText}>{this.state.currentItem.replace(/['"]+/g, '')}</Text>
            )
          ) : (
            <Text style={styles.itemText}>Click generate button to get an item!</Text>
          )}
        </View>
        <View style={buttons.listButtons}>
          <TouchableOpacity style={buttons.generateButton} onPress={() => this._generateRandomItem()} >
            <Text style={buttons.textStyle}>Generate new item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.editButton} onPress={() => this._editList()} >
            <Text style={buttons.textStyle}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.deleteButton} onPress={() => this._handleDeleteList() }>
            <Text style={buttons.textStyle}>Delete list</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
