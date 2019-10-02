import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import { fetchData } from '../../utils/api';

const CakesList = () => {
  const [cakes, setCakes] = React.useState(null);

  const fetchCakes = async () => {
    try {
      const { data } = await fetchData('/cakes');
      if (data) {
        setCakes(data);
      }
    } catch (e) {
      setCakes(null);
    }
  };

  React.useEffect(() => {
    fetchCakes();
  }, []);

  return (
    <section>
      <Link to="/new">
        <Button color="primary" outline>
          Create new cake
        </Button>
      </Link>
      {cakes && cakes.length > 0 && (
        <ListGroup>
          {cakes.map(cake => (
            <Link to={`/cake/${cake.id}`} key={cake.id}>
              <ListGroupItem>
                <div>
                  <img width="50px" src={cake.imageUrl} alt="Cake" />
                </div>
                <div>
                  <p>
                    <b>{cake.name}</b>
                  </p>
                </div>
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      )}
    </section>
  );
};

export default withRouter(CakesList);
