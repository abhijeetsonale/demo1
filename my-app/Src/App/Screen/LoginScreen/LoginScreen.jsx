import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './Utils/Colors'
import { useWarmUpBrowser } from '../../../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress=async()=>{
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }
  
  
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

        marginTop:80
    }} 

    >
      <Image source={require('./../../../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <Image source={require('./../../../../assets/images/ev-charging.jpg')} 
        style={styles.bgImage}
        />
        <View style={{padding:20}}>
            <Text style={styles.heading}> Your Ultmiate Ev Charing station Finder App</Text>
            <Text style={styles.desc}>Charging your EV with a charger is safer, faster and cheaper. Safer, because the charger is smart and will control the flow of energy through the cable.</Text>
            <TouchableOpacity style={styles.button}
            onPress={onPress}
             >
              <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17
              }}>login in page</Text>

            </TouchableOpacity>
            </View>

    </View>
  )
}
const styles = StyleSheet.create({
    logoImage:{
        width:200,
        height:100,
        objectFit:'contain'
       
    },
    bgImage:{
        width:'100%',
        height:200,
        marginStart:20,
        objectFit:'cover'

    },
    heading:{
        fontSize:25,
        fontFamily:'outfit',
        textAlign:'center',
        marginTop:20
    },
    desc:{
      fontSize:17,
      fontFamily:'',
      marginTop:15,
      textAlign:'center',
      color:Colors.PRIMARY
    },
    button:{
      backgroundColor:Colors.PRIMARY,
      padding:16,
      display:'flex ',
      borderRadius:99,
      marginTop:30

    }


    
})
