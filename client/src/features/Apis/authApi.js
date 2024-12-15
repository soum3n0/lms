import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_API } from "../../../constraints";
import { userLoggedIn } from "../authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log("Error : ", error);
                }
            },
        }),
        profile: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
        }),
        logout: builder.mutation({
            query: ()=>({
                url: "logout",
                method: "POST"
            })
        })
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useProfileQuery,
    useLogoutMutation
} = authApi;
