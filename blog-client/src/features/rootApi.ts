import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});
