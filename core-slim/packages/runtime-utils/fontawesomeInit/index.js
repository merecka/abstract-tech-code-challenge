
/* fontawesome library (see https://github.com/FortAwesome/react-fontawesome) */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import abstract from './abstractLogoIcon';
import hub from './hubLogoIcon';
import sollensys from './sollensysLogoIcon';

library.add(fal, far, fas, fab, fad, abstract, hub, sollensys);
