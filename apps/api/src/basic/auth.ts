import base64 from 'base-64';
import { getUserCredentials } from '../db';

const decodeCredentials = (authHeader: string) => {
  const encoded = authHeader.trim().replace(/Basic\s+/i, '');
  const decoded = base64.decode(encoded);
  return decoded.split(':');
};
export const basicMiddleware = async (req, res, next) => {
  const [username, password] = decodeCredentials(req.headers.authorization || '');
  if (username && password) {
    const response = await getUserCredentials(username);
    if (response.rows && response.rows[0].password) {
      res.locals.user = response.rows[0];
      return next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm="user_pages"');
      res.status(401).send('Authentication required');
    }
  }
};
