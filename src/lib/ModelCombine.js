import * as THREE from 'three';

/* ignore jslint start */
export default {
  combine (model) {
    console.time('Model combine');
    console.log(model);


    const geometry = new THREE.Geometry();
    const materials = [];
    const groupData = [];

    let usedMaterials = [];
    let materialNames = '';

    // SEARCH MODEL DATA
    for (let i = 0; i < model.children.length; i += 1) {
      const eachModel = model.children[i];
      const newGeometry = new THREE.Geometry().fromBufferGeometry(model.children[i].geometry);

      // SET MATERIAL NAME TO GROUP PROPERTY...
      if (eachModel.geometry.groups.length > 0) {
        eachModel.geometry.groups.forEach((geo, index) => {
          const newGeo = geo;
          newGeo.name = eachModel.material.materials[index].name;
          groupData.push(newGeo);
        });
      } else {
        groupData.push({
          count: eachModel.geometry.attributes.position.count,
          name: eachModel.material.name,
        });
      }

      // console.log('group data',groupData);
      // console.log(i,eachModel,eachModel.geometry,eachModel.material);

      if (eachModel.material.type === 'MeshPhongMaterial') {
        usedMaterials.push(eachModel.material);
      } else if (eachModel.material.type === 'MultiMaterial') {
        eachModel.material.materials.forEach(mat => {
          usedMaterials.push(mat);
        });
      }

      // MERGE GEOMETRIES...
      eachModel.updateMatrix();
      geometry.merge(newGeometry, eachModel.matrix);
      // console.log(geometry);
    }

    // SORTING MATERIALS
    usedMaterials = usedMaterials.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    // REMOVE DUPLICATED MATERIALS
    for (let i = 0; i < usedMaterials.length; i += 1) {
      let isExistMaterial = false;

      // CHECK EXISTING...
      for (let j = 0; j < materials.length; j += 1) {
        if (materials[j].name === usedMaterials[i].name) {
          isExistMaterial = true;
          break;
        } else {
          isExistMaterial = false;
        }
      }

      if (!isExistMaterial) {
        usedMaterials[i].side = THREE.DoubleSide;
        usedMaterials[i].transparent = true;
        usedMaterials[i].needsUpdate = true;
        usedMaterials[i].index = materials.length;
        materials.push(usedMaterials[i]);
      }
    }
    materialNames = materials.map(v => {
      return v.name;
    });
    // console.log(materials,materialNames);

    // BIND MATERIAL
    let faceIndex = 0;
    let groupCount = 0;
    let groupVertexCount = groupData[groupCount].count;
    // console.log(groupData);
    for (let i = 0; i < geometry.vertices.length; i++) {
      let face = geometry.faces[faceIndex];

      if ((i + 1) % 3 === 0) {
        face.materialIndex = materialNames.indexOf(groupData[groupCount].name) !== -1 ?
          materialNames.indexOf(groupData[groupCount].name) : 0;
        faceIndex += 1;
      }
      // console.log('current face',faceIndex,face,'current material',materials[face.materialIndex],'\n','current group',groupData[groupCount]);
      if (i >= groupVertexCount) {
        groupCount += 1;
        groupVertexCount += groupData[groupCount].count;
      }
    }
    // console.log(geometry.faces);

    // COMPUTE GEOMETRY
    geometry.center();
    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();
    // geometry.computeBoundingBox();
    geometry.normalize();

    // REDEFINE MODEL
    model.children = [];
    model.add(new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)));
    // console.log(model);

    console.timeEnd('Model combine');

    return model.children[0];
  },
};
/* ignore jslint end */
