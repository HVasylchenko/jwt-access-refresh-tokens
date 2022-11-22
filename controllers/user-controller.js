const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {id, password} = req.body;
           
            const userData = await userService.registration(id, password);
            // cookie 20 min
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {id, password} = req.body;
            const userData = await userService.login(id, password);
            // cookie 20 min
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    // async activate(req, res, next) {
    //     try {
    //         const activationLink = req.params.link;
    //         await userService.activate(activationLink);
    //         return res.redirect(process.env.CLIENT_URL);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async refresh(req, res, next) {
    //     try {
    //         const {refreshToken} = req.cookies;
    //         const userData = await userService.refresh(refreshToken);
    //         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    //         return res.json(userData);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async getUsers(req, res, next) {
    //     try {
    //         const users = await userService.getAllUsers();
    //         return res.json(users);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    async getOneUser(req, res, next) {
        try {
        
            //extend it on any user request (except singin/logout)
                       
            // cookie 20 min
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
           
            const user = await userService.getOneUser(req.user.id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();
