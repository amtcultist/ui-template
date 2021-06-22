const getters = {
  /*  App getters */
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,

  /*  TagsView getters  */
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  /*  User getters  */
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  gender: state => state.user.gender,
  email: state => state.user.email,
  _id: state => state.user._id,
  /*  Other getters */
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
