import icqBeep from '../assets/audio/icqBeep';

export {
  messageDateParsers,
  isSameDay,
} from './date';
export {
  isEven,
} from './number';
export {
  getAvatar,
} from './user';

export const icqBeepPlay = () => icqBeep.play();
