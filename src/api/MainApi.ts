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
  name: string;
  moves: IPokemonMoves[];
  stats: IPokemonStats[];
  types: IPokemonType[];
}

export interface IPokemonTypeDetailsDataResponse {
  id: number;
  name: string;
  pokemon: { pokemon: IPokemonData; slot: number }[];
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

/* eslint-disable-next-line */
export interface IPokemonTypeDataResponse extends IPokemonDataResponse {}

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

  public getPokemonData = (offset = 0, limit = 20) =>
    this.instance.get<IPokemonDataResponse>(
      `/pokemon?offset=${offset}&limit=${limit}`
    );

  public getPokemonById = (id: string) =>
    this.instance.get<IPokemonDetailsDataResponse>(`/pokemon/${id}`);

  public getPokemonTypes = () =>
    this.instance.get<IPokemonTypeDataResponse>(`/type`);

  public getPokemonTypeById = (id: string) =>
    this.instance.get<IPokemonTypeDetailsDataResponse>(`/type/${id}`);
}

export default MainApi;
