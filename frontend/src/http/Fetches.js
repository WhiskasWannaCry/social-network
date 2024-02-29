import axios from "axios";

const catchFunc = (error) => {
  if (error.response) {
    // Сервер вернул статус код, который не в диапазоне 2xx
    console.log("Server responded with status code", error.response.status);
    console.log("Response data:", error.response.data);
    return { data: error.response.data };
  } else if (error.request) {
    // Запрос был сделан, но ответ не был получен
    console.log("Request was made but no response was received");
    console.log("Request:", error.request);
    return { data: error.request };
  } else {
    // Произошла ошибка при настройке запроса
    console.log("Error setting up the request:", error.message);
  }
  console.log("Error config:", error.config);
};

// Нужно написать гет и пост функции запросов таким образом, чтобы они работали для всех запросов
// Например в гет проверять передаются ли params, передавать метод запроса, урл

export const getIsValidToken = async (token) => {
  try {
    const data = await axios.get("http://localhost:8000/api/validation-token", {
      params: token,
    });
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const postSignUp = async (name, surname, email, password) => {
  let userData = { name, surname, email, password, role: "user" };
  try {
    const data = await axios.post(
      "http://localhost:8000/auth/registration",
      userData
    );
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const postLogin = async (userData) => {
  try {
    const data = await axios.post("http://localhost:8000/auth/login", userData);
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const getUsersInfo = async () => {
  try {
    const data = await axios.get(
      "http://localhost:8000/api/search/get-all-users"
    );
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const getUserInfo = async (profileId) => {
  try {
    const data = await axios.get(
      "http://localhost:8000/api/search/get-user-info",
      {
        params: {
          profileId: profileId,
        },
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const postFollow = async (userFollowerId, userFollowedId) => {
  try {
    const data = await axios.post("http://localhost:8000/api/follow-user", {
      userFollowerId,
      userFollowedId,
    });
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const postUnfollow = async (userFollowerId, userFollowedId) => {
  try {
    const data = await axios.post("http://localhost:8000/api/unfollow-user", {
      userFollowerId,
      userFollowedId,
    });
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};

export const postAddAsFriend = async (userFollowerId, userFollowedId) => {
  try {
    const data = await axios.post("http://localhost:8000/api/add-as-friend-user", {
      userFollowerId,
      userFollowedId,
    });
    return data;
  } catch (error) {
    return catchFunc(error)
  }
};
