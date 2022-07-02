<template>
  <div class="landing_page">
    <div class="heading_wrapper">
      <h1 class="primary_heading">Surveys List</h1>
      <h4>{{ message }}</h4>
    </div>
    <v-row class="list_table">
      <div class="list_table_header">
        <v-col cols="9" sm="2">
          <h4>Title</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Description</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Status</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>View</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="surveys.length > 0">
        <SurveysListItem v-for="survey in surveys" :key="survey.id" :survey="survey"
          @deleteSurvey="gotToDeleteSurvey(survey)" @viewSurvey="goToViewSurvey(survey)" />
      </div>
      <h3 class="list_table_body no_results" v-else="surveys.length < 0">
        SORRY NO SURVEYS TO DISPLAY
      </h3>
    </v-row>
  </div>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveysListItem from "@/components/SurveysListItem.vue";

export default {
  name: "surveys-list",
  data() {
    return {
      surveys: [
        {
          title: "Understanding of astronomy",
          description: "astronomy",
          isPublished: true,
        },
        {
          title: "Understanding Space",
          description: "space",
          isPublished: false,
        },
      ],
      message: "Manage Surveys",
    };
  },
  components: {
    SurveysListItem,
  },
  methods: {
    goToViewSurvey(survey) {
      this.$router.push({ name: "view", params: { id: survey.id } });
    },
    gotToDeleteSurvey(survey) {
      SurveyDataService.delete(survey.id)
        .then(() => {
          this.retrieveSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then((response) => {
          this.surveys = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurveys();
  },
};
</script>
<style>
</style>