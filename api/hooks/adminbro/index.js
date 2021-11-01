/**
 * adminbro hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineAdminbroHook(sails) {
  const express = require('express');
  const router = express.Router();
  const AdminBro = require('admin-bro');
  const AdminBroExpress = require('@admin-bro/express');
  const AdminBroSequelize = require('@admin-bro/sequelize');
  const config = {
    branding: {
      companyName: 'Vendors',
      logo: false,
      softwareBrothers: false
    },
    secretKey: 'sssh its a secret'
  };

  AdminBro.registerAdapter(AdminBroSequelize);

  const adminBro = new AdminBro({
    databases: [sails.config.models],
    rootPath: '/admin',
    branding: config.branding,
    dashboard: {
      handler: async () => {
        return { some: 'output' };
      },
      component: AdminBro.bundle('../../../views/admin/index')
    }
  });

  AdminBroExpress.buildAuthenticatedRouter(adminBro,
  {
    authenticate: async (email, password) => {
      return { email };
    },
    cookiePassword: config.secretKey,
    cookieName: 'admin'
  }, router, {
    secret: config.secretkey,
    saveUninitialized: true,
    resave: false,
  });


  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function () {

      sails.log.info('Initializing custom hook Admin Panel');
      sails.hooks.http.app.use('/admin', router);

    },

  };

};
