module.exports = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => users.find(user => user.id === key));
};

// const DataLoader = require('dataloader');

// module.exports.batchAddresses = new DataLoader(async (keys) => {

//   return keys;

// });
