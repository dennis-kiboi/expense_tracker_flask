import { useFormik } from "formik";
import * as Yup from "yup";

// Define the validation schema
const WalletSchema = Yup.object().shape({
  name: Yup.string().max(80, "Name is too long!").required("Name is required"),
  balance: Yup.number()
    .min(0, "Balance cannot be negative")
    .required("Balance is required")
});

const WalletForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      balance: 0
    },
    validationSchema: WalletSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Prepare data for the API
      const newWallet = {
        user_id: 1,
        name: values.name,
        balance: parseFloat(values.balance)
      };

      // Send data to the API
      fetch("/api/wallets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newWallet)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok " + res.statusText);
          }
          return res.json();
        })
        .then(data => {
          console.log("Wallet created", data);
          resetForm();
        })
        .catch(error => {
          console.error("Error creating wallet", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            name="number"
            step="0.01"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.balance}
          />
          {formik.touched.balance && formik.errors.balance ? (
            <div>{formik.errors.balance}</div>
          ) : null}
        </div>
        <div>
          <button type="submit" disabled={formik.isSubmitting}>
            Create Wallet
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalletForm;
