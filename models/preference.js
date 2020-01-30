module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
   birthday: DataTypes.STRING,
    commute: DataTypes.STRING,
    run: DataTypes.STRING,
    clothes: DataTypes.STRING,
  }, {});


  Preference.associate = function (models) {
    // Preference.belongsTo(models.User, {
    //   foreignKey: {
    //     // allowNull: false
    //   }
    // })
  };
  return Preference;
};