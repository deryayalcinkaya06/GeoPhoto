import { AxiosRequestConfig } from "axios";
import httpClient, { ContentType } from "../httpClient";
import { BaseBodyDefaultMessageBody } from "../generated/location-service-types";

export const LocationService = {
  query: {
    /**
     * @description Document list for requested application code
     *
     * @tags fedora-controller
     * @name DocumentListByVendorCode
     * @summary Document list for requested vendor
     * @request GET:/
     */
    getAllDocumentListByVendorCode: (params: AxiosRequestConfig = {}) =>
      httpClient
        .request<BaseBodyDefaultMessageBody>({
          url: `/`,
          headers: {},
          method: "GET",
          ...params,
        })
        .then((r) => r.data),

  },
  mutation: {
    /**
     * No description
     *
     * @tags location-controller
     * @name sendLocationToServer
     * @request POST:/
     */
    sendLocationToServer: (
      data: {},
      params: AxiosRequestConfig = {},
    ) =>
      httpClient
        .request<BaseBodyDefaultMessageBody>({
          url: `/`,
          method: "POST",
          data: data,
          headers: {
            "Content-Type": ContentType.FormData,
          },
          ...params,
        })
        .then((r) => r.data),
  },
};
