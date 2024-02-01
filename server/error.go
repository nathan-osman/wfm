package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func panicToJSONError(c *gin.Context, err any) {
	message := "an unknown error has occurred"
	switch v := err.(type) {
	case string:
		message = v
	case error:
		message = v.Error()
	}
	c.AbortWithStatusJSON(
		http.StatusBadRequest,
		gin.H{"error": message},
	)
}
