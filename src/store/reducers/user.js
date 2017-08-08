// @flow
type UserType = {
  +email?: string,
  +name?: string,
  +password?: string,
};

type Action = {
  +type: string,
  +payload: UserType,
};

// initial state

const initialState: UserType = {};

// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_USER_SUCCESSFULLY_LOGGED_IN: string = 'AUTH_USER_SUCCESSFULLY_LOGGED_IN';
export const AUTH_LOG_IN: string = 'AUTH_LOG_IN';
export const AUTH_LOG_OUT: string = 'AUTH_LOG_OUT';

// ------------------------------------
// Actions
// ------------------------------------
export function logOut(): Object {
  return {
    type: AUTH_LOG_OUT,
  };
}

export function signIn({ email, password }: UserType): UserType {
  return {
    type: AUTH_LOG_IN,
    payload: {
      email,
      password,
    },
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: { [key: string]: Function } = {
  [AUTH_LOG_OUT]: (): UserType => initialState,
  [AUTH_USER_SUCCESSFULLY_LOGGED_IN]: (state: UserType, action: Action): UserType => {
    const { email, name }: UserType = action.payload;
    return {
      email,
      name,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function multiStepReducer(state: UserType = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
