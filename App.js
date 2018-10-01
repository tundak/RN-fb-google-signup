/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Icon} from 'react-native';
import { LoginManager, AccessToken} from 'react-native-fbsdk';

export default class App extends Component<Props> {

    handleFacebookLogin = async () => {
            LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
              function (result) {
                //console.log(result);
                if (result.isCancelled) {
                  console.log('Login cancelled')
                } else {
                  console.log('Login success with permissions: ' + result.grantedPermissions.toString())

                  AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          //console.log(data.accessToken);
                          //console.log(data.userID);
                          fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
                            .then((response) => response.json())
                            .then(async(json) => {
                              // Some user object has been set up somewhere, build that user here
                              console.log(json);
                              user.name = json.name
                              user.id = json.id
                              user.email = json.email
                              user.username = json.name
                            })
                            .catch(() => {
                              reject('ERROR GETTING DATA FROM FACEBOOK')
                            })
                        }
                      )
                }
              },
              function (error) {
                console.log('Login fail with error: ' + error)
              }
            )
        }


  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.fbbtn}
          icon={
            <Icon
              name='facebook-f'
              size={15}
              color='white'
            />
          }
          iconLeft
          title='Login with Faceook'
          onPress={this.handleFacebookLogin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fbbtn:{
        width: 315,
        height: 50,
        marginTop:70,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 40,
        backgroundColor: "#4D62BB",
  },
});
