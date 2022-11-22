const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(id, password) {
        const candidate = await UserModel.findOne({id})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с id: ${id} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
      
        let id_type
        if ( id.includes('@') ) {
            id_type = 'email'
         }
         else {
            id_type = 'phone_number'
        }
        const user = await UserModel.create({id: id, id_type: id_type, password: hashPassword})
       
       

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
      
        return tokens.accessToken
    }

   
    async login(id, password) {
        const user = await UserModel.findOne({id})
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с id: ${id} не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
       
        return tokens.accessToken
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

        async getOneUser(id) {
        const user = await UserModel.findOne(id);
        return user;
    }
}

module.exports = new UserService();
