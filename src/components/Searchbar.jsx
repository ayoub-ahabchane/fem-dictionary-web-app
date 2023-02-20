import React, { useState, useRef, useEffect } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [word, setWord] = useState("");
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    word && setIsValid(true);
  }, [word]);

  return (
    <form
      className={`relative flex h-12 items-center gap-5 rounded-2xl bg-secondary-200 px-6 outline outline-1 outline-transparent transition-all duration-300  md:h-16 ${
        isValid ? "focus-within:outline-accent" : "focus-within:outline-danger"
      } dark:bg-primary-500`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!word) {
          setIsValid(false);
          return;
        } else {
          inputRef.current.blur();
          setWord("");
          return navigate(`definition/${word}`);
        }
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for any word..."
        className="dark grow bg-transparent font-bold outline-none transition-all duration-300 placeholder:text-primary-400 placeholder:text-opacity-25 dark:placeholder:text-white dark:placeholder:text-opacity-25 md:text-xl"
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") inputRef.current.blur();
        }}
        onBlur={() => {
          setIsValid(true);
        }}
      />
      <button role="button" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="none"
            stroke="#A445ED"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
          />
        </svg>
      </button>
      {!isValid && (
        <p className="absolute left-0 -bottom-8 text-danger">
          Woops! Can't be empty...
        </p>
      )}
    </form>
  );
};

export default Searchbar;
