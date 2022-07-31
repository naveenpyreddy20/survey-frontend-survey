<template>
  <div class="container">
    <div v-show="showDisclaimer">
      <h1 class="disclaimer__text">{{ disclaimerMessage }}</h1>
    </div>
    <v-form
      @submit="handleSubmitSurvey"
      ref="form"
      lazy-validation
      v-show="!showDisclaimer"
    >
      <div class="header__card">
        <h1>{{ survey.title }}</h1>
        <div class="header__card--align">
          <v-text-field
            v-model="survey.email"
            label="Enter Your Email Id"
            :rules="[rules.required, rules.email]"
          >
          </v-text-field>
          <v-text-field
            v-model="survey.name"
            label="Enter Your User Name"
            :rules="[rules.required]"
          ></v-text-field>
        </div>
      </div>
      <div class="survey__questions--wrapper">
        <div class="survey__question--wrapper">
          <div
            class="survey__question"
            v-for="(question, index) in survey.questions"
            :key="index"
          >
            <div class="survey__question--heading">
              <h4>Q : {{ question.questionTitle.toUpperCase() }} ?</h4>
            </div>
            <v-text-field
              v-if="question.questionType === 'text-box'"
              v-model="question.response"
              :label="question.required ? 'Your Answer *' : 'Your Answer'"
              :rules="[question.required && rules.required]"
              clearable
              clear-icon="mdi-close-circle"
            ></v-text-field>
            <v-radio-group
              v-model="question.response"
              :rules="[question.required && rules.required]"
              v-if="question.questionType === 'multiple-choice-question'"
            >
              <v-radio
                v-for="(item, index) in question.option"
                :key="index"
                :label="item.option"
                :value="item.option"
                color="indigo darken-3"
              ></v-radio>
            </v-radio-group>

            <v-slider
              v-if="question.questionType === 'rating-question'"
              v-model="question.response"
              :rules="[
                question.required && ((v) => !!v || 'Rating Response Required'),
              ]"
              label="Rate Your Question"
              max="5"
              step="1"
              thumb-label="always"
              class="slider"
              color="indigo darken-3"
            >
            </v-slider>
          </div>
        </div>
      </div>
      <button class="login_button width-100">SUBMIT SURVEY</button>
    </v-form>
  </div>
</template>
<script>
import SurveyService from "../services/SurveyService";
export default {
  props: ["surveyId"],
  data() {
    return {
      survey: {
        id: this.surveyId,
        name: "",
        email: "",
        title: "",
        questions: [],
      },
      showDisclaimer: false,
      disclaimerMessage: "",
      rules: {
        required: (value) => !!value || `Field Required !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    retreiveSurvey() {
      SurveyDataService.getSurvey(this.surveyId)
        .then((response) => {
          const apiResponse = response.data;
          this.survey.title = apiResponse.surveyTitle;
          const formQuestions = apiResponse.question.map((question) => ({
            ...question,
            response: null,
          }));
          this.survey.questions = formQuestions;
        })
        .catch((e) => {
          if (`${e.response.status}`.startsWith("4")) {
            this.showDisclaimer = true;
            this.disclaimerMessage =
              "Your are not authorized to access the survey !";
          }
          this.message = e.response.data.message;
        });
    },
    async handleSubmitSurvey(e) {
      e.preventDefault();
      const formRes = await this.$refs.form.validate();
      if (formRes.valid) {
        let surveyResponses = [];
        surveyResponses = this.survey.questions.map((question) => ({
          id: question.id,
          response: question.response,
        }));
        const formApiData = {
          email: this.survey.email,
          name: this.survey.name,
          surveyId: this.surveyId,
          responses: surveyResponses,
        };
        SurveyService.submitSurveyResponse(formApiData)
          .then((response) => {
            if (response.status === 200) {
              this.showDisclaimer = true;
              this.disclaimerMessage =
                "THANK YOU! Your response has been recorded.";
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
  mounted() {
    this.retreiveSurvey();
  },
};
</script>
<style>
.container {
  padding: 20px;
}

.header__card {
  padding: 5px 0;
  border: 1px solid var(--secondaryColor);
  border-top: 10px solid var(--secondaryColor);
  border-radius: 10px;
  text-align: center;
  margin: 15px 0;
  box-shadow: 0px 15px 30px #3d3c3c2d;
}

.header__card h1 {
  font-size: 35px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
}

.header__card--align {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 40px 0 40px;
  gap: 40px;
}

.slider {
  margin-top: 20px;
}

.survey__questions--wrapper {
  padding: 10px 0;
  margin: 10px 0;
  border-top: 2px solid #bac3ba85;
}

.survey__question--wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.survey__question {
  display: flex;
  flex-direction: column;
  border: var(--fadedGreyBorder);
  margin: 10px 0;
  padding: 15px 10px 0 10px;
  box-shadow: 0px 20px 30px #33323241;
  border-radius: 5px;
}

.survey__question--heading {
  background: #e9e6e6;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
}
.login_button {
  border: 1px solid var(--violetColor);
  padding: 10px 20px;
  outline: 0;
  border-radius: 5px;
  margin: 10px auto;
  color: var(--violetColor);
  transition: all 0.3s ease-in-out;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.login_button:hover {
  background: var(--secondaryColor);
  color: var(--whiteColor);
  border: 1px solid transparent;
}

.logout_button {
  margin-left: 20px;
}

.width-100 {
  width: 100%;
}

.disclaimer__text {
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  color: orangered;
}

@media screen and (max-width: 900px) {
  .survey__question--wrapper {
    grid-template-columns: 1fr;
  }

  .header__card--align {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 10px;
  }

  .black-button {
    width: 100%;
  }
}
</style>