import store from '@/store';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles;
    const permissionRoles = value;

    const hasPermission = roles.some((role) => {
      return permissionRoles.includes(role);
    });
    return hasPermission;
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}

/**
 * @param {String} routerName
 * @returns {Boolean}
 */
export function checkPermissionByRouterName(routerName) {
  if (routerName) {
    const routeNames = store.getters && store.getters.routeNames;
    if (routeNames !== undefined) {
      return routeNames.includes(routerName);
    }
    return false;
  } else {
    return false;
  }
}

/**
 * @returns {Boolean}
 */
export function getRoutes() {
  const routeNames = store.getters && store.getters.addRoutes;
  return routeNames;
}

/**
 * @param {String} path
 * @returns {Object}
 */
export function getChildrenByPath(path) {
  let children = store.state.permission.routes;
  if (path) {
    // clean up empty elements
    let chunks = path.split('/');
    chunks = chunks.filter((chunk) => chunk !== '');
    if (chunks.length) {
      chunks.forEach((chunk, index) => {
        let path = chunk;
        if (index === 0) path = `/${path}`;

        if (children) {
          const found = children.find((child) => child.path === path);
          if (found) {
            children = found.children;
          }
        }
      });
    }
  }
  return children;
}

export function getChildrenNames(routes) {
  let routeNames = [];

  routes.forEach((route) => {
    if (route.name && !route.children) {
      routeNames.push(route.name);
    }
    if (route.children) {
      routeNames = routeNames.concat(getChildrenNames(route.children));
    }
  });
  return routeNames;
}
