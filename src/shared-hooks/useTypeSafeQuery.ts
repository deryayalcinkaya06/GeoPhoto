import { schema } from "@/api";
import { Await, PaginatedKey, QueryKeys } from "@/types/util-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type ParamsOfQuery<K extends QueryKeys> = Parameters<
  typeof schema["query"][K]
>;

export const useTypeSafeQuery = <K extends QueryKeys>(
  key: K | PaginatedKey<K>,
  opts?: UseQueryOptions,
  ...params: ParamsOfQuery<K>
) =>
  useQuery<Await<ReturnType<typeof schema["query"][K]>>>(
    typeof key === "string" ? [key] : key,
    () => {
      const fn = schema.query[typeof key === "string" ? key : key[0]] as any;
      return fn(...(params || []));
    },
    opts as any,
  );
