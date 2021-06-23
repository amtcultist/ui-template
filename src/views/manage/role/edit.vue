<template>
  <RoleManagementDetail ref="form" :is-edit="true" />
</template>
<script>
import RoleManagementDetail from './components/roleManagementDetail';
export default {
  components: { RoleManagementDetail },
  beforeRouteLeave(to, from, next) {
    const func = () => {
      if (!this.$refs.form.isSaved()) {
        this.$confirm(
          `You haven't saved your changes, do you want to process  ?`,
          'Notification',
          {
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
            type: 'Warning',
            closeOnHashChange: false,
          }
        )
          .then(() => {
            next();
          })
          .catch(() => {
            return next(false);
          });
      } else {
        next();
      }
    };
    window.addEventListener('hashchange', func());
    window.removeEventListener('hashchange', func());
    next(false);
  },
};
</script>
