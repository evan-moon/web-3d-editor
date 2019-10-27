<template>
<div id="webgl-toolbar">
  <v-row>
    <v-col cols="12">
      <ModelUploadButton @upload="onUploadModel" />
      <LightAddButton />
      <GridHelperSwitch />
    </v-col>
  </v-row>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import { ADD_OBJECT } from '../stores/types';
import ModelUploadButton from './ModelUploadButton.vue';
import LightAddButton from './LightAddButton.vue';
import GridHelperSwitch from './GridHelperSwitch.vue';

export default {
  name: 'Toolbar',
  components: { ModelUploadButton, LightAddButton, GridHelperSwitch },
  methods: {
    onUploadModel (object3d) {
      this.addObject(object3d);
    },
    ...mapMutations({
      addObject: ADD_OBJECT,
    }),
  },
};
</script>

<style lang="scss" scoped>
#webgl-toolbar {
  background-color: #262626;
  height: 100vh;
  padding: 1rem;
}
</style>
