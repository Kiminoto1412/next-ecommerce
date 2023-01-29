import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import useStyles from "../utils/styles";
// import Link from "next/link";

export default function Layout({ title,description,children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona`:"Next Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {/* <NextLink href="/" passHref> */}
            <Link  href="/">
            <Typography className={classes.brand} align="center">amazona</Typography>
            </Link>
          {/* </NextLink> */}
          <div className={classes.grow}></div>
          <div>
            <Link href="/cart">Cart</Link>
            <Link href="/login">Login</Link>
            {/* <NextLink href="/cart" passHref> 
            <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
            <Link>Login</Link>
            </NextLink> */}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next Amazona.</Typography>
      </footer>
    </div>
  );
}
