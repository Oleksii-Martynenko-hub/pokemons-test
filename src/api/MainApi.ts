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

export interface Data {
  id: string;
}

export interface DataResponse {
  data: string[];
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

  public getData = (data: Data) =>
    this.instance.get<DataResponse>(`/data/${data.id}`);
}

export default MainApi;
