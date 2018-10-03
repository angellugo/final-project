const User = require('../models/user');
const UserSession = require('../models/usersession');
const Company = require('../models/company');

// Defining methods for the booksController
module.exports = {
  signUp: function(req, res) {
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
    });
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

