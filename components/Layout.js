import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "@/utils/store";
// import Link from "next/link";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();

  const handleChangeDarkMode = ()=>{
    dispatch({type:darkMode?"DARK_MODE_OFF":"DARK_MODE_ON"})
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {/* for SEO */}
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        {/* ถ้าใช้ ThemeProvider ต้องใส่ CssBaseline ด้วย*/}
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            {/* <NextLink href="/" passHref> */}
            <Link href="/">
              <Typography className={classes.brand} align="center">
                amazona
              </Typography>
            </Link>
            {/* </NextLink> */}
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={handleChangeDarkMode}></Switch>
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
      </ThemeProvider>
    </div>
  );
}
