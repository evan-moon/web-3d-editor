<template>
<div id="webgl-viewer"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  SET_RENDERER_SIZE,
  ADD_OBJECT,
  UPDATE_ASPECT_OF_MAIN_CAMERA,
  REMOVE_ALL_OBJECTS,
} from '../stores/types';

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
    ...mapMutations({
      setRendererSize: SET_RENDERER_SIZE,
      addObject: ADD_OBJECT,
      removeAllObjects: REMOVE_ALL_OBJECTS,
      updateAspectOfMainCamera: UPDATE_ASPECT_OF_MAIN_CAMERA,
    }),
  },
  mounted () {
    this.removeAllObjects();

    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    this.updateAspectOfMainCamera(width / height);
    this.setRendererSize({ width, height });

    this.$el.appendChild(this.renderer.domElement);

    this.animate();
  },
};
</script>

<style lang="scss" scoped>
#webgl-viewer {
  height: 100vh;
}
</style>
