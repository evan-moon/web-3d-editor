<template>
<v-app>
  <v-content>
    <v-container v-if="!isLoading" :fluid="true">
      <v-row :no-gutters="true">
        <v-col cols="9">
          <Viewer />
        </v-col>
        <v-col cols="3">
          <Toolbar />
        </v-col>
      </v-row>
    </v-container>
    <div v-else>Loading...</div>
  </v-content>
</v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import {
  SET_SCENE,
  SET_RENDERER,
  SET_MAIN_CAMERA,
  SET_CONTROLS,
} from './stores/types';
import Viewer from './components/Viewer.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Viewer,
    Toolbar,
  },
  data () {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapMutations({
      setScene: SET_SCENE,
      setRenderer: SET_RENDERER,
      setMainCamera: SET_MAIN_CAMERA,
      setControls: SET_CONTROLS,
    }),
  },
  beforeMount () {
    this.setScene();
    this.setRenderer();
    this.setMainCamera();
    this.setControls();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 0;
  }
</style>
