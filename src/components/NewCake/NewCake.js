import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { createData } from '../../utils/api';

const CakeSchema = Yup.object().shape({
  name: Yup.string().required(),
  comment: Yup.string().required(),
  yumFactor: Yup.number()
    .required()
    .positive()
    .integer()
    .min(1)
    .max(5),
  imageUrl: Yup.string(),
});

const NewCake = ({ history }) => {
  const createCake = async cake => {
    try {
      await createData('/cakes/', cake);
      history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <section>
      <Link to="/">
        <Button color="primary" outline>
          Go back
        </Button>
      </Link>
      <Formik
        validationSchema={CakeSchema}
        onSubmit={async (values, actions) => {
          if (!values.imageUrl) {
            values.imageUrl = 'https://via.placeholder.com/150';
          }
          try {
            await createCake(values);
          } catch (e) {
            console.log(e);
          }
          actions.setSubmitting(false);
        }}
        render={({ errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Cake name:</label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter a cake name"
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <Field
                type="text"
                name="comment"
                id="comment"
                placeholder="Enter a comment"
              />
              {errors.comment && touched.comment ? (
                <div>{errors.comment}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="yumFactor">Yum factor:</label>
              <Field
                type="number"
                name="yumFactor"
                id="yumFactor"
                placeholder="Enter a yum factor"
              />
              {errors.yumFactor && touched.yumFactor ? (
                <div>{errors.yumFactor}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="imageUrl">Image url: (optional)</label>
              <Field
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="Enter a image url"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      ></Formik>
    </section>
  );
};

export default withRouter(NewCake);
