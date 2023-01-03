import jwt from 'jsonwebtoken';

const jwtGenerate = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default jwtGenerate;
