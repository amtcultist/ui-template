import { asyncRoutes, constantRoutes } from '@/router';
import { findById as findRoleById } from '@/api/role';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

const fn = function (role) {
  return new Promise((resolve, reject) => {
    findRoleById(role._id)
      .then((response) => {
        role.routes = response.data.routes;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function filterRouteNames(routes) {
  let routeNames = [];

  routes.forEach((route) => {
    if (route.name !== undefined) {
      routeNames.push(route.name);
    }
    if (route.children) {
      routeNames = routeNames.concat(filterRouteNames(route.children));
    }
  });
  return routeNames;
}

// function hasPermission(child, roles, parent) {
//   let arr = parent.split('/');
//   console.log(arr);
//   return true;
// }
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, array) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.path === '*') {
      res.push(tmp);
    } else if (tmp.name && array.includes(tmp.name)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, array);
      }
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
    state.routeNames = filterRouteNames(routes);
  },
};
function getRolesNames(route, array) {
  if (route.name) {
    array.push(route.name);
  }
  if (route.children) {
    route.children.forEach((children, i) => {
      getRolesNames(children, array);
    });
  }
  return array;
}
const actions = {
  async generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      const roleNames = roles.map((value) => value.name);
      if (roleNames.includes('ROLE_ADMIN')) {
        accessedRoutes = asyncRoutes || [];
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes);
      } else {
        Promise.all(roles.map(fn)).then(() => {
          let array = [];
          roles.forEach((role, i) => {
            role.routes.forEach((route, index) => {
              array = getRolesNames(route, array);
            });
          });
          accessedRoutes = filterAsyncRoutes(asyncRoutes, array);
          commit('SET_ROUTES', accessedRoutes);
          resolve(accessedRoutes);
        });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
