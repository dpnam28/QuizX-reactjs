import axios from "../utils/axiosCustomize";
export const createNewParticipant = (
  email,
  password,
  username,
  role,
  image
) => {
  let data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
export const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
export const putUpdateUser = (id, username, role, image) => {
  let data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
export const deleteUserById = (id) => {
  return axios.delete("api/v1/participant", { data: { id } });
};
export const getListUserWithPagination = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
export const postLogIn = (email, password) => {
  return axios.post(`api/v1/login`, { email, password });
};
export const postSignUp = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};
export const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
export const getQuestionsByQuizId = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
export const postSubmitAnswer = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};
export const postCreateQuiz = (description, name, difficulty, quizImage) => {
  let data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", data);
};
export const getAllQuizForAdmin = () => {
  return axios.get("api/v1/quiz/all");
};

export const deleteQuizById = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

export const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  let data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("name", name);
  data.append("quizImage", quizImage);
  return axios.put(`api/v1/quiz`, data);
};
export const postCreateQuestionForQuiz = (id, description, questionImage) => {
  let data = new FormData();
  data.append("quiz_id", id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post(`api/v1/question`, data);
};

export const postAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

export const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};
