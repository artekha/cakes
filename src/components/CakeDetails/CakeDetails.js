import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { fetchData } from '../../utils/api';

const CakeDetails = ({ match }) => {
  const [cake, setCake] = React.useState(null);

  const fetchCakes = async cakeId => {
    try {
      const { data } = await fetchData(`/cakes/${cakeId}`);
      if (data) {
        setCake(data);
      }
    } catch (e) {
      setCake(null);
    }
  };

  React.useEffect(() => {
    fetchCakes(match.params.id);
  }, [match.params.id]);

  return (
    <section>
      <Link to="/">
        <Button color="primary" outline>
          Go back
        </Button>
      </Link>
      {cake && (
        <React.Fragment>
          <div>
            <img width="50px" src={cake.imageUrl} alt="Cake" />
          </div>
          <div>
            <p>
              <b>{cake.name}</b>
            </p>
            <p>
              <span>Comment: </span>
              <b>{cake.comment}</b>
            </p>
            <p>
              <span>Yum factor: </span>
              <b>{cake.yumFactor}</b>
            </p>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default withRouter(CakeDetails);
