import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const UserSignupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setEmailError(null);
    setAgeError(null);
    setRoleError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    if (!name || name.trim() === "") {
      setNameError(t("signup.validate.name"));
      result = false;
    } else if(!/^[a-zA-Z]+$/.test(name)){
      setNameError(t("signup.validate.nameLetters"));
      result = false;
    }
    
    if (!email || email.trim() === "") {
      setEmailError(t("signup.validate.email"));
      result = false;
    } else if(!email.includes("@") || !email.includes(".")){
      setEmailError(t("signup.validate.emailFormat"));
      result = false;
    }
    if (!age) {
      setAgeError(t("signup.validate.age"));
      result = false;
    } else if(age < 16){
      setAgeError(t("signup.validate.ageLimit"));
      result = false;
    }
    if (!role || role.trim() === "") {
      setRoleError(t("signup.validate.role"));
      result = false;
    } else if (role !== "Owner" && role !== "Renter") {
      setRoleError(t("signup.validate.roleFormat"));
      result = false;
    }
    if (!password || password.trim() === "") {
      setPasswordError(t("signup.validate.password"));
      result = false;
    } else if (password.length < 7) {
      setPasswordError(t("signup.validate.passwordLength"));
      result = false;
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordError(t("signup.validate.passwordFormat"));
      result = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t("signup.validate.confirmPassword"));
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
  
    if (!validate()) {
      return;
    }
  
    const user = { name, email, age, password, role };
  
    try {
      const response = await UserService.signupUser(user);
  
      if (response.status === 200) {
        setStatusMessages([{ message: t("signup.success"), type: "success" }]);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (response.status === 400 || response.status === 500) {
        const { message } = await response.json();
        setStatusMessages([{ message: message, type: "error" }]);
      } else {
        setStatusMessages([{ message: t("general.error"), type: "error" }]);
      }
    } catch (error) {
      setStatusMessages([{ message: t("general.error"), type: "error" }]);
    }
  };
  

  return (
    <>
      <h3 className="px-0">{t("signup.title")}</h3>
      {statusMessages.length > 0 && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.username")}
        </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {nameError && <div className="text-red-800">{nameError}</div>}

        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.email")}
        </label>
        <input
          id="emailInput"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {emailError && <div className="text-red-800">{emailError}</div>}

        <label htmlFor="ageInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.age")}
        </label>
        <input
          id="ageInput"
          type="number"
          value={age}
          onChange={(event) => setAge(Number(event.target.value))}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {ageError && <div className="text-red-800">{ageError}</div>}

        <label htmlFor="roleInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.role")}
        </label>
        <select
          id="roleInput"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" disabled>
            -- Select a role --
          </option>
          <option value="Owner">owner</option>
          <option value="Renter">renter</option>
        </select>
        {roleError && <div className="text-red-800">{roleError}</div>}

        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.password")}
        </label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {passwordError && <div className="text-red-800">{passwordError}</div>}

        <label htmlFor="confirmPasswordInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.confirmPassword")}
        </label>
        <input
          id="confirmPasswordInput"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {confirmPasswordError && <div className="text-red-800">{confirmPasswordError}</div>}

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center mt-3 ml-auto"
          type="submit"
        >
          {t("signup.button")}
        </button>
      </form>
    </>
  );
};

export default UserSignupForm;
