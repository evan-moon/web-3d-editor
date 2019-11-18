<template>
  <v-switch
    label="grid"
    :dark="true"
    :value="isShowGridHelper"
    @change="onChange">
  </v-switch>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_SHOW_GRID_HELPER } from '../stores/types';

export default {
  name: 'GridHelperSwitch',
  computed: {
    ...mapState({
      isShowGridHelper: state => state.isShowGridHelper,
    }),
  },
  methods: {
    onChange (value) {
      this.setShowGridHelper(value);
    },
    ...mapMutations({
      setShowGridHelper: SET_SHOW_GRID_HELPER,
    }),
  },
};
</script>
