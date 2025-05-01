'use client';

import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from "@/components/shop/form/textarea";
import { ClearButton } from "@/components/shop/clear-button";
import { cn } from "@/lib/utils";
import { ErrorText } from "@/components/shop/error-text";
import { RequiredSymbol } from "@/components/shop/required-symbol";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { ref, ...field } = register(name);

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
    textareaRef.current?.focus();
  };

  return (
    <div className={cn("relative mb-6", className)}>
      <div className="relative">
        <Textarea
          className={cn(
            "min-h-[120px] px-4 py-3 rounded-lg border-2",
            "text-gray-900 placeholder-transparent",
            "focus:border-blue-500 focus:ring-0",
            "transition-all duration-200 resize-y",
            "peer pt-6",
            errorText && "border-red-500 focus:border-red-500",
            isFocused && "border-blue-500"
          )}
          {...field}
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label || ''}
          {...props}
        />

        {label && (
          <label
            className={cn(
              "absolute left-4 pointer-events-none",
              "text-gray-500 transition-all duration-200",
              "translate-y-3.5 peer-focus:translate-y-2 peer-focus:text-sm",
              (!!value || isFocused) && "translate-y-2 text-sm"
            )}
          >
            {label} {required && <RequiredSymbol />}
          </label>
        )}

        {value && (
          <ClearButton
            onClick={onClickClear}
            className="absolute right-3 top-4"
          />
        )}
      </div>

      {errorText && (
        <div className="mt-2 flex items-start gap-1.5 text-red-600">
          <svg 
            className="w-4 h-4 shrink-0 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <ErrorText text={errorText} className="text-sm" />
        </div>
      )}
    </div>
  );
};