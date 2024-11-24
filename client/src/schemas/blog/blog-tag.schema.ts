import * as Yup from "yup";


export const BlogTagFormSchema = Yup.object().shape({

    name: Yup.string().required('Tag name is required'),
});