const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataType.TEXT,
      allowNull:false
    },
    genres:{
      type:DataType.ARRAY(sequelize.STRING),
      allowNull:true
    },
    releaseDate:{
      type:DataType.DATE,
      allowNull:true
    },
    rating:{
      type:DataType.NUMERIC,
      allowNull:true
    },
    platforms:{
      type:DataType.ARRAY(sequelize.STRING),
      allowNull:false
    },
  });
};
