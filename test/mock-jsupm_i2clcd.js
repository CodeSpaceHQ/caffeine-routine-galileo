const locals = {};

class Jhd1313m1 {
  constructor(a, b, c) {
    const constr = {};
    constr.a = a;
    constr.b = b;
    constr.c = c;
    locals.constr = constr;
  }

  setColor(red, green, blue) {
    const color = {};
    color.red = red;
    color.green = green;
    color.blue = blue;
    locals.color = color;
  }

  setCursor(x, y) {
    const cursor = {};
    cursor.x = x;
    cursor.y = y;
    locals.cursor = cursor;
  }

  write(msg) {
    locals.message = msg;
  }
}

module.exports = {};
module.exports.Jhd1313m1 = Jhd1313m1;
module.exports.locals = locals;
