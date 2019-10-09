import { SET_SCENE, DESTROY_SCENE } from './types';

export default {
  [SET_SCENE] (state, scene) {
    state.scene = scene;
  },
  [DESTROY_SCENE] (state) {
    state.scene = null;
  },
};
