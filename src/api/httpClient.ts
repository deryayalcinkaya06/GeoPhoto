import { BASE_URL } from "@/lib/constants";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
enum StatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
}

export type QueryParamsType = Record<string | number, any>;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export const DefaultJsonHeader = {
  "Content-Type": ContentType.Json,
  Accept: ContentType.Json,
};

// TODO: add base url with environment variable

// default http headers
const headers: Readonly<Record<string, string | boolean>> = {};

const injectToken = (config: AxiosRequestConfig) => {
  try {

    if (config.headers !== undefined) {
      return config;
    }
    return config;
  } catch (error) {
    throw new Error(error as string);
  }
};

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp(): AxiosInstance {
    const http = axios.create({
      baseURL: BASE_URL,
      headers,
    });

    // Authorization middleware
    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error),
    );

    // Response middleware
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      },
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: any) {
    // console.log("handle error", error);

    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        // console.log("Internal Server Error", error);
        break;
      }
      case StatusCode.BadRequest: {
        // Handle BadRequest
        break;
      }
      default: {
        // console.log("Unhandled Error", error);
        break;
      }
    }

    return Promise.reject(error);
  }
}

const httpClient = new HttpClient();

export default httpClient;
