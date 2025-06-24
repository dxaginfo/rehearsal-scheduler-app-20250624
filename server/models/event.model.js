'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    event_type: {
      type: DataTypes.ENUM('rehearsal', 'performance', 'meeting', 'other'),
      allowNull: false,
      defaultValue: 'rehearsal'
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    recurrence_pattern: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'JSON object containing recurrence information: frequency, interval, weekdays, end date, etc.'
    },
    parent_event_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      },
      onDelete: 'SET NULL',
      comment: 'For recurring events, refers to the parent event'
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'scheduled'
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    reminder_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    follow_up_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'events',
    timestamps: true,
    underscored: true
  });

  Event.associate = function(models) {
    // An event belongs to a band
    Event.belongsTo(models.Band, {
      foreignKey: 'band_id',
      as: 'band'
    });

    // An event can have a location
    Event.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location'
    });

    // An event is created by a user
    Event.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator'
    });

    // A recurring event can have child events
    Event.hasMany(Event, {
      foreignKey: 'parent_event_id',
      as: 'childEvents'
    });

    // A child event belongs to a parent event
    Event.belongsTo(Event, {
      foreignKey: 'parent_event_id',
      as: 'parentEvent'
    });

    // An event can have many responses
    Event.hasMany(models.EventResponse, {
      foreignKey: 'event_id',
      as: 'responses'
    });

    // An event can have many setlists
    Event.hasMany(models.Setlist, {
      foreignKey: 'event_id',
      as: 'setlists'
    });

    // An event can have many attachments
    Event.hasMany(models.Attachment, {
      foreignKey: 'event_id',
      as: 'attachments'
    });

    // An event can have many notifications
    Event.hasMany(models.Notification, {
      foreignKey: 'event_id',
      as: 'notifications'
    });
  };

  return Event;
};