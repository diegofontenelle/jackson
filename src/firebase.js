import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyC0jF0dfAR5vcoSAfVxPPsxw_UZTG3POB4',
  authDomain: 'jackson-b2946.firebaseapp.com',
  databaseURL: 'https://jackson-b2946.firebaseio.com',
  projectId: 'jackson-b2946',
  storageBucket: 'jackson-b2946.appspot.com',
  messagingSenderId: '800449678008',
  appId: '1:800449678008:web:a14ef8bd12db64cb82c24d',
}

const app = firebase.initializeApp(config)
export const db = app.firestore()
export const api = {
  entry: (uid) => db.collection('entry').doc(uid),
}

export default app
