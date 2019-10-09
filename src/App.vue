<template>
<v-app>
  <v-content>
    <v-container :fluid="true">
      <v-row :no-gutters="true">
        <v-col>
          <Viewer />
        </v-col>
        <v-col cols="auto">
          <Toolbar />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import Viewer from './components/Viewer.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Viewer,
    Toolbar,
  },
};
</script>
