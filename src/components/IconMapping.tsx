// IconMapping.tsx
import { IconName } from './IconNames'; // Ensure this import is correct

const IconMapping: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  '01_run': require('../assets/icons/01_run.svg').default,
  '02_swim': require('../assets/icons/02_swim.svg').default,
  '03_bandstretchs': require('../assets/icons/03_bandstretchs.svg').default, // Ensure this line is present
  // ... and any other icons
};

export default IconMapping;
