const { Service } = require('feathers-nedb')

exports.Games = class Games extends Service {
  async find(params) {}
  async get(id, params) {}
  async create(data, params) {
      // This is the information we want from the user signup data
    const { cat_vote, final_jep, daily_dub, num_rounds } = data;
    // TODO get a game room code
    const roomCode = "TEST";
    const passCode = "TEST";
    const gameData = {
        roomCode,
        passCode,
        cat_vote,
        final_jep,
        daily_dub,
        num_rounds
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(gameData, params);
  }
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
}
