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
    return {
      data: {
        success: false,
        message: "Request was made but no response was received",
      },
    };
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
    return catchFunc(error);
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
    return catchFunc(error);
  }
};

export const postLogin = async (userData) => {
  try {
    const data = await axios.post("http://localhost:8000/auth/login", userData);
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const getUsersInfo = async (peopleSearchParams) => {
  try {
    const data = await axios.get(
      "http://localhost:8000/api/search/get-all-users",
      {
        params: peopleSearchParams,
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const getUserInfo = async (profileId) => {
  try {
    const data = await axios.get(
      "http://localhost:8000/api/get-user-profile-info",
      {
        params: {
          profileId: profileId,
        },
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
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
    return catchFunc(error);
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
    return catchFunc(error);
  }
};

export const postAddAsFriend = async (acceptedUserId, sentUserId) => {
  try {
    const data = await axios.post(
      "http://localhost:8000/api/add-as-friend-user",
      {
        acceptedUserId,
        sentUserId,
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postRemoveFriend = async (iniciatorId, userToRemoveId) => {
  try {
    const data = await axios.post(
      "http://localhost:8000/api/remove-friend-user",
      {
        iniciatorId,
        userToRemoveId,
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postChangeUserInfo = async (changedFields, userId) => {
  try {
    const data = await axios.post(
      "http://localhost:8000/api/change-user-info",
      { changedFields, userId }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postUploadImage = async (newAvatar, userId, imageType) => {
  try {
    // Преобразовываем строку base64 обратно в файл
    let blob;
    let file;

    if (imageType !== "msg-image") {
      blob = await fetch(newAvatar).then((res) => res.blob());
      file = new File([blob], `${imageType}.jpg`, { type: "image/jpeg" });
    } else {
      file = newAvatar;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    const url = `http://localhost:8000/api/upload?userId=${userId}&imageType=${imageType}`;
    const data = await axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const getPosts = async (profileId) => {
  const filter = {
    author: profileId,
  };

  try {
    const data = await axios.get("http://localhost:8000/api/posts/get-posts", {
      params: {
        filter,
      },
    });
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postNewPost = async (profileId, location, postData) => {
  try {
    const data = await axios.post("http://localhost:8000/api/posts/new-post", {
      profileId,
      location,
      postData,
    });
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postLike = async (profileId, postId) => {
  try {
    const data = await axios.post("http://localhost:8000/api/posts/post-like", {
      profileId,
      postId,
    });
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};

export const postComment = async (profileId, postId, newComment) => {
  try {
    const data = await axios.post(
      "http://localhost:8000/api/posts/post-comment",
      {
        profileId,
        postId,
        newComment,
      }
    );
    return data;
  } catch (error) {
    return catchFunc(error);
  }
};
