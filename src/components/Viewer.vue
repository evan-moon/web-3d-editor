<template>
<div id="webgl-viewer"></div>
</template>

<script>
import {
  BoxGeometry, MeshNormalMaterial, Mesh,
} from 'three';
import { mapState, mapMutations } from 'vuex';
import {
  SET_RENDERER_SIZE, ADD_OBJECT, UPDATE_ASPECT_OF_MAIN_CAMERA, REMOVE_ALL_OBJECTS,
} from '../stores/types';

export default {
  name: 'Viewer',
  computed: {
    ...mapState({
      scene: state => state.scene,
      renderer: state => state.renderer,
      mainCamera: state => state.mainCamera,
    }),
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate);
      const mesh = this.scene.getObjectByName('tester');
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

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

    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);
    mesh.name = 'tester';
    this.addObject(mesh);

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
