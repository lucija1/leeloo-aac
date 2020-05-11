import React from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';

import API from '../api';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Image as CachedImage } from "react-native-expo-image-cache";

import Search from '../components/Search'
import TopBar from '../components/TopBar'
import TouchableScale from '../components/touchable-scale'

export default class Setting extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: []
    }
    this.pack = this.props.navigation.getParam("pack");

  }

  componentDidMount(){
    API.hit("Pack:"+this.pack.name);
    this.fetchCards(this.pack.name);
  }

  async fetchCards(packSlug){
    try {
      let cards = await fetch(`https://leeloo.dreamoriented.org/json/${packSlug}.json?v=${API.version}`).then(res => res.json());
      this.setState({cards, packSlug})
    } catch(err){
      console.log(err);
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <TopBar back={() => this.props.navigation.pop()} backgroundColor={this.pack.color}/>
        <ScrollView style={{backgroundColor: this.pack.color}} contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView>
            <View style={styles.head}>
              <Text style={[API.styles.h1, {color: "#000"}]}>{this.pack.name[0].toUpperCase() + this.pack.name.substr(1)}</Text>
            </View>
            <View style={styles.board}>
              {this.state.cards.map((card, i) => {
                return (
                  <TouchableScale key={i} onPress={() => this.props.navigation.push("Announcer", {card, pack: this.state.packSlug})} style={styles.cardItem}>
                    <View style={styles.cardItemInner}>
                      <CachedImage uri = {`https://leeloo.dreamoriented.org/cdn/${this.pack.name}/${card.slug}.png?v=${API.version}`} style={{width: 100, height: 100, margin: 10}}/>
                      <Text style={styles.cardItemText}>{card.title}</Text>
                    </View>
                  </TouchableScale>
                )
              })}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  head: {
    height: 70,
    justifyContent: "center"
  },
  cardItem: {
    width: "33.3%",
    height: 160
  },
  board: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  cardItemInner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1, borderRadius: 25,
    margin: 5,
    backgroundColor: "#F7F7F7"
  },
  cardItemText:{
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 10
  }
});
