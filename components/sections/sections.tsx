import React, {  } from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { OptionSelectProps, TextAreaProps, ResultProps } from "../types";

export const OptionSelect = ({
  label,
  onChange,
  options,
}: OptionSelectProps) => (
  <div className="selection">
    <label className="t-2">{label}</label>
    <select onChange={onChange}>
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option} aria-label={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export const TextArea = ({ label, value, onChange }: TextAreaProps) => {
  return (
    <>
      <label className="t-2">{label}</label>
      <textarea
        onChange={onChange}
        rows={10}
        aria-label={label}
        value={value}
      />
    </>
  );
};

export const Result = ({ result, resultRef }: ResultProps) => {
  if (!result) {
    return null;
  }

  return (
    <div
      className="flex flex-col justify-center w-full mx-10 md:px-20"
      ref={resultRef}
    >
      <label className="t-2 inline-flex items-center gap-1">
        <FaCheck className="text-green-500" /> Result
      </label>
      <textarea
        readOnly
        value={result}
        rows={10}
        cols={50}
        aria-label="Result"
      />
    </div>
  );
};

export const Loading = ({ loading }: { loading: boolean }) => {
  if (!loading) {
    return null;
  }

  return (
    <p className="p-l-r text-blue-500">
      <FaSpinner className="animate-spin" /> Loading...
    </p>
  );
};

export const Error = ({ error }: { error: string }) => {
  if (!error) {
    return null;
  }

  return (
    <p className="p-l-r text-red-500">
      <FaExclamationTriangle className="text-red-500" /> {error}
    </p>
  );
};
