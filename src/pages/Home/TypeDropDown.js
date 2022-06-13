import { useEffect, useState } from 'react';
import { Select, Typography, notification } from 'antd';

import { fetchVehicleTypes } from '../../api/vehicle';

const { Title } = Typography;
const { Option } = Select;

function TypeDropDown(props) {
  const {
    field: { name, value },
    form: { setFieldValue },
  } = props;
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchVehicleTypes()
      .then((vehicleTypes) => setTypes(vehicleTypes))
      .catch((err) => {
        notification.open({
          message: 'Error',
          description: 'Can not fetch vehicle types. Please try again.',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  return (
    <div>
      <Title level={4}>Vehicle Type</Title>
      <Select
        className="full-width"
        value={value}
        loading={loading}
        onChange={handleChange}
      >
        {types.map((type) => (
          <Option key={type.Id} value={type.Name}>
            {type.Name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default TypeDropDown;
