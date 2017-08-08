// @flow
type Message = {
  +open?: boolean,
  +text?: string,
  +hideTimeout?: number,
};

type Action = {
  +type: string,
  +payload?: {
    message: string,
  },
};

// initial state
const initialState: Message = {
  open: false,
  message: '',
};

// ------------------------------------
// Constants
// ------------------------------------
export const MESSAGE_SHOW: string = 'MESSAGE_SHOW';
export const MESSAGE_HIDE: string = 'MESSAGE_HIDE';

// ------------------------------------
// Actions
// ------------------------------------
export function messageShow(message: string): Action {
  return {
    type: MESSAGE_SHOW,
    payload: {
      message,
    },
  };
}

export function messageHide(): Action {
  return {
    type: MESSAGE_HIDE,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS: { [key: string]: Function } = {
  [MESSAGE_SHOW]: (state: Message, action: Action): Message => ({
    ...action.payload,
    open: true,
  }),
  [MESSAGE_HIDE]: (): Message => Object.assign({}, initialState),
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function multiStepReducer(state: Message = initialState, action: Action): Message {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
