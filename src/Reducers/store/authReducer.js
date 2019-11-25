const initState = {
    authError: null,
    authSuccess: null,
    userAuth: null,
    isLoading: true,
    signupUser: null,
}

const authReducer = (state = initState, action) => {

    switch(action.type) {
        case 'LOAD_USER_AUTH_SUCCESS':
            return {
                ...state,
                userAuth: action.userAuth,
                isLoading: false
            }
        case 'LOAD_USER_AUTH_ERROR':
            return {
              ...state,
              userAuth: null,
              isLoading: false
            }

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                signupUser: action.userdetails.user
            }

        case 'LOGIN_ERROR':
        case 'SIGNUP_ERROR':
        case 'LOGIN_SOCIAL_ERROR' :
            return {
                ...state,
                authError: action.error.message,
                userAuth: null
            }

        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                userAuth: null
            }

        case 'SEND_PASSWORD_RESET_EMAIL_SUCCESS':
            return {
                ...state,
                authSuccess: 'Successfully Sent! Please check your inbox.'
            }
        
        case 'SEND_PASSWORD_RESET_EMAIL_ERROR':
            return {
                ...state,
                authError: 'Error in submitting request!'
            }

        case 'REMORE_ALERTS_ON_CHANGE' :
        case 'MODAL_CLOSE':
            return {
                ...state,
                authError: null,
                authSuccess: null
            }
        case 'LOADING_TRUE':
          return {
            ...state,
            isLoading: true
          }

        default:
            return state;
    }
}

export default authReducer;
