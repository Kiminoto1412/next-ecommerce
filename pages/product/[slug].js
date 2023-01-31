import Layout from "@/components/Layout";
import Product from "@/models/Product";
import db from "@/utils/db";
import useStyles from "@/utils/styles";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import React from "react";

export default function ProductScreen(props) {
  const {product} = props
  const classes = useStyles();
  //   get slug from url
  // const { slug } = router.query;
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <Link href="/">
          <Typography>back to products</Typography>
        </Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Description: {product.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${product.price}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}


export async function getServerSideProps(context){
  const {params} =  context
  const {slug} = params

  await db.connect();
  // use lean() to convert document to plain javascript
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product:db.convertDocToObj(product),
    },
  };
}