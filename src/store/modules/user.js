import { login, logout, getInfo, modifyAvatar } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import MaleAvatar from '@/assets/img/avatar/male.jpg';
import FemaleAvatar from '@/assets/img/avatar/female.jpg';
import QuestionAvatar from '@/assets/img/avatar/question.jpg';
import { uploadFile } from '@/utils/awss3';
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  _id: '',
  gender: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_ID: (state, _id) => {
    state._id = _id;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password })
        .then(response => {
          commit('SET_TOKEN', response.token);
          setToken(response.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token })
        .then(response => {
          const { data } = response;

          if (!data) {
            reject('Verification failed, please Login again.');
          }
          const {
            roles,
            name,
            avatar,
            introduction,
            gender_id,
            email,
            _id
          } = data;
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!');
          }
          const defaultAvatar = gender => {
            if (gender === 0) {
              return MaleAvatar;
            } else if (gender === 1) {
              return FemaleAvatar;
            } else return QuestionAvatar;
          };
          commit('SET_ID', _id);
          commit('SET_EMAIL', email);
          commit(
            'SET_ROLES',
            roles.map(value => value.name)
          );
          commit('SET_NAME', name);
          commit(
            'SET_AVATAR',
            avatar || avatar == null ? avatar : defaultAvatar(gender_id)
          );
          commit('SET_INTRODUCTION', introduction);
          commit('SET_GENDER', gender_id);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // modify avatar
  modifyAvatar({ commit, state }, fileData) {
    const { file, id } = fileData;
    return new Promise((resolve, reject) => {
      uploadFile(file, 'avatar')
        .then(data => {
          // console.log(data.Location)
          const postData = {
            avatar: data.Location
          };
          modifyAvatar(id, postData)
            .then(response => {
              commit('SET_AVATAR', response.data.avatar);
              resolve(response.data.avatar);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true });

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token';

    commit('SET_TOKEN', token);
    setToken(token);

    const { roles } = await dispatch('getInfo');

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
