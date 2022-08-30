import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

//Legal Needs
import bf_legal_legal from "@/pages/Dashboard/Pages/bf_legal_legal.vue";
import bf_legal_cookies from "@/pages/Dashboard/Pages/bf_legal_cookies.vue";
import bf_legal_terms_conditions from "@/pages/Dashboard/Pages/bf_legal_terms_conditions.vue";
import bf_legal_privacy from "@/pages/Dashboard/Pages/bf_legal_privacy.vue";

// Pages
import User from "@/pages/Dashboard/Pages/UserProfile.vue";
import Pricing from "@/pages/Dashboard/Pages/Pricing.vue";
import UpgradePlan from "@/pages/Dashboard/Pages/UpgradePlan.vue";
import Login from "@/pages/Dashboard/Pages/Login.vue";
import Register from "@/pages/Dashboard/Pages/Register.vue";
import Landing from "@/pages/Dashboard/Pages/Landing.vue";
import Reset from "@/pages/Dashboard/Pages/Reset.vue";
import bf_contactUs from "@/pages/Dashboard/Pages/bf_contactUs.vue";
import PaymentSuccess from "@/pages/Dashboard/Pages/PaymentSuccess.vue";
import PaymentFail from "@/pages/Dashboard/Pages/PaymentFail.vue";
import bf_registerConfirmation from "@/pages/Dashboard/Pages/bf_registerConfirmation.vue";
import ErrorPage from "@/pages/Dashboard/Pages/ErrorPage.vue";
import Gestures from "@/pages/Dashboard/Pages/Gestures.vue";
import bf_AddDomain from "@/pages/Dashboard/Pages/bf_AddDomain.vue";
import bf_contactUs_user from "@/pages/Dashboard/Pages/bf_contactUs_user.vue";
import bf_passwordReestablish from "@/pages/Dashboard/Pages/bf_passwordReestablish.vue";

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User }
    },
    {
      path: "upgrade",
      name: "UpgradePlan",
      components: { default: UpgradePlan }
    },
    {
      path: "add-domain",
      name: "AddDomain",
      components: { default: bf_AddDomain }
    },
    {
      path: "contact-user",
      name: "Contact Us User",
      components: { default: bf_contactUs_user }
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/pages/upgrade-plan",
      name: "UpgradePlan",
      component: UpgradePlan
    },

    {
      path: "/landing",
      name: "Landing",
      component: Landing
    },
    {
      path: "/gestures",
      name: "Gestures",
      component: Gestures
    },
    {
      path: "/reset",
      name: "Reset",
      component: Reset
    },
    {
      path: "contact",
      name: "Contact",
      components: { default: bf_contactUs }
    },
    {
      path: "/paymentsuccess",
      name: "PaymentSucess",
      component: PaymentSuccess
    },
    {
      path: "/paymentfail",
      name: "PaymentFail",
      component: PaymentFail
    },
    {
      path: "/registerconfirmation",
      name: "bf_registerConfirmation",
      component: bf_registerConfirmation
    },
    {
      path: "/password-reestablish",
      name: "bf_passwordReestablish",
      component: bf_passwordReestablish
    },

    {
      path: "/aviso-legal",
      name: "bf_legal_legal",
      component: bf_legal_legal
    },
    {
      path: "/condiciones-generales-contratacion",
      name: "bf_legal_terms_conditions",
      component: bf_legal_terms_conditions
    },
    {
      path: "/politica-de-cookies",
      name: "bf_legal_cookies",
      component: bf_legal_cookies
    },
    {
      path: "/politica-de-privacidad",
      name: "bf_legal_privacy",
      component: bf_legal_privacy
    }
  ]
};

const routes = [
  { path: "*", component: ErrorPage },
  {
    path: "/",
    redirect: "/landing",
    name: "Home"
  },
  pagesMenu,
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard }
      }
    ]
  }
];

export default routes;
