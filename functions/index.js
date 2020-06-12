// deploy:https://us-central1-cloudfunctions-f481f.cloudfunctions.net/api/

const functions = require('firebase-functions')
const express = require('express');

const app = express();

// cloud functionでfirestoreを使うのに必要な設定は以下の２行
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
var fireStore = admin.firestore()

app.get('/test', (request, response) => {
    // 動作確認のため適当なデータをデータベースに保存
    var citiesRef = fireStore.collection('cities');
    citiesRef.add({
        name: 'LosAngels', state: 'LA', country: 'USA',
        capital: false, population: 860000
    })

    var cityRef = fireStore.collection('cities').doc('SF')
    cityRef.get()
        .then(doc => {
            if (!doc.exists) {
                return console.log("Successfully sent message:")
            } else {
                return response.send(doc.data())
            }
        })
        .catch(err => {
            return console.log(err);
        })
});
const api = functions.https.onRequest(app);
module.exports = { api };