import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as freeSolidSvgIcons from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
library.add(freeSolidSvgIcons.faHeart, farHeart, faHatWizard);

Vue.component('font-awesome-icon', FontAwesomeIcon);
