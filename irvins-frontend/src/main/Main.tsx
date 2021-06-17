import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import TopAppBar from '../components/TopAppBar';
import IrvinsLogo from '../assets/images/irvins-logo.png';
import Typical from 'react-typical';
import { Field, Form, Formik } from 'formik';

const useStyles = makeStyles((theme: Theme) => ({
  root:{
    background: '#FFFFFF',
    padding: 40, // IMPORTANT NOTE: This is the workaround given by material ui as Grid spacing will result in negative margin and unwanted horizontal scroll bar (https://material-ui.com/components/grid/#negative-margin)
  },
  appBar: {
    background: theme.palette.primary.dark,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();

  const [product, setProduct] = useState<any>();
  
  const onSubmit = async (values: any) => {
    const productResponse = await fetch(`http://localhost:3030/api/products/${values.id}`);
    const productItem = await productResponse.json();
    if (productItem) setProduct(productItem);
  };

  const onPost = async () => {
    await fetch('http://localhost:3030/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '10a08dbf-6901-4c9f-a856-9ac0084f4765',
        name: 'Product 1',
        price: 100.00,
        image: 'http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg',
        tags: ['tag1', 'tag2']
      })
    });
  };

  const onPatch = async () => {
    await fetch('http://localhost:3030/api/products/10a08dbf-6901-4c9f-a856-9ac0084f4765', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '10a08dbf-6901-4c9f-a856-9ac0084f4765',
        name: 'Product 1 update',
        price: 120.00,
        image: 'http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg',
        tags: ['tag3']
      })
    });

    setProduct(undefined);
  };

  const onDelete = async () => {
    await fetch('http://localhost:3030/api/products/10a08dbf-6901-4c9f-a856-9ac0084f4765', {
      method: 'DELETE',
    });

    setProduct(undefined);
  };

  return (
    <div className={classes.root}>
      <TopAppBar />
      <Grid 
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
        style={{ flexGrow: 1, paddingTop: 20 }}
      >
        <Grid item container justify="center" alignItems="center" style={{ fontSize: 48 }}>
          <Typical
            steps={['Hello!', 1000, 'Welcome to Irvins!', 1500]}
            loop={1}
            wrapper="p"
          />
        </Grid>

        <Grid item>
          <Box boxShadow={10}>
            <Card style={{ width: '10vw', minWidth: 200 }}>
              <CardMedia component="img" image={IrvinsLogo} title="Irvins' Logo" />
            </Card>
          </Box>
        </Grid>

        <Formik initialValues={{ id: '' }} onSubmit={onSubmit}>
          <Form>
            <Grid container item direction="row" justify="center" alignItems="center" style={{ paddingTop: 50, paddingBottom: 50 }}>
                <Grid>
                  <Typography style={{ fontSize: 28, paddingRight: 20 }}>ID:</Typography>
                </Grid>

                <Grid item> 
                  <Field name="id" style={{ height: 50, width: 750, fontSize: 28 }} required/>
                </Grid>
            
                <Grid item>
                  <div className={classes.paper}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      <Typography>
                        Search
                      </Typography>
                    </Button>
                  </div>
                </Grid>
              </Grid>
          </Form>
        </Formik>

        <Grid container item justify="center" alignItems="center" spacing={5}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onPost()}
            >
              <Typography>
                Create
              </Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onPatch()}
            >
              <Typography>
                Patch
              </Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onDelete()}
            >
              <Typography>
                Delete
              </Typography>
            </Button>
          </Grid>
        </Grid>

        {
          product !== undefined && (
            <Grid item>
              <Box boxShadow={10}>
                <Card style={{ width: '10vw', minWidth: 200 }}>
                  <CardMedia component="img" image={product.image} title={product.name} />
                </Card>
              </Box>

              <div style={{ paddingTop: 50 }}>
                <Typography style={{ fontSize: 24 }}>Name: {product.name}</Typography>
                <Typography style={{ fontSize: 24 }}>Price: ${(Math.round(product.price * 100) / 100).toFixed(2)}</Typography>
                <Typography style={{ fontSize: 24 }}>Tags: {product.tags.join(', ')}</Typography>
              </div>
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}

export default Main;
