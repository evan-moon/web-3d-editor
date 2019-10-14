<template>
  <div>
    <v-btn dark block @click="onClickButton">3D 모델 추가 (*.obj)</v-btn>
    <input v-show="false" type="file" ref="fileInput" accept=".obj" @change="onChangeFile" />
  </div>

</template>

<script>
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';

OBJLoader(THREE);

export default {
  name: 'ModelUploadButton',
  methods: {
    onClickButton () {
      this.$refs.fileInput.click();
    },
    onChangeFile (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const loader = new THREE.OBJLoader();
      reader.readAsBinaryString(file);
      reader.onloadend = () => {
        const model = loader.parse(reader.result);
        this.$emit('upload', model);
      };
    },
  },
};
</script>
