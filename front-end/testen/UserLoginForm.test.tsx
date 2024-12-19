import React from "react";
import { act, fireEvent, render, screen} from '@testing-library/react';
import UserLoginForm from "@components/users/UserLoginForm";
import  userService  from "../services/UserService"
import { useTranslation } from "next-i18next";


const user = {
        id:0,
        username: "Sander",
        password: "t",
        role: "ADMIN"
}
window.React = React
jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
}));

// Bron:
//https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (str: any) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    }
  }));
jest.mock("../service/UserService")
test('Render everything needed for the form', () =>{
    //when
    const {t} = useTranslation();
    render(<UserLoginForm />);
    //then
    expect(screen.getByLabelText(t("login.username")));
    expect(screen.getByLabelText(t("login.password")));
    expect(screen.getByText("Login"));
});
test('Given the correct values , So the login function is called with thoes values', async () =>{
    //when
    const {t} = useTranslation();
    const usernameLabel = t("login.username");
    const passwordLabel = t("login.password");
    userService.loginUser = jest.fn();
    (userService.loginUser as jest.Mock).mockResolvedValue({ok:true,statusText:"ok"});
    render(<UserLoginForm />);
    //then
    await act(async () => {
    fireEvent.change(screen.getByLabelText(usernameLabel),{target: {value: "Sander"}});
    fireEvent.change(screen.getByLabelText(passwordLabel),{target: {value: "t"}});
    fireEvent.submit(screen.getByRole("button",{name : /Login/i}));
    });
    expect(userService.loginUser).toHaveBeenCalledWith({
        username: user.username,
        password: user.password
      });
});

test('Given only one value password , So the login function is not called', async () =>{
    //when
    const {t} = useTranslation();
    const usernameLabel = t("login.username");
    const passwordLabel = t("login.password");
    userService.loginUser = jest.fn();
    (userService.loginUser as jest.Mock).mockResolvedValue({ok:false,statusText:"not ok"});
    render(<UserLoginForm />);
    //then
    await act(async () => {
      fireEvent.change(screen.getByLabelText(usernameLabel),{target: {value: ""}});
      fireEvent.change(screen.getByLabelText(passwordLabel),{target: {value: "t"}});
      fireEvent.submit(screen.getByRole("button",{name : /Login/i}));
    });
    expect(userService.loginUser).not.toHaveBeenCalledWith({
        username: "",
        password: user.password
      });
});

test('Given only one value username , So the login function is not called', async () =>{
    //when
    const {t} = useTranslation();
    const usernameLabel = t("login.username");
    const passwordLabel = t("login.password");
    userService.loginUser = jest.fn();
    (userService.loginUser as jest.Mock).mockResolvedValue({ok:false,statusText:"not ok"});
    render(<UserLoginForm />);
    //then
    await act(async () => {
      fireEvent.change(screen.getByLabelText(usernameLabel),{target: {value: "Sander"}});
      fireEvent.change(screen.getByLabelText(passwordLabel),{target: {value: ""}});
      fireEvent.submit(screen.getByRole("button",{name : /Login/i}));
    });
    expect(userService.loginUser).not.toHaveBeenCalledWith({
        username: user.username,
        password: user.password
      });
});
