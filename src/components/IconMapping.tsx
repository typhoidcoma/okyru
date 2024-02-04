// IconMapping.tsx
import { IconName } from './IconNames';

const IconMapping: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  '01_run': require('../assets/icons/01_run.svg').default,
  '02_swim': require('../assets/icons/02_swim.svg').default,
  '03_bandstretchs': require('../assets/icons/03_bandstretchs.svg').default,
  '04_standingstretch': require('../assets/icons/04_standingstretch.svg').default,
  '05_stepups': require('../assets/icons/05_stepups.svg').default,
  '06_bike': require('../assets/icons/06_bike.svg').default,
  '07_walk': require('../assets/icons/07_walk.svg').default,
  '08_lift': require('../assets/icons/08_lift.svg').default,
  '09_situps': require('../assets/icons/09_situps.svg').default,
  '10_liftedlegsitups': require('../assets/icons/10_liftedlegsitups.svg').default,
  '11_crunches': require('../assets/icons/11_crunches.svg').default,
  '12_pushups': require('../assets/icons/12_pushups.svg').default,
  '13_dumbelllifts': require('../assets/icons/13_dumbelllifts.svg').default,
  '14_leglift': require('../assets/icons/14_leglift.svg').default,
  '15_dumbellpress': require('../assets/icons/15_dumbellpress.svg').default,
  '16_leglifts': require('../assets/icons/16_leglifts.svg').default,
  '17_jumprope': require('../assets/icons/17_jumprope.svg').default,
  '18_treadmil': require('../assets/icons/18_treadmil.svg').default,
  '19_kettlebell': require('../assets/icons/19_kettlebell.svg').default,
  '20_standingtoetouch': require('../assets/icons/20_standingtoetouch.svg').default,
  '21_stationarybike': require('../assets/icons/21_stationarybike.svg').default,
  '22_yogapose': require('../assets/icons/22_yogapose.svg').default,
  '23_skimachine': require('../assets/icons/23_skimachine.svg').default,
  '24_batlleropes': require('../assets/icons/24_batlleropes.svg').default,
  '25_weightedlegdip': require('../assets/icons/25_weightedlegdip.svg').default,
  '26_Menu': require('../assets/icons/26_Menu.svg').default,
};

export default IconMapping;
