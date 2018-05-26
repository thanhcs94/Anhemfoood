import firebase from 'firebase';
const  app = createFirebase();

export default firebaseApp = {
    updateUser (userId, data, onComplete) {
        app.database()
            .ref('users/' + userId)
            .once('value')
            .then(snap => {
                const user = {...snap.val(), ...data}
                console.log(user)
                return user
            })
            .then(user => {
                const updates = {}
                updates['users/' + userId] = user
                app.database()
                    .ref()
                    .update(updates, onComplete)
            })
    },
    updatePassword (userId, password, onComplete) {
        this.updateUser(userId, {password}, onComplete)
    },
    insertUser (userId, data) {
        const ref = app.database().ref('users/' + userId)
        return ref.set(data)
                .then(function() {
                    return ref.once("value")
                })
                .then(snap => {
                    const user = snap.val()
                    return user
                })
    },
    getUsersByEmail (email = '') {
        return app.database()
                .ref('users')
                .orderByChild('email')
                .equalTo(email)
                .once('value')
                .then(snapshot => {
                    const users = snapshot.val()
                    return users
                })
    },
    getPost(postId) {
        return app
            .database()
            .ref('/posts/' + postId)
            .once('value')
            .then(function (snapshot) {
                return snapshot
                    .val()
                    .likes;
            });
    },
    async likePost(userId, postId) {
        var arr = [];

        let post = await app
            .database()
            .ref('/posts/' + postId)
            .once('value')
            .then(function (snapshot) {
                arr = snapshot
                    .val()
                    .likes;
                return snapshot.val();
            });

        var postData = post;
        postData.likes = arr.push(userId);;

        var updates = {};
        updates['/posts/' + postID] = postData;

        return firebase
            .database()
            .ref()
            .update(updates);
    },
      async getComments() {
        return await app
            .database()
            .ref('/comments/')
            .once('value')
            .then(function (snapshot) {
                return snapshot.val();
            });
    },
    async getTimeline() {
        return await app
            .database()
            .ref('/posts/')
            .once('value')
            .then(function (snapshot) {
                return snapshot
                    .val();
            });
    },
}

function createFirebase() {
    var config = {
        apiKey: "AIzaSyAbmBLkwiPccnl4rf-ife-qg7KBrtH0Uac",
        authDomain: "kidground-5ee94.firebaseapp.com",
        databaseURL: "https://kidground-5ee94.firebaseio.com",
        projectId: "kidground-5ee94",
        storageBucket: "kidground-5ee94.appspot.com",
        messagingSenderId: "238526265830"
    };
    firebase.initializeApp(config);

    return firebase
}
