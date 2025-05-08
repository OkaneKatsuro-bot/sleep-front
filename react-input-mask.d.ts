import * as React from 'react';

declare module 'react-input-mask' {
    export interface ReactInputMaskProps
        extends React.InputHTMLAttributes<HTMLInputElement> {
        mask: string | Array<string | RegExp>;
        maskChar?: string | null;
        alwaysShowMask?: boolean;
        beforeMaskedValueChange?: (
            newState: { value: string; selection: { start: number; end: number } },
            oldState: { value: string; selection: { start: number; end: number } },
            userInput: string,
            options: { mask: string | Array<string | RegExp>; maskChar: string | null }
        ) => { value: string; selection: { start: number; end: number } };
        formatChars?: { [char: string]: string };
        guide?: boolean;
        // вот тут добавляем:
        customInput?: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
    }

    const InputMask: React.ComponentType<ReactInputMaskProps>;
    export default InputMask;
}
