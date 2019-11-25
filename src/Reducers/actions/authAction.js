export const watchUserAuth = () => {
    return {
        type: 'WATCH_USER_AUTH'
    }
}

export const loginAction = (credentials) => {
    return {
        type: 'LOGIN_START',
        user: credentials
    }
}

export const signupAction = (userdetails) => {
    return {
        type: 'SIGNUP_START',
        user: userdetails
    }
}

export const sendPasswordResetEmailAction = (userdetails) => {
    return {
        type: 'SEND_PASSWORD_RESET_EMAIL_START',
        user: userdetails
    }
}

export const signOutAction = () => {
    return {
        type: 'SIGNOUT_START'
    }
}

export const loginSocialAction = (mode) => {
    return {
        type: 'LOGIN_SOCIAL_START',
        mode
    }
}

export const removeAlertsOnChange = () => {
    return {
        type: 'REMORE_ALERTS_ON_CHANGE'
    }
}

export const phoneVerifierAction = (result) => {
    return {
        type: 'PHONE_VERIFIER_START',
        result
    }
}
