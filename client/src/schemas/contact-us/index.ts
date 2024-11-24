import * as yup from "yup";

const contactUsSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    message: yup.string().min(4).required("Required"),

})

export {contactUsSchema}