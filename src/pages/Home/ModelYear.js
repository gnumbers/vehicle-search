import { Input, Typography } from 'antd';
const { Text } = Typography;

function ModelYear(props) {
  const {
    field: { name, value },
    form: { errors, setFieldValue, setFieldError },
  } = props;
  const error = errors[name];

  const handleChange = (ev) => {
    const value = ev.target.value;
    setFieldValue(name, value, false);

    if (value.length !== 4 || isNaN(value)) {
      setFieldError(name, 'Please enter valid year');
    } else {
      setFieldError(name, null);
    }
  };

  return (
    <div>
      <Input name={name} value={value} type="number" onChange={handleChange} />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
}

export default ModelYear;
