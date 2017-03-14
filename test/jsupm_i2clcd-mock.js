let locals = {};

let exportLcd = class Jhd1313m1 {
  constructor(a, b, c) {
    let constr = {};
    constr.a = a;
    constr.b = b;
    constr.c = c;
    locals.constr = constr;
  }
  setColor(red, green, blue) {
    let color = {};
    color.red = red;
    color.green = green;
    color.blue = blue;
    locals.color = color;
  }

  setCursor(x, y) {
    let cursor = {};
    cursor.x = x;
    cursor.y = y;
    locals.cursor = cursor;
  }

  write(msg) {
    locals.message = msg;
  }
}

module.exports = {};
module.exports.Jhd1313m1 = exportLcd;
module.exports.locals = locals;
