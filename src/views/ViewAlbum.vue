<template>
  <div class="landing_page">
    <h2>View Album</h2>
    <h4>{{ message }}</h4>
    <div class="album_details">
      <h3>Album Title : {{ album.title }}</h3>
      <v-btn color="success" @click="goToAddSong()">Add Song</v-btn>
    </div>
    <v-row class="search_input">
      <v-col col="12" sm="10">
        <v-text-field
          density="compact"
          label="Enter Song Title"
          clearable
          v-model="songName"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="success" @click="searchSongsBySongName"
          >Search Songs</v-btn
        >
      </v-col>
    </v-row>
    <button
      @click="showPublishedSongs"
      v-if="songs.length > 0"
      class="login_button align_button_end"
    >
      Show Published Songs
    </button>
    <v-row class="list_table">
      <div class="list_table_header">
        <v-col cols="8" sm="2">
          <h4>Title</h4>
        </v-col>
        <v-col cols="8" sm="4">
          <h4>Description</h4>
        </v-col>
        <v-col cols="8" sm="2">
          <h4>Song Status</h4>
        </v-col>
        <v-col cols="8" sm="1">
          <h4>Edit</h4>
        </v-col>
        <v-col cols="8" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="songs.length > 0">
        <DisplaySong
          v-for="song in songs"
          :key="song.id"
          :song="song"
          @deleteSong="deleteSong(song)"
          @updateSong="goToEditSong(song)"
        />
      </div>
      <h3 class="list_table_body no_results" v-else="songs.length < 0">
        SORRY NO SONGS TO DISPLAY
      </h3>
    </v-row>
    <v-btn color="error" @click="removeAllSongs">
      Remove All Songs
      <v-icon right dark> mdi-delete </v-icon>
    </v-btn>
  </div>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";

export default {
  name: "view-album",
  props: ["id"],
  components: {
    DisplaySong,
  },
  data() {
    return {
      album: {},
      songs: [],
      message: "",
      songName: "",
    };
  },
  methods: {
    retrieveSongs() {
      SurveyDataService.get(this.id)
        .then((response) => {
          this.album = response.data;
          SongDataService.getAllsongs(this.id)
            .then((response) => {
              this.songs = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goToAddSong() {
      this.$router.push({ name: "addSong", params: { albumId: this.id } });
    },
    goToEditSong(song) {
      this.$router.push({
        name: "editSong",
        params: {
          albumId: this.id,
          songId: song.id,
          albumTitle: this.album.title,
        },
      });
    },
    deleteSong(album) {
      SongDataService.deleteSong(album.albumId, album.id)
        .then(() => {
          this.retrieveSongs();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    removeAllSongs() {
      SongDataService.deleteAllSongs(this.id)
        .then(() => {
          this.retrieveSongs();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    showPublishedSongs() {
      SongDataService.getAllPublishedSongs(this.id)
        .then((response) => {
          console.log("response??", response);
          this.songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "albums" });
    },
    searchSongsBySongName() {
      SongDataService.searchBySongName(this.id, this.songName)
        .then((response) => {
          this.songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSongs();
  },
};
</script>
<style>
.landing_page {
  background: #f5f5f5;
  padding: 10px 40px 30px 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}

.search_input {
  /*top-bottom  left-right*/
  margin: 10px 0;
  width: 100%;
}

.list_table {
  border: var(--fadedGreyBorder);
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}

.list_table_header {
  background: var(--secondaryColor);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60px;
}

.list_table_header > div > h4 {
  color: var(--whiteColor);
  font-weight: 500;
}

.list_table_body {
  margin-top: 12px;
}

.no_results {
  text-align: center;
  color: orangered;
  margin: 10px 0;
}

.album_details {
  margin: 10px 0 35px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border: var(--fadedGreyBorder);
  gap: 10px;
  padding: 10px 10px;
  border-radius: 10px;
}

.album_details h3 {
  border-right: var(--fadedGreyBorder);
  padding-right: 10px;
}
</style>