

const auth = {
    fb: {
        appId: '124245908123397',
        callback: 'fb124245908123397://authorize',
        scope: 'public_profile, email, user_photos', // you can override the default scope here
        fields: ['name', 'first_name', 'last_name', 'email', 'picture'], // you can override the default fields here
    }
}


export default auth