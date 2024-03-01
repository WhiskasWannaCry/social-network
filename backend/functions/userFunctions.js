const { User } = require("../models");
const { defaultResponse } = require("./responseFunctions");

const removeFollowFromLists = async (res, userFollowerId, userFollowedId) => {
  if (!userFollowerId || !userFollowedId) {
    defaultResponse({ res, success: false, message: "Ids are undefined" });
  }

  // нахожу юзеров
  const userFollower = await User.findOne({ _id: userFollowerId });
  const userFollowed = await User.findOne({ _id: userFollowedId });

  if (!userFollower || !userFollowed) {
    return defaultResponse({
      res,
      success: false,
      message: "User(s) was(were) not found",
    });
  }
  // нахожу индекс того КТО подписан
  const userFollowerIdx = userFollowed.socialContacts.followers.findIndex(
    (followerId) => followerId.toString() === userFollowerId
  );

  // нахожу индекс того НА КОГО подписан
  const userFollowedIdx = userFollower.socialContacts.following.findIndex(
    (followerId) => followerId.toString() === userFollowedId
  );

  // если тот КТО подписан есть в массиве у того НА КОГО подписан - удалить
  if (userFollowerIdx !== -1) {
    userFollowed.socialContacts.followers.splice(userFollowerIdx, 1);
  }
  await userFollowed.save();
  // если тот НА КОГО подписан есть в массиве у того КТО подписан - удалить
  if (userFollowedIdx !== -1) {
    userFollower.socialContacts.following.splice(userFollowedIdx, 1);
  }
  await userFollower.save();
};

const addFollowToLists = async (res, userFollowerId, userFollowedId) => {
  if (!userFollowerId || !userFollowedId) {
    return res.json({ success: false, message: "Ids are undefined" });
  }

  const userFollower = await User.findOne({ _id: userFollowerId });
  const userFollowed = await User.findOne({ _id: userFollowedId });

  if (!userFollower || !userFollowed) {
    return res.json({ success: false, message: "User(s) was(were) not found" });
  }

  userFollower.socialContacts.following.push(userFollowedId);
  await userFollower.save();

  userFollowed.socialContacts.followers.push(userFollowerId);
  await userFollowed.save();
};

const addAsFriendsUsers = async (res, acceptedUserId, sentUserId) => {
  if (!acceptedUserId || !sentUserId) {
    defaultResponse({ res, success: false, message: "Ids are undefined" });
  }

  // нахожу юзеров
  const acceptedUser = await User.findOne({ _id: acceptedUserId });
  const sentUser = await User.findOne({ _id: sentUserId });

  if (!acceptedUser || !sentUser) {
    return defaultResponse({
      res,
      success: false,
      message: "User(s) was(were) not found",
    });
  }
  // нахожу индекс того КТО подписан
  const sentUserIdx = acceptedUser.socialContacts.followers.findIndex(
    (followerId) => followerId.toString() === sentUserId
  );

  // нахожу индекс того НА КОГО подписан
  const acceptedUserIdx = sentUser.socialContacts.following.findIndex(
    (followerId) => followerId.toString() === acceptedUserId
  );

  // если тот КТО подписан есть в массиве у того НА КОГО подписан - удалить
  if (sentUserIdx !== -1) {
    acceptedUser.socialContacts.followers.splice(sentUserIdx, 1);
  }
  // если тот НА КОГО подписан есть в массиве у того КТО подписан - удалить
  if (acceptedUserIdx !== -1) {
    sentUser.socialContacts.following.splice(acceptedUserIdx, 1);
  }

  // пушу юзеров друг другу в поле friends
  acceptedUser.socialContacts.friends.push(sentUser);
  sentUser.socialContacts.friends.push(acceptedUser);

  await acceptedUser.save();
  await sentUser.save();

  return res.json({
    success: true,
    message: "Successful removed follower and following and added to friends",
  });
};

const removeFriend = async (res, iniciatorId, userToRemoveId) => {
  if (!iniciatorId || !userToRemoveId) {
    defaultResponse({ res, success: false, message: "Ids are undefined" });
  }

  // нахожу юзеров
  const iniciator = await User.findOne({ _id: iniciatorId });
  const userToRemove = await User.findOne({ _id: userToRemoveId });

  if (!iniciator || !userToRemove) {
    return defaultResponse({
      res,
      success: false,
      message: "User(s) was(were) not found",
    });
  }
  // нахожу индекс того КТО удаляет друга
  const iniciatorIdx = userToRemove.socialContacts.friends.findIndex(
    (friendId) => friendId.toString() === iniciatorId
  );

  // нахожу индекс того КОГО убирают из друзей
  const userToRemoveIdx = iniciator.socialContacts.friends.findIndex(
    (friendId) => friendId.toString() === userToRemoveId
  );

  // если тот КТО удаляет друга есть в массиве у того КОГО он удаляет - удалить
  if (iniciatorIdx !== -1) {
    userToRemove.socialContacts.friends.splice(iniciatorIdx, 1);
  }
  // если тот КОГО удаляют из друзей есть в массиве у того КТО удаляет - удалить
  if (userToRemoveIdx !== -1) {
    iniciator.socialContacts.friends.splice(userToRemoveIdx, 1);
  }

  // пушу юзеров друг другу в нужные поля
  // Инициатору в поле followers, то есть подписки
  iniciator.socialContacts.followers.push(userToRemove);

  // А тому кого удалили в following, то есть что он подписан
  userToRemove.socialContacts.following.push(iniciator);

  await iniciator.save();
  await userToRemove.save();
};

module.exports = {
  removeFollowFromLists,
  addFollowToLists,
  addAsFriendsUsers,
  removeFriend,
};
