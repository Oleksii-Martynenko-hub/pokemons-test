/* eslint-disable no-prototype-builtins */
import HttpClient from 'src/api/HttpClient';

export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export enum APIStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export interface IPokemonMoves {
  move: {
    name: string;
    url: string;
  };
}

export interface IPokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetailsDataResponse {
  id: number;
  moves: IPokemonMoves[];
  stats: IPokemonStats[];
  types: IPokemonType[];
}

export interface IPokemonData {
  name: string;
  url: string;
}

export interface IPokemonDataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonData[];
}

class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public constructor() {
    super(API_URL);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  public getData = () => this.instance.get<IPokemonDataResponse>(`/pokemon`);
}

export default MainApi;
