import * as Yup from "yup";


export const BlogUpdateFormSchema = Yup.object().shape({
    smallImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type);
        }),
    mediumImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type);
        }),
    largeImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type);
        }),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    resume: Yup.string().required('Resume is required'),
    city: Yup.string().required('City is required'),
    tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
});