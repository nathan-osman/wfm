package db

import (
	"time"
)

const (
	FolderTypeHotlink      = "hotlink"
	FolderTypeBrowsable    = "browsable"
	FolderTypeImageGallery = "gallery"
	FolderTypeVideoPlayer  = "player"
)

// Folder corresponds to a folder on disk.
type Folder struct {
	ID          int64     `gorm:"primaryKey" json:"id"`
	UUID        string    `gorm:"not null" json:"uuid"`
	Name        string    `gorm:"not null" json:"name"`
	Description string    `gorm:"not null" json:"description"`
	CreatedAt   time.Time `gorm:"not null" json:"created_at"`
	Type        string    `gorm:"not null" json:"type"`
}
