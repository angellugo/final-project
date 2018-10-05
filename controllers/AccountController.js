const User = require('../models/user');
const UserSession = require('../models/usersession');
const Company = require('../models/company');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Defining methods for the booksController
module.exports = {
  signUp: function(req, res) {
    req.checkBody('companyName', 'Company field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('adminFirstName', 'First name field cannot be empty.').notEmpty();
    req.checkBody('adminLastName', 'Last name field cannot be empty.').notEmpty();
    req.checkBody('city', 'City field cannot be empty.').notEmpty();
    req.checkBody('country', 'Country field cannot be empty.').notEmpty();
    req.checkBody('postalCode', 'Postal code field cannot be empty.').notEmpty();
    req.checkBody('brand', 'Brand Statement field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i');
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      console.log(JSON.stringify(errors));

      let companyNameErrors = [];
      let usernameErrors = [];
      let emailErrors = [];
      let adminFirstNameErrors = [];
      let adminLastNameErrors = [];
      let cityErrors = [];
      let countryErrors = [];
      let postalCodeErrors = [];
      let brandErrors = [];
      let passwordErrors = [];
      let passwordMatchErrors = [];

      errors.forEach(function(element) {
        switch (element.param) {
          case 'companyName':
            companyNameErrors.push(element);
            break;
          case 'username':
            usernameErrors.push(element);
            break;
          case 'email':
            emailErrors.push(element);
            break;
          case 'adminFirstName':
            adminFirstNameErrors.push(element);
            break;
          case 'adminLastName':
            adminLastNameErrors.push(element);
            break;
          case 'city':
            cityErrors.push(element);
            break;
          case 'country':
            countryErrors.push(element);
            break;
          case 'postalCode':
            postalCodeErrors.push(element);
            break;
          case 'brand':
            brandErrors.push(element);
            break;
          case 'password':
            passwordErrors.push(element);
            break;
          case 'passwordMatch':
            passwordMatchErrors.push(element);
          default:
        }
      });

      res.send({
        companyNameErrors: companyNameErrors,
        usernameErrors: usernameErrors,
        emailErrors: emailErrors,
        adminFirstNameErrors: adminFirstNameErrors,
        adminLastNameErrors: adminLastNameErrors,
        cityErrors: cityErrors,
        countryErrors: countryErrors,
        postalCodeErrors: postalCodeErrors,
        brandErrors: brandErrors,
        passwordErrors: passwordErrors,
        passwordMatchErrors: passwordMatchErrors,
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) throw err;

        Company.create({
          companyName: req.body.companyName,
          username: req.body.username,
          email: req.body.email,
          adminFirstName: req.body.adminFirstName,
          adminLastName: req.body.adminLastName,
          city: req.body.city,
          country: req.body.country,
          postalCode: req.body.postalCode,
          brand: req.body.brand,
          password: hash,
        }).then(function(data) {
          res.send({
            success: true,
            message: 'signed up',
          });
        }).catch(function(err) {
          res.send({
            success: false,
            message: 'could not create database document.',
          });
        });
      });
    };
    // ---------------------------------------------------------------------------
    /*

const {body} = req;
    const {companyAddress, email, adminFirstName, adminLastName,
      isManager, password} = body;
    let {companyName} = body;
    // const email = req.body.email;
    // const companyAddress = req.body.companyAddress;
    // const adminFirstName = req.body.adminFirstName;
    // const adminLastName = req.body.adminLastName;
    // const isManager = req.body.isManager;
    // const password = req.body.password;

    if (!companyName) {
      return res.send({
        success: false,
        message: 'Error: Company Name cannot be blank!',
      });
    };
    if (!companyAddress) {
      return res.send({
        success: false,
        message: 'Error: Company Address cannot be blank!',
      });
    };
    if (!adminFirstName) {
      return res.send({
        success: false,
        message: 'Error: Admin First Name cannot be blank!',
      });
    };
    if (!adminLastName) {
      return res.send({
        success: false,
        message: 'Error: Admin Last Name cannot be blank!',
      });
    };
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank!',
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank!',
      });
    };

    companyName = companyName.toLowerCase();
    Company.find({
      companyName: companyName,
    }, (err, previousCompany) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error',
        });
      } else if (previousCompany.length > 0) {
        return res.send({
          success: false,
          message: 'Error Company Account already created.',
        });
      };
    });

    const newCompany = new Company();
    newCompany.email = email;
    newCompany.companyName = companyName;
    newCompany.companyAddress = companyAddress;
    newCompany.adminFirstName = adminFirstName;
    newCompany.adminLastName = adminLastName;
    newCompany.password = newCompany.generateHash(password);
    newCompany.isManager = isManager;
    // console.log(newCompany);
    newCompany.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error Account Not created',
        });
      }
      return res.send({
        success: true,
        message: 'Your Company is now Signed Up!',

      });
    }); */
  },
  newEmployee: function(req, res) {
    const {body} = req;
    const {userName, firstName, lastName, isAdmin, isManager, password} = body;
    let {email} = body;
    // const userName = req.body.userName;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const isAdmin = req.body.isAdmin;
    // const isManager = req.body.isManager;
    // const password = req.body.password;
    // let email = req.body.email;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(password);
    // console.log(userName);
    // console.log(isAdmin);
    // console.log(isManager);

    if (!userName) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank!',
      });
    };
    if (!firstName) {
      return res.send({
        success: false,
        message: 'Error: First Name cannot be blank!',
      });
    };
    if (!lastName) {
      return res.send({
        success: false,
        message: 'Error: Last Name cannot be blank!',
      });
    };
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank!',
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank!',
      });
    };

    email = email.toLowerCase();

    User.find({
      email: email,
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error 123',
        });
      } else if (users.length > 0) {
        return res.send({
          success: false,
          message: 'Error Account already created.',
        });
      };
    });

    const newUser = new User();
    newUser.email = email;
    newUser.userName = userName;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.isAdmin = isAdmin;
    newUser.isManager = isManager;
    // console.log(newUser);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error Account Not created',
        });
      }
      return res.send({
        success: true,
        message: 'New User Now Created!',

      });
    });
  },
  signIn: function(req, res) {
    const {body} = req;
    let {email} = body;
    const {password} = body;
    // let email  = req.body.email;
    // const userName = req.body.userName;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const isAdmin = req.body.isAdmin;
    // const isManager = req.body.isManager;
    // const password = req.body.password;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank!',
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank!',
      });
    };

    email = email.toLowerCase();

    User.find({
      email: email,
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error 123',
        });
      } else if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error Invalid',
        });
      };

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error Invalid Password or User Name',
        });
      };
      const userSession = new UserSession();
      userSession.userID = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error',
          });
        }
        return res.send({
          success: true,
          message: 'Valid Sign-in',
          token: doc.id,
        });
      });
    });
  },
  verify: function(req, res) {
    const {query} = req;
    const {token} = query;
    // const token = req.query;
    // console.log({token1});
    // console.log({query});
    // console.log(token);

    UserSession.find({
      _id: token,
      isDeleted: false,
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Servor Error123',
        });
      };
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid',
        });
      } else {
        return res.send({
          success: true,
          message: 'Good',
        });
      }
    });
  },
  logout: function(req, res) {
    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false,
    }, {
      $set: {isDeleted: true},
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Servor Error',
        });
      };
      return res.send({
        success: true,
        message: 'Log Out Complete',
      });
    });
  },
};

