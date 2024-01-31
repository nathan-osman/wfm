package db

import (
	"path"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Conn maintains a connection to the database.
type Conn struct {
	*gorm.DB
}

// New attempts to connect to or create the database.
func New(dataDir string) (*Conn, error) {
	d, err := gorm.Open(
		sqlite.Open(path.Join(dataDir, "db.sqlite3")),
		&gorm.Config{},
	)
	if err != nil {
		return nil, err
	}
	if err := d.AutoMigrate(
		&Folder{},
		&User{},
	); err != nil {
		return nil, err
	}
	return &Conn{
		d,
	}, nil
}

// Close closes the database connection.
func (c *Conn) Close() {
	db, _ := c.DB.DB()
	db.Close()
}
