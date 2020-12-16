import { useState } from 'react';
import { getFormData } from '../../helpers/getFormData';

const useForm = (initState) => {
  const [formState, setFormState] = useState(initState);

  //   useEffect(() => {
  //     console.log(formState);
  //   }, [formState]);

  const onChangeHandler = (e, name) => {
    setFormState({ ...formState, [name]: e.target.value });
  };

  const setErrors = (errorObj) => {
    if (!formState.hasOwnProperty('errors')) return;
    setFormState({ ...formState, errors: errorObj });
  };

  const formData = getFormData(formState);

  return [formState, onChangeHandler, formData, setErrors];
};

export default useForm;
