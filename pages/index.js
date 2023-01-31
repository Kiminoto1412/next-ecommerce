import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Grid,
  CardActionArea,
  CardMedia,
  Card,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import data from "@/utils/data";
import db from "@/utils/db";
import Product from "@/models/Product";

// const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`/product/${product.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                  </CardActionArea>
                </Link>
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products:products.map(db.convertDocToObj),
    },
  };
}
