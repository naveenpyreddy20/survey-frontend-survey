<template>
  <div class="landing_page">
    <h1>Add Album</h1>
    <h4>{{ message }}</h4>
    <v-form class="form">
      <v-text-field label="Title" v-model="album.title" />
      <v-text-field label="Description" v-model="album.description" />
      <v-text-field label="Artist Name" v-model="album.artist" />
      <v-checkbox
        v-model="album.published"
        label="Published"
        color="primary"
      ></v-checkbox>
      <v-row class="form_buttons_wrapper">
          <v-btn color="success" @click="saveAlbum()">Save Album</v-btn>
          <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        description: "",
        artist: "",
        published: false,
      },
      message: "",
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        title: this.album.title,
        description: this.album.description,
        artist: this.album.artist,
        published: this.album.published,
      };
      // console.log("published??",this.album);
      SurveyDataService.create(data)
        .then((response) => {
          this.album.id = response.data.id;
          console.log("add response from api >", response.data);
          this.$router.push({ name: "albums" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "albums" });
    },
  },
};
</script>
<style>
.form {
  width: 100%;
  margin-top: 20px;
}
.form_buttons_wrapper{
 display: flex;
 justify-content: center;
 margin-top: -50px;
}
.form_buttons_wrapper button{
 margin: 0px 10px;
}
</style>