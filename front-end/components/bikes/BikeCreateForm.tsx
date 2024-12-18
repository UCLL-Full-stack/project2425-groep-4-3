import BikeService from "@services/BikeService";
import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const BikeCreateForm: React.FC = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [cost, setCost] = useState(0);

    const [brandError, setBrandError] = useState<string | null>(null);
    const [modelError, setModelError] = useState<string | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const [costError, setCostError] = useState<string | null>(null);

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const { t } = useTranslation();

    const clearErrors = () => {
        setBrandError(null);
        setModelError(null);
        setLocationError(null);
        setSizeError(null);
        setCostError(null);
        setStatusMessages([]);
    };

//   const validate = (): boolean => {
//     let result = true;
//     if (!name || name.trim() === "") {
//       setNameError(t("signup.validate.name"));
//       result = false;
//     }
    
//     if (!email || email.trim() === "") {
//       setEmailError(t("signup.validate.email"));
//       result = false;
//     }
//     if (!age || age < 18) {
//       setAgeError(t("signup.validate.age"));
//       result = false;
//     }
//     if (!role || role.trim() === "") {
//       setRoleError(t("signup.validate.role"));
//       result = false;
//     }
//     if (!password || password.trim() === "") {
//       setPasswordError(t("signup.validate.password"));
//       result = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError(t("signup.validate.confirmPassword"));
//       result = false;
//     }
//     return result;
//   };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearErrors();
    
      if (!validate()) {
        return;
      }
    
      const user = { name, email, age, password, role };
    
      try {
        const response = await BikeService.create;
        
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
      <form > {/* onSubmit={handleSubmit} */}
        <label htmlFor="BrandInput" className="block mb-2 text-sm font-medium">
          {t("bike.label.brand")}
        </label>
        <input
          id="BrandInput"
          type="text"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {brandError && <div className="text-red-800">{brandError}</div>}

        <label htmlFor="modelInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.email")}
        </label>
        <input
          id="modelInput"
          type="text"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {modelError && <div className="text-red-800">{modelError}</div>}

        <label htmlFor="locationInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.age")}
        </label>
        <input
          id="locationInput"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {locationError && <div className="text-red-800">{locationError}</div>}

        <label htmlFor="sizeInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.role")}
        </label>
        <select
          id="sizeInput"
          value={size}
          onChange={(event) => setSize(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" disabled>
            -- Select a size --
          </option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        {sizeError && <div className="text-red-800">{sizeError}</div>}

        <label htmlFor="costInput" className="block mb-2 text-sm font-medium">
          {t("signup.label.password")}
        </label>
        <input
          id="costInput"
          type="number"
          value={cost}
          onChange={(event) => setCost(Number(event.target.value))}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {costError && <div className="text-red-800">{costError}</div>}

        <button 
          className=" mb-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center mt-3 ml-auto"
          type="submit"
        >
          {t("signup.button")}
        </button>
      </form>
    </>
  );
};

export default BikeCreateForm;
