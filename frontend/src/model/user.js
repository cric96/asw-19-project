class User {

    /* Level and score must be undefined by default, it allow to backend 
     * to use default value when a new user is created. If set to null, the backend
     * use the 'null' as value for level and score. */
    constructor(id, firebase_uid, name, surname, email, nickname = undefined, score = undefined, level = undefined) {
        this._id = id;
        this.firebase_uid = firebase_uid;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.score = score;
        this.level = level;
        this.nickname = nickname;
    }

    displayName() {
        return this.nickname || (this.name + this.surname) || this.email; 
    }

    isCompleteProfile() {
        let values = [this.name, this.surname, this.nickname];
        return values.every(value => value !== null && value !== undefined && value !== '');
    }

    /* Create the related User object starting from json object */
    static fromJson(json) {
        if(json !== null && json !== undefined)
            return Object.assign(new User(), json);
        else
            return undefined;
    }
}

export default User