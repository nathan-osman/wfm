package db

import (
	"encoding/base64"

	"golang.org/x/crypto/bcrypt"
)

// User corresponds to a user that can login to the admin page.
type User struct {
	ID       int64  `gorm:"primaryKey" json:"id"`
	Email    string `gorm:"not null" json:"email"`
	Username string `gorm:"not null" json:"username"`
	Password string `gorm:"not null" json:"-"`
}

// Authenticate compares the provided password to the one stored in the
// database. An error is returned if the values do not match.
func (u *User) Authenticate(password string) error {
	b, err := base64.StdEncoding.DecodeString(u.Password)
	if err != nil {
		return err
	}
	return bcrypt.CompareHashAndPassword(b, []byte(password))
}

// SetPassword salts and hashes the user's password. It does not store the new
// value in the database.
func (u *User) SetPassword(password string) error {
	h, err := bcrypt.GenerateFromPassword([]byte(password), 0)
	if err != nil {
		return err
	}
	u.Password = base64.StdEncoding.EncodeToString(h)
	return nil
}
