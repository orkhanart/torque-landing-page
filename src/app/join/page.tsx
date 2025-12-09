"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { RotatingHexagons } from "../components/RotatingHexagons";

const projectCategories = [
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
  "projectName",
  "companyProjectName",
  "telegramUsername",
  "walletAddress",
  "projectCategory",
  "objectives",
  "budgetAllocation",
  "timeline",
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
      <h1 className="text-4xl font-bold text-foreground mb-4">Join Torque</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Get in touch with us to learn more about Torque.
      </p>
      <form onSubmit={validateAndSubmit} className="w-full max-w-lg space-y-5" noValidate>
        <div>
          <label htmlFor="projectName" className="block text-sm font-semibold text-foreground mb-2">
            Name of Project <span className="text-red-500">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            name="projectName"
            className={getFieldError("projectName") ? inputErrorClassName : inputClassName}
            placeholder="Your project name"
            onChange={(e) => handleFieldChange("projectName", e.target.value)}
            onBlur={() => handleFieldBlur("projectName")}
          />
          {getFieldError("projectName") && (
            <p className="text-red-500 text-sm mt-1">Project name is required</p>
          )}
          <ValidationError prefix="Project Name" field="projectName" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="companyProjectName" className="block text-sm font-semibold text-foreground mb-2">
            Company Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyProjectName"
            type="text"
            name="companyProjectName"
            className={getFieldError("companyProjectName") ? inputErrorClassName : inputClassName}
            placeholder="Company project name"
            onChange={(e) => handleFieldChange("companyProjectName", e.target.value)}
            onBlur={() => handleFieldBlur("companyProjectName")}
          />
          {getFieldError("companyProjectName") && (
            <p className="text-red-500 text-sm mt-1">Company project name is required</p>
          )}
          <ValidationError prefix="Company Project Name" field="companyProjectName" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="telegramUsername" className="block text-sm font-semibold text-foreground mb-2">
            Company Project Telegram Username <span className="text-red-500">*</span>
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
            Company Project Wallet Address <span className="text-red-500">*</span>
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
          <label htmlFor="projectCategory" className="block text-sm font-semibold text-foreground mb-2">
            Project Category <span className="text-red-500">*</span>
          </label>
          <select
            id="projectCategory"
            name="projectCategory"
            className={getFieldError("projectCategory") ? inputErrorClassName : inputClassName}
            onChange={(e) => handleFieldChange("projectCategory", e.target.value)}
            onBlur={() => handleFieldBlur("projectCategory")}
          >
            <option value="">Select a category</option>
            {projectCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {getFieldError("projectCategory") && (
            <p className="text-red-500 text-sm mt-1">Project category is required</p>
          )}
          <ValidationError prefix="Project Category" field="projectCategory" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="objectives" className="block text-sm font-semibold text-foreground mb-2">
            What are your primary objectives? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="objectives"
            name="objectives"
            rows={3}
            className={`${getFieldError("objectives") ? inputErrorClassName : inputClassName} resize-none`}
            placeholder="e.g., increase holder count, reduce selling pressure, boost trading volume, graduate Small holders to Medium"
            onChange={(e) => handleFieldChange("objectives", e.target.value)}
            onBlur={() => handleFieldBlur("objectives")}
          />
          {getFieldError("objectives") && (
            <p className="text-red-500 text-sm mt-1">Objectives are required</p>
          )}
          <ValidationError prefix="Objectives" field="objectives" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="budgetAllocation" className="block text-sm font-semibold text-foreground mb-2">
            Budget Allocation <span className="text-red-500">*</span>
          </label>
          <input
            id="budgetAllocation"
            type="text"
            name="budgetAllocation"
            className={getFieldError("budgetAllocation") ? inputErrorClassName : inputClassName}
            placeholder="% of supply or absolute token amount to be used for incentives"
            onChange={(e) => handleFieldChange("budgetAllocation", e.target.value)}
            onBlur={() => handleFieldBlur("budgetAllocation")}
          />
          {getFieldError("budgetAllocation") && (
            <p className="text-red-500 text-sm mt-1">Budget allocation is required</p>
          )}
          <ValidationError prefix="Budget Allocation" field="budgetAllocation" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-semibold text-foreground mb-2">
            Timeline <span className="text-red-500">*</span>
          </label>
          <input
            id="timeline"
            type="text"
            name="timeline"
            className={getFieldError("timeline") ? inputErrorClassName : inputClassName}
            placeholder="Campaign duration (30/60/90 days)"
            onChange={(e) => handleFieldChange("timeline", e.target.value)}
            onBlur={() => handleFieldBlur("timeline")}
          />
          {getFieldError("timeline") && (
            <p className="text-red-500 text-sm mt-1">Timeline is required</p>
          )}
          <ValidationError prefix="Timeline" field="timeline" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="tokenAddress" className="block text-sm font-semibold text-foreground mb-2">
            Token Address
          </label>
          <input
            id="tokenAddress"
            type="text"
            name="tokenAddress"
            className={inputClassName}
            placeholder="Token contract address (optional)"
          />
          <ValidationError prefix="Token Address" field="tokenAddress" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="protocolAddress" className="block text-sm font-semibold text-foreground mb-2">
            Protocol Address
          </label>
          <input
            id="protocolAddress"
            type="text"
            name="protocolAddress"
            className={inputClassName}
            placeholder="Protocol address (optional)"
          />
          <ValidationError prefix="Protocol Address" field="protocolAddress" errors={state.errors} className="text-red-500 text-sm mt-1" />
        </div>

        <CustomButton
          type="submit"
          disabled={state.submitting}
          buttonSize="big"
          buttonColor="primary"
          asLink={false}
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative min-h-screen">
        <RotatingHexagons />
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-20">
          <JoinForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}
