String.prototype.format = function() {
    let string = this;
    for (const k in arguments) {
        string = string.replace("{" + k + "}", arguments[k])
    }
    return string
  }
  