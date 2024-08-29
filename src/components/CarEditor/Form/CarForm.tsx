'use client'

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CarFormValues } from './../../../utils/formInitialValues';

import FormFields from '../Fields/FormFields'
import FormDisplay from './FormDisplay'

type CarFormProps = {
  carModification?: any;
  onClose: () => void;
};

const CarForm = ({ carModification, onClose }: CarFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialValues: CarFormValues = {
    brandId: carModification?.model.brand.id || '',
    modelId: carModification?.model.id || '',
    modificationId: carModification?.id || '',
    coupe: carModification?.coupe || '',
    horsePower: carModification?.horsePower.toString() || '',
    weight: carModification?.weight.toString() || '',
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-6">
        {carModification ? 'Edit' : 'Create'} Car Modification
      </h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={()=>{}}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <FormFields values={values} setFieldValue={setFieldValue} />
            <FormDisplay values={values} />
          </Form>
        )}
      </Formik>
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
    </div>
  );
};

export default CarForm