import axios from 'axios';

const apiUrl =
  'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api';

export const fetchData = async url => {
  try {
    const res = await axios.get(apiUrl + url);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createData = async (url, data) => {
  try {
    const res = await axios.post(apiUrl + url, data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
