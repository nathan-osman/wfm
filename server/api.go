package server

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/nathan-osman/wfm/db"
)

type apiLoginParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *Server) apiTest(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

func (s *Server) apiLogin(c *gin.Context) {
	v := &apiLoginParams{}
	if err := c.ShouldBindJSON(v); err != nil {
		panic(err)
	}
	u := &db.User{}
	if err := s.conn.Where("email = ?", v.Email).First(u).Error; err != nil {
		panic(err)
	}
	if err := u.Authenticate(v.Password); err != nil {
		panic(err)
	}
	session := sessions.Default(c)
	session.Set(sessionKeyUserID, u.ID)
	if err := session.Save(); err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

func (s *Server) apiLogout(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete(sessionKeyUserID)
	if err := session.Save(); err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

func (s *Server) apiFolders(c *gin.Context) {
	v := []*db.Folder{}
	if err := s.conn.Find(&v).Error; err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, v)
}

type apiFolderCreateParams struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (s *Server) apiFolderCreateEdit(c *gin.Context) {
	v := &apiFolderCreateParams{}
	if err := c.ShouldBindJSON(v); err != nil {
		panic(err)
	}
	f := db.NewFolder()
	f.Name = v.Name
	f.Description = v.Description
	if err := s.conn.Save(f).Error; err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

func (s *Server) apiFolder(c *gin.Context) {
	v := &db.Folder{}
	if err := s.conn.First(v, "id = ?", c.Param("folderID")).Error; err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, v)
}
