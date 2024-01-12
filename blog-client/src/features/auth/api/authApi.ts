import { rootApi } from "../../rootApi";
import { ISignInDto } from "../dtos/signIn.dto";
import { ISignUpDto } from "../dtos/signUp.dto";
import { UserDto } from "../dtos/user.dto";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserDto, ISignUpDto>({
      query: (iSignUpDto: ISignUpDto) => ({
        url: "/users/signup",
        method: "POST",
        body: iSignUpDto,
      }),
    }),
    signIn: builder.mutation<UserDto, ISignInDto>({
      query: (iSignInDto: ISignInDto) => ({
        url: "/users/signin",
        method: "POST",
        body: iSignInDto,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
