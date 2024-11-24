// src/schemas/event/event.schema.ts
import * as Yup from "yup";

export const EventUpdateFormSchema = Yup.object().shape({
    smallImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
        }),
    mediumImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
        }),
    largeImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
        }),
    defaultImage: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
        }),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    resume: Yup.string().required('Resume is required'),
    city: Yup.string().required('City is required'),
    startDate: Yup.date()
        .required('Start Date is required')
        .min(new Date(), 'Start Date must be later than today'),
    endDate: Yup.date()
        .required('End Date is required')
        .min(Yup.ref('startDate'), 'End Date must be later than the Start Date'),
});
export const EventCardFormSchema = Yup.object().shape({
    image: Yup.mixed()
        .notRequired()
        .test('fileType', 'Unsupported File Format', (value: any) => {
            return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
        }),
    name: Yup.string().required('Title is required'),

});
