import {} from 'frappe-react-sdk';

const frappeConfig = {
  url: process.env.FRAPPE_URL || 'http://localhost:8000',
  enableCaching: true
};

export default frappeConfig;
