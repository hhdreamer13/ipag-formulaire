import { useFormState } from "@/utils/FormContext";
import { pdfHandler } from "@/utils/pdfHandler";
import labels from "@/public/labels";
import Image from "next/image";

const SummaryForm = () => {
  const { formData, handleBack } = useFormState();

  const getLabel = (fieldName) => {
    const fieldLabel = labels.find((label) => label.name === fieldName);
    return fieldLabel ? fieldLabel.label : fieldName;
  };

  const filteredFormData = Object.entries(formData)
    .filter(([key]) => labels.some((label) => label.name === key))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  const handleConfirm = async () => {
    const pdfDoc = await pdfHandler(formData);
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "formulaire-conferencier-rempli.pdf";
    link.click();
  };

  const onHandleBack = () => {
    handleBack();
  };

  return (
    <div className='prose'>
      <h3 className='mx-auto mt-16 max-w-xl sm:mt-20 text-left'>
        Veuillez vérifier vos informations :
      </h3>
      <div className='mx-auto mt-8 max-w-xl text-left'>
        <table className='table-auto w-full'>
          <tbody>
            {labels.map(({ name, label }) => {
              const value = formData[name];
              if (value) {
                return (
                  <tr key={name} className='border-b border-gray-200'>
                    <td className='py-2 font-semibold text-gray-700'>
                      {label}&nbsp;:
                    </td>
                    <td className='py-2 text-gray-600 items-center flex'>
                      {name === "signature" ? (
                        value ? (
                          <Image
                            src={value}
                            alt='Signature'
                            width={100}
                            height={50}
                          />
                        ) : (
                          <p>Pas de signature</p>
                        )
                      ) : value && typeof value === "object" ? (
                        Object.entries(value).map(
                          ([k, v]) =>
                            v !== false && <div key={k}>{getLabel(k)}</div>
                        )
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      <div className='mt-14 flex'>
        <button
          type='button'
          onClick={onHandleBack}
          className='block w-40 mx-auto rounded-md focus:bg-indigo-500 bg-indigo-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
        >
          Précédent
        </button>
        <button
          onClick={handleConfirm}
          className='block w-40 mx-auto rounded-md focus:bg-indigo-700 bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default SummaryForm;