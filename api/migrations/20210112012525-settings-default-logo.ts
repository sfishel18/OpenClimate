'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db) {
  // If there is a theme, we need to delete it anyway
  const sql = 'DELETE FROM images'
  db.runSql(sql, function (err) {
    if (err) return console.log(err)
  })

  return db.insert(
    'images',
    ['name', 'type', 'image'],
    [
      'logo.png',
      'logo',
      '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',
    ],
  )
}

exports.down = function (db) {
  const sql = 'DELETE FROM images'
  db.runSql(sql, function (err) {
    if (err) return console.log(err)
  })
  return null
}

exports._meta = {
  version: 1,
}