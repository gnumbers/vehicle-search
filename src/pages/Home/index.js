import { useState } from 'react';
import { Space, Typography, Checkbox, Button } from 'antd';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { fetchVehicleModelsByMultipleMakeIds } from '../../api/vehicle';

import './index.css';
import TypeDropDown from './TypeDropDown';
import MakeDropDown from './MakeDropDown';
import ModelYear from './ModelYear';

const { Title } = Typography;

const initialValues = {
  type: null,
  makes: [],
  modelYearChecked: false,
  modelYear: null,
};
const SearchSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  makes: Yup.array().min(1, 'Required'),
});

const hasErrors = (errors) => Object.values(errors).some((e) => !!e);

function Home() {
  const [models, setModels] = useState([]);
  const [initValues, setInitValues] = useState(initialValues);
  const handleSubmit = async (values) => {
    try {
      const response = await fetchVehicleModelsByMultipleMakeIds(
        values.makes,
        values.type,
        values.modelYearChecked ? values.modelYear : null
      );
      setInitValues(values);
      setModels(response);
    } catch (err) {}
  };

  return (
    <div className="Home">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validateOnChange
        validationSchema={SearchSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          dirty,
          errors,
          isSubmitting,
        }) => (
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Title level={2} className="center">
              Car Search
            </Title>
            <Field name="type" component={TypeDropDown} />
            <Field name="makes" component={MakeDropDown} />
            <div>
              <Title level={4}>Use Year?</Title>
              <Checkbox
                name="modelYearChecked"
                checked={values.modelYearChecked}
                onChange={({ target }) =>
                  setFieldValue('modelYearChecked', target.checked)
                }
              >
                {values.modelYearChecked && (
                  <Field name="modelYear" component={ModelYear} />
                )}
              </Checkbox>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="primary"
                disabled={isSubmitting || !dirty || hasErrors(errors)}
                onClick={handleSubmit}
              >
                Search
              </Button>
              {isSubmitting && (
                <span style={{ marginLeft: '20px' }}>Searching...</span>
              )}
            </div>

            <table className="full-width">
              <thead>
                <tr>
                  <th>Make ID</th>
                  <th>Make Name</th>
                  <th>Model ID</th>
                  <th>Model Name</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.Model_ID}>
                    <td>{m.Make_ID}</td>
                    <td>{m.Make_Name}</td>
                    <td>{m.Model_ID}</td>
                    <td>{m.Model_Name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Space>
        )}
      </Formik>
    </div>
  );
}

export default Home;
