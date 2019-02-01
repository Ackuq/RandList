import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, View, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import { styles, buttons } from '../components/styles';


export default class Home extends Component {
  state = {
    isLoading: true,
    height: 130,
  };

  async componentDidMount() {
    AsyncStorage.getItem('names').then((list) => {
      if(list){
        this.setState({
          isLoading: false, lists: JSON.parse(list)
        });
      }
      else{
        this.setState({
          isLoading: false, lists: []
        });
      }
    })
  }
  _addList = () => {
    this.props.navigation.navigate("AddList");
  }
  _handleList = (item) => {
    this.props.navigation.navigate("List", {listID: item});
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
    let screenHeight = Dimensions.get('window').height;
    return(
      <View style={styles.container}>
        <View style= {{ height: (screenHeight - this.state.height)}}>
          <ScrollView style = {{ paddingTop: 20}}>
            {this.state.lists.length > 0 ?
                ((
                this.state.lists.map((item,idx) => (
                  <View style={buttons.buttons} key={idx}>
                    <TouchableOpacity style={buttons.list} onPress={()=>this._handleList(item)}>
                      <Text style={buttons.textStyle}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )) : (
                <Text style={styles.headingText}>Add a list to get started</Text>
              )
            }
          </ScrollView>
        </View>
        <View style={{ height: (this.state.height ), flex: 1}}>
          <View style={buttons.buttons}>
            <TouchableOpacity style={buttons.addList} onPress={() => this._addList()} >
              <Text style={buttons.textStyle}>Add new list</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}
