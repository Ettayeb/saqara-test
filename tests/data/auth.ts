const authData = {

    queries:{
        logIn:`
        query LogIn($logIn: LoginInput!) {
            logIn(logIn: $logIn) {
              user {
                _id
                email
                name
              }
              token
            }
          }`
        
    },
    mutations:{
        signUp:`
        mutation SignUp($signUp: SignUpInput!) {
            signUp(SignUp: $signUp) {
              user {
                _id
                name
                email
              }
              token
            }
          }`,

    },
    testData: {
        user1 : {
            signUp: {
                "signUp": {
                  "email": "user1@user1.com",
                  "name": "user1 user1",
                  "password": "12345678"
                }
              },
              logIn:{
                "logIn": {
                  "email": "user1@user1.com",
                  "password": "12345678"
                }
              },
        },
        user2:{
            signUp: {
            "signUp": {
              "email": "user2@user2.com",
              "name": "user2 user2",
              "password": "12345678"
            }
          },
          logIn:{
            "logIn": {
              "email": "user2@user2.com",
              "password": "12345678"
            }
          }
        
        }
       
    }


};
export default authData;