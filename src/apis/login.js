import loginRoute from '../routes/login'
import firebase from './firebase'

const login = (auth) => {
    
    return fetch(loginRoute.login)
                .then(response => {
                    
                })
}