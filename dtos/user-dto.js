module.exports = class UserDto {
    id;
    _id;
    id_type;
    isActivated;

    constructor(model) {
        this.id = model.id;
        this.id_type = model.id_type;
        this._id = model._id;
        this.isActivated = model.isActivated;
    }
}
