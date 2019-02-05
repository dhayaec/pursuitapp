import * as yup from 'yup';

export const productSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3)
    .max(255),
  coverImage: yup
    .string()
    .trim()
    .min(3)
    .max(255),
  description: yup
    .string()
    .trim()
    .min(50),
  rating: yup
    .number()
    .min(0)
    .max(10),
  offerPrice: yup
    .number()
    .min(1)
    .required(),
  price: yup
    .number()
    .min(1)
    .required(),
});
