package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nathan-osman/wfm/db"
	"github.com/nathan-osman/wfm/server"
	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "lampctl",
		Usage: "HTTP interface for controlling lights",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "data-dir",
				EnvVars: []string{"DATA_DIR"},
				Usage:   "path to data directory",
			},
			&cli.StringFlag{
				Name:    "secret-key",
				EnvVars: []string{"SECRET_KEY"},
				Usage:   "secret key for encoding cookies",
			},
			&cli.StringFlag{
				Name:    "server-addr",
				Value:   ":http",
				EnvVars: []string{"SERVER_ADDR"},
				Usage:   "HTTP address to listen on",
			},
		},
		Action: func(c *cli.Context) error {

			// Create the database
			conn, err := db.New(c.String("db-path"))
			if err != nil {
				return err
			}
			defer conn.Close()

			// Create the server
			s, err := server.New(
				c.String("data-dir"),
				c.String("secret-key"),
				c.String("server-addr"),
				conn,
			)
			if err != nil {
				return err
			}
			defer s.Close()

			// Wait for SIGINT or SIGTERM
			sigChan := make(chan os.Signal, 1)
			signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
			<-sigChan

			return nil
		},
	}
	if err := app.Run(os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "fatal: %s\n", err.Error())
	}
}
