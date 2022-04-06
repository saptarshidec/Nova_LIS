import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const ScrollContext = React.createContext({
    isSecondaryNavOpen: false,
    onToggleSecondaryNav: () => {}
});

export const ScrollContextProvider = (props) => {
    const [isSecondaryNavOpen, setIsSecondaryNavOpen] = useState(false);

    const history = useHistory();

    const toggleSecondaryNavHandler = () => {
        setIsSecondaryNavOpen(prev => !prev);
    }

    history.listen((location, action) => {
        window.scroll(0, 0);
        setIsSecondaryNavOpen(false);
    });

    return (
        <ScrollContext.Provider
            value={{
                isSecondaryNavOpen,
                onToggleSecondaryNav: toggleSecondaryNavHandler
            }}
        >
            {props.children}
        </ScrollContext.Provider>
    );
};

export default ScrollContext;