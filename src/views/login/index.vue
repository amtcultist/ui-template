<template>
  <div class="wrapper">
    <div class="section page-header">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square" />
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter" />
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g" />
              </md-button>
              <p slot="description" class="description">Or Be Classical</p>
              <md-field
                slot="inputs"
                class="md-form-group"
                :class="getValidationClass('email')"
              >
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="form.email" type="email" />
              </md-field>
              <span
                v-if="!$v.form.email.required && submitted"
                slot="inputs"
                class="text-danger"
              >Email is required</span>
              <span
                v-else-if="!$v.form.email.email && submitted"
                slot="inputs"
                class="text-danger"
              >Email is invalid</span>
              <md-field
                slot="inputs"
                class="md-form-group"
                :class="getValidationClass('password')"
              >
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="form.password" type="password" />
              </md-field>
              <span
                v-if="!$v.form.password.required && submitted"
                slot="inputs"
                class="text-danger"
              >Password is required</span>
              <md-progress-bar
                v-if="loading"
                slot="inputs"
                md-mode="indeterminate"
                style="margin-top:20px"
              />
              <p
                v-if="submitted"
                slot="error"
                class="text-danger"
                style="text-align: center;"
              >
                Email or password is wrong
              </p>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click.native.prevent="handleLogin"
              >
                Get Started
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from '@/components';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
export default {
  components: {
    LoginCard
  },
  mixins: [validationMixin],
  bodyClass: 'login-page',
  data() {
    return {
      loading: false,
      submitted: false,
      form: {
        email: null,
        password: null
      },
      redirect: undefined,
      otherQuery: {}
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  props: {
    header: {
      type: String,
      default: require('@/assets/img/profile_city.jpg')
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      }
    }
  },
  created() {
    this.$v.$reset();
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-error': field.$invalid && field.$dirty
        };
      }
    },
    handleLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch('user/login', this.form)
          .then(() => {
            this.loading = false;
            this.$router.push({
              path: this.redirect || '/dashboard',
              query: this.otherQuery
            });
          })
          .catch(() => {
            this.loading = false;
            this.submitted = true;
          });
      } else {
        console.log('error submit');
        return false;
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="css">
body {
  margin: 0;
  padding: 0;
}
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.backdrop {
  backdrop-filter: brightness(75%);
}
</style>
