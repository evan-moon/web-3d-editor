<template>
  <div>
    <v-btn @click="addAmbientLight">Ambient Light 추가</v-btn>
    <v-btn @click="addDirectionalLight">Directional Light 추가</v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { ADD_AMBIENT_LIGHT, ADD_DIRECTIONAL_LIGHT } from '../stores/types';

export default {
  name: 'LightAddButton',
  methods: {
    ...mapMutations({
      addAmbientLight: ADD_AMBIENT_LIGHT,
      addDirectionalLight: ADD_DIRECTIONAL_LIGHT,
    }),
  },
};
</script>
