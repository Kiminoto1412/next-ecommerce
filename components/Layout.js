import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import useStyles from "@/utils/styles";

export default function Layout({ children }) {
    const classess = useStyles();
  return (
    <div>
      <Head>
        <title>Next Amazon</title>
      </Head>
      <AppBar position="static" className={classess.navbar}>
        <Toolbar>
          <Typography>amazon</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classess.main}>{children}</Container>
      <footer className={classess.footer}>
        <Typography>All right reserved. Next Amazona.</Typography>
      </footer>
    </div>
  );
}
