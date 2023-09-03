import { schema } from "@/api";
import { Await } from "@/types/util-types"
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type Keys = keyof typeof schema["mutation"];

export const useTypeSafeMutation = <K extends Keys>(
  key: K,
  opts?: UseMutationOptions<
    Await<ReturnType<typeof schema["mutation"][K]>>,
    unknown,
    Parameters<typeof schema["mutation"][K]>,
    any
  >,
) =>
  useMutation<
    Await<ReturnType<typeof schema["mutation"][K]>>,
    any,
    Parameters<typeof schema["mutation"][K]>
  >(
    (params) =>
      (schema.mutation[typeof key === "string" ? key : key[0]] as any)(
        ...params,
      ),
    opts,
  );
