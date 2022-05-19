import * as yup from 'yup';

export const schema = yup.object().shape({
  birthday: yup.string().required('Required!'),
  country: yup.string().required('Required!'),
});
