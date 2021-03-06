// Models
const Game = require('../models/game');

// Return the game upload page.
exports.getUploadGames = (req, res, next) => {
  res.render('creator/game_submission', {
    pageTtitle: 'Submission Page',
    path: '/creators/upload',
  });
};

// Return the uploaded games.
exports.postUploadGames = (req, res, next) => {
  const game = new Game(req.title, req.price, req.description);
  game.upload();
  res.render('home');
};

// Return all games in the database.
exports.getGames = (req, res, next) => {
  const games = Game.fetchAll((games) => {
    res.render('home', { games: games });
  });
};

// Detail page for games.
exports.getGame = (req, res, next) => {
  const gameID = req.params.gameID; // gameID is from the dynamic route
};

// Return the game page for a given gameID.
exports.getGamepageGameID = async (req, res, next) => {
  res.locals.user = req.session.sessionType;
  const gameID = req.params.gameID;
  try {
    const game = await Game.findOne({
      where: {
        gameID: gameID,
      },
    });
    res.render('gamepage', {
      game: game,
    });
  } catch (err) {
    res.status(502).redirect('/');
  }
};
