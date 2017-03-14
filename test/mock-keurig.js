const locals = {};
locals.cb = {};

class Keurig {

  heatUp() {
    locals.heatingUp = true;
  }

  brew(size, cb) {
    locals.brewing = true;
    cb(locals.cb.brew);
  }

  validateSize(size) {
    locals.size = size;
    locals.validateSize = true;
  }
}

module.exports = Keurig;
module.exports.locals = locals;
