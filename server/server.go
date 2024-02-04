package server

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/nathan-osman/wfm/admin"
	"github.com/nathan-osman/wfm/db"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

const sessionName = "session"

// Server provides the HTTP interface for the application.
type Server struct {
	server http.Server
	logger zerolog.Logger
	conn   *db.Conn
}

// New creates and initializes a new server instance.
func New(
	dataDir,
	secretKey,
	serverAddr string,
	conn *db.Conn,
) (*Server, error) {

	// Switch Gin to release mode
	gin.SetMode(gin.ReleaseMode)

	// Initialize the server
	var (
		r = gin.New()
		s = &Server{
			server: http.Server{
				Addr:    serverAddr,
				Handler: r,
			},
			logger: log.With().Str("package", "server").Logger(),
			conn:   conn,
		}
		store = cookie.NewStore([]byte(secretKey))
	)

	// Prepare to use cookies for session
	store.Options(sessions.Options{
		Path:     "/",
		HttpOnly: true,
	})

	// Serve the static files from /admin
	r.StaticFS("/admin", admin.EmbedFileSystem{
		FileSystem: http.FS(admin.Content),
	})

	groupApi := r.Group("/api")
	{
		// Use the session and our custom user middleware for the API
		groupApi.Use(
			gin.CustomRecoveryWithWriter(nil, panicToJSONError),
			sessions.Sessions(sessionName, store),
			s.loadUser,
		)

		groupApi.POST("/login", s.apiLogin)

		// Routes that require authentication
		groupAuthApi := groupApi.Group("")
		{
			groupAuthApi.Use(s.requireUser)
			groupAuthApi.GET("/test", s.apiTest)
			groupAuthApi.POST("/logout", s.apiLogout)

			groupAuthFoldersApi := groupAuthApi.Group("/folders")
			{
				groupAuthFoldersApi.GET("", s.apiFolders)
				groupAuthFoldersApi.GET("/:folderID", s.apiFolder)
			}
		}
	}

	//...

	// Listen for connections in a separate goroutine
	go func() {
		defer s.logger.Info().Msg("server stopped")
		s.logger.Info().Msg("server started")
		if err := s.server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			s.logger.Error().Msg(err.Error())
		}
	}()

	return s, nil
}

// Close shuts down the server.
func (s *Server) Close() {
	s.server.Shutdown(context.Background())
}
