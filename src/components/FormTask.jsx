import React from 'react'
import { Formik, Form , Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { LEVELS } from '../levels.enum.js';

function FormTask() {

  const initialValues = {
    name: "",
    description: "",
    completed: false,
    level: LEVELS.NORMAL
  }

  const schema = Yup.object().shape(
    {
      name: Yup.string()
          .min(4,"name too short")
          .max(15,"name yoo long")
          .required("name is required"),
      description: Yup.string()
          .min(4,"description too short")
          .max(50,"description too long")
          .required("description is required"),
      completed: Yup.string().required(true),
      level: Yup.string().required(true)
    }
  )

  return (
    <div>
      <h3>Create your Task</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={ (values) => {         //* Cuando se manda el form
                
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));    
                }, 400);
            }}
      >
        {({ errors, touched, isSubmitting }) => (
        <Form >
            <Field type="text" name="name" placeholder="name" />
            {
                errors.name && touched.name && ( <ErrorMessage name="name" component="div" /> )
            }

            <Field type="description" name="description" placeholder="Description" />
            {
                errors.description && touched.description && ( <ErrorMessage name="description" component="div" /> )
            }
            

            <Field as="select" name="completed">
             <option value="false">incompleted</option>
             <option value="true">completed</option>
           </Field>
            {
                errors.completed && touched.completed && ( <ErrorMessage name="completed" component="div" /> )
            }

            <Field as="select" name="level">
             <option value="NORMAL">normal</option>
             <option value="URGENT">urgent</option>
             <option value="BLOCKING">blocking</option>
           </Field>
            {
                errors.level && touched.level && ( <ErrorMessage name="level" component="div" /> )
            }
            
            
            <button type="submit" >
                Add Task
            </button>
            { isSubmitting ? ( <p>Sending your Task...</p> ) : null }
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormTask