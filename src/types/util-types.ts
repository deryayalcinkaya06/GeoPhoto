import { schema } from "@/api";
import { AxiosResponse } from "axios";

export type ReturnAwait<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T;

export type ArrayOf<T> = T extends Array<infer U> ? U : never;

export type Await<T> = T extends Promise<infer U>
  ? U extends AxiosResponse<infer R>
    ? R
    : U
  : T;

/**
 * Getting query keys from schema
 */
export type QueryKeys = keyof typeof schema["query"];

/**
 * @description
 * This is a utility type that allows you to pass a query key to invalidateQueries
 */
export type PaginatedKey<K extends QueryKeys> = [
  K,
  ...(string | number | boolean)[],
];

// react-query v4 / query key is an array
export type QueryKey<K extends QueryKeys> = [K] | PaginatedKey<K>;

export type AxiosHandlerFunction = (
  ...args: any[]
) => Promise<AxiosResponse<unknown>>;


