import AppMain from '@/layout/components/AppMain.vue';

const roleRoutes = {
  path: '/role',
  name: 'RoleManagement',
  component: AppMain,
  redirect: '/role/list',
  meta: {
    title: 'Role Management',
    icon: 'lock',
    activeMenu: '/general/role',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage/role/list'),
      meta: {
        title: 'Role Management List',
        activeMenu: '/general/role/list',
      },
      name: 'RoleManagementList',
      hidden: true,
    },
    {
      path: 'create',
      component: () => import('@/views/manage/role/create'),
      name: 'RoleManagementCreate',
      meta: {
        title: 'Role Management Create',
        activeMenu: '/general/role/create',
      },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/manage/role/edit'),
      name: 'RoleManagementEdit',
      meta: {
        title: 'Role Management Edit',
        activeMenu: '/general/role/edit',
      },
      hidden: true,
    },
    {
      path: 'delete',
      name: 'RoleManagementDelete',
      meta: {
        title: 'Role Management Delete',
        activeMenu: '/general/role/delete',
      },
      hidden: true,
    },
    {
      path: 'search',
      name: 'RoleManagementSearch',
      meta: {
        title: 'Role Management Search',
        activeMenu: '/general/role/search',
      },
      hidden: true,
    },
  ],
};

export default roleRoutes;
