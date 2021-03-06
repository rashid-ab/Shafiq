import React from 'react';
import { FlatList, ScrollView,AsyncStorage ,Text, View, TouchableOpacity, Image ,StyleSheet, ImageBackground} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import Items from '../../components/Items/Items';
import ImagePreview from 'react-native-image-preview';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from "react-native-animatable";
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerTitleStyle: { alignSelf: 'center' },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
    headerRight: (
      <Image
      style={styless.headerButtonImage}
      source={require('../../../assets/icons/home.png')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state={
      data:[],
      visible: true
    }
  }
onPressRecipe =item =>{
    // this.setState({visible:true,image:item})
  };
  componentDidMount = async() => {
    // await AsyncStorage.setItem({"url":"http://staging.shafiquesons.com/"})
    await AsyncStorage.setItem(
      'url',
      'https://shafiquesons.com/'
    );
    console.log('as')
    axios({
      method: 'get',
      url: 'https://shafiquesons.com/api/main_cat',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        console.log(response.main_cats)
        this.setState({data:response.main_cats,visible:false})
      });
  }
  render() {
    const {visible} = this.state
    return (
      <ImageBackground style={{ flex:1}} resizeMode= 'stretch' source={require('../../../assets/1.jpg')}>
      {this.state.data.length>2?
        <ScrollView style={{}}>
          {this.state.data.map((item,key) => (
              <View style={{flex:.5}}>
                <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
                  <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingVertical:50}} onPress={()=>this.props.navigation.navigate("Categories",{id:item.id,name:item.name})}>
                    <Image style={styles.photo} source={{ uri: "https://shafiquesons.com/storage/"+item.icon }} />
                    <Text style={{fontSize:hp('3%'),fontWeight:'bold',color:'black'}}>{item.name}</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
          ))}
        </ScrollView>
      :
        <View style={{flex:1}}>
        {this.state.data.map((item,key) => (
            <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
              <Animatable.View style={styles.card} animation="slideInDown" iterationCount={1} direction="alternate">
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingVertical:50}} onPress={()=>this.props.navigation.navigate("Categories",{id:item.id,name:item.name})}>
                  <Image style={styles.photo} source={{ uri: "https://shafiquesons.com/storage/"+item.icon }} />
                  <Text style={{fontSize:hp('3%'),fontWeight:'bold',color:'black'}}>{item.name}</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
        ))}
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          // source={require("./loader.json")}
          animationStyle={styless.lottie}
          speed={2}
        >
          <Text style={{fontSize:18}}>Loading...</Text>
        </AnimatedLoader>
      </View>
  }
      </ImageBackground>
    );
  }
}
const styless = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6
    }
});