"use client";

import { getAvailableCountries } from "@/api/country";
import Footer from "@/components/footer";
import NavbarMinimalist from "@/components/navbar-minimalist";
import PageCounter from "@/components/utilities/counter";
import TitleWow from "@/components/utilities/serverTitle";
import { useUserContext } from "@/context/UserContext";
import { CountryModel } from "@/model/model";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Swal from "sweetalert2";
import "./style.css";

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "pt" },
  { value: "Others", label: "Others", language: "en" },
];

const Register = () => {
  const jwt = Cookies.get("token");

  const { t, i18n } = useTranslation();
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [country, setCountry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [date, setDate] = useState<string>("");

  if (user.logged_in && jwt != null) {
    router.push("/accounts");
  }

  const [countryOptions, setCountryOptions] = useState<CountryModel[]>(
    defaultCountryOptions
  );

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleCountryChange = (selectedOption: CountryModel | null) => {
    const language = selectedOption ? selectedOption.language : "es";
    const countrySelect = selectedOption ? selectedOption.value : "";
    setCountry(countrySelect);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!country.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.country-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!date) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.birth-date-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    const enteredDate = new Date(date);

    if (enteredDate > new Date()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.birth-date-future"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - enteredDate.getFullYear();
    const monthDifference = today.getMonth() - enteredDate.getMonth();
    const dayDifference = today.getDate() - enteredDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 13) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.age-restriction"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        language: language,
        country: country,
        date_of_birth: new Date(date),
      });
    }
    router.push("/register/know-you");
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountryOptions = await getAvailableCountries();
      setCountryOptions(fetchedCountryOptions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      i18n.changeLanguage(user.language);
      setCountry(user.country);
      setDate(
        user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : ""
      );
      setLanguage(user.language);
    }
  }, [user]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />
      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t("register.section-page.register.title-server-message")}
        />
        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group select-container">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.register.input.select-country")}
            </label>
            <Select
              instanceId={"wsad123wqwe"}
              className="mb-3 border-gray-300 rounded-md text-black register-input p-1"
              options={countryOptions}
              onChange={handleCountryChange}
              value={countryOptions.find((option) => option.value === country)}
              placeholder={t(
                "register.section-page.register.input.select-country-place-holder"
              )}
              isSearchable
              inputId="countrySelect"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="fechaInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.register.input.select-birthday")}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="date"
              id="fechaInput"
              name="fechaInput"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <PageCounter currentSection={1} totalSections={5} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.register.button.btn-primary")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
