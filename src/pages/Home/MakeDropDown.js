import { useEffect, useState } from 'react';
import { Select, Typography, notification } from 'antd';

import { fetchVehicleMakes } from '../../api/vehicle';

const { Title } = Typography;
const { Option } = Select;

function MakeDropDown(props) {
  const {
    field: { name, value },
    form: { values, setFieldValue },
  } = props;
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setMakes([]);
    handleChange([]);
    fetchVehicleMakes(values.type)
      .then((vehicleMakes) => setMakes(vehicleMakes))
      .catch((err) => {
        notification.open({
          message: 'Error',
          description: 'Can not fetch vehicle makes. Please try again.',
        });
      })
      .finally(() => setLoading(false));
  }, [values.type]);

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  return (
    <div>
      <Title level={4}>Vehicle Make</Title>
      <Select
        className="full-width"
        value={value}
        loading={loading}
        mode="multiple"
        allowClear
        onChange={handleChange}
      >
        {makes.map((make) => (
          <Option key={make.MakeId} value={make.MakeId}>
            {make.MakeName}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default MakeDropDown;
