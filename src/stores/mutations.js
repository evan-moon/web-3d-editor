import * as THREE from 'three';
import OrbitControlsFactory from 'three-orbit-controls';
import TransformControlsFactory from 'three-transform-controls';
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
  SET_CONTROLS,
  ADD_AMBIENT_LIGHT,
  ADD_DIRECTIONAL_LIGHT,
  SET_SHOW_GRID_HELPER,
  SET_SELECTED_OBJECT,
} from './types';

const TransformControls = TransformControlsFactory(THREE);

export default {
  [SET_SCENE] (state) {
    state.scene = new THREE.Scene();
  },
  [DESTROY_SCENE] (state) {
    state.scene = null;
  },
  [SET_MAIN_CAMERA] (state) {
    state.mainCamera = null;
    const oldCamera = state.scene.getObjectByName('mainCamera');
    if (oldCamera) {
      state.scene.remove(oldCamera);
    }

    const newCamera = new THREE.PerspectiveCamera(70, 1, 0.01, 1000);
    newCamera.position.x = 1;
    newCamera.position.y = 1;
    newCamera.position.z = 1;
    state.mainCamera = newCamera;
  },
  [UPDATE_ASPECT_OF_MAIN_CAMERA] (state, aspect) {
    if (!state.mainCamera) {
      return;
    }
    state.mainCamera.aspect = aspect;
    state.mainCamera.updateProjectionMatrix();
  },
  [SET_RENDERER] (state) {
    state.renderer = new THREE.WebGLRenderer({ antialias: true });
    state.renderer.setPixelRatio(window.devicePixelRatio);
    state.renderer.setClearColor(new THREE.Color(0x222222), 1);
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
  [SET_CONTROLS] (state) {
    if (!state.renderer || !state.mainCamera) {
      return;
    }
    const OrbitControls = OrbitControlsFactory(THREE);
    const controls = new OrbitControls(state.mainCamera, state.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 100;
    state.controls = controls;
  },
  [ADD_OBJECT] (state, object) {
    if (!state.scene) {
      return;
    }
    state.scene.add(object);
  },
  [ADD_AMBIENT_LIGHT] (state) {
    const light = new THREE.AmbientLight(0x333333);
    state.scene.add(light);
  },
  [ADD_DIRECTIONAL_LIGHT] (state) {
    const light = new THREE.DirectionalLight(0xffffff);
    state.scene.add(light);
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
  [SET_SHOW_GRID_HELPER] (state, isShowGridHelper) {
    state.scene.isShowGridHelper = isShowGridHelper;
    if (isShowGridHelper) {
      const gridHelper = new THREE.GridHelper(20, 100);
      gridHelper.name = 'gridHelper';
      state.scene.add(gridHelper);
    } else {
      const gridHelper = state.scene.getObjectByName('gridHelper');
      state.scene.remove(gridHelper);
    }
  },
  [SET_SELECTED_OBJECT] (state, object) {
    /**
     * @TODO 너무 함수 내에 책임이 많음. 추상화 후 책임을 분리해야한다.
     * TransformControls와 BoxHelper를 뜯어내는 것이 좋을 듯. 이 친구들 초기화하는 것도 여기저기서 하는게 아니라 한 곳에서 해서 export 하도록 변경
     */
    if (!object || !object.userData.selectable) {
      return;
    }

    const boxHelperName = 'boxHelper';
    const transformControlsName = 'transformControls';
    state.scene.children = state.scene.children.filter((child) => {
      const arr = [boxHelperName, transformControlsName];
      return !arr.includes(child.name);
    });

    const boxHelper = new THREE.BoxHelper(object, 0xffff00);
    const tranformControls = new TransformControls(
      this.state.mainCamera, this.state.renderer.domElement,
    );
    tranformControls.name = transformControlsName;
    tranformControls.attach(object);

    boxHelper.name = boxHelperName;
    state.scene.add(boxHelper);
    state.scene.add(tranformControls);
    state.selectedObject = object;
  },
};
