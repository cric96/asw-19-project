class User {

    constructor(firebase_uid, name, surname, email, score = 0, level = 1, nickname) {
        this._firebase_uid = firebase_uid;
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._score = score;
        this._level = level;
        this._nickname = nickname;
    }

    get firebase_uid(){
        return this._firebase_uid;
    }
    set firebase_uid(val){
        this._firebase_uid = val
    }

    get name(){
        return this._name;
    }
    set name(val){
        this._name = val
    }

    get surname(){
        return this._surname;
    }
    set surname(val){
        this._surname = val
    }

    get email(){
        return this._email;
    }
    set email(val){
        this._email = val
    }

    get score(){
        return this._score;
    }
    set score(val){
        this._score = val
    }

    get level(){
        return this._level;
    }
    set level(val){
        this._level = val
    }

    get nickname(){
        return this._nickname;
    }
    set nickname(val){
        this._nickname = val
    }
}

export default User