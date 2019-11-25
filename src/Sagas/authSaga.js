import { reduxSagaFirebase, googleProvider, facebookProvider } from '../Firebase/firebaseconfig';
import { put, call, take } from "redux-saga/effects";
import 'firebase/auth';

export function* watchUserAuth () {
  const channel = yield call(reduxSagaFirebase.auth.channel);
  while(true) {
    const { user } = yield take(channel);
    if (user)  {
      yield put ({ type: 'LOAD_USER_AUTH_SUCCESS', userAuth: user });
    } else {
      yield put ({ type: 'LOAD_USER_AUTH_ERROR' });
    }
  }
}

export function* loginMethod (credentials) {
    try {
        yield call(
          reduxSagaFirebase.auth.signInWithEmailAndPassword,
          credentials.user.email,
          credentials.user.password
        )
        yield put({ type: 'WATCH_USER_AUTH'});
        yield put({ type: 'MODAL_CLOSE' });
      } catch (error) {
        const error_message = { code: error.code, message: error.message };
        yield put({ type: 'LOGIN_ERROR', error: error_message });
    }
}

export function* sendPasswordResetEmail (userdetails) {
  const actionCodeSettings = {
    url : 'http://localhost:3000/'
  }
  try {
    yield call(reduxSagaFirebase.auth.sendPasswordResetEmail, userdetails.user.email, actionCodeSettings);
    yield put({ type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS' });
  }
  catch(error) {
    const error_message = { code: error.code, message: error.message };
    yield put({ type: 'SEND_PASSWORD_RESET_EMAIL_ERROR', error: error_message });
  }
}

export function* signOutMethod () {
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put({ type: 'SIGNOUT_SUCCESS' });
    yield put({ type: 'WATCH_USER_AUTH'});
  }
  catch(error) {
    yield put({ type: 'SIGNOUT_ERROR' });
  }
}

/* Social Login */
export function* loginSocialMethod (loginType) {
  const authProvider = loginType.mode === 'facebook' ? facebookProvider : googleProvider;
  try {
    yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider);
    yield put({ type: 'WATCH_USER_AUTH'});
    yield put({ type: 'MODAL_CLOSE' });
  }
  catch(error) {
    const error_message = { code: error.code, message: error.message };
    yield put({ type: 'LOGIN_ERROR', error: error_message });
  }
}
