import { createContext } from 'react';
import { IShowResult } from '../models/show.model';
import { IScheduled } from '../models/scheduled.model';

export type ShowsAction = {
  payload: any;
  type: string;
};

export type State = {
  shows: IShowResult[];
  schedule: IScheduled[];
};

export const showsInitialState: State = {
  shows: [],
  schedule: [],
};

export const showsReducer = (state = showsInitialState, action: ShowsAction): State => {
  switch (action.type) {
    case 'SET_SHOWS':
      return {
        ...state,
        shows: action.payload,
      };
    case 'SET_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      };
    default:
      return state;
  }
};

export const ShowsContext = createContext({ store: showsInitialState, dispatch: (value: any) => {} });
