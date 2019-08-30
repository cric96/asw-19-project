class User {

    /* Level and score must be undefined by default, it allow to backend 
     * to use default value when a new user is created. If set to null, the backend
     * use the 'null' as value for level and score. */
    constructor(firebase_uid, name, surname, email, nickname, score = undefined, level = undefined) {
        this.firebase_uid = firebase_uid;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.score = score;
        this.level = level;
        this.nickname = nickname;
    }

    /* Create the related User object starting from json object */
    static fromJson(json) {
        return Object.assign(new User(), json);
    }
}

export default User