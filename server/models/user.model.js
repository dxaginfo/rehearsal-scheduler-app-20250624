'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timezone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'UTC'
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeSave: async (user) => {
        // Only hash the password if it has been modified or is new
        if (user.changed('password_hash')) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    }
  });

  // Instance methods
  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password_hash;
    delete values.reset_password_token;
    delete values.reset_password_expires;
    delete values.verification_token;
    return values;
  };

  // Associations
  User.associate = function(models) {
    // A user can belong to many bands
    User.belongsToMany(models.Band, {
      through: 'BandMember',
      foreignKey: 'user_id',
      as: 'bands'
    });

    // A user can create many bands
    User.hasMany(models.Band, {
      foreignKey: 'created_by',
      as: 'ownedBands'
    });

    // A user can have many event responses
    User.hasMany(models.EventResponse, {
      foreignKey: 'user_id',
      as: 'eventResponses'
    });

    // A user can have many availability settings
    User.hasMany(models.Availability, {
      foreignKey: 'user_id',
      as: 'availabilities'
    });

    // A user can have many absence records
    User.hasMany(models.Absence, {
      foreignKey: 'user_id',
      as: 'absences'
    });

    // A user can create many events
    User.hasMany(models.Event, {
      foreignKey: 'created_by',
      as: 'createdEvents'
    });

    // A user can create many setlists
    User.hasMany(models.Setlist, {
      foreignKey: 'created_by',
      as: 'createdSetlists'
    });

    // A user can have many notifications
    User.hasMany(models.Notification, {
      foreignKey: 'user_id',
      as: 'notifications'
    });
  };

  return User;
};