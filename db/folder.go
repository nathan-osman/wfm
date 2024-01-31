package db

import (
	"time"
)

// Folder corresponds to a folder on disk.
type Folder struct {
	ID          int64     `gorm:"primaryKey" json:"id"`
	UUID        string    `gorm:"not null" json:"uuid"`
	Name        string    `gorm:"not null" json:"name"`
	Description string    `gorm:"not null" json:"description"`
	CanBrowse   bool      `gorm:"not null" json:"can_browse"`
	CreatedAt   time.Time `gorm:"not null" json:"created_at"`
	ParentID    int64     `gorm:"not null" json:"-"`
	Parent      *Folder   `gorm:"constraint:OnDelete:CASCADE" json:"parent"`
}
