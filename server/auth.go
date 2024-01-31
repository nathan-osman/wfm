package server

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/nathan-osman/wfm/db"
)

const (
	sessionKeyUserID = "user_id"

	contextUser = "user"
)

func (s *Server) loadUser(c *gin.Context) {
	var (
		session       = sessions.Default(c)
		sessionUserID = session.Get(sessionKeyUserID)
	)
	if sessionUserID != nil {
		u := &db.User{}
		if err := s.conn.First(u, sessionUserID).Error; err == nil {
			c.Set(contextUser, u)
		}
	}
	c.Next()
}
