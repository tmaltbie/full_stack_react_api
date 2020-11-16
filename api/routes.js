'use strict';

const { User, Course } = require('./models');
const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// Construct a router instance.
const router = express.Router();

const itemRouter = express.Router({mergeParams: true});
router.use('/:userId/items', itemRouter);


/* Handler function wrap for necessary routes. */
/* middleware for async abstraction: https://teamtreehouse.com/library/create-entries */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(err){
        next(err)
        // res.status(500).send(error)
      }
    }
  }

// custome authenticateUser middleware
const authenticateUser = async(req, res, next) => {
    let message = null;
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req)

    // If a user was successfully retrieved from the data store...
    if (credentials) {
        const user = await User.findOne({ where: { emailAddress: credentials.name }})
        if (user) {
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.password);
            if (authenticated) {
                req.currentUser = user;
            } else {
                message = `Authentication failure for user: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for user:: ${credentials.emailAddress}`;
        }
    } else {
        message = 'Auth header not found';
    }

    // If user authenticaion failed...
    if (message) {
        console.warn(message)
        res.status(401).json({ message: 'Access Denied '});
    } else {
        next();
    }
};

// Returns the currently authenticated user
router.get('/users', authenticateUser, (req, res, next) => {
    const user = req.currentUser;
    res.status(200).json({
        login: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
    });
  });

// Create a new user ~ Remember => app.use(express.json());
router.post('/users', asyncHandler(async(req, res, next) => {
    const body = req.body
    if (body.password) body.password = bcryptjs.hashSync(body.password);
    await User.create(body);
    return res.status(201).location('/').end();
}));

// Returns a list of courses
router.get('/courses', asyncHandler( async(req, res, next) => {
    const courses = await Course.findAll({
        attributes: { exclude: [ 'createdAt', 'updatedAt'] },
        include: [{ // `include` takes an ARRAY
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        }]
    });
    res.status(200).json(courses);
}));

// Returns the courses (w/owner) for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(
        req.params.id,
        {
            attributes: { exclude: [ 'createdAt', 'updatedAt'] },
            include: [{
                model: User,
                attributes: ['firstName', 'lastName', 'emailAddress', 'id']
            }]
        })
    if (course) {
        res.status(200).json(course)
    } else {
        const error = new Error("Uh-oh! That course does not exist")
        error.status = 404
        next(error)
    }
}));

// Creates a course, sets the Location header
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
    let course;
    if (req.currentUser.id != 0) { // validate there user by check for an id #
        course = await Course.create(req.body);
        res.location(`/courses/${course.id}`)
        return res.status(201).end();
    } else {
        return res.status(403).end();
    }
}))

// Updates a course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id)
    const body = req.body
    if (body === " ") body = null
    if (course.userId === req.currentUser.id) {
        course.update(body)
        return res.status(204).end();
    }
}));

// Updates a course
// router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
//     const course = await Course.findByPk(req.params.id)
//     if (!course) {
//         let err = new Error('This course does not exist')
//         err.status = 403
//         next(err)
//     } else if (course.userId === req.currentUser.id) {
//         const body = req.body
//         if (body.title) {
//             if (body.description) {
//                 course.update(body)
//                 return res.status(204).end();
//             } else {
//                 let err = new Error('Course must include a description')
//                 err.status = 403
//                 next(err)
//             }
//         } else {
//             let err = new Error('Course must include a title')
//             err.status = 403
//             next(err)
//         }
//     }
// }));

// DELETE a course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course){
        if (course.userId === req.currentUser.id) {
            await course.destroy();
            return res.status(204).end();
        } else {
            res.status(403).end()
        }
    } else {
        const err = new Error('Uh-oh! That course doesn\'t exist !' )
        err.status = 404
        next(err)
    }
}));

module.exports = router;
