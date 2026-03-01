"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CustomButton } from "@/components/ui/custom-button";

const companyCategories = [
  "Stable Coin",
  "Perps Trading",
  "Dex",
  "Trading Terminal",
  "Meme Coin",
  "Lending Protocol",
  "Prediction Market",
  "Launchpad",
  "Other",
];

const inputClassName =
  "w-full px-4 py-3 bg-card border border-border/30 rounded-none text-foreground placeholder:text-muted-foreground/50 placeholder:italic focus:outline-none focus:ring-2 focus:ring-primary/50";

const inputErrorClassName =
  "w-full px-4 py-3 bg-card border border-red-500 rounded-none text-foreground placeholder:text-muted-foreground/50 placeholder:italic focus:outline-none focus:ring-2 focus:ring-red-500/50";

const requiredFields = [
  "companyName",
  "telegramUsername",
  "walletAddress",
  "companyCategory",
  "tokenOrProtocolAddress",
];

function JoinForm() {
  const [state, handleSubmit] = useForm("movgnkqk");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all required fields as touched
    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Check if all required fields are filled
    const form = e.currentTarget;
    const formData = new FormData(form);
    let hasErrors = false;

    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value || (typeof value === "string" && !value.trim())) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      handleSubmit(e);
    }
  };

  const getFieldError = (field: string) => {
    if (!touched[field]) return false;
    const value = values[field];
    return !value || !value.trim();
  };

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-4xl font-bold text-foreground">Thanks for joining!</p>
        <p className="text-lg text-muted-foreground mt-4">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <>
      <h1 data-animate="fade-up" className="text-4xl font-bold text-foreground mb-4">Join Torque</h1>
      <p data-animate="fade-up" className="text-muted-foreground mb-8 text-center max-w-md">
        Get in touch with us to learn more about Torque.
      </p>
      <form onSubmit={validateAndSubmit} className="w-full max-w-lg space-y-5" noValidate>
        <div>
          <label htmlFor="companyName" className="block text-sm font-semibold text-foreground mb-2">
            Name of Company <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            className={getFieldError("companyName") ? inputErrorClassName : inputClassName}
            placeholder="Name of company"
            onChange={(e) => handleFieldChange("companyName", e.target.value)}
            onBlur={() => handleFieldBlur("companyName")}
          />
          {getFieldError("companyName") && (
            <p className="text-red-500 text-sm mt-1">company name is required</p>
          )}
          <ValidationError prefix="Company Name" field="companyName" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="telegramUsername" className="block text-sm font-semibold text-foreground mb-2">
            Telegram Username <span className="text-red-500">*</span>
          </label>
          <input
            id="telegramUsername"
            type="text"
            name="telegramUsername"
            className={getFieldError("telegramUsername") ? inputErrorClassName : inputClassName}
            placeholder="@username"
            onChange={(e) => handleFieldChange("telegramUsername", e.target.value)}
            onBlur={() => handleFieldBlur("telegramUsername")}
          />
          {getFieldError("telegramUsername") && (
            <p className="text-red-500 text-sm mt-1">Telegram username is required</p>
          )}
          <ValidationError prefix="Telegram Username" field="telegramUsername" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="walletAddress" className="block text-sm font-semibold text-foreground mb-2">
            Wallet Address <span className="text-red-500">*</span>
          </label>
          <input
            id="walletAddress"
            type="text"
            name="walletAddress"
            className={getFieldError("walletAddress") ? inputErrorClassName : inputClassName}
            placeholder="Solana wallet address"
            onChange={(e) => handleFieldChange("walletAddress", e.target.value)}
            onBlur={() => handleFieldBlur("walletAddress")}
          />
          {getFieldError("walletAddress") && (
            <p className="text-red-500 text-sm mt-1">Wallet address is required</p>
          )}
          <ValidationError prefix="Wallet Address" field="walletAddress" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="companyCategory" className="block text-sm font-semibold text-foreground mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="companyCategory"
            name="companyCategory"
            className={getFieldError("companyCategory") ? inputErrorClassName : inputClassName}
            onChange={(e) => handleFieldChange("companyCategory", e.target.value)}
            onBlur={() => handleFieldBlur("companyCategory")}
          >
            <option value="">Select a category</option>
            {companyCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {getFieldError("companyCategory") && (
            <p className="text-red-500 text-sm mt-1">company category is required</p>
          )}
          <ValidationError prefix="Company Category" field="companyCategory" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="tokenOrProtocolAddress" className="block text-sm font-semibold text-foreground mb-2">
            Token or Protocol Address <span className="text-red-500">*</span>
          </label>
          <input
            id="tokenOrProtocolAddress"
            type="text"
            name="tokenOrProtocolAddress"
            className={getFieldError("tokenOrProtocolAddress") ? inputErrorClassName : inputClassName}
            placeholder="Token or protocol address"
            onChange={(e) => handleFieldChange("tokenOrProtocolAddress", e.target.value)}
            onBlur={() => handleFieldBlur("tokenOrProtocolAddress")}
          />
          {getFieldError("tokenOrProtocolAddress") && (
            <p className="text-red-500 text-sm mt-1">Token or protocol address is required</p>
          )}
          <ValidationError prefix="Token or Protocol Address" field="tokenOrProtocolAddress" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <CustomButton
          type="submit"
          disabled={state.submitting}
          buttonSize="big"
          buttonColor="primary"
          showArrow={false}
          className="w-full"
        >
          {state.submitting ? "Submitting..." : "Submit"}
        </CustomButton>
      </form>
    </>
  );
}

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}
