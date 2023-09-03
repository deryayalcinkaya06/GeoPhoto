import { LocationService } from "./location";
const schema = {
  mutation: {
    ...LocationService.mutation,
  },
  query: {
    ...LocationService.query,
  },
};

export { schema };
