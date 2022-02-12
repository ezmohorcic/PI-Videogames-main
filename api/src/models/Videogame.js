const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    genres:{
      type:DataTypes.STRING,
      allowNull:true
    },
    releaseDate:{
      type:DataTypes.DATE,
      allowNull:true
    },
    rating:{
      type:DataTypes.NUMERIC,
      allowNull:true
    },
    platforms:{
      type:DataTypes.STRING,
      allowNull:false
    },
  });
};
