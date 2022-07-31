import http from "../http-common";
class SurveyService {
  getSurvey(id) {
    return http.get(`/surveyquestions?surveyId=${id}`);
  }
  submitSurveyResponse(surveyData) {
    return http.post(`/submit/survey?surveyId=${surveyData.surveyId}`, surveyData);
  }
}
export default new SurveyService();