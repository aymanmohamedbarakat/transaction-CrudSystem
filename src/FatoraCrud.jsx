import { Edit2, Plus, Smartphone, Trash, X } from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function FatoraCrud() {
  const [phones, setPhones] = useState([
    { id: 1, name: "iphonex", price: 400, qty: 3 },
    { id: 2, name: "iphone11", price: 450, qty: 5 },
    { id: 3, name: "iphone12", price: 500, qty: 2 },
    { id: 4, name: "Samsung", price: 600, qty: 6 },
    { id: 5, name: "Nokia", price: 300, qty: 7 },
    { id: 6, name: "OnePlus 9 Pro", price: 650, qty: 10 },
    { id: 7, name: "Xiaomi Mi 11", price: 450, qty: 15 },
    { id: 8, name: "Google Pixel 6", price: 550, qty: 8 },
    { id: 9, name: "Huawei P50", price: 480, qty: 12 },
    { id: 10, name: "Sony Xperia 1", price: 700, qty: 4 },
    { id: 11, name: "Oppo Find X3", price: 520, qty: 9 },
    { id: 12, name: "Vivo X70", price: 380, qty: 11 },
  ]);

  const phoneSchema = Yup.object({
    name: Yup.string(),
    price: Yup.number(),
    qty: Yup.number(),
  });

  const [modalIndex, setModalIndex] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(0);

  const handleRemove = (phoneIndex) => {
    const removedPhoneName = phones[phoneIndex].name;
    let copy = [...phones];
    copy.splice(phoneIndex, 1);
    toast.warning(`You Have Removed Phone ${removedPhoneName}`);
    setPhones(copy);
  };

  const handleEdit = (phoneIndex) => {
    setPhoneIndex(phoneIndex);
    setEditModalIndex(true);
    setModalIndex(true);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    let obj = {
      name: values.name,
      price: +values.price,
      qty: +values.qty,
    };

    let copyOfPhones = [...phones];

    if (editModalIndex) {
      obj.id = phones[phoneIndex].id;
      copyOfPhones[phoneIndex] = obj;
      toast.success(`You Have Edited Phone ${phones[phoneIndex].name}`);
    } else {
      obj.id = copyOfPhones.length
        ? copyOfPhones[copyOfPhones.length - 1].id + 1
        : 1;
      copyOfPhones.push(obj);
      toast.success(`You Have Added New Phone`);
    }

    setPhones(copyOfPhones);
    setSubmitting(false);
    setModalIndex(false);
    setEditModalIndex(false);
    resetForm();
  };

  const closeModal = () => {
    setModalIndex(false);
    setEditModalIndex(false);
  };

  const total = phones.reduce((acc, el) => acc + el.price * el.qty, 0);

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Fatora CRUD System
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Manage your phone inventory
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalIndex(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus size={20} />
                <span>Add Phone</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>

            <div className="max-h-69 overflow-y-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-200">
                  {phones.length ? (
                    phones.map((el, index) => (
                      <tr
                        key={el.id}
                        className="hover:bg-slate-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-gray-800 font-medium">
                          <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {el.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800 capitalize">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                              <Smartphone className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="font-medium text-slate-900">
                              {el.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                          <span className="text-slate-900 font-medium">
                            {el.price} EGP
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {el.qty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800 font-semibold">
                          <span className="text-slate-900 font-semibold">
                            {el.price * el.qty} EGP
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="flex justify-center gap-2">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                              onClick={() => handleEdit(index)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                              onClick={() => handleRemove(index)}
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 px-6">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📱</div>
                          <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No phones available
                          </h3>
                          <p className="text-slate-600 mb-6">
                            Click "Add Phone" to get started
                          </p>
                          <button
                            onClick={() => setModalIndex(true)}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
                          >
                            <Plus size={18} />
                            <span>Add Your First Phone</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <table className="w-full text-sm">
              <tfoot className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
                <tr>
                  <td colSpan={6} className="py-4 px-6">
                    <div className="flex justify-end">
                      <span className="text-xl font-bold text-slate-900">
                        TOTAL:
                        <span className="text-blue-600"> {total} EGP</span>
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Modal */}
          {modalIndex && (
            <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editModalIndex ? "Edit Phone" : "Add New Phone"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  <Formik
                    initialValues={{
                      name: editModalIndex ? phones[phoneIndex].name : "",
                      price: editModalIndex ? phones[phoneIndex].price : "",
                      qty: editModalIndex ? phones[phoneIndex].qty : "",
                    }}
                    validationSchema={phoneSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Name
                          </label>
                          <Field
                            name="name"
                            type="text"
                            placeholder="Enter phone name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price (EGP)
                          </label>
                          <Field
                            name="price"
                            type="number"
                            placeholder="Enter price"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                          </label>
                          <Field
                            name="qty"
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <ErrorMessage
                            name="qty"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        {/* Modal Footer */}
                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors duration-150"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            {isSubmitting
                              ? editModalIndex
                                ? "Saving..."
                                : "Adding..."
                              : editModalIndex
                              ? "Save Changes"
                              : "Add Phone"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
