import AppMain from '@/layout/components/AppMain.vue';

const genderRoutes = {
  path: '/gender',
  name: 'GenderManagement',
  redirect: '/gender/list',
  component: AppMain,
  meta: {
    title: 'Gender Management',
    icon: 'gender',
    activeMenu: '/general/gender',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage/gender/list'),
      meta: {
        title: 'Gender Management List',
      },
      name: 'GenderManagementList',
      hidden: true,
    },
    {
      path: 'create',
      component: () => import('@/views/manage/gender/create'),
      meta: {
        title: 'Gender Management Create',
      },
      name: 'GenderManagementCreate',
      hidden: true,
    },
    {
      path: 'edit',
      component: () => import('@/views/manage/gender/edit'),
      meta: {
        title: 'Gender Management Edit',
      },
      name: 'GenderManagementEdit',
      hidden: true,
    },
    {
      path: 'delete',
      meta: {
        title: 'Gender Management Delete',
      },
      name: 'GenderManagementDelete',
      hidden: true,
    },
    {
      path: 'search',
      meta: {
        title: 'Gender Management Search',
      },
      name: 'GenderManagementSearch',
      hidden: true,
    },
  ],
};

export default genderRoutes;
