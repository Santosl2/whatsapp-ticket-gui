import axios, { AxiosResponse } from "axios";

export class HttpService {
  private static instance: HttpService;
  private BASE_URL = "http://localhost:3333/";

  private constructor() {}

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }

    return HttpService.instance;
  }

  public async get<T = any>(url: string): Promise<T> {
    const { data } = await axios.get<T>(this.BASE_URL + url);
    return data;
  }

  public async post(url: string, data: any): Promise<AxiosResponse<any, any>> {
    const response = await axios.post(this.BASE_URL + url, data);
    return response;
  }
}
