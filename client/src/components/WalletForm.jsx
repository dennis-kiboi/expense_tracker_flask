import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";

// Define the validation schema using Yup
const WalletSchema = Yup.object().shape({
  name: Yup.string().max(80, "Name is too long!").required("Name is required"),
  balance: Yup.number()
    .min(0, "Balance cannot be negative")
    .required("Balance is required")
});

const WalletForm = ({ onClose }) => {
  const formik = useFormik({
    initialValues: { name: "", balance: "0" },
    validationSchema: WalletSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Prepare the data for the API request
      const newWallet = {
        user_id: 1, // Default user ID
        name: values.name,
        balance: parseFloat(values.balance)
      };

      // Send the data to the API using Fetch API
      fetch("/api/wallets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newWallet)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then(data => {
          console.log("Wallet created:", data);
          resetForm();
          onClose();
        })
        .catch(error => {
          console.error("Error creating wallet:", error);
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
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="block w-full rounded-md border-0 py-1 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-xs text-danger-400">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="balance"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Balance:
          </label>
          <input
            type="number"
            name="balance"
            step="0.01"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.balance}
            className="block w-full rounded-md border-0 py-1 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
          {formik.touched.balance && formik.errors.balance ? (
            <div className="text-xs text-danger-400">
              {formik.errors.balance}
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <Button
            color="primary"
            type="submit"
            size="sm"
            disabled={formik.isSubmitting}
          >
            Add Wallet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WalletForm;
