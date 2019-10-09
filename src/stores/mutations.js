import {
  SET_SCENE,
  DESTROY_SCENE,
  SET_MAIN_CAMERA,
  UPDATE_ASPECT_OF_MAIN_CAMERA,
  SET_RENDERER,
  DESTROY_RENDERER,
  SET_RENDERER_SIZE,
  ADD_OBJECT,
  REMOVE_ALL_OBJECTS,
  REMOVE_OBJECT_BY_NAME,
} from './types';

export default {
  [SET_SCENE] (state, scene) {
    state.scene = scene;
  },
  [DESTROY_SCENE] (state) {
    state.scene = null;
  },
  [SET_MAIN_CAMERA] (state, camera) {
    state.mainCamera = camera;
  },
  [UPDATE_ASPECT_OF_MAIN_CAMERA] (state, aspect) {
    if (!state.mainCamera) {
      return;
    }
    state.mainCamera.aspect = aspect;
    state.mainCamera.updateProjectionMatrix();
  },
  [SET_RENDERER] (state, renderer) {
    state.renderer = renderer;
  },
  [DESTROY_RENDERER] (state) {
    state.renderer = null;
  },
  [SET_RENDERER_SIZE] (state, { width, height }) {
    if (!state.renderer) {
      console.error('There is no WebGLRenderer in store');
      return;
    }
    state.renderer.setSize(width, height);
  },
  [ADD_OBJECT] (state, object) {
    if (!state.scene) {
      return;
    }
    state.scene.add(object);
  },
  [REMOVE_ALL_OBJECTS] (state) {
    const { scene } = state;
    if (!scene) {
      return;
    }
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  },
  [REMOVE_OBJECT_BY_NAME] (state, name) {
    if (!state.scene) {
      return;
    }
    const object = state.scene.getObjectByName(name);
    state.scene.remove(object);
  },
};
