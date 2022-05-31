import { theme } from "@styles/theme";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

export const ModeContext = createContext({mode : 'dark', setMode : new Function()});
const ModeProvider = (props:any) => {
    const [mode, setMode]:[string, Function] = useState('dark');
    useEffect(() => {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(isDark?'dark':'light')
    }, []);
    return (
        <ModeContext.Provider value={{mode : mode, setMode : setMode}}>
            <ThemeProvider theme={theme[mode]}>
                {props.children}
            </ThemeProvider>
        </ModeContext.Provider>
    )
}

export default ModeProvider;

export const useMode = () => {
    return useContext(ModeContext);
}