// IconProvider.tsx
import { createContext, useContext } from 'react';
import IconMapping from './IconMapping';
import { IconName } from './IconNames';
import React from 'react';
interface IconContextState {
    getIconComponent: (iconName: IconName) => React.FC<React.SVGProps<SVGSVGElement>> | null;
}

const IconContext = createContext<IconContextState>({
    getIconComponent: () => null,
});

export const IconProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getIconComponent = (
        iconName: IconName
    ): React.FC<React.SVGProps<SVGSVGElement>> | null => {
        const IconComponent = IconMapping[iconName];
        return IconComponent || null;
    };

    return <IconContext.Provider value={{ getIconComponent }}>{children}</IconContext.Provider>;
};

export const useIcons = (): IconContextState => useContext(IconContext);
