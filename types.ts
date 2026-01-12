
export interface GreetingInfo {
  language: string;
  translation: string;
  pronunciation: string;
  funFact: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
