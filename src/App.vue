<template>
<v-app>
  <v-content>
    <v-container v-if="!isLoading" :fluid="true">
      <v-row :no-gutters="true">
        <v-col>
          <Viewer />
        </v-col>
        <v-col cols="auto">
          <Toolbar />
        </v-col>
      </v-row>
    </v-container>
    <div v-else>Loading...</div>
  </v-content>
</v-app>
</template>

<script>
import { Scene } from 'three';
import { mapMutations } from 'vuex';
import { SET_SCENE } from './stores/types';
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
    }),
  },
  mounted () {
    const scene = new Scene();
    this.setScene(scene);
    this.isLoading = false;
  },
};
</script>
