class User {

    constructor(firebase_uid, name, surname, email, score = 0, level = 1, nickname) {
        this.firebase_uid = firebase_uid;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.score = score;
        this.level = level;
        this.nickname = nickname;
    }


}

export default User