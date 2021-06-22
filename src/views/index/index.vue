<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img v-show="leafShow" :src="leaf4" alt="leaf4" class="leaf4">
            <img v-show="leafShow" :src="leaf3" alt="leaf3" class="leaf3">
            <img v-show="leafShow" :src="leaf2" alt="leaf2" class="leaf2">
            <img v-show="leafShow" :src="leaf1" alt="leaf1" class="leaf1">
            <div class="brand">
              <h1>Ngô Minh Phong</h1>
              <h3>Just an Egirl. Nothing else</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-white">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i
                  class="fas fa-4x fa-paper-plane text-primary mb-3 sr-icon-2"
                />
                <h3 class="mb-3">Easy to book</h3>
                <p class="text-muted mb-0">
                  Can't book now, we got reservation covered for you
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-leaf text-primary mb-3 sr-icon-3" />
                <h3 class="mb-3">Friendliness</h3>
                <p class="text-muted mb-0">
                  Friendly interface for easier booking
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-heart text-primary mb-3 sr-icon-4" />
                <h3 class="mb-3">Great Service</h3>
                <p class="text-muted mb-0">
                  Our team will always support you over any problems
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i
                  class="fas fa-4x fa-user-secret text-primary mb-3 sr-icon-1"
                />
                <h3 class="mb-3">Security</h3>
                <p class="text-muted mb-0">
                  Don't worry, we won't sell your information (like some did)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="section section-basic">
        <div class="container">
          <div class="title">
            <h2>Basic Elements</h2>
          </div>
          <basic-elements></basic-elements>
        </div>
      </div>
      <div class="section section-navbars">
        <div class="container">
          <small-navigation></small-navigation>
        </div>
        <navigation></navigation>
      </div>
      <div class="section section-tabs">
        <div class="container">
          <tabs></tabs>
        </div>
      </div>
      <div class="section section-white">
        <div class="container">
          <nav-pills></nav-pills>
        </div>
      </div>
      <div class="section section-notifications">
        <div class="container">
          <div class="title">
            <h3>Notifications</h3>
          </div>
        </div>
        <notifications></notifications>
      </div>
      <div class="section">
        <div class="container">
          <typography-images></typography-images>
        </div>
      </div>
      <div class="section section-javascript">
        <div class="container">
          <javascript-components></javascript-components>
        </div>
      </div>
      <div class="section">
        <div class="container text-center">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 ml-auto mr-auto text-center"
            >
              <h2>Completed with examples</h2>
              <h4>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. More importantly, looking at them will give you a picture of
                what you can built with this powerful kit.
              </h4>
            </div>
          </div>
        </div>
      </div>-->
      <div class="section section-signup page-header" :style="signupImage">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center"
            >
              <login-card header-color="green">
                <h4 slot="title" class="card-title">Register</h4>
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
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>face</md-icon>
                  <label>Your name...</label>
                  <md-input v-model="form.name" />
                </md-field>
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>account_box</md-icon>
                  <label>Your username...</label>
                  <md-input v-model="form.username" />
                </md-field>
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>email</md-icon>
                  <label>Your email...</label>
                  <md-input v-model="form.email" type="email" />
                </md-field>
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>lock_outline</md-icon>
                  <label>Your password...</label>
                  <md-input v-model="form.password" type="password" />
                </md-field>
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>phone</md-icon>
                  <label>Your phone number...</label>
                  <md-input v-model="form.phone" />
                </md-field>
                <md-field slot="inputs" class="md-form-group">
                  <md-icon>accessibility</md-icon>
                  <label>Pick your genders...</label>
                  <md-select v-model="form.gender_id">
                    <md-option v-for="gender in listGenders" :key="gender._id" :value="gender._id">{{ gender.name }}</md-option>
                  </md-select>
                </md-field>
                <md-button slot="footer" class="md-simple md-success md-lg" @click.native.prevent="handleRegister">
                  Get Started
                </md-button>
              </login-card>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="md-layout">
        <div class="md-layout-item text-center">
          <md-button href="#/login" class="md-simple md-success md-lg"
            >View Login Page</md-button
          >
        </div>
      </div>-->
      <!--<div class="section section-examples">
        <div class="container-fluid text-center">
          <div class="md-layout">
            <div class="md-layout-item">
              <a href="#/landing" target="_blank">
                <img
                  :src="landing"
                  alt="Rounded Image"
                  class="img-raised rounded img-fluid"
                />
              </a>
              <md-button href="#/landing" class="md-simple md-success md-lg"
                >View Landing Page</md-button
              >
            </div>
            <div class="md-layout-item">
              <a href="#/profile" target="_blank">
                <img
                  :src="profile"
                  alt="Rounded Image"
                  class="img-raised rounded img-fluid"
                />
              </a>
              <md-button href="#/profile" class="md-simple md-success md-lg"
                >View Profile Page</md-button
              >
            </div>
          </div>
        </div>
      </div>-->
      <!--<div class="section section-download" id="downloadSection">
        <div class="container">
          <div class="md-layout text-center">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2>Do you love this UI Kit?</h2>
              <h4>
                Cause if you do, it can be yours for FREE. Hit the buttons below
                to navigate to our website where you can find the kit. Our
                friends from
                <a
                  href="https://themeisle.com/?utm_campaign=mkfree-hestia&amp;utm_source=creativetim&amp;utm_medium=website"
                  target="_blank"
                  >ThemeIsle</a
                >
                created a Wordpress Theme which can be also downloaded for free.
                Start a new project or give an old Bootstrap project a new look!
              </h4>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100 mx-auto">
              <md-button
                href="https://www.creative-tim.com/product/material-kit"
                target="_blank"
                class="md-success md-lg"
                ><i class="fab fa-html5"></i> Free HTML Download</md-button
              >
              <md-button
                href="https://themeisle.com/themes/hestia/?utm_campaign=mkfree-hestia&amp;utm_source=creativetim&amp;utm_medium=website"
                class="md-success md-lg"
                target="_blank"
                ><i class="fab fa-wordpress"></i> Wordpress Theme</md-button
              >
            </div>
          </div>
          <br /><br />

          <div class="md-layout text-center">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2>Want more?</h2>
              <h4>
                We've just launched
                <a
                  href="https://www.creative-tim.com/product/vue-material-dashboard-pro?ref=utp-mk-demos"
                  target="_blank"
                  >Vue Material Dashboard PRO</a
                >
                and
                <a
                  href="https://www.creative-tim.com/product/vue-material-kit-pro?ref=utp-vmk-demos"
                  target="_blank"
                  >Vue Material Kit PRO</a
                >. Every product has a huge number of components, sections and
                example pages. Start Your Development With A Badass Bootstrap UI
                Kit inspired by Material Design.
              </h4>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100 mx-auto">
              <div class="btn-container">
                <md-button
                  href="https://www.creative-tim.com/product/vue-material-kit-pro?ref=utp-vmk-demos"
                  class="md-button md-success md-lg md-upgrade"
                  target="_blank"
                  ><md-icon>unarchive</md-icon>Vue Material Kit PRO</md-button
                >
                <md-button
                  href="https://www.creative-tim.com/product/vue-material-dashboard-pro?ref=utp-vmd-demos"
                  class="md-button md-success md-lg md-upgrade"
                  target="_blank"
                  ><md-icon>unarchive</md-icon>Vue Material Dashboard
                  PRO</md-button
                >
              </div>
            </div>
          </div>

          <div class="sharing-area text-center">
            <div class="md-layout">
              <div class="md-layout-item">
                <h3>Thank you for supporting us!</h3>
              </div>
            </div>

            <md-button class="md-twitter"
              ><i class="fab fa-twitter"></i>Tweet</md-button
            >
            <md-button class="md-facebook"
              ><i class="fab fa-facebook-square"></i> Share</md-button
            >
            <md-button class="md-google"
              ><i class="fab fa-google-plus"></i> Share</md-button
            >
            <md-button class="md-github"
              ><i class="fab fa-github"></i> Star</md-button
            >
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { LoginCard } from '@/components'
import { findAll as getGenders } from '@/api/genders'
export default {
  name: 'Index',
  components: {
    LoginCard
  },
  bodyClass: 'index-page',
  props: {
    image: {
      type: String,
      default: require('@/assets/img/vue-mk-header.jpg')
    },
    leaf4: {
      type: String,
      default: require('@/assets/img/leaf4.png')
    },
    leaf3: {
      type: String,
      default: require('@/assets/img/leaf3.png')
    },
    leaf2: {
      type: String,
      default: require('@/assets/img/leaf2.png')
    },
    leaf1: {
      type: String,
      default: require('@/assets/img/leaf1.png')
    },
    signup: {
      type: String,
      default: require('@/assets/img/city.jpg')
    },
    landing: {
      type: String,
      default: require('@/assets/img/landing.jpg')
    },
    profile: {
      type: String,
      default: require('@/assets/img/profile.jpg')
    }
  },
  data() {
    return {
      leafShow: false,
      listGenders: [],
      form: {
        gender_id: '',
        name: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      }
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      }
    }
  },
  created() {
    getGenders().then(response => {
      this.listGenders = response.data
    })
  },
  mounted() {
    this.leafActive()
    window.addEventListener('resize', this.leafActive)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.leafActive)
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false
      } else {
        this.leafShow = true
      }
    },
    handleRegister() {
      console.log(this.form)
    }
  }
}
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
