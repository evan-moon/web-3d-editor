<template>
<div id="webgl-viewer"></div>
</template>

<script>
import * as THREE from 'three';
import { mapState, mapMutations } from 'vuex';
import {
  SET_RENDERER_SIZE,
  ADD_OBJECT,
  UPDATE_ASPECT_OF_MAIN_CAMERA,
  REMOVE_ALL_OBJECTS,
  SET_SELECTED_OBJECT,
} from '../stores/types';

const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

export default {
  name: 'Viewer',
  computed: {
    ...mapState({
      scene: state => state.scene,
      renderer: state => state.renderer,
      mainCamera: state => state.mainCamera,
      controls: state => state.controls,
    }),
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.mainCamera);
    },
    onClickObject (event) {
      event.preventDefault();

      const width = this.$el.clientWidth;
      const height = this.$el.clientHeight;
      mousePosition.x = (event.offsetX / width) * 2 - 1;
      mousePosition.y = -(event.offsetY / height) * 2 + 1;
      raycaster.setFromCamera(mousePosition, this.mainCamera);
      const intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length) {
        this.setSelectedObject(intersects[0].object);
      }
    },
    ...mapMutations({
      setRendererSize: SET_RENDERER_SIZE,
      addObject: ADD_OBJECT,
      removeAllObjects: REMOVE_ALL_OBJECTS,
      updateAspectOfMainCamera: UPDATE_ASPECT_OF_MAIN_CAMERA,
      setSelectedObject: SET_SELECTED_OBJECT,
    }),
  },
  mounted () {
    this.removeAllObjects();

    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    this.updateAspectOfMainCamera(width / height);
    this.setRendererSize({ width, height });
    this.$el.appendChild(this.renderer.domElement);

    this.renderer.domElement.addEventListener('mousedown', this.onClickObject, false);
    this.animate();
  },
  beforeMount () {
    this.renderer.domElement.removeEventListener('mousedown', this.onClickObject);
  },
};
</script>

<style lang="scss" scoped>
#webgl-viewer {
  height: 100vh;
}
</style>
