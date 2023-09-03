import create from "zustand";
import { combine } from "zustand/middleware";

export const useLocationInfoState = create(
  combine(
    {
        locationInfo: {},
    },
    (set) => ({
      setLocationInfo: (locationInfo: {latitude: string, longitude: string}) =>
        set({ locationInfo }),

    }),
  ),
);
